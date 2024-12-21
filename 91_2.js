/**
 * 检查字符是否是 '1' 到 '9'
 * @param {string} s
 * @returns {boolean}
 */
function isNumeric(s) {
    return s >= '1' && s <= '9';
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
        // 当前字符的单独解码方式
        if (isNumeric(s[i - 1])) {
            dp[i] = dp[i - 1];
        }
        
        // 当前字符和前一个字符一起解码的方式
        const twoDigit = parseInt(s.substring(i - 2, i));
        if (twoDigit >= 10 && twoDigit <= 26) {
            dp[i] += dp[i - 2];
        }
    }
    return dp[s.length];
};

let s = "10";
console.log(
    numDecodings(s))