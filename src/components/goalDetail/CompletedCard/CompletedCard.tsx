import type { Goal } from "../../../types";
import { formatCurrency, formatDate } from "../../../utils/formatters";
import styles from "./CompletedCard.module.css";

interface CompletedCardProps {
  goal: Goal;
  savedAmount: number;
}

export function CompletedCard({
  goal,
  savedAmount,
}: CompletedCardProps): React.JSX.Element {
  const depositCount = goal.deposits.length;

  const description = [
    `You saved ${formatCurrency(savedAmount)} across ${depositCount} deposit${depositCount === 1 ? "" : "s"}.`,
    goal.deadline
      ? ` Finished before your ${formatDate(goal.deadline)} deadline.`
      : "",
  ].join("");

  return (
    <div className={styles.card}>
      <div className={styles.checkmark} aria-hidden="true">
        <img
          src="/assets/images/icon-checkmark.svg"
          alt=""
          width={20}
          height={20}
        />
      </div>

      <p className={styles.percent}>100%</p>
      <h2 className={styles.title}>Goal Complete</h2>
      <p className={styles.description}>{description}</p>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <p className={styles.statValue}>{depositCount}</p>
          <p className={styles.statLabel}>DEPOSITS</p>
        </div>
        <div className={styles.statSeparator} aria-hidden="true" />
        <div className={styles.stat}>
          <p className={styles.statValue}>{formatCurrency(savedAmount)}</p>
          <p className={styles.statLabel}>TOTAL SAVED</p>
        </div>
      </div>
    </div>
  );
}
