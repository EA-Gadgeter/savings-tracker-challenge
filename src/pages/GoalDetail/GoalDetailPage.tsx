import { useEffect } from "react";
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
              src={`${import.meta.env.BASE_URL}assets/images/icon-chevron-left.svg`}
              alt=""
              aria-hidden="true"
              width={20}
              height={20}
            />
            Back
          </Link>

          <div className={styles.navActions}>
            <button className={styles.editBtn} onClick={editModal.open}>
              Edit goal
            </button>

            <button className={styles.deleteBtn} onClick={deleteModal.open}>
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

        {/* ── Two-column body: main content + deposit history sidebar ── */}
        <div className={styles.body}>
          <div className={styles.mainCol}>
            {/* ── Progress or Completed card ── */}
            {isComplete ? (
              <CompletedCard goal={goal} savedAmount={savedAmount} />
            ) : (
              <ProgressCard goal={goal} savedAmount={savedAmount} />
            )}

            {/* ── Add deposit form (hidden once goal is complete) ── */}
            {!isComplete && <AddDepositForm goalId={goal.id} />}
          </div>

          {/* ── Deposit history ── */}
          <aside className={styles.sidebar}>
            <DepositList deposits={goal.deposits} />
          </aside>
        </div>
      </div>
    </main>
  );
}

export default GoalDetailPage;
