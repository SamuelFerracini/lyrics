<template>
  <div class="text-4xl mr-2 flex">
    <span v-if="!word.isHide">
      {{ word.hiddenWord }}
    </span>
    <div v-for="(letter, idx) in word.hiddenLetters">
      <div
        :key="idx"
        :contenteditable="letter.isHide"
        :ref="`line_${lineIdx}_letter_${idx}`"
        @input="handleInput(idx, $event)"
        class="outline-none"
      >
        <!-- caret-transparent -->
        {{ !letter.isHide ? letter.letter : "*" }}
      </div>
    </div>
  </div>
</template>
<script>
import { Word } from "../../../services/transpiler/entities/word";

export default {
  name: "TheWord",
  props: {
    word: {
      type: Word,
      required: true,
    },
    lineIdx: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      currentLetter: 0,
      currentLine: 0,
    };
  },

  mounted() {
    this.focusLetter();
  },

  methods: {
    focusLetter() {
      if (Object.entries(this.$refs).length === 0) return;

      try {
        this.$refs[
          "line_" + this.currentLine + "_letter_" + this.currentLetter
        ][0].focus();
      } catch (error) {}
    },

    handleInput(idx, { data: letter }) {
      this.word.hiddenLetters[idx].letter = letter;
      this.$refs[
        "line_" + this.currentLine + "_letter_" + this.currentLetter
      ][0].innerHTML = letter;

      if (this.currentLine + 1 > this.word.hiddenLetters.length) {
        this.currentLetter = 0;
        this.currentLine += 1;
      } else {
        this.currentLetter += 1;
      }
      this.focusLetter();
    },
  },
};
</script>
<style scoped>
* {
  color: white;
}
</style>
