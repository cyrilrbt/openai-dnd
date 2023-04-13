import { defineStore } from "pinia";

export const useCampaignStore = defineStore({
  id: "campaign",
  state: () => ({
    campaign: null,
    character: null,
  }),
  actions: {
    setCampaign(campaign) {
      this.campaign = campaign;
    },
    setCharacter(character) {
      this.character = character;
    },
  },
});
