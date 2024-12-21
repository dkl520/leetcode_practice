/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
    coins.sort((a, b) => a - b);
    let m = amount;
    let n = coins.length;
    let dp = Array.from({ length: n }, () => new Array(amount + 1).fill(Infinity));
    for (let j = 0; j <= m; j++) {
        if (j % coins[0] == 0) {
            dp[0][j] = j / coins[0];
        } else {
            dp[0][j] = -1;
        }
    }
    for (let i = 0; i < n; i++) {
        dp[i][0] = 0;
    }
    for (let i = 1; i < n; i++) {
        for (let j = 1; j <= m; j++) {
            if (j < coins[i]) {
                dp[i][j] = dp[i - 1][j];
            } else {
                let counts = Math.floor(j / coins[i]);
                for (let k = 0; k <= counts; k++) {
                    if (dp[i - 1][j - k * coins[i]] !== -1) {
                        let counNum = dp[i - 1][j - k * coins[i]] + k;
                        dp[i][j] = Math.min(dp[i][j], counNum)
                    }
                }
                if (dp[i][j] === Infinity) {
                    dp[i][j] = -1;
                }
            }
        }
    }
    return dp[n - 1][m];
}


let coins = [186, 419, 83, 408], amount = 6249;
console.time("322. 零钱兑换");
console.log(coinChange(coins, amount));
console.timeEnd("322. 零钱兑换")