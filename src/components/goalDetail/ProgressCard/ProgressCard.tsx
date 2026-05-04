import type { Goal } from "../../../types";
import { formatCurrency } from "../../../utils/formatters";
import styles from "./ProgressCard.module.css";

interface ProgressCardProps {
  goal: Goal;
  savedAmount: number;
}

export function ProgressCard({
  goal,
  savedAmount,
}: ProgressCardProps): React.JSX.Element {
  const progressPercent = Math.min(
    Math.round((savedAmount / goal.target) * 100),
    100,
  );
  const remaining = goal.target - savedAmount;

  return (
    <div className={styles.card}>
      <div className={styles.topRow}>
        <p
          className={styles.percent}
          aria-label={`${progressPercent}% saved`}
        >
          {progressPercent}%
        </p>
        <div className={styles.remainingGroup}>
          <span className={styles.remainingAmount}>
            {formatCurrency(remaining)}
          </span>
          <span className={styles.remainingLabel}>remaining</span>
        </div>
      </div>

      <div
        className={styles.progressTrack}
        role="progressbar"
        aria-valuenow={progressPercent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Savings progress: ${progressPercent}%`}
      >
        <div
          className={styles.progressFill}
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className={styles.bottomRow}>
        <div>
          <p className={styles.amount}>{formatCurrency(savedAmount)}</p>
          <p className={styles.amountLabel}>Saved so far</p>
        </div>
        <div className={styles.targetGroup}>
          <p className={styles.amount}>of {formatCurrency(goal.target)}</p>
          <p className={styles.amountLabel}>Target</p>
        </div>
      </div>
    </div>
  );
}
