<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Dungeon Master</h1>
    <div>
      <input
        id="user-input"
        type="text"
        placeholder="Your move..."
        v-model="input"
        @keyup.enter="sendInput"
        class="border border-gray-300 px-2 py-1 w-full dark:text-slate-900 dark:border-gray-900 rounded"
      />
    </div>
    <div v-if="loading" class="mt-4">Generating response...</div>
    <div v-for="step in story.steps.slice().reverse()" :key="step.image" class="mt-4">
      <div class="mb-2"><p><b>&gt;&gt;</b> {{ step.prompt }}</p></div>
      <div class="grid grid-cols-2 gap-2">
        <div><p>{{ step.response }}</p></div>
        <div v-if="step.image"><img :src="step.image" alt="Generated image" class="mt-4 w-full" /></div>
      </div>
      <hr class="mb-3 mt-4"/>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { chatgpt, chatgpt_out, dalle } from '@/api';
import { useStoryStore } from "../stores/storyStore";

export default {
  setup() {
    const input = ref('');
    const loading = ref(false);
    const story = useStoryStore();

    async function sendInput() {
      if (!input.value) return;
      loading.value = true;

      const response = await chatgpt(`${input.value}`);
      const text = response.choices[0].message.content.trim();

      const itxtResponse = await chatgpt_out(`Summarize the following text in 980 characters so it can be used to generate a picture of the scene. ${text}`)
      const imgtxt = itxtResponse.choices[0].message.content.trim();
      const imageResponse = await dalle(imgtxt);

      story.addStep({
        prompt: input.value,
        response: text,
        image: imageResponse.data ? imageResponse.data[0].url : null,
      });

      input.value = '';
      loading.value = false;
    }

    return { input, sendInput, story, loading };
  },
};
</script>

<style scoped>
p {
  white-space: pre-line;
}
</style>
