import { useEffect } from "react";
import { useGoalsStore } from "../../../store/useGoalsStore";
import { Button } from "../../common/Button/Button";
import styles from "./DeleteGoalModal.module.css";

interface DeleteGoalModalProps {
  goalId: string;
  goalName: string;
  onClose: () => void;
}

export function DeleteGoalModal({
  goalId,
  goalName,
  onClose,
}: DeleteGoalModalProps): React.JSX.Element {
  const deleteGoal = useGoalsStore((state) => state.deleteGoal);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const onDeleteGoal = () => {
    deleteGoal(goalId);
    onClose();
  };

  return (
    <>
      <div className={styles.backdrop} onClick={onClose} aria-hidden="true" />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-goal-title"
        aria-describedby="delete-goal-description"
        className={styles.panel}
      >
        {/* ── Header ── */}
        <div className={styles.header}>
          <h2 id="delete-goal-title" className={styles.title}>
            Delete {goalName}?
          </h2>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close modal"
          >
            <img
              src="/assets/images/icon-cross.svg"
              alt=""
              aria-hidden="true"
            />
          </button>
        </div>

        {/* ── Warning message ── */}
        <p id="delete-goal-description" className={styles.description}>
          This will permanently delete this goal and all its deposit history.
          This cannot be undone.
        </p>

        <hr className={styles.divider} />

        {/* ── Footer ── */}
        <div className={styles.footer}>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>

          <Button variant="destructive" onClick={onDeleteGoal}>
            Delete goal
          </Button>
        </div>
      </div>
    </>
  );
}
