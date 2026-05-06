import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Goal, Deposit } from "../types";
import type { GoalsState } from "../types/store";
import mockData from "../mock/data.json";

export const useGoalsStore = create<GoalsState>()(
  persist(
    (set) => ({
      goals: mockData.goals as Goal[],
      activeFilter: "all",
      activeSort: "recently-added",

      addGoal: (_newGoal) => {
        set((_state) => {
          const latestGoal = _state.goals.at(-1);
          const latestIdNumber = parseInt(
            latestGoal?.id.split("-").pop() || "0",
          );

          const newGoalData: Goal = {
            id: `goal-${latestIdNumber + 1}`,
            createdAt: new Date().toISOString(),
            deposits: [],
            ..._newGoal,
          };

          return { goals: [..._state.goals, newGoalData] };
        });
      },

      updateGoal: (_id, _updates) => {
        set((_state) => {
          const goalIndex = _state.goals.findIndex((goal) => goal.id === _id);
          if (goalIndex === -1) return _state; // Goal not found, no update

          const updatedGoal = { ..._state.goals[goalIndex], ..._updates };
          const updatedGoals = [..._state.goals];
          updatedGoals[goalIndex] = updatedGoal;

          return { goals: updatedGoals };
        });
      },

      deleteGoal: (_id) => {
        set((_state) => {
          const updatedGoals = _state.goals.filter((goal) => goal.id !== _id);
          return { goals: updatedGoals };
        });
      },

      addDeposit: (goalId, newDeposit) => {
        set((state) => {
          const goals = state.goals.map((goal) => {
            if (goal.id !== goalId) return goal;
            const deposit: Deposit = {
              // Use goal id + timestamp for a unique deposit id
              id: `dep-${goalId}-${Date.now()}`,
              amount: newDeposit.amount,
              note: newDeposit.note,
              createdAt: new Date().toISOString(),
            };
            // Prepend so the newest deposit shows first in history
            return { ...goal, deposits: [deposit, ...goal.deposits] };
          });
          return { goals };
        });
      },

      setFilter: (_filter) => {
        set(() => ({ activeFilter: _filter }));
      },

      setSort: (_sort) => {
        set(() => ({ activeSort: _sort }));
      },
    }),
    {
      // Key used to store the data in localStorage.
      name: "savings-tracker",

      // Only persist goals and activeSort.
      // activeFilter and activeSort is intentionally excluded so it always resets to
      // their default
      partialize: (state) => ({
        goals: state.goals,
      }),
    },
  ),
);
