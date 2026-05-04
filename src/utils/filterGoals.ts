import type { Goal, GoalFilter } from "../types";

export const filterFunctionsObject: Record<
  GoalFilter,
  (goals: Goal[]) => Goal[]
> = {
  all: (goals) => goals,
  completed: (goals) =>
    goals.filter((goal) => {
      const totalDeposit = goal.deposits.reduce(
        (sum, deposit) => sum + deposit.amount,
        0,
      );
      return totalDeposit >= goal.target;
    }),
  "in-progress": (goals) =>
    goals.filter((goal) => {
      const totalDeposit = goal.deposits.reduce(
        (sum, deposit) => sum + deposit.amount,
        0,
      );
      return totalDeposit > 0 && totalDeposit < goal.target;
    }),
  "not-started": (goals) => goals.filter((goal) => goal.deposits.length === 0),
};
