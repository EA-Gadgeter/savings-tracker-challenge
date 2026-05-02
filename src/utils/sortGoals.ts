import type { GoalSort, Goal } from "../types";

export const sortFunctionsObject: Record<GoalSort, (goals: Goal[]) => Goal[]> =
  {
    "recently-added": (goals) =>
      [...goals].toSorted(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ),
    deadline: (goals) =>
      [...goals].toSorted(
        (a, b) =>
          new Date(a.deadline ?? Infinity).getTime() -
          new Date(b.deadline ?? Infinity).getTime(),
      ),
    "progress-highest": (goals) =>
      [...goals].toSorted(
        (a, b) =>
          b.deposits.reduce((sum, deposit) => sum + deposit.amount, 0) /
            b.target -
          a.deposits.reduce((sum, deposit) => sum + deposit.amount, 0) /
            a.target,
      ),
    alphabetically: (goals) =>
      [...goals].toSorted((a, b) => a.name.localeCompare(b.name)),
    "progress-lowest": (goals) =>
      [...goals].toSorted(
        (a, b) =>
          a.deposits.reduce((sum, deposit) => sum + deposit.amount, 0) /
            a.target -
          b.deposits.reduce((sum, deposit) => sum + deposit.amount, 0) /
            b.target,
      ),
    "amount-saved": (goals) =>
      [...goals].toSorted(
        (a, b) =>
          b.deposits.reduce((sum, deposit) => sum + deposit.amount, 0) -
          a.deposits.reduce((sum, deposit) => sum + deposit.amount, 0),
      ),
  };
