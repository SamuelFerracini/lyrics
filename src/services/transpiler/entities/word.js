import { replaceOnlyLetters } from "../../../helpers/string.js";

import { Letter } from "./letter.js";

export class Word {
  hiddenLetters = "";
  hiddenWord = "";
  originalWord = "";
  originalLetters = "";
  isHide = false;

  constructor({ word, isHide = false }) {
    this.hiddenWord = word;
    this.originalWord = word;
    this.originalLetters = word.split("");
    this.isHide = isHide;
  }

  hideWord() {
    this.isHide = true;
    this.hiddenWord = replaceOnlyLetters(this.originalWord);
    this.hiddenLetters = this.hiddenWord.split("").map((l) => {
      const isHide = l === "*";

      return new Letter({ letter: isHide ? "*" : l, isHide });
    });
  }
}
