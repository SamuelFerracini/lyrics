<template>
  <div class="flex gap-2 mt-5 items-center">
    <TheWord
      v-for="(word, idx) in line.words.split(' ')"
      :key="idx"
      :word="word"
    />
  </div>
</template>
<script setup>
import TheWord from "./TheWord.vue";

defineProps({ line: Object });
</script>
