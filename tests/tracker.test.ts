import test from "node:test";
import assert from "node:assert/strict";

import {
  clampMonthToRange,
  formatDateKey,
  getMonthDates,
  calculateMonthStats,
  calculateHabitStreak,
  calculateMonthlyHabitMetrics,
} from "../src/lib/tracker.ts";

test("formatDateKey builds a consistent YYYY-MM-DD key from a local date", () => {
  const date = new Date(2026, 8, 14, 12, 30, 0);
  assert.equal(formatDateKey(date), "2026-09-14");
});

test("getMonthDates returns all days for a month including leap-year February", () => {
  const september = getMonthDates(2026, 8);
  const leapFebruary = getMonthDates(2028, 1);

  assert.equal(september.length, 30);
  assert.equal(september[0], "2026-09-01");
  assert.equal(september[september.length - 1], "2026-09-30");

  assert.equal(leapFebruary.length, 29);
  assert.equal(leapFebruary[0], "2028-02-01");
  assert.equal(leapFebruary[leapFebruary.length - 1], "2028-02-29");
});

test("clampMonthToRange keeps navigation inside 2026-2032", () => {
  const before = clampMonthToRange(new Date(2025, 11, 1));
  const inside = clampMonthToRange(new Date(2028, 5, 1));
  const after = clampMonthToRange(new Date(2033, 0, 1));

  assert.equal(formatDateKey(before), "2026-01-01");
  assert.equal(formatDateKey(inside), "2028-06-01");
  assert.equal(formatDateKey(after), "2032-12-01");
});

test("calculateMonthStats counts totals and completion percentages", () => {
  const records = [
    { date: "2026-09-01", completedHabitIds: ["water", "exercise"], note: "" },
    { date: "2026-09-02", completedHabitIds: ["water", "reading"], note: "" },
  ];

  const stats = calculateMonthStats(records, [
    { id: "water", name: "Drink 4L of water" },
    { id: "exercise", name: "Exercise 30 minutes" },
    { id: "reading", name: "Read 30 minutes" },
    { id: "study", name: "Study 2 hours" },
  ]);

  assert.equal(stats.totalCompleted, 4);
  assert.equal(stats.totalPossible, 8);
  assert.equal(stats.completionRate, 50);
  assert.equal(stats.completedDays, 2);
});

test("calculateHabitStreak measures consecutive completed days", () => {
  const records = [
    { date: "2026-09-01", completedHabitIds: ["water"] },
    { date: "2026-09-02", completedHabitIds: ["water"] },
    { date: "2026-09-03", completedHabitIds: [] },
    { date: "2026-09-04", completedHabitIds: ["water"] },
    { date: "2026-09-05", completedHabitIds: ["water"] },
  ];

  assert.equal(calculateHabitStreak(records, "water"), 2);
});

test("calculateMonthlyHabitMetrics returns month-scoped insights", () => {
  const records = [
    { date: "2026-09-01", completedHabitIds: ["water", "reading"] },
    { date: "2026-09-02", completedHabitIds: ["water"] },
    { date: "2026-09-03", completedHabitIds: ["water", "reading", "study"] },
    { date: "2026-09-04", completedHabitIds: [] },
    { date: "2026-09-05", completedHabitIds: ["reading"] },
    { date: "2026-09-06", completedHabitIds: ["water", "reading", "study"] },
  ];

  const metrics = calculateMonthlyHabitMetrics(records, [
    { id: "water", name: "Water" },
    { id: "reading", name: "Reading" },
    { id: "study", name: "Study" },
  ]);

  assert.equal(metrics.overallCompletionRate, 55.6);
  assert.equal(metrics.totalCompletedHabitDays, 10);
  assert.equal(metrics.totalPossibleHabitDays, 18);
  assert.equal(metrics.bestStreak, 3);
  assert.equal(metrics.currentStreak, 2);
  assert.equal(metrics.mostConsistentHabit.id, "water");
  assert.equal(metrics.leastConsistentHabit.id, "study");
  assert.equal(metrics.dailyTrend.length, 6);
});
