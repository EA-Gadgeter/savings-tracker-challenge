import { Button } from "../../common/Button/Button";
import styles from "./GoalsEmptyState.module.css";

type GoalsEmptyStateProps = {
  onCreateGoal: () => void;
};

export function GoalsEmptyState({
  onCreateGoal,
}: GoalsEmptyStateProps): React.JSX.Element {
  return (
    <section className={styles.root} aria-labelledby="goals-empty-state-title">
      <div className={styles.iconWrapper} aria-hidden="true">
        <img
          className={styles.icon}
          src={`${import.meta.env.BASE_URL}assets/images/icon-target.svg`}
          alt=""
        />
      </div>

      <div className={styles.content}>
        <h2 id="goals-empty-state-title" className={styles.title}>
          No goals yet
        </h2>

        <p className={styles.description}>
          Start saving for something that matters. Create your first goal and
          track your progress.
        </p>
      </div>

      <div className={styles.action}>
        <Button
          type="button"
          variant="primary"
          onClick={onCreateGoal}
          icon={
            <img
              src={`${import.meta.env.BASE_URL}assets/images/icon-plus.svg`}
              alt=""
              aria-hidden="true"
            />
          }
        >
          Create your first goal
        </Button>
      </div>
    </section>
  );
}

export default GoalsEmptyState;
