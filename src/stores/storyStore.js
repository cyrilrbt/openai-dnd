import { defineStore } from "pinia";

export const useStoryStore = defineStore({
  id: "story",
  state: () => ({
    steps: [],
  }),
  actions: {
    addStep(step) {
      this.steps.unshift(step);
    },
    clear() {
      this.steps = [];
    },
  },
});
