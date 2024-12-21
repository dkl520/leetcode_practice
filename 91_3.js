/**
 * 检查字符是否是 '1' 到 '9'
 * @param {string} s
 * @returns {boolean}
 */
function isNumeric(s) {
    return s >= '1' && s <= '9';
}
function isGood(twoDigit) {
    if (twoDigit >= 10 && twoDigit <= 26) {
        return true
    }
    return false
}

/**
 * 计算字符串的解码方式数量
 * @param {string} s
 * @returns {number}
 */
var numDecodings = function (s) {
    // 特殊情况处理
    if (s.length === 0 || s[0] === '0') {
        return 0;
    }

    // 初始化动态规划数组
    const dp = new Array(s.length + 1).fill(0);
    dp[0] = 1; // 空字符串有一种解码方式
    dp[1] = 1; // 第一个字符有一种解码方式

    for (let i = 2; i <= s.length; i++) {

        const twoDigit = parseInt(s.substring(i - 2, i));
        if (numDecodings(s[i - 1]) && isGood(twoDigit)) {
            dp[i] = dp[i - 1] + dp[i - 2];
        }
        if (!numDecodings(s[i - 1]) && isGood(twoDigit)) {
            dp[i] = dp[i - 2];
        }
        if (!numDecodings(s[i - 1]) && !isGood(twoDigit)) {
            return 0;
        }
        if (numDecodings(s[i - 1]) && !isGood(twoDigit)) {
            dp[i] = dp[i - 1];
        }
    }
    return dp[s.length];
};
let s = "10";
console.log(
    numDecodings(s))