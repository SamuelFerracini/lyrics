export const replaceOnlyLetters = (word = "", character = "*") => {
  return word.replace(/[a-z]/gi, character);
};
