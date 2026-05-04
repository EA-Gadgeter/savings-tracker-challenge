import { useMemo } from "react";
import Header from "../../components/common/Header/Header";
import SummaryCard from "../../components/dashboard/SummaryCard/SummaryCard";
import { MonthlyDepositsChart } from "../../components/dashboard/MonthlyDepositsChart/MonthlyDepositsChart";
import GoalsEmptyState from "../../components/goals/GoalsEmptyState/GoalsEmptyState";
import GoalsList from "../../components/goals/GoalsList/GoalsList";
import { GoalsToolbar } from "../../components/goals/GoalsToolbar/GoalsToolbar";
import { useGoalsStore } from "../../store/useGoalsStore";
import { formatCurrency } from "../../utils/formatters";
import { sortFunctionsObject } from "../../utils/sortGoals";
import { filterFunctionsObject } from "../../utils/filterGoals";
import styles from "./HomePage.module.css";

function HomePage(): React.JSX.Element {
  const goals = useGoalsStore((state) => state.goals);
  const activeSort = useGoalsStore((state) => state.activeSort);
  const activeFilter = useGoalsStore((state) => state.activeFilter);

  const activeGoals = useMemo(
    () =>
      goals.filter((goal) => {
        const totalDeposit = goal.deposits.reduce(
          (sum, deposit) => sum + deposit.amount,
          0,
        );
        return totalDeposit < goal.target;
      }),
    [goals],
  );
  const goalsCompleted = useMemo(
    () => filterFunctionsObject["completed"](goals),
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

  const sortedGoals = useMemo(
    () => sortFunctionsObject[activeSort](goals),
    [goals, activeSort],
  );
  const filteredGoals = useMemo(
    () => filterFunctionsObject[activeFilter](sortedGoals),
    [sortedGoals, activeFilter],
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
            value={activeGoals.length.toString()}
            valueVariant="highlight"
            showPattern
          />

          <SummaryCard
            title="Goals completed"
            value={goalsCompleted.length.toString()}
            valueVariant="complete"
            showPattern
          />

          <MonthlyDepositsChart goals={goals} />
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

          {filteredGoals.length === 0 ? (
            <GoalsEmptyState />
          ) : (
            <GoalsList goals={filteredGoals} />
          )}
        </section>
      </div>
    </main>
  );
}

export default HomePage;
