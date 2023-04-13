<template>
  <div id="app" class="min-h-screen dark:bg-slate-800 dark:text-white">
    <div class="container mx-auto py-8 px-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="row-span-2 col-span-2">
          <DungeonMaster  />
        </div>
        <div>
          <Campaign />
          <Character />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Campaign from '@/components/Campaign.vue';
import Character from '@/components/Character.vue';
import DungeonMaster from '@/components/DungeonMaster.vue';

export default {
  components: {
    Campaign,
    Character,
    DungeonMaster,
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* color: #2c3e50; */
}
</style>
