---
title: "Redis + Socket.io: Real-Time at Scale"
date: "Dec 2024"
readTime: "6 min"
tags: ["Redis", "Socket.io", "Node.js"]
summary: "How we used Redis Pub/Sub to synchronise WebSocket events across multiple Node.js instances in the Dhanvv healthcare platform."
external: false
externalUrl: ""
---

# Redis + Socket.io: Real-Time at Scale

Single-instance Socket.io works great on your laptop. The moment you add a second Node.js process — whether for load balancing or horizontal scaling — WebSocket events stop propagating between instances. Here's how we fixed it with Redis Pub/Sub.

## The Problem with Multiple Instances

Say a nurse connects to instance A and a doctor connects to instance B. When the nurse emits `patient:updated`, only clients on instance A receive it. The doctor, sitting on instance B, misses it entirely.

```
Client A → Instance A → ✅ Client A gets event
Client B → Instance B → ❌ Client B misses it
```

## Redis Pub/Sub to the Rescue

Redis acts as the shared message bus. Every Socket.io instance subscribes to the same Redis channel. When any instance publishes, all instances receive it and forward it to their connected clients.

```
Client A → Instance A → Redis → Instance A + Instance B → ✅ All clients
```

## Setup with `@socket.io/redis-adapter`

```bash
npm install @socket.io/redis-adapter ioredis
```

```ts
import { createServer } from "http";
import { Server } from "socket.io";
import { createAdapter } from "@socket.io/redis-adapter";
import { createClient } from "ioredis";

const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });

const pubClient = createClient({ host: "localhost", port: 6379 });
const subClient = pubClient.duplicate();

await Promise.all([pubClient.connect(), subClient.connect()]);

io.adapter(createAdapter(pubClient, subClient));
```

That's it. `socket.io` handles the rest transparently.

## Room-Based Messaging

For healthcare, we scoped events to patient rooms so you only receive updates for patients in your ward.

```ts
// Nurse joins a patient room
socket.on("join:patient", (patientId: string) => {
  socket.join(`patient:${patientId}`);
});

// Server emits to everyone in that room (across all instances)
io.to(`patient:${patientId}`).emit("vitals:updated", vitalsData);
```

## Caching with Redis

While we had Redis, we used it for short-lived caching too:

```ts
// Cache patient vitals for 30 seconds
await redis.setex(`vitals:${patientId}`, 30, JSON.stringify(vitals));

// Serve from cache on subsequent reads
const cached = await redis.get(`vitals:${patientId}`);
if (cached) return JSON.parse(cached);
```

## Monitoring

Redis's `MONITOR` command lets you watch every command in real time — invaluable during load testing.

```bash
redis-cli MONITOR
```

## Lessons

- **Separate pub and sub clients.** Redis pub/sub requires the subscriber connection to do nothing but subscribe. Reusing one connection for both will break.
- **Redis isn't a database.** We hit a memory limit because we forgot to set TTLs. `SETEX` (or `SET … EX`) is your friend.
- **Test disconnection.** Simulate a Redis outage early. Your app should degrade gracefully, not crash.
