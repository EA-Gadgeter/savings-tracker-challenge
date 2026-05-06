import { useMemo } from "react";
import type { Goal } from "../../../types";
import { aggregateDepositsByMonth } from "../../../utils/aggregateDepositsByMonth";
import { formatCurrencyCompact } from "../../../utils/formatters";
import styles from "./MonthlyDepositsChart.module.css";

interface MonthlyDepositsChartProps {
  goals: Goal[];
}

export function MonthlyDepositsChart({
  goals,
}: MonthlyDepositsChartProps): React.JSX.Element {
  const monthlyData = useMemo(() => aggregateDepositsByMonth(goals), [goals]);

  // Find the largest monthly total — this becomes the 100% height reference.
  // We use reduce instead of Math.max(...array) to avoid call-stack issues
  // with very large arrays, and fall back to 1 to prevent division by zero
  // when there's no data.
  const maxValue = useMemo(
    () => monthlyData.reduce((max, d) => Math.max(max, d.total), 1),
    [monthlyData],
  );

  if (monthlyData.length === 0) {
    return (
      <div className={styles.card}>
        <h2 className={styles.title}>Monthly deposits</h2>
        <p className={styles.empty}>No deposits yet</p>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Monthly deposits</h2>

      {/*
        role="img" treats the entire chart as a single image for screen readers.
        aria-label gives that image a meaningful text description.
        This is simpler than trying to make individual bars accessible,
        because the bars alone carry no semantic meaning without context.
      */}
      <div
        className={styles.chart}
        role="img"
        aria-label={`Monthly deposits bar chart. Most active month: ${formatCurrencyCompact(maxValue)}`}
      >
        {/*
          BARS SECTION
          ─────────────────────────────────────────────────────────────────
          Because the container has a fixed height (defined in CSS) and each
          bar only occupies its own percentage of that height, the result is:
          bars of different heights all sitting on the same baseline — exactly
          like a real bar chart.

          aria-hidden="true" hides this from screen readers since role="img"
          on the parent already handles the accessible description.
        */}
        <div className={styles.scrollWrapper}>
          <div className={styles.barsSection} aria-hidden="true">
            {monthlyData.map(({ key, total }) => {
              // Core math: what fraction of the tallest bar is this bar?
              // Multiply by 100 to convert to a CSS percentage.
              //
              // Example: total = $400, maxValue = $1,950
              // heightPercent = (400 / 1950) * 100 = 20.5%
              //
              // The bar div will be 20.5% of the container's fixed height.
              const heightPercent = (total / maxValue) * 100;

              return (
                <div
                  key={key}
                  className={`${styles.bar}${total === 0 ? ` ${styles.emptyBar}` : ""}`}
                  style={{ height: `${heightPercent}%` }}
                />
              );
            })}
          </div>

          <div className={styles.labelsSection} aria-hidden="true">
            {monthlyData.map(({ key, label, total }) => (
              <div key={key} className={styles.labelGroup}>
                <span className={styles.amount}>
                  {formatCurrencyCompact(total)}
                </span>
                <span className={styles.month}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
