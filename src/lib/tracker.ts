export type HabitDefinition = {
  id: string;
  name: string;
  description?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type TrackerRecord = {
  date: string;
  completedHabitIds?: string[];
  note?: string;
  createdAt?: string;
  updatedAt?: string;
};

export function formatDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function formatMonthKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}

export function clampMonthToRange(date: Date): Date {
  const min = new Date(2026, 0, 1);
  const maxMonth = new Date(2032, 11, 1);

  const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);

  if (monthStart < min) return new Date(2026, 0, 1);
  if (monthStart > maxMonth) return new Date(2032, 11, 1);

  return monthStart;
}

export function getMonthDates(year: number, monthIndex: number): string[] {
  const lastDay = new Date(year, monthIndex + 1, 0).getDate();

  return Array.from({ length: lastDay }, (_, index) =>
    formatDateKey(new Date(year, monthIndex, index + 1))
  );
}

export function calculateMonthStats(
  records: TrackerRecord[],
  habits: HabitDefinition[] = []
) {
  const activeHabits = habits.filter(habit => habit.isActive !== false);
  const taskIds = activeHabits.map(habit => habit.id);
  const totalPossible = records.length * taskIds.length || 0;

  let totalCompleted = 0;
  let completedDays = 0;

  for (const record of records) {
    let dayCompleted = 0;

    for (const taskId of taskIds) {
      if (record.completedHabitIds?.includes(taskId)) {
        totalCompleted += 1;
        dayCompleted += 1;
      }
    }

    if (dayCompleted > 0) {
      completedDays += 1;
    }
  }

  const completionRate =
    totalPossible > 0 ? Number(((totalCompleted / totalPossible) * 100).toFixed(1)) : 0;

  return {
    totalCompleted,
    totalPossible,
    completionRate,
    completedDays,
  };
}

export function calculateHabitStreak(
  records: TrackerRecord[],
  habitId: string
): number {
  let streak = 0;

  const sorted = [...records].sort((a, b) => b.date.localeCompare(a.date));

  for (const record of sorted) {
    if (!record.completedHabitIds?.includes(habitId)) {
      break;
    }
    streak += 1;
  }

  return streak;
}

export function calculateMonthlyHabitMetrics(
  records: TrackerRecord[],
  habits: HabitDefinition[] = []
) {
  const activeHabits = habits.filter(habit => habit.isActive !== false);
  const totalPossibleHabitDays = records.length * activeHabits.length;

  const totalCompletedHabitDays = records.reduce((sum, record) => {
    return sum + (record.completedHabitIds?.length ?? 0);
  }, 0);

  const overallCompletionRate =
    totalPossibleHabitDays > 0
      ? Number(((totalCompletedHabitDays / totalPossibleHabitDays) * 100).toFixed(1))
      : 0;

  const habitSummaries = activeHabits.map(habit => {
    const completedDays = records.filter(record => record.completedHabitIds?.includes(habit.id)).length;
    const totalPossible = Math.max(records.length, 0);
    const completionRate = totalPossible > 0 ? Number(((completedDays / totalPossible) * 100).toFixed(1)) : 0;

    return {
      ...habit,
      completedDays,
      totalPossible,
      completionRate,
      streak: calculateHabitStreak(records, habit.id),
    };
  });

  const sortedByRate = [...habitSummaries].sort((a, b) => b.completionRate - a.completionRate);
  const mostConsistentHabit = sortedByRate[0] ?? null;
  const leastConsistentHabit = [...habitSummaries].sort((a, b) => a.completionRate - b.completionRate)[0] ?? null;

  const datesInOrder = [...records].sort((a, b) => a.date.localeCompare(b.date));
  const dailyTrend = datesInOrder.map(record => {
    const total = activeHabits.length || 1;
    const completed = record.completedHabitIds?.length ?? 0;
    return {
      date: record.date,
      value: Number(((completed / total) * 100).toFixed(1)),
    };
  });

  const dailyCompletionStatus = datesInOrder.map(record => {
    let done = 0;
    for (const habit of activeHabits) {
      if (record.completedHabitIds?.includes(habit.id)) done += 1;
    }
    return done > 0 ? 1 : 0;
  });

  let bestStreak = 0;
  let currentRun = 0;
  for (const status of dailyCompletionStatus) {
    if (status > 0) {
      currentRun += 1;
      if (currentRun > bestStreak) bestStreak = currentRun;
    } else {
      currentRun = 0;
    }
  }

  let currentStreak = 0;
  for (let index = dailyCompletionStatus.length - 1; index >= 0; index -= 1) {
    if (dailyCompletionStatus[index] > 0) {
      currentStreak += 1;
    } else {
      break;
    }
  }

  return {
    overallCompletionRate,
    totalCompletedHabitDays,
    totalPossibleHabitDays,
    bestStreak,
    currentStreak,
    mostConsistentHabit,
    leastConsistentHabit,
    dailyTrend,
    habitSummary: habitSummaries,
  };
}
