/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
    if (s < 2) {
        return s;
    }
    const n = s.length;
    let maxLength = 1;
    let maxString = String();
    let start = 0;
    roll();
    function expandRange(left, right) {
        while (left >= 0 && right < n && s[left] === s[right]) {
            let currentLength = right - left + 1;
            if (maxLength < currentLength) {
                maxLength = currentLength;
                start = left;
            }
            left--;
            right++;
        }
    }
    function roll() {
        for (let i = 0; i < n; i++) {
            // const element = s[i];
            expandRange(i, i);
            expandRange(i, i + 1);
        }
    }
    return s.substring(start, start + maxLength);
};


let s = "cabbacaassac";
console.time("5. 最长回文子串")
console.log(longestPalindrome(s))

console.timeEnd("5. 最长回文子串")