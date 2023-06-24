export class Line {
  words = [];
  originalSentence = "";
  hiddenSentence = "";
  startTimeMs = 0;

  constructor({ words, originalSentence, hiddenSentence, startTimeMs }) {
    this.words = words;
    this.originalSentence = originalSentence;
    this.hiddenSentence = hiddenSentence;
    this.startTimeMs = startTimeMs;
  }
}
