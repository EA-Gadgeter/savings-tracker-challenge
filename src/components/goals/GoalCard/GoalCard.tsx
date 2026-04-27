import type { Goal } from "../../../types";
import type { GoalCardVariant } from "./GoalCard.types";
import { formatCurrency, formatDeadline } from "../../../utils/formatters";
import styles from "./GoalCard.module.css";

interface GoalCardProps {
  goal: Goal;
  variant?: GoalCardVariant;
}

const percentVariantClass: Record<GoalCardVariant, string> = {
  default: styles.percentDefault,
  highlight: styles.percentHighlight,
  complete: styles.percentComplete,
  "not-started": styles.percentNotStarted,
};

const fillVariantClass: Record<GoalCardVariant, string> = {
  default: styles.fillDefault,
  highlight: styles.fillHighlight,
  complete: styles.fillComplete,
  "not-started": styles.fillNotStarted,
};

const trackVariantClass: Record<GoalCardVariant, string> = {
  default: styles.trackDefault,
  highlight: styles.trackHighlight,
  complete: styles.trackDefault,
  "not-started": styles.trackDefault,
};

const metaVariantClass: Record<GoalCardVariant, string> = {
  default: styles.metaDefault,
  highlight: styles.metaHighlight,
  complete: styles.metaDefault,
  "not-started": styles.metaDefault,
};

const cardBgClass: Record<GoalCardVariant, string> = {
  default: styles.withGrid,
  highlight: styles.highlight,
  complete: styles.withGrid,
  "not-started": styles.withGrid,
};

function GoalCard({
  goal,
  variant = "default",
}: GoalCardProps): React.JSX.Element {
  const savedAmount = goal.deposits.reduce((sum, d) => sum + d.amount, 0);
  const progressPercent = Math.min(
    Math.round((savedAmount / goal.target) * 100),
    100,
  );

  const cardClassName = [styles.card, cardBgClass[variant]].join(" ");

  return (
    <article className={cardClassName}>
      <header className={styles.header}>
        <h3 className={styles.name}>{goal.name}</h3>

        {variant === "complete" && (
          <span className={styles.badge} aria-label="Goal complete">
            COMPLETE
          </span>
        )}
      </header>

      <p
        className={`${styles.percent} ${percentVariantClass[variant]}`}
        aria-label={`${progressPercent}% saved`}
      >
        {progressPercent}%
      </p>

      <div
        className={`${styles.progressTrack} ${trackVariantClass[variant]}`}
        role="progressbar"
        aria-valuenow={progressPercent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Savings progress: ${progressPercent}%`}
      >
        <div
          className={`${styles.progressFill} ${fillVariantClass[variant]}`}
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <p className={`${styles.meta} ${metaVariantClass[variant]}`}>
        <span>
          {formatCurrency(savedAmount)} of {formatCurrency(goal.target)}
        </span>
        <span className={styles.separator} aria-hidden="true">
          ·
        </span>
        <span>{formatDeadline(goal.deadline)}</span>
      </p>
    </article>
  );
}

export default GoalCard;
