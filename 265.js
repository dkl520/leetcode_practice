

import fs from 'fs';
var minCost = function (costs) {

    let m = costs.length;
    let n = costs[0].length;
    let dp = Array.from({ length: m }, () => new Array(n).fill(0));
    dp[0] = costs[0];
    
    for (let i = 1; i < costs.length; i++) {
        const elCost = costs[i];
        for (let j = 0; j < elCost.length; j++) {
            const element = elCost[j];
            dp[i][j] = getMin(i - 1, j, dp) + element;
        }
    }
    return Math.min(...dp[costs.length - 1])

};

function getMin(i, j, dp) {
    let arr = [...dp[i]];
    arr.splice(j, 1);
    return Math.min(...arr);
}

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