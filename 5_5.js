/**
 * Find the longest palindrome in a given string using Manacher's algorithm.
 * @param {string} s - Input string.
 * @return {string} - Longest palindrome.
 */
var longestPalindrome = function(s) {
    if (s.length < 1) {
        return s;
    }

    // Preprocess the string
    let extendedStr = s + "$" + s.split("").reverse().join("");

    // Build the suffix array
    const suffixes = Array.from({ length: extendedStr.length }, (_, i) => ({
        index: i,
        suffix: extendedStr.slice(i)
    }));
    suffixes.sort((a, b) => a.suffix.localeCompare(b.suffix));

    // Find the longest palindrome
    let maxPalindrome = "";
    for (let i = 0; i < suffixes.length - 1; i++) {
        const el1 = suffixes[i].suffix;
        const el2 = suffixes[i + 1].suffix;

        if (el1[0] === '$' || el2[0] === '$') {
            continue;
        }

        // Find common prefix length
        let j = 0;
        while (el1[j] === el2[j] && el1[j] !== '$') {
            j++;
        }

        // Update max palindrome
        let palindrome = el1.slice(0, j);
        maxPalindrome = maxPalindrome.length > palindrome.length ? maxPalindrome : palindrome;
    }

    return maxPalindrome;
};

let s = "cabbacaassac";
console.time("5. 最长回文子串")
console.log(longestPalindrome(s))

console.timeEnd("5. 最长回文子串")