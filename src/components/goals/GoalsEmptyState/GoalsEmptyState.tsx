import { useModal } from "../../../hooks/useModal";
import { Button } from "../../common/Button/Button";
import { CreateGoalModal } from "../CreateGoalModal/CreateGoalModal";
import styles from "./GoalsEmptyState.module.css";

export function GoalsEmptyState(): React.JSX.Element {
  const createGoalModal = useModal();

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
          onClick={createGoalModal.toggle}
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

        {createGoalModal.isOpen && (
          <CreateGoalModal onClose={createGoalModal.toggle} />
        )}
      </div>
    </section>
  );
}

export default GoalsEmptyState;
