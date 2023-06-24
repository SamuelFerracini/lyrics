<template>
  <span v-if="!isEditable" class="text-4xl">
    {{ word }}
  </span>
  <div v-else>
    <input
      ref="input"
      class="text-black inline text-center rounded py-2 text-4xl"
      :value="placeholder"
    />
  </div>
</template>
<script setup>
import { computed, ref, watchEffect } from "vue";

const input = ref(null);

const props = defineProps({ word: String });

const isEditable = computed(() => props.word.length > 5);

const placeholder = Array.from({ length: props.word.length }, () => "*").join(
  " "
);

watchEffect(() => {
  if (input.value)
    input.value.style.width = (180 * props.word.length) / 7 + "px";
});
</script>
