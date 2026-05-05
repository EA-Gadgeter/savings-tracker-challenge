import { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "wouter";
import { useGoalsStore } from "../../store/useGoalsStore";
import { useModal } from "../../hooks/useModal";
import Header from "../../components/common/Header/Header";
import { CreateGoalModal } from "../../components/goals/CreateGoalModal/CreateGoalModal";
import { DeleteGoalModal } from "../../components/goals/DeleteGoalModal/DeleteGoalModal";
import { ProgressCard } from "../../components/goalDetail/ProgressCard/ProgressCard";
import { CompletedCard } from "../../components/goalDetail/CompletedCard/CompletedCard";
import { AddDepositForm } from "../../components/goalDetail/AddDepositForm/AddDepositForm";
import { DepositList } from "../../components/goalDetail/DepositList/DepositList";
import { formatDate, formatDeadline } from "../../utils/formatters";
import styles from "./GoalDetailPage.module.css";

function GoalDetailPage(): React.JSX.Element | null {
  const { id } = useParams<{ id: string }>();
  const [, navigate] = useLocation();

  const goal = useGoalsStore((state) => state.goals.find((g) => g.id === id));

  const editModal = useModal();
  const deleteModal = useModal();

  // Redirect to home if goal doesn't exist (deleted or invalid URL)
  useEffect(() => {
    if (!goal) navigate("/");
  }, [goal, navigate]);

  if (!goal) return null;

  const savedAmount = goal.deposits.reduce((sum, d) => sum + d.amount, 0);
  const isComplete = savedAmount >= goal.target;

  return (
    <main className={styles.page}>
      <Header />

      <div className={styles.content}>
        {/* ── Navigation ── */}
        <nav className={styles.nav} aria-label="Goal navigation">
          <Link href="/" className={styles.backLink}>
            <img
              src="/assets/images/icon-chevron-left.svg"
              alt=""
              aria-hidden="true"
              width={20}
              height={20}
            />
            Back
          </Link>

          <div className={styles.navActions}>
            <button className={styles.editBtn} onClick={editModal.toggle}>
              Edit goal
            </button>

            <button className={styles.deleteBtn} onClick={deleteModal.toggle}>
              Delete goal
            </button>
          </div>
        </nav>

        {editModal.isOpen && (
          <CreateGoalModal goalToEdit={goal} onClose={editModal.toggle} />
        )}

        {deleteModal.isOpen && (
          <DeleteGoalModal
            goalId={goal.id}
            goalName={goal.name}
            onClose={deleteModal.close}
          />
        )}

        {/* ── Goal header ── */}
        <div className={styles.goalHeader}>
          <h1 className={styles.goalName}>{goal.name}</h1>
          <p className={styles.goalMeta}>
            {formatDeadline(goal.deadline)}
            <span aria-hidden="true"> • </span>
            Created {formatDate(goal.createdAt)}
          </p>
        </div>

        {/* ── Progress or Completed card ── */}
        {isComplete ? (
          <CompletedCard goal={goal} savedAmount={savedAmount} />
        ) : (
          <ProgressCard goal={goal} savedAmount={savedAmount} />
        )}

        {/* ── Add deposit form (hidden once goal is complete) ── */}
        {!isComplete && <AddDepositForm goalId={goal.id} />}

        {/* ── Deposit history ── */}
        <DepositList deposits={goal.deposits} />
      </div>
    </main>
  );
}

export default GoalDetailPage;
