import { create } from "zustand";
import type { Goal } from "../types";
import type { GoalsState } from "../types/store";
import mockData from "../mock/data.json";

export const useGoalsStore = create<GoalsState>()((set) => ({
  goals: mockData.goals as Goal[],
  activeFilter: "all",
  activeSort: "recently-added",

  addGoal: (_newGoal) => {
    set((_state) => {
      const latestGoal = _state.goals.at(-1);
      const latestIdNumber = parseInt(latestGoal?.id.split("-").pop() || "0");

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
    set((_state) => ({}));
  },

  deleteGoal: (_id) => {
    set((_state) => ({}));
  },

  addDeposit: (_goalId, _newDeposit) => {
    set((_state) => ({}));
  },

  setFilter: (_filter) => {
    set(() => ({ activeFilter: _filter }));
  },

  setSort: (_sort) => {
    set(() => ({ activeSort: _sort }));
  },
}));
