import fs from 'fs';
var minCost = function (costs) {
    let m = costs.length; // 房子的数量
    let n = costs[0].length; // 颜色的数量

    // 初始化 dp 数组，用于存储到达每个房子的最小成本
    let dp = Array.from({ length: m }, () => new Array(n).fill(0));
    dp[0] = costs[0]; // 第一个房子的成本直接等于输入成本

    // 从第二个房子开始计算每个房子的最小成本
    for (let i = 1; i < m; i++) {
        let min1 = Infinity, min2 = Infinity, min1Idx = -1;

        // 找到前一个房子（第 i-1 行）涂成的颜色中，最小和次小的成本及其索引
        for (let j = 0; j < n; j++) {
            if (dp[i - 1][j] < min1) {
                min2 = min1;
                min1 = dp[i - 1][j];
                min1Idx = j;
            } else if (dp[i - 1][j] < min2) {
                min2 = dp[i - 1][j];
            }
        }

        // 计算当前房子（第 i 行）涂成每种颜色的最小成本
        for (let j = 0; j < n; j++) {
            if (j === min1Idx) {
                dp[i][j] = costs[i][j] + min2; // 如果当前颜色与前一个房子的最小成本颜色相同，则使用次小成本
            } else {
                dp[i][j] = costs[i][j] + min1; // 否则，使用最小成本
            }
        }
    }

    // 返回最后一个房子涂成任意颜色的最小成本
    return Math.min(...dp[m - 1]);
};

const costs = JSON.parse(fs.readFileSync('complex_costs.json', 'utf8'));
// let costs = [
//     [3, 5, 3],   // 第一个房子涂成三种颜色的成本
//     [6, 17, 6],  // 第二个房子涂成三种颜色的成本
//     [7, 13, 18], // 第三个房子涂成三种颜色的成本
//     [9, 10, 18]  // 第四个房子涂成三种颜色的成本
// ];
console.time("map计时")
console.log(minCost(costs)); // 输出: 26

console.timeEnd("map计时")