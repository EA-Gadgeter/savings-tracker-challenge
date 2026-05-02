import { useMemo } from "react";
import Header from "../../components/common/Header/Header";
import SummaryCard from "../../components/dashboard/SummaryCard/SummaryCard";
import GoalsEmptyState from "../../components/goals/GoalsEmptyState/GoalsEmptyState";
import GoalsList from "../../components/goals/GoalsList/GoalsList";
import { GoalsToolbar } from "../../components/goals/GoalsToolbar/GoalsToolbar";
import { useGoalsStore } from "../../store/useGoalsStore";
import { formatCurrency } from "../../utils/formatters";
import { sortFunctionsObject } from "../../utils/sortGoals";
import styles from "./HomePage.module.css";

function HomePage(): React.JSX.Element {
  const goals = useGoalsStore((state) => state.goals);
  const activeSort = useGoalsStore((state) => state.activeSort);

  const sortedGoals = useMemo(
    () => sortFunctionsObject[activeSort](goals),
    [goals, activeSort],
  );

  const totalGoals = goals.length;

  const goalsCompleted = useMemo(
    () =>
      goals.filter((goal) => {
        const totalDeposit = goal.deposits.reduce(
          (sum, deposit) => sum + deposit.amount,
          0,
        );
        return totalDeposit >= goal.target;
      }),
    [goals],
  );

  const totalSavings = useMemo(
    () =>
      goals.reduce((sum, goal) => {
        const totalDeposit = goal.deposits.reduce(
          (goalSum, deposit) => goalSum + deposit.amount,
          0,
        );
        return sum + totalDeposit;
      }, 0),
    [goals],
  );

  return (
    <main className={styles.page}>
      <Header />

      <div className={styles.content}>
        <section
          className={styles.summaryGrid}
          aria-label="Savings dashboard summary"
        >
          <SummaryCard
            title="Total savings"
            value={formatCurrency(totalSavings)}
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

            <GoalsToolbar />
          </div>

          {sortedGoals.length === 0 ? (
            <GoalsEmptyState />
          ) : (
            <GoalsList goals={sortedGoals} />
          )}
        </section>
      </div>
    </main>
  );
}

export default HomePage;
