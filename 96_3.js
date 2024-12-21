/**
 * @param {number} n
 * @return {number}
 */
var numTrees = function (n) {

    let dp = new Array(n + 1).fill(0);
    dp[0] = 1;
    dp[1] = 1;
    dp[2] = 2;
    for (let i = 3; i <= n; i++) {

        for (let j = i - 1; j >= 0; j--) {
            const right = i - j - 1;
            dp[i] += dp[j] * dp[i - j - 1]
        }
    }
    return dp[n];
};

numTrees(5);
