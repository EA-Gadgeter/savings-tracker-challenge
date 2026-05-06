import { Link } from "wouter";
import type { Goal } from "../../../types";
import type { GoalCardVariant } from "../GoalCard/GoalCard.types";
import GoalCard from "../GoalCard/GoalCard";
import styles from "./GoalsList.module.css";

interface GoalsListProps {
  goals: Goal[];
}

function getVariant(goal: Goal): GoalCardVariant {
  const savedAmount = goal.deposits.reduce((sum, d) => sum + d.amount, 0);
  const progressPercent = (savedAmount / goal.target) * 100;

  if (savedAmount >= goal.target) return "complete";
  if (goal.deposits.length === 0) return "not-started";
  if (progressPercent > 75) return "highlight";
  return "default";
}

function GoalsList({ goals }: GoalsListProps): React.JSX.Element {
  return (
    <ul className={styles.list}>
      {goals.map((goal) => (
        <li key={goal.id} data-variant={getVariant(goal)}>
          <Link href={`/goals/${goal.id}`} className={styles.cardLink}>
            <GoalCard goal={goal} variant={getVariant(goal)} />
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default GoalsList;
