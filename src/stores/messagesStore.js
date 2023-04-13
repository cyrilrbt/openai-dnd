import { defineStore } from "pinia";

export const useMessagesStore = defineStore({
  id: "messages",
  state: () => ({
    messages: [],
  }),
  actions: {
    addMessage(message) {
      this.messages.push(message);
    },
    clear() {
      this.messages = [];
    },
  },
});
