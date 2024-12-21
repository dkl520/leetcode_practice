/**
 * @param {number[][]} grid
 * @return {number}
 */
var cherryPickup = function (grid) {
    let m = grid.length;
    let n = grid[0].length;

    // dp[i][j1][j2] 表示机器人1在第i行j1列，机器人2在第i行j2列时，能摘取的樱桃最大数
    let dp = Array.from({ length: m }, () => 
        Array.from({ length: n }, () => 
            Array.from({ length: n }, () => -Infinity)
        )
    );
    
    // 初始化dp数组
    dp[0][0][n - 1] = grid[0][0] + (0 === n - 1 ? 0 : grid[0][n - 1]);
    
    // 遍历每一行
    for (let i = 1; i < m; i++) {
        // 遍历机器人1的列
        for (let j1 = 0; j1 < n; j1++) {
            // 遍历机器人2的列
            for (let j2 = 0; j2 < n; j2++) {
                let maxCherries = -Infinity; // 初始化最大樱桃数
                
                // 机器人1和机器人2的上一个位置，最多有9种组合（当前列，上/下/左/右）
                for (let p1 = Math.max(0, j1 - 1); p1 <= Math.min(n - 1, j1 + 1); p1++) {
                    for (let p2 = Math.max(0, j2 - 1); p2 <= Math.min(n - 1, j2 + 1); p2++) {
                        // 如果上一个状态有效，则计算最大樱桃数
                        if (dp[i - 1][p1][p2] != -Infinity) {
                            maxCherries = Math.max(maxCherries, dp[i - 1][p1][p2] + grid[i][j1] + (j1 === j2 ? 0 : grid[i][j2]));
                        }
                    }
                }
                // 更新当前状态的最大樱桃数
                dp[i][j1][j2] = maxCherries;
            }
        }
    }

    let result = -Infinity; // 最终结果初始化为负无穷
    
    // 遍历最后一行，找到最大的樱桃数
    for (let j1 = 0; j1 < n; j1++) {
        for (let j2 = 0; j2 < n; j2++) {
            result = Math.max(result, dp[m - 1][j1][j2]);
        }
    }

    return result; // 返回最终结果
};

let grid = [
    [0, 0, 10, 2, 8, 4, 0],
    [7, 9, 3, 5, 4, 8, 3],
    [6, 9, 8, 3, 5, 6, 0],
    [0, 4, 1, 1, 9, 3, 7],
    [5, 6, 9, 8, 8, 10, 10],
    [9, 2, 9, 7, 4, 8, 3],
    [1, 6, 1, 2, 0, 9, 9]];

console.time("1463. 摘樱桃 II");
console.log(cherryPickup(grid));
console.timeEnd("1463. 摘樱桃 II");
