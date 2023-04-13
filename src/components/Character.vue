<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Character</h1>
    <div v-if="campaignStore.character">
      <h2 class="text-xl font-bold mb-2">{{ campaignStore.character.name }}, Level {{ campaignStore.character.level }} {{ campaignStore.character.race }} {{ campaignStore.character.class }}</h2>
      <button class="bg-blue-500 text-white px-4 py-2 mb-4 font-semibold rounded text-sm" @click="updateCharacter()">Reload inventory</button>
      <div class="mb-4 grid grid-cols-2 gap-2">
        <div>
          <h3 class="text-lg font-semibold">Stats</h3>
          <ul>
            <li><b>Strength</b>: {{ campaignStore.character.stats.strength }}</li>
            <li><b>Dexterity</b>: {{ campaignStore.character.stats.dexterity }}</li>
            <li><b>Constitution</b>: {{ campaignStore.character.stats.constitution }}</li>
            <li><b>Intelligence</b>: {{ campaignStore.character.stats.intelligence }}</li>
            <li><b>Wisdom</b>: {{ campaignStore.character.stats.wisdom }}</li>
            <li><b>Charisma</b>: {{ campaignStore.character.stats.charisma }}</li>
          </ul>
        </div>
        <div>
          <h3 class="text-lg font-semibold">Inventory</h3>
          <ul><li v-for="item in campaignStore.character.inventory" :key="item">{{ item }}</li></ul>
        </div>
      </div>
      <div class="mb-4 grid grid-cols-2 gap-2">
        <div>
          <h3 class="text-lg font-semibold">Skills</h3>
          <ul><li v-for="item in campaignStore.character.skills" :key="item">{{ item }}</li></ul>
        </div>
        <div>
          <h3 class="text-lg font-semibold">Abilities</h3>
          <ul><li v-for="item, name in campaignStore.character.abilities" :key="name"><b>{{ name }}</b>: {{ item }}</li></ul>
        </div>
      </div>
      <div>{{ campaignStore.character.background }}</div>
    </div>
    <div v-else>
      <p>No active character. Start a new campaign to generate a character.</p>
    </div>
  </div>
</template>

<script>
import { useCampaignStore } from '@/stores/campaignStore';
import { story } from '@/api';

export default {
  setup() {
    const campaignStore = useCampaignStore();

    async function updateCharacter() {
      const prompt = `Update my inventory and hit points.
        Only provide a  RFC8259 compliant JSON response following this format without any deviation, explanation, notes, or introduction.
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
      console.log("Got a character update", response);
      const characterText = response.choices[0].message.content.trim();

      console.log(characterText);
      const data = JSON.parse(characterText.split("\n\n")[0]);

      campaignStore.setCharacter(data);
    }

    return { campaignStore, updateCharacter };
  },
};
</script>

<style scoped>
</style>
