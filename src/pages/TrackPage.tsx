import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Check,
  ChevronLeft,
  ChevronRight,
  FileText,
  Loader2,
  NotebookPen,
  Pencil,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import {
  calculateMonthStats,
  calculateMonthlyHabitMetrics,
  clampMonthToRange,
  formatDateKey,
  formatMonthKey,
  getMonthDates,
  type HabitDefinition,
  type TrackerRecord,
} from "../lib/tracker";

const API_PATH = "/api/track";
const EMPTY_NOTE = "";

async function readJsonResponse(response: Response) {
  const rawText = await response.text();
  if (!rawText) {
    throw new Error("Tracker API returned an empty response.");
  }

  if (rawText.includes("<!doctype") || rawText.includes("<html")) {
    throw new Error("Tracker API is unavailable in this environment.");
  }

  let payload: any;
  try {
    payload = JSON.parse(rawText);
  } catch {
    throw new Error("Tracker API returned malformed JSON.");
  }

  if (!response.ok) {
    const message =
      typeof payload?.message === "string"
        ? payload.message
        : typeof payload?.error === "string"
          ? payload.error
          : `Tracker API request failed (${response.status}).`;
    throw new Error(message);
  }

  return payload;
}

function getMonthLabel(date: Date) {
  return new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(date);
}

function getDayLabel(dateString: string) {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(year, month - 1, day));
}

function addMonth(date: Date, offset: number) {
  return new Date(date.getFullYear(), date.getMonth() + offset, 1);
}

export default function TrackPage() {
  const today = useMemo(() => clampMonthToRange(new Date()), []);
  const [selectedMonth, setSelectedMonth] = useState(today);
  const [habits, setHabits] = useState<HabitDefinition[]>([]);
  const [records, setRecords] = useState<TrackerRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [habitModalOpen, setHabitModalOpen] = useState(false);
  const [habitDraft, setHabitDraft] = useState({ id: "", name: "", description: "" });
  const [noteModalOpen, setNoteModalOpen] = useState(false);
  const [activeDate, setActiveDate] = useState<string | null>(null);
  const [noteDraft, setNoteDraft] = useState(EMPTY_NOTE);

  const monthDates = useMemo(
    () => getMonthDates(selectedMonth.getFullYear(), selectedMonth.getMonth()),
    [selectedMonth]
  );

  const recordMap = useMemo(
    () => Object.fromEntries(records.map(record => [record.date, record])) as Record<string, TrackerRecord>,
    [records]
  );

  const activeHabits = useMemo(
    () => habits.filter(habit => habit.isActive !== false),
    [habits]
  );

  const stats = useMemo(
    () => calculateMonthStats(records, activeHabits),
    [records, activeHabits]
  );

  const monthlyMetrics = useMemo(
    () => calculateMonthlyHabitMetrics(records, activeHabits),
    [records, activeHabits]
  );

  const fetchTracker = async (monthDate: Date) => {
    setLoading(true);
    setError(null);

    try {
      const monthKey = formatMonthKey(clampMonthToRange(monthDate));
      const response = await fetch(`${API_PATH}?month=${encodeURIComponent(monthKey)}`);
      const payload = await readJsonResponse(response);
      setHabits(Array.isArray(payload?.habits) ? payload.habits : []);
      setRecords(Array.isArray(payload?.records) ? payload.records : []);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to fetch tracker data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchTracker(selectedMonth);
  }, [selectedMonth]);

  useEffect(() => {
    if (!activeDate) {
      setNoteDraft(EMPTY_NOTE);
      return;
    }

    setNoteDraft(recordMap[activeDate]?.note ?? EMPTY_NOTE);
  }, [activeDate, recordMap]);

  const cycleMonth = (offset: number) => {
    const next = clampMonthToRange(addMonth(selectedMonth, offset));
    setSelectedMonth(next);
  };

  const handleToggleHabit = async (dateKey: string, habitId: string) => {
    const currentRecord = recordMap[dateKey] ?? { date: dateKey, completedHabitIds: [] };
    const completed = new Set(currentRecord.completedHabitIds ?? []);
    if (completed.has(habitId)) completed.delete(habitId);
    else completed.add(habitId);

    const optimistic = {
      ...currentRecord,
      completedHabitIds: [...completed],
      updatedAt: new Date().toISOString(),
    };

    setRecords(current => {
      const filtered = current.filter(entry => entry.date !== dateKey);
      return [...filtered, optimistic].sort((a, b) => a.date.localeCompare(b.date));
    });

    setSaving(true);
    try {
      const response = await fetch(API_PATH, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "toggle-habit", date: dateKey, habitId }),
      });

      const payload = await readJsonResponse(response);
      const updated = payload?.record ?? optimistic;
      setRecords(current => {
        const filtered = current.filter(entry => entry.date !== dateKey);
        return [...filtered, updated].sort((a, b) => a.date.localeCompare(b.date));
      });
      setLastSaved(`Updated ${getDayLabel(dateKey)}`);
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : "Unable to update habit.";
      setError(message);
      setRecords(current => {
        const filtered = current.filter(entry => entry.date !== dateKey);
        return [...filtered, currentRecord].sort((a, b) => a.date.localeCompare(b.date));
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSaveNote = async () => {
    if (!activeDate) return;

    setSaving(true);
    try {
      const response = await fetch(API_PATH, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "update-note", date: activeDate, note: noteDraft }),
      });

      const payload = await readJsonResponse(response);
      const updatedRecord = payload?.record ?? { date: activeDate, completedHabitIds: [], note: noteDraft };
      setRecords(current => {
        const filtered = current.filter(entry => entry.date !== activeDate);
        return [...filtered, updatedRecord].sort((a, b) => a.date.localeCompare(b.date));
      });
      setLastSaved(`Saved note for ${getDayLabel(activeDate)}`);
      setNoteModalOpen(false);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to save note.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteNote = async () => {
    if (!activeDate) return;

    setSaving(true);
    try {
      const response = await fetch(API_PATH, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete-note", date: activeDate }),
      });

      const payload = await readJsonResponse(response);
      const updatedRecord = payload?.record ?? { date: activeDate, completedHabitIds: [], note: "" };
      setRecords(current => {
        const filtered = current.filter(entry => entry.date !== activeDate);
        return [...filtered, updatedRecord].sort((a, b) => a.date.localeCompare(b.date));
      });
      setNoteDraft(EMPTY_NOTE);
      setNoteModalOpen(false);
      setLastSaved(`Cleared note for ${getDayLabel(activeDate)}`);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to delete note.");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveHabit = async () => {
    const name = habitDraft.name.trim();
    if (!name) return;

    setSaving(true);
    try {
      const response = await fetch(API_PATH, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "upsert-habit",
          habit: {
            id: habitDraft.id || undefined,
            name,
            description: habitDraft.description,
          },
        }),
      });

      const payload = await readJsonResponse(response);
      const nextHabit = payload?.habit;
      setHabits(current => {
        if (!nextHabit) return current;
        const exists = current.some(item => item.id === nextHabit.id);
        if (exists) {
          return current.map(item => (item.id === nextHabit.id ? nextHabit : item));
        }
        return [...current, nextHabit];
      });
      setHabitModalOpen(false);
      setHabitDraft({ id: "", name: "", description: "" });
      setLastSaved(`Saved habit: ${nextHabit.name}`);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to save habit.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteHabit = async (habitId: string) => {
    setSaving(true);
    try {
      const response = await fetch(API_PATH, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete-habit", habitId }),
      });

      await readJsonResponse(response);
      setHabits(current => current.map(item => (item.id === habitId ? { ...item, isActive: false } : item)));
      setLastSaved("Habit archived.");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to delete habit.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg text-black dark:text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-3 py-2 text-sm text-gray-600 transition hover:border-gray-400 dark:border-white/10 dark:bg-white/5 dark:text-gray-300"
            >
              <ArrowLeft className="h-4 w-4" />
              Home
            </Link>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">Personal dashboard</p>
              <h1 className="mt-1 text-3xl font-semibold">Habit tracker</h1>
            </div>
          </div>

          <ThemeToggle />
        </div>

        <div className="mb-6 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 shadow-sm dark:border-white/10 dark:bg-white/5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => cycleMonth(-1)}
                  className="rounded-full border border-gray-200 bg-white p-2 text-gray-600 hover:border-gray-400 dark:border-white/10 dark:bg-white/5 dark:text-gray-300"
                  aria-label="Previous month"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">Month</p>
                  <h2 className="text-xl font-semibold">{getMonthLabel(selectedMonth)}</h2>
                </div>
                <button
                  onClick={() => cycleMonth(1)}
                  className="rounded-full border border-gray-200 bg-white p-2 text-gray-600 hover:border-gray-400 dark:border-white/10 dark:bg-white/5 dark:text-gray-300"
                  aria-label="Next month"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              <button
                onClick={() => setSelectedMonth(today)}
                className="self-start rounded-full border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:border-gray-500 dark:border-white/15 dark:bg-white/5 dark:text-gray-200"
              >
                Current month
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/5">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">Progress</p>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-3 dark:border-white/10 dark:bg-white/5">
                <p className="text-gray-500 dark:text-gray-400">Completed</p>
                <p className="mt-1 text-xl font-semibold">{stats.totalCompleted}</p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-3 dark:border-white/10 dark:bg-white/5">
                <p className="text-gray-500 dark:text-gray-400">Rate</p>
                <p className="mt-1 text-xl font-semibold">{stats.completionRate}%</p>
              </div>
            </div>
            <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-gray-200 dark:bg-white/10">
              <div
                className="h-full rounded-full bg-black transition-all dark:bg-white"
                style={{ width: `${Math.min(stats.completionRate, 100)}%` }}
              />
            </div>
            {lastSaved && <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">{lastSaved}</p>}
          </div>
        </div>

        <div className="mb-6 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-white/10 dark:bg-white/5">
          <div className="overflow-x-auto">
            <div className="min-w-[780px]">
              <table className="w-full border-separate border-spacing-0 text-left">
                <thead>
                  <tr>
                    <th className="sticky left-0 z-20 border-b border-r border-gray-200 bg-gray-50 px-3 py-3 text-left text-xs font-medium uppercase tracking-[0.12em] text-gray-500 dark:border-white/10 dark:bg-gray-900/70 dark:text-gray-400">
                      Habit
                    </th>
                    {monthDates.map(dateKey => {
                      const [year, month, day] = dateKey.split("-").map(Number);
                      const isToday = dateKey === formatDateKey(new Date());
                      const noteExists = Boolean(recordMap[dateKey]?.note?.trim());

                      return (
                        <th
                          key={dateKey}
                          className={`border-b border-r border-gray-200 px-2 py-2 text-center text-[10px] dark:border-white/10 ${
                            isToday ? "bg-gray-100 dark:bg-white/10" : "bg-white dark:bg-transparent"
                          }`}
                        >
                          <div className="flex flex-col items-center gap-2">
                            <span className="text-gray-500 dark:text-gray-400">
                              {new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(new Date(year, month - 1, day))}
                            </span>
                            <span
                              className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${
                                isToday
                                  ? "bg-black text-white dark:bg-white dark:text-black"
                                  : "text-gray-700 dark:text-gray-200"
                              }`}
                            >
                              {day}
                            </span>
                            <button
                              onClick={() => {
                                setActiveDate(dateKey);
                                setNoteModalOpen(true);
                              }}
                              className={`flex h-6 w-6 items-center justify-center rounded-md border transition-colors ${
                                noteExists
                                  ? "border-amber-200 bg-amber-100 text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200"
                                  : "border-gray-200 bg-white text-gray-400 hover:border-gray-400 dark:border-white/10 dark:bg-white/5 dark:text-gray-500"
                              }`}
                              aria-label={`Edit note for ${dateKey}`}
                            >
                              {noteExists ? <NotebookPen className="h-3 w-3" /> : <FileText className="h-3 w-3" />}
                            </button>
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>

                <tbody>
                  {activeHabits.map(habit => (
                    <tr key={habit.id}>
                      <td className="sticky left-0 z-10 border-b border-r border-gray-200 bg-gray-50 px-3 py-3 text-sm font-medium text-gray-700 dark:border-white/10 dark:bg-gray-900/70 dark:text-gray-200">
                        {habit.name}
                      </td>

                      {monthDates.map(dateKey => {
                        const entries = recordMap[dateKey]?.completedHabitIds ?? [];
                        const isComplete = entries.includes(habit.id);
                        const isToday = dateKey === formatDateKey(new Date());

                        return (
                          <td
                            key={`${habit.id}-${dateKey}`}
                            className={`border-b border-r border-gray-200 p-2 text-center align-middle dark:border-white/10 ${
                              isToday ? "bg-gray-50 dark:bg-white/5" : "bg-white dark:bg-transparent"
                            }`}
                          >
                            <button
                              onClick={() => handleToggleHabit(dateKey, habit.id)}
                              disabled={saving}
                              className={`flex h-9 w-9 items-center justify-center rounded-lg border text-xs font-semibold transition-all ${
                                isComplete
                                  ? "border-emerald-300 bg-emerald-500 text-white shadow-sm"
                                  : "border-gray-200 bg-gray-100 text-gray-400 hover:border-gray-400 dark:border-white/10 dark:bg-white/5 dark:text-gray-500"
                              }`}
                              aria-label={`Toggle ${habit.name} for ${dateKey}`}
                            >
                              {isComplete ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                            </button>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/5">
            <p className="text-xs uppercase tracking-[0.15em] text-gray-400 dark:text-gray-500">Overall completion</p>
            <p className="mt-3 text-3xl font-semibold">{monthlyMetrics.overallCompletionRate}%</p>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-white/10">
              <div
                className="h-full rounded-full bg-emerald-500"
                style={{ width: `${Math.min(monthlyMetrics.overallCompletionRate, 100)}%` }}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/5">
            <p className="text-xs uppercase tracking-[0.15em] text-gray-400 dark:text-gray-500">Habit-days</p>
            <p className="mt-3 text-3xl font-semibold">{monthlyMetrics.totalCompletedHabitDays}</p>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              of {monthlyMetrics.totalPossibleHabitDays} possible
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/5">
            <p className="text-xs uppercase tracking-[0.15em] text-gray-400 dark:text-gray-500">Best streak</p>
            <p className="mt-3 text-3xl font-semibold">{monthlyMetrics.bestStreak}d</p>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Current: {monthlyMetrics.currentStreak}d</p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/5">
            <p className="text-xs uppercase tracking-[0.15em] text-gray-400 dark:text-gray-500">Most consistent</p>
            <p className="mt-3 text-lg font-semibold">{monthlyMetrics.mostConsistentHabit?.name ?? "—"}</p>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {monthlyMetrics.mostConsistentHabit?.completionRate ?? 0}% completion
            </p>
          </div>
        </div>

        <div className="mb-6 grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Daily completion trend</h3>
              <span className="text-xs uppercase tracking-[0.15em] text-gray-400 dark:text-gray-500">Selected month</span>
            </div>
            <div className="flex h-24 items-end gap-1">
              {monthlyMetrics.dailyTrend.length === 0 && (
                <div className="flex h-full w-full items-center justify-center text-sm text-gray-500 dark:text-gray-400">
                  No activity yet
                </div>
              )}
              {monthlyMetrics.dailyTrend.map(day => {
                const height = `${Math.max(day.value, 8)}%`;
                const fillClass =
                  day.value >= 75
                    ? "bg-emerald-500"
                    : day.value >= 50
                      ? "bg-emerald-400"
                      : day.value >= 25
                        ? "bg-emerald-300"
                        : "bg-gray-200 dark:bg-white/10";

                return (
                  <div key={day.date} className="flex flex-1 flex-col items-center justify-end gap-1">
                    <div
                      className={`w-full rounded-t-md ${fillClass}`}
                      style={{ height }}
                      title={`${day.date}: ${day.value}%`}
                    />
                    <span className="text-[9px] text-gray-400 dark:text-gray-500">
                      {new Date(`${day.date}T00:00:00`).getDate()}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Habit consistency</h3>
              <span className="text-xs uppercase tracking-[0.15em] text-gray-400 dark:text-gray-500">Month</span>
            </div>

            {monthlyMetrics.habitSummary.length === 0 && (
              <p className="text-sm text-gray-500 dark:text-gray-400">Add a habit to begin tracking it.</p>
            )}

            {monthlyMetrics.habitSummary.map(habit => (
              <div key={habit.id} className="mb-4 last:mb-0">
                <div className="mb-1 flex items-center justify-between gap-2 text-sm">
                  <span className="truncate font-medium text-gray-700 dark:text-gray-200">{habit.name}</span>
                  <span className="text-gray-500 dark:text-gray-400">{habit.completionRate}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-white/10">
                  <div
                    className="h-full rounded-full bg-black dark:bg-white"
                    style={{ width: `${Math.min(habit.completionRate, 100)}%` }}
                  />
                </div>
              </div>
            ))}

            <div className="mt-5 border-t border-gray-200 pt-3 text-sm dark:border-white/10">
              <p className="text-gray-500 dark:text-gray-400">Least consistent</p>
              <p className="mt-1 font-medium text-gray-800 dark:text-gray-100">
                {monthlyMetrics.leastConsistentHabit?.name ?? "—"}
              </p>
            </div>
          </div>
        </div>

        <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/5">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-lg font-semibold">Habits</h3>
            <button
              onClick={() => {
                setHabitDraft({ id: "", name: "", description: "" });
                setHabitModalOpen(true);
              }}
              className="inline-flex items-center gap-2 rounded-full bg-black px-3 py-2 text-sm font-medium text-white dark:bg-white dark:text-black"
            >
              <Plus className="h-4 w-4" />
              Add habit
            </button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {activeHabits.length === 0 && <p className="text-sm text-gray-500 dark:text-gray-400">No habits yet.</p>}
            {activeHabits.map(habit => (
              <div
                key={habit.id}
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-2 text-sm dark:border-white/10 dark:bg-white/5"
              >
                <span>{habit.name}</span>
                <button
                  onClick={() => {
                    setHabitDraft({ id: habit.id, name: habit.name, description: habit.description ?? "" });
                    setHabitModalOpen(true);
                  }}
                  className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white"
                  aria-label={`Edit ${habit.name}`}
                >
                  <Pencil className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => handleDeleteHabit(habit.id)}
                  className="text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
                  aria-label={`Delete ${habit.name}`}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-200">
            {error}
          </div>
        )}

        {loading && (
          <div className="mt-4 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading tracker...
          </div>
        )}
      </div>

      {habitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-5 shadow-2xl dark:border-white/10 dark:bg-gray-900">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h3 className="text-xl font-semibold">{habitDraft.id ? "Edit habit" : "Add habit"}</h3>
              <button onClick={() => setHabitModalOpen(false)} className="rounded-full border border-gray-200 p-2 dark:border-white/10">
                <X className="h-4 w-4" />
              </button>
            </div>

            <label className="mb-3 block text-sm text-gray-600 dark:text-gray-300">
              Name
              <input
                value={habitDraft.name}
                onChange={event => setHabitDraft(current => ({ ...current, name: event.target.value }))}
                className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-gray-400 dark:border-white/10 dark:bg-white/5"
                placeholder="Exercise 45 minutes"
              />
            </label>

            <label className="mb-4 block text-sm text-gray-600 dark:text-gray-300">
              Description
              <input
                value={habitDraft.description}
                onChange={event => setHabitDraft(current => ({ ...current, description: event.target.value }))}
                className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-gray-400 dark:border-white/10 dark:bg-white/5"
                placeholder="Optional description"
              />
            </label>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setHabitModalOpen(false)}
                className="rounded-full border border-gray-200 px-3 py-2 text-sm dark:border-white/10"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveHabit}
                disabled={saving || !habitDraft.name.trim()}
                className="rounded-full bg-black px-3 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-black"
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {noteModalOpen && activeDate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-5 shadow-2xl dark:border-white/10 dark:bg-gray-900">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">Daily note</p>
                <h3 className="mt-1 text-xl font-semibold">{getDayLabel(activeDate)}</h3>
              </div>
              <button
                onClick={() => setNoteModalOpen(false)}
                className="rounded-full border border-gray-200 p-2 text-gray-600 hover:border-gray-400 dark:border-white/10 dark:text-gray-300"
                aria-label="Close note editor"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <textarea
              value={noteDraft}
              onChange={event => setNoteDraft(event.target.value)}
              rows={7}
              placeholder="Write a quick reflection for this day..."
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-3 text-sm text-gray-700 outline-none transition focus:border-gray-400 dark:border-white/10 dark:bg-white/5 dark:text-gray-100"
            />

            <div className="mt-4 flex items-center justify-between gap-3">
              <button
                onClick={handleDeleteNote}
                className="rounded-full border border-red-200 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:border-red-500/40 dark:text-red-300"
              >
                Delete note
              </button>

              <div className="flex gap-2">
                <button
                  onClick={() => setNoteModalOpen(false)}
                  className="rounded-full border border-gray-200 px-3 py-2 text-sm dark:border-white/10"
                >
                  Close
                </button>
                <button
                  onClick={handleSaveNote}
                  disabled={saving}
                  className="rounded-full bg-black px-3 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-black"
                >
                  {saving ? "Saving..." : "Save note"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
