

var minCost = function (costs) {


    let dp = Array.from({ length: costs.length }, () => new Array(3).fill(0));

    dp[0] = costs[0];

    for (let i = 1; i < costs.length; i++) {
        const elCost = costs[i];
        dp[i][0] = Math.min(dp[i - 1][1], dp[i - 1][2]) + elCost[0];
        dp[i][1] = Math.min(dp[i - 1][0], dp[i - 1][2]) + elCost[1];
        dp[i][2] = Math.min(dp[i - 1][0], dp[i - 1][1]) + elCost[2];
    }
    return Math.min(...dp[costs.length - 1])

};

let costs =
    [[3, 5, 3],
     [6, 17, 6],
     [7, 13, 18],
     [9, 10, 18]]
console.log(
    minCost(costs))