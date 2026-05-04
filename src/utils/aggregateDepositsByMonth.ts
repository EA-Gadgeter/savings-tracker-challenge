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

  return (
    Array.from(monthMap.entries())
      // Sort ascending by key string — works correctly because of double digiting.
      // "2025-08" < "2025-09" < "2026-01" — localeCompare handles this safely.
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, total]) => {
        // Reconstruct a Date object just to generate the short month name.
        // new Date(year, monthIndex, 1) — month is 0-indexed here again.
        const [year, month] = key.split("-").map(Number);
        const date = new Date(year, month - 1, 1);

        return {
          key,
          total,
          // toLocaleDateString with { month: "short" } gives "Jan", "Feb", etc.
          label: date.toLocaleDateString("en-US", { month: "short" }),
        };
      })
  );
}
