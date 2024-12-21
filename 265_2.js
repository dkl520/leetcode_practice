
import fs from 'fs';
var minCost = function (costs) {

    let m = costs.length;
    let n = costs[0].length;
    let dp = Array.from({ length: m }, () => new Array(n).fill(0));
    let dpMin = Array.from({ length: m }, () => new Map());
    dp[0] = costs[0];
    setMin(dp[0], dpMin, 0);
    for (let i = 1; i < costs.length; i++) {
        const elCost = costs[i];

        for (let j = 0; j < elCost.length; j++) {
            const element = elCost[j];
            const preMin = getMin(dpMin[i - 1], j);
            dp[i][j] = preMin + element;
        }
        
        setMin(dp[i], dpMin, i)
    }

    return Math.min(...dp[costs.length - 1])

};

function getMin(maps, j) {
    for (const [index, minNum] of maps) {
        if (index != j) {
            return minNum;
        }
    }
}


function setMin(arr, dpMin, i) {
    let arrNew = [...arr];
    arrNew.sort((a, b) => a - b);
    const minOne = arrNew.shift();
    const minTwo = arrNew.shift();
    dpMin[i].set(arr.indexOf(minOne), minOne);
    dpMin[i].set(arr.lastIndexOf(minTwo), minTwo);
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