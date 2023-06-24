<template>
  <TheLine v-for="(line, idx) in lines" :key="idx" :line="line" />
</template>
<script setup>
import TheLine from "./components/TheLine.vue";

defineProps({
  lines: Array,
});
</script>
