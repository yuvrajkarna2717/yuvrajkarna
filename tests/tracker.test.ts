import { describe, it, expect } from "vitest";

import {
  clampMonthToRange,
  formatDateKey,
  getMonthDates,
  calculateMonthStats,
  calculateHabitStreak,
  calculateMonthlyHabitMetrics,
} from "../src/lib/tracker";

describe("tracker utilities", () => {
  it("formatDateKey builds a consistent YYYY-MM-DD key from a local date", () => {
    const date = new Date(2026, 8, 14, 12, 30, 0);
    expect(formatDateKey(date)).toBe("2026-09-14");
  });

  it("getMonthDates returns all days for a month including leap-year February", () => {
    const september = getMonthDates(2026, 8);
    const leapFebruary = getMonthDates(2028, 1);

    expect(september).toHaveLength(30);
    expect(september[0]).toBe("2026-09-01");
    expect(september[september.length - 1]).toBe("2026-09-30");

    expect(leapFebruary).toHaveLength(29);
    expect(leapFebruary[0]).toBe("2028-02-01");
    expect(leapFebruary[leapFebruary.length - 1]).toBe("2028-02-29");
  });

  it("clampMonthToRange keeps navigation inside 2026-2032", () => {
    const before = clampMonthToRange(new Date(2025, 11, 1));
    const inside = clampMonthToRange(new Date(2028, 5, 1));
    const after = clampMonthToRange(new Date(2033, 0, 1));

    expect(formatDateKey(before)).toBe("2026-01-01");
    expect(formatDateKey(inside)).toBe("2028-06-01");
    expect(formatDateKey(after)).toBe("2032-12-01");
  });

  it("calculateMonthStats counts totals and completion percentages", () => {
    const records = [
      {
        date: "2026-09-01",
        completedHabitIds: ["water", "exercise"],
        note: "",
      },
      { date: "2026-09-02", completedHabitIds: ["water", "reading"], note: "" },
    ];

    const stats = calculateMonthStats(records, [
      { id: "water", name: "Drink 4L of water" },
      { id: "exercise", name: "Exercise 30 minutes" },
      { id: "reading", name: "Read 30 minutes" },
      { id: "study", name: "Study 2 hours" },
    ]);

    expect(stats.totalCompleted).toBe(4);
    expect(stats.totalPossible).toBe(8);
    expect(stats.completionRate).toBe(50);
    expect(stats.completedDays).toBe(2);
  });

  it("calculateHabitStreak measures consecutive completed days", () => {
    const records = [
      { date: "2026-09-01", completedHabitIds: ["water"] },
      { date: "2026-09-02", completedHabitIds: ["water"] },
      { date: "2026-09-03", completedHabitIds: [] },
      { date: "2026-09-04", completedHabitIds: ["water"] },
      { date: "2026-09-05", completedHabitIds: ["water"] },
    ];

    expect(calculateHabitStreak(records, "water")).toBe(2);
  });

  it("calculateMonthlyHabitMetrics returns month-scoped insights", () => {
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

    expect(metrics.overallCompletionRate).toBe(55.6);
    expect(metrics.totalCompletedHabitDays).toBe(10);
    expect(metrics.totalPossibleHabitDays).toBe(18);
    expect(metrics.bestStreak).toBe(3);
    expect(metrics.currentStreak).toBe(2);
    expect(metrics.mostConsistentHabit.id).toBe("water");
    expect(metrics.leastConsistentHabit.id).toBe("study");
    expect(metrics.dailyTrend).toHaveLength(6);
  });
});
