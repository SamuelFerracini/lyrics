<template>
  <div class="flex grid-2 mt-5 items-center">
    <TheWord
      v-for="(word, idx) in line.words"
      :key="idx"
      :word="word"
      :lineIdx="lineIdx"
    />
  </div>
</template>
<script setup>
import { Line } from "../../../services/transpiler/entities/line";
import TheWord from "./TheWord.vue";

defineProps({ line: Line, lineIdx: Number });
</script>
