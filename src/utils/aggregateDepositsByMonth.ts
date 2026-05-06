import type { Goal } from "../types";

export interface MonthlyData {
  key: string; // "2025-08" — used for sorting and as React key
  label: string; // "Aug" — displayed below the bar
  total: number; // sum of all deposits across all goals for this month
}

export function aggregateDepositsByMonth(goals: Goal[]): MonthlyData[] {
  // A Map is perfect here: key = "YYYY-MM", value = running total for that month.
  // We use a Map instead of a plain object because insertion order is guaranteed
  const monthMap = new Map<string, number>();

  for (const goal of goals) {
    for (const deposit of goal.deposits) {
      const date = new Date(deposit.createdAt);

      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      // Double digiting the month is critical for sorting.
      // Without it: "2025-8" > "2025-12" alphabetically (wrong).
      // With it:    "2025-08" < "2025-12" (correct).
      const key = `${year}-${String(month).padStart(2, "0")}`;

      // If the key already exists, add to it. If not, start from 0.
      monthMap.set(key, (monthMap.get(key) ?? 0) + deposit.amount);
    }
  }

  if (monthMap.size === 0) return [];

  // Find the earliest and latest month that has deposits.
  // localeCompare works correctly here because keys are "YYYY-MM" (zero-padded).
  const sortedKeys = Array.from(monthMap.keys()).sort((a, b) =>
    a.localeCompare(b),
  );
  const lastKey = sortedKeys[sortedKeys.length - 1];

  // Always display a fixed 12-month window ending at the most recent deposit month.
  // This means months before the first deposit naturally appear as $0 bars on the
  // left side of the chart, giving context about when saving activity started.
  const result: MonthlyData[] = [];
  const [lastYear, lastMonth] = lastKey.split("-").map(Number);
  let year: number = lastYear;

  // Subtract 11 (not 12) because the window is inclusive on both ends.
  // lastMonth itself counts as month 1 of the 12, so we only step back 11 more.
  // Example with given test data: last deposit = March 2026 (month 3)
  //          3 - 11 = -8  → needs calendar adjustment (see below)
  //          adjusted start = April 2025  → April … March = 12 months ✓
  let month: number = lastMonth - 11;

  // A result of 0 or below means we've crossed a year boundary.
  // There is no month 0 or -8 in the calendar, so we wrap around:
  // add 12 to land on the correct month and subtract 1 from the year.
  // Example: month = -8  →  -8 + 12 = 4 (April),  year = 2026 - 1 = 2025
  if (month <= 0) {
    month += 12;
    year -= 1;
  }

  while (year < lastYear || (year === lastYear && month <= lastMonth)) {
    const key = `${year}-${String(month).padStart(2, "0")}`;
    const date = new Date(year, month - 1, 1); // month - 1 because Date is 0-indexed

    result.push({
      key,
      total: monthMap.get(key) ?? 0,
      label: date.toLocaleDateString("en-US", { month: "short" }),
    });

    // Advance to next month, rolling over to January when we pass December.
    month++;
    if (month > 12) {
      month = 1;
      year++;
    }
  }

  return result;
}
