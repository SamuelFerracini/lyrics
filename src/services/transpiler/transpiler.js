import { Line } from "./entities/line";
import { Word } from "./entities/word";

class TranspilerService {
  transpileLyrics(lyrics) {
    return lyrics.lines
      .filter((e) => e.words)
      .map((line) => {
        const words = line.words.split(" ").map((w) => new Word({ word: w }));

        const hiddenWords = this.hideWords({ words, quantity: 10 });

        const hiddenSentence = hiddenWords.map((w) => w.hiddenWord).join(" ");

        return new Line({
          words,
          originalSentence: line.words,
          startTimeMs: line.startTimeMs,
          hiddenSentence,
        });
      });
  }

  hideWords({ words, quantity }) {
    if (quantity > words.length) {
      words.map((w) => w.hideWord());
      return words;
    }

    const alreadyHidden = [];

    while (alreadyHidden.length < quantity) {
      const hideIndex = Math.floor(Math.random() * words.length);

      words[hideIndex].hideWord();

      alreadyHidden.push(hideIndex);
    }

    return words;
  }
}

export default new TranspilerService();
