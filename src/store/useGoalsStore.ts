import { create } from "zustand";
import type { Goal } from "../types";
import type { GoalsState } from "../types/store";
import mockData from "../mock/data.json";

export const useGoalsStore = create<GoalsState>()((set) => ({
  goals: mockData.goals as Goal[],
  activeFilter: "all",
  activeSort: "recently-added",

  addGoal: (_newGoal) => {
    set((_state) => ({}));
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
    set((_state) => ({}));
  },

  setSort: (_sort) => {
    set((_state) => ({}));
  },
}));
