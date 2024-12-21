/**
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function(s) {
    let maxLength = 0;
    // 初始化dp数组，dp[i]表示以索引i结尾的最长有效括号的长度
    const dp = new Array(s.length).fill(0);

    // 从索引1开始遍历字符串
    for (let i = 1; i < s.length; i++) {
        // 如果当前字符是右括号
        if (s[i] === ')') {
            // 情况1：前一个字符是左括号，构成一对有效括号
            if (s[i - 1] === '(') {
                // 如果i >= 2，dp[i] = dp[i - 2] + 2，否则dp[i] = 2
                dp[i] = (i >= 2 ? dp[i - 2] : 0) + 2;
            }
            // 情况2：前一个字符是右括号，且在当前有效子串前还有一个左括号与之匹配
            else if (i - dp[i - 1] > 0 && s[i - dp[i - 1] - 1] === '(') {
                // 如果i - dp[i - 1] >= 2，dp[i] = dp[i - 1] + dp[i - dp[i - 1] - 2] + 2
                // 否则，dp[i] = dp[i - 1] + 2
                dp[i] = dp[i - 1] + ((i - dp[i - 1] >= 2) ? dp[i - dp[i - 1] - 2] : 0) + 2;
            }
            // 更新最大长度
            maxLength = Math.max(maxLength, dp[i]);
        }
    }

    // 返回最长有效括号的长度
    return maxLength;
};

// 示例测试
console.log(longestValidParentheses("(()")); // 输出: 2
console.log(longestValidParentheses(")()())")); // 输出: 4
console.log(longestValidParentheses("")); // 输出: 0
a