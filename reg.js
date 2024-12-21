const patterns = ["he", "she", "hers", "his"];
const text = "hershehishers";

function countOccurrences(text, patterns) {
  const result = {};

  patterns.forEach(pattern => {
    const regex = new RegExp(pattern, 'g');
    const matches = text.match(regex);
    debugger
    result[pattern] = matches ? matches.length : 0;
  });

  return result;
}

const occurrences = countOccurrences(text, patterns);
console.log(occurrences);