import Header from "../../components/common/Header/Header";
import SummaryCard from "../../components/dashboard/SummaryCard/SummaryCard";
import GoalsEmptyState from "../../components/goals/GoalsEmptyState/GoalsEmptyState";
import { GoalsToolbar } from "../../components/goals/GoalsToolbar/GoalsToolbar";
import { useGoalsStore } from "../../store/useGoalsStore";
import styles from "./HomePage.module.css";

function HomePage(): React.JSX.Element {
  const goals = useGoalsStore((state) => state.goals);

  const totalGoals = goals.length;
  const goalsCompleted = goals.filter((goal) => {
    const totalDeposit = goal.deposits.reduce(
      (sum, deposit) => sum + deposit.amount,
      0,
    );
    return totalDeposit >= goal.target;
  });

  const handleCreateGoal = (): void => {
    // TODO: wire create goal flow
  };

  const handleFilterClick = (): void => {
    // TODO: wire filters modal/dropdown
  };

  const handleSortClick = (): void => {
    // TODO: wire sorting modal/dropdown
  };

  return (
    <main className={styles.page}>
      <Header onCreateGoal={handleCreateGoal} />

      <div className={styles.content}>
        <section
          className={styles.summaryGrid}
          aria-label="Savings dashboard summary"
        >
          <SummaryCard
            title="Total savings"
            value="$0.00"
            cardVariant="highlight"
          />

          <SummaryCard
            title="Active goals"
            value={totalGoals.toString()}
            valueVariant="highlight"
            showPattern
          />

          <SummaryCard
            title="Goals completed"
            value={goalsCompleted.length.toString()}
            valueVariant="complete"
            showPattern
          />

          <SummaryCard
            title="Monthly deposits"
            value="No deposits yet"
            isEmpty
          />
        </section>

        <section
          className={styles.goalsSection}
          aria-labelledby="goals-heading"
        >
          <div className={styles.goalsHeader}>
            <h1 id="goals-heading" className={styles.title}>
              Your goals
            </h1>

            <GoalsToolbar
              onFilterClick={handleFilterClick}
              onSortClick={handleSortClick}
            />
          </div>

          <GoalsEmptyState onCreateGoal={handleCreateGoal} />
        </section>
      </div>
    </main>
  );
}

export default HomePage;
