/**
 * @param {number[][]} dungeon
 * @return {number}
 */
var calculateMinimumHP = function (dungeon) {
    const m = dungeon.length;
    const n = dungeon[0].length;

    // 创建一个二维数组来存储所需的最小生命值
    const dp = Array.from({ length: m }, () => new Array(n));

    // 初始化右下角的单元格
    dp[m - 1][n - 1] = Math.max(1, 1 - dungeon[m - 1][n - 1]);

    // 初始化最后一列
    for (let i = m - 2; i >= 0; i--) {
        dp[i][n - 1] = Math.max(1, dp[i + 1][n - 1] - dungeon[i][n - 1]);
    }

    // 初始化最后一行
    for (let j = n - 2; j >= 0; j--) {
        dp[m - 1][j] = Math.max(1, dp[m - 1][j + 1] - dungeon[m - 1][j]);
    }

    // 填充其余的dp数组
    for (let i = m - 2; i >= 0; i--) {
        for (let j = n - 2; j >= 0; j--) {
            const minNext = Math.min(dp[i + 1][j], dp[i][j + 1]);
            dp[i][j] = Math.max(1, minNext - dungeon[i][j]);
        }
    }

    return dp[0][0];
}

// 示例用法:
const dungeon = [
    [-2, -3, 3],
    [-5, -10, 1],
    [10, 30, -5]
];
const result = calculateMinimumHP(dungeon);
console.log(result); // 输出: 7
