/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function (word1, word2) {

    if (word1.length == 0) {
        return word2.length
    }
    if (word2.length == 0) {
        return word1.length
    }

    let word11 = "X" + word1;
    let word22 = "X" + word2;
    let dp = Array.from({ length: word22.length }, () => new Array(word11.length).fill(0));

    let m = dp.length;
    let n = dp[0].length;

    for (let j = 0; j < n; j++) {
        dp[0][j] = j;
    }
    // 初始化第一列
    for (let i = 0; i < m; i++) {
        dp[i][0] = i;
    }

    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            if (word11[j] == word22[i]) {
                dp[i][j] = dp[i - 1][j - 1]
            } else {
                dp[i][j] = Math.min(dp[i][j - 1], dp[i - 1][j], dp[i - 1][j - 1]) + 1;
            }
        }
    }
    return dp[m - 1][n - 1];
};




console.time("72. 编辑距离")
minDistance("horse", 'ros');

console.timeEnd("72. 编辑距离");