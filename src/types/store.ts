import type { Goal, GoalUpdates, NewDeposit, NewGoal } from "./goal";
import type { GoalFilter, GoalSort } from "./filters";

export interface GoalsState {
  goals: Goal[];
  activeFilter: GoalFilter;
  activeSort: GoalSort;

  addGoal: (newGoal: NewGoal) => void;
  updateGoal: (id: string, updates: GoalUpdates) => void;
  deleteGoal: (id: string) => void;
  addDeposit: (goalId: string, newDeposit: NewDeposit) => void;
  setFilter: (filter: GoalFilter) => void;
  setSort: (sort: GoalSort) => void;
}
