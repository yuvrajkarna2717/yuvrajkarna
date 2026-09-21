import { MongoClient, ObjectId } from "mongodb";

const runtimeEnv = (globalThis as typeof globalThis & {
  process?: { env?: Record<string, string | undefined> };
}).process?.env;

const mongoUri = runtimeEnv?.MONGODB_URI;
const dbName = runtimeEnv?.MONGODB_DB_NAME || "thedigitalprofile";
const habitsCollectionName = "habit_definitions";
const trackerCollectionName = "habit_daily_entries";

function isValidDateString(value: string | undefined): boolean {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;

  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

function jsonResponse(body: unknown, init?: ResponseInit) {
  return new Response(JSON.stringify(body), {
    ...init,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      ...(init?.headers ?? {}),
    },
  });
}

function normalizeHabit(habit: any) {
  return {
    id: habit.id ?? habit._id?.toString?.() ?? String(habit._id ?? new ObjectId().toHexString()),
    name: habit.name ?? "",
    description: habit.description ?? "",
    isActive: habit.isActive !== false,
    createdAt: habit.createdAt ? new Date(habit.createdAt).toISOString() : undefined,
    updatedAt: habit.updatedAt ? new Date(habit.updatedAt).toISOString() : undefined,
  };
}

function normalizeRecord(record: any) {
  return {
    date: record.date,
    completedHabitIds: Array.isArray(record.completedHabitIds) ? record.completedHabitIds : [],
    note: typeof record.note === "string" ? record.note : "",
    createdAt: record.createdAt ? new Date(record.createdAt).toISOString() : undefined,
    updatedAt: record.updatedAt ? new Date(record.updatedAt).toISOString() : undefined,
  };
}

export async function onRequest(context: { request: Request; env?: Record<string, string> }): Promise<Response> {
  const { request } = context;
  const url = new URL(request.url);
  const method = request.method.toUpperCase();

  if (method === "OPTIONS") {
    return jsonResponse(null, { status: 204 });
  }

  try {
    const activeUri = context.env?.MONGODB_URI ?? mongoUri;
    if (!activeUri) {
      return jsonResponse({ error: "database_not_configured" }, { status: 503 });
    }

    const client = new MongoClient(activeUri);
    await client.connect();
    const db = client.db(context.env?.MONGODB_DB_NAME || dbName);
    const habitsCollection = db.collection(habitsCollectionName);
    const recordsCollection = db.collection(trackerCollectionName);

    try {
      await habitsCollection.createIndex({ id: 1 }, { unique: true, name: "habit_id_unique" });
      await recordsCollection.createIndex({ date: 1 }, { unique: true, name: "daily_date_unique" });

      const month = url.searchParams.get("month");
      if (method === "GET") {
        if (month && !/^\d{4}-\d{2}$/.test(month)) {
          return jsonResponse({ error: "invalid_month" }, { status: 400 });
        }

        const habits = await habitsCollection
          .find({ isActive: { $ne: false } })
          .sort({ createdAt: 1 })
          .toArray();

        const filter = month ? { date: { $regex: `^${month}-` } } : {};
        const records = await recordsCollection.find(filter).sort({ date: 1 }).toArray();

        return jsonResponse(
          {
            habits: habits.map(normalizeHabit),
            records: records.map(normalizeRecord),
          },
          { status: 200 }
        );
      }

      const body = (await request.json().catch(() => null)) as any;
      if (!body || typeof body !== "object") {
        return jsonResponse({ error: "invalid_body" }, { status: 400 });
      }

      const action = body.action ?? "upsert-record";

      if (method === "POST" && action === "upsert-habit") {
        const habitInput = body.habit ?? {};
        const name = String(habitInput.name ?? "").trim();
        if (!name) {
          return jsonResponse({ error: "habit_name_required" }, { status: 400 });
        }

        const habitId = String(habitInput.id ?? habitInput._id ?? `habit-${Date.now()}`);
        const now = new Date();
        const result = await habitsCollection.findOneAndUpdate(
          { id: habitId },
          {
            $set: {
              id: habitId,
              name,
              description: String(habitInput.description ?? ""),
              isActive: habitInput.isActive !== false,
              updatedAt: now,
            },
            $setOnInsert: { createdAt: now },
          },
          { upsert: true, returnDocument: "after" }
        );

        const habit =
          (result && "value" in result ? result.value : null) ??
          { id: habitId, name, description: "", isActive: true, createdAt: now, updatedAt: now };
        return jsonResponse({ habit: normalizeHabit(habit) }, { status: 200 });
      }

      if (method === "PATCH" && action === "toggle-habit") {
        const date = body.date;
        if (!isValidDateString(date)) {
          return jsonResponse({ error: "invalid_date" }, { status: 400 });
        }

        const habitId = String(body.habitId ?? "");
        if (!habitId) {
          return jsonResponse({ error: "habit_id_required" }, { status: 400 });
        }

        const existing = await recordsCollection.findOne({ date });
        const completedHabitIds = new Set(existing?.completedHabitIds ?? []);
        if (completedHabitIds.has(habitId)) completedHabitIds.delete(habitId);
        else completedHabitIds.add(habitId);

        const now = new Date();
        const payload = {
          date,
          completedHabitIds: [...completedHabitIds],
          note: existing?.note ?? "",
          createdAt: existing?.createdAt ?? now,
          updatedAt: now,
        };

        const result = existing
          ? await recordsCollection.findOneAndUpdate({ date }, { $set: payload }, { returnDocument: "after" })
          : await recordsCollection.insertOne(payload);

        const record = existing
          ? ((result && "value" in result ? result.value : null) ?? payload)
          : { ...payload, _id: result && "insertedId" in result ? result.insertedId : undefined };
        return jsonResponse({ record: normalizeRecord(record) }, { status: 200 });
      }

      if (method === "PATCH" && action === "update-note") {
        const date = body.date;
        if (!isValidDateString(date)) {
          return jsonResponse({ error: "invalid_date" }, { status: 400 });
        }

        const existing = await recordsCollection.findOne({ date });
        const now = new Date();
        const payload = {
          date,
          completedHabitIds: existing?.completedHabitIds ?? [],
          note: typeof body.note === "string" ? body.note : "",
          createdAt: existing?.createdAt ?? now,
          updatedAt: now,
        };

        const result = existing
          ? await recordsCollection.findOneAndUpdate({ date }, { $set: payload }, { returnDocument: "after" })
          : await recordsCollection.insertOne(payload);

        const record = existing
          ? ((result && "value" in result ? result.value : null) ?? payload)
          : { ...payload, _id: result && "insertedId" in result ? result.insertedId : undefined };
        return jsonResponse({ record: normalizeRecord(record) }, { status: 200 });
      }

      if (method === "DELETE" && action === "delete-habit") {
        const habitId = String(body.habitId ?? "");
        if (!habitId) {
          return jsonResponse({ error: "habit_id_required" }, { status: 400 });
        }

        const result = await habitsCollection.findOneAndUpdate(
          { id: habitId },
          { $set: { isActive: false, updatedAt: new Date() } },
          { returnDocument: "after" }
        );

        const habit = (result && "value" in result ? result.value : null) ?? { id: habitId, isActive: false };
        return jsonResponse({ habit: normalizeHabit(habit) }, { status: 200 });
      }

      if (method === "DELETE" && action === "delete-note") {
        const date = body.date;
        if (!isValidDateString(date)) {
          return jsonResponse({ error: "invalid_date" }, { status: 400 });
        }

        const existing = await recordsCollection.findOne({ date });
        if (!existing) {
          return jsonResponse({ record: { date, completedHabitIds: [], note: "" } }, { status: 200 });
        }

        const result = await recordsCollection.findOneAndUpdate(
          { date },
          { $set: { note: "", updatedAt: new Date() } },
          { returnDocument: "after" }
        );

        const record = (result && "value" in result ? result.value : null) ?? { ...existing, note: "" };
        return jsonResponse({ record: normalizeRecord(record) }, { status: 200 });
      }

      return jsonResponse({ error: "method_not_allowed" }, { status: 405 });
    } finally {
      await client.close();
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "MongoDB request failed.";
    return jsonResponse({ error: "database_error", message }, { status: 500 });
  }
}

export default {
  async fetch(request: Request, env: Record<string, string>) {
    return onRequest({ request, env });
  },
};
