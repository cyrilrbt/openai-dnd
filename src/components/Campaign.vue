<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Campaign</h1>
    <div v-if="campaign">
      <p>{{ campaign.description }}</p>
      <button class="bg-red-500 text-white px-4 py-2 mt-4 rounded" @click="startNewCampaign">
        Start New Campaign
      </button>
    </div>
    <div v-else>
      <p>No active campaign. Click the button below to start a new one.</p>
      <button class="bg-blue-500 text-white px-4 py-2 mt-4 rounded" @click="startNewCampaign">
        Start New Campaign
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useCampaignStore } from '@/stores/campaignStore';
import { story } from '@/api';

export default {
  setup() {
    const campaignStore = useCampaignStore();
    const campaign = ref(campaignStore.campaign);

    async function generateCampaign() {
      const prompt = `Generate an original campaign and start the game.
        Keep it concise and don't give spoilers, but give enough information to know how to get started.
        Dont ask me to roll dice, do it yourself quietly.`;
      const response = await story(prompt);
      console.log("Got a campaign", response);
      const campaignText = response.choices[0].message.content.trim();

      return {
        name: 'Generated Campaign',
        description: campaignText,
      };
    }

    async function generateCharacter() {
      const prompt = `Act as a dungeons and dragons dungeon master from now on.
        Do not start a campaign yet.
        Create a new random character for me.
        Use the character stats and a dice roll to make decisions.
        Do not include any explanations, only provide a  RFC8259 compliant JSON response following this format without deviation.
        {
          "name": "Character's name",
          "race": "Character's race",
          "class": "Character's class",
          "level": "Character's level",
          "hp": "Character's hit points",
          "background": "Single paragraph about the Character's background",
          "skills": [
            "skill 1",
            "skill 2",
            "etc"
          ],
          "abilities": {
            "attack 1": "description of the attack",
            "etc": "etc"
          },
          "stats": {
            "strength": "Character's strength",
            "dexterity": "Character's dexterity",
            "constitution": "Character's constitution",
            "intelligence": "Character's intelligence",
            "wisdom": "Character's wisdom",
            "charisma": "Character's charisma",
          },
          "inventory": [
            "item 1",
            "item 2",
            "etc"
          ]
        }
        `;
      const response = await story(prompt);
      console.log("Got a character", response);
      const characterText = response.choices[0].message.content.trim();

      console.log(characterText);
      // let txt = characterText.match(/(```)/) ? characterText.split("```")[1].replace("json", "") : characterText.split("\n\n")[0];
      const data = JSON.parse(characterText);
      // if (!data.stats) {
      //   data.stats = {
      //     strength: data.strength,
      //     dexterity: data.dexterity,
      //     constitution: data.constitution,
      //     intelligence: data.intelligence,
      //     wisdom: data.wisdom,
      //     charisma: data.charisma,
      //   }
      // }
      // console.log(data);

      return data;
    }

    async function startNewCampaign() {
      const newCharacter = await generateCharacter();
      campaignStore.setCharacter(newCharacter);

      const newCampaign = await generateCampaign();
      campaignStore.setCampaign(newCampaign);
      campaign.value = newCampaign;
    }

    return { campaign, startNewCampaign };
  },
};
</script>

<style scoped>
p {
  white-space: pre-line;
}
</style>
