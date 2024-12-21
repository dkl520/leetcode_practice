/**  
 * @param {string} s - 输入的字符串  
 * @return {number} - 最长回文子序列的长度  
 */  
var longestPalindromeSubseq = function (s) {  
    let size = s.length;  // 字符串的长度  
    let dp = new Array(size).fill(0).map(() => new Array(size).fill(0));  // 创建一个二维数组dp，用于存储子问题的解  
  
    // 当字符串只有一个字符时，最长回文子序列的长度为1  
    for (let i = 0; i < size; i++) {  
        dp[i][i] = 1;  
    }  
  
    // 从字符串的倒数第二个字符开始，到第一个字符，逐个进行遍历  
    for (let i = size - 1; i >= 0; i--) {  
        // 从当前字符的下一个字符开始，到字符串的最后一个字符，逐个进行遍历  
        for (let j = i + 1; j < size; j++) {  
            // 如果当前字符与后面的字符相等，则最长回文子序列的长度为dp[i+1][j-1] + 2（因为有两个相同的字符）  
            dp[i][j] = s[i] === s[j] ? dp[i + 1][j - 1] + 2 : Math.max(dp[i + 1][j], dp[i][j - 1]);  // 否则取dp[i+1][j]和dp[i][j-1]中的较大值  
        }  
    }  
  
    return dp[0][size - 1];  // 返回最长回文子序列的长度  
};  
  
let s = "bbbab";  // 测试字符串  
console.log(longestPalindromeSubseq(s));  // 输出最长回文子序列的长度