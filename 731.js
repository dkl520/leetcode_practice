/**  
 * @param {number[][]} grid - 二维网格，每个元素表示一个格子，正数表示樱桃的数量，-1表示障碍物  
 * @return {number} - 最多可以收集的樱桃数量  
 */
var cherryPickup = function (grid) {
    const n = grid.length; // 网格的行数  

    // 初始化三维动态规划数组，dp[r1][c1][r2]表示角色1在(r1, c1)位置，角色2在(r1+c1-c2, c2)位置时可以收集的最大樱桃数量  
    const dp = new Array(n).fill(null).map(() => new Array(n).fill(null).map(() => new Array(n).fill(null)));

    // 辅助函数，递归计算最大樱桃数量  
    const helper = (r1, c1, r2) => {
        // 角色2的列坐标，根据两个角色的行差和列差计算得出  
        const c2 = r1 + c1 - r2;
        // 如果任一角色越界或遇到障碍物，则返回负无穷大  
        if (r1 === n || c1 === n || r2 === n || c2 === n || grid[r1][c1] === -1 || grid[r2][c2] === -1) {
            return -Infinity;
        }

        // 如果两个角色都到达右下角，返回当前位置的樱桃数量  
        if (r1 === n - 1 && c1 === n - 1 && r2 === n - 1) {
            return grid[r1][c1];
        }

        // 如果已经计算过当前状态的最大樱桃数量，则直接返回  
        if (dp[r1][c1][r2] !== null) {
            return dp[r1][c1][r2];
        }

        // 计算当前位置的樱桃数量  
        let cherries = grid[r1][c1];
        if (r1 !== r2 || c1 !== c2) {
            // 如果两个角色不在同一位置，则加上角色2当前位置的樱桃数量  
            cherries += grid[r2][c2];
        }
        // 递归计算四个方向移动后的最大樱桃数量，取最大值  
        cherries += Math.max(
            helper(r1 + 1, c1, r2 + 1),  // 两个角色都向下移动  
            helper(r1, c1 + 1, r2),       // 两个角色都向右移动  
            helper(r1, c1 + 1, r2 + 1),  // 角色1向右，角色2向下  
            helper(r1 + 1, c1, r2)      // 角色1向下，角色2向右  
        );
        // 将计算得到的最大樱桃数量保存到动态规划数组中  
        dp[r1][c1][r2] = cherries;
        // 返回最大樱桃数量 
        return cherries;
    };
    let result = Math.max(0, helper(0, 0, 0));
    // 从左上角开始计算最大樱桃数量，并返回结果，如果结果为负则返回0（表示无法到达右下角）  
    return result
};


// 示例用法：
const grid = [
    [0, 1, -1],
    [1, 0, -1],
    [1, 1, 1]
];
console.log(cherryPickup(grid)); // 输出应为 5

