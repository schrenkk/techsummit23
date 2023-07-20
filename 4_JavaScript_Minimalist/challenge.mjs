export { weightedSort };

const weightedSort = (text) => {
  const words = text.match(/(?:[^\s',.!?]+(?:['-][^\s',.!?]+)*)/g) || [];
  const getWeight = (word) =>
    word
      .replace(/['-]/g, "")
      .split("")
      .reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const compareWords = (a, b) => {
    const weightDiff = getWeight(b) - getWeight(a);
    if (weightDiff !== 0) {
      return weightDiff;
    }
    for (let i = 0; i < Math.min(a.length, b.length); i++) {
      const charDiff = b.charCodeAt(i) - a.charCodeAt(i);
      if (charDiff !== 0) {
        return charDiff;
      }
    }
    return b.length - a.length;
  };
  const sortedWords = words.sort(compareWords);
  const uniqueWords = {};
  sortedWords.forEach((word) => {
    if (!uniqueWords[word]) {
      uniqueWords[word] = getWeight(word);
    }
  });
  const sortedUniqueWords = Object.entries(uniqueWords).sort((a, b) => {
    const weightDiff = b[1] - a[1];
    if (weightDiff !== 0) {
      return weightDiff;
    }
    return compareWords(a[0], b[0]);
  });
  const result = sortedUniqueWords
    .filter(([word, _]) => word !== "-")
    .map(([word, weight]) => `${word.replace(/['-]/g, "")}|${weight}`);
  return result.join("\n");
};
