/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
    coins.sort((a, b) => a - b);
    const n = coins.length;
    const dp = Array.from({ length: n + 1 }, () => new Array(amount + 1).fill(Infinity));
    for (let i = 0; i <= n; i++) {
        dp[i][0] = 0;
    }
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= amount; j++) {
            if (j >= coins[i - 1]) {
                dp[i][j] = Math.min(dp[i][j], dp[i][j - coins[i - 1]] + 1);
            }
            dp[i][j] = Math.min(dp[i][j], dp[i - 1][j]);
        }
    }
    return dp[n][amount] === Infinity ? -1 : dp[n][amount];
};
// Example usage:
const coins = [1, 2, 5];
const amount = 11;
console.log(import.meta.url);
console.log(coinChange(coins, amount)); // Output: 3
