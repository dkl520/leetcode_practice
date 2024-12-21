/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function (text1, text2) {
    let minText, maxText;
    if (text1.length < text2.length) {
        minText = text1;
        maxText = text2;
    } else {
        minText = text2;
        maxText = text1;
    }
    minText = ("+" + minText).split('');
    maxText = ("-" + maxText).split('');
    let dp = Array.from({ length: minText.length }, () => new Array(maxText.length).fill(0));
    for (let i = 1; i < minText.length; i++) {
        for (let j = 1; j < maxText.length; j++) {
            if (minText[i] == maxText[j]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i][j - 1], dp[i - 1][j]);
            }
        }
    }
    return dp[minText.length - 1][maxText.length - 1];
};


console.time("1143. 最长公共子序列");

let text1 = "bsbininm", text2 = "jmjkbkjkv";

console.log(longestCommonSubsequence(text1, text2));


console.timeEnd("1143. 最长公共子序列");
