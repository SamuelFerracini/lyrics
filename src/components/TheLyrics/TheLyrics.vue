<template>
  <TheLine
    v-for="(line, idx) in lines"
    :key="idx"
    :line="line"
    :lineIdx="idx"
  />
</template>
<script setup>
import TheLine from "./components/TheLine.vue";

defineProps({
  lines: Array,
});
</script>
