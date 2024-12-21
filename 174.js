/**
 * @param {number[][]} dungeon
 * @return {number}
 */


// 这道题的dp是倒序的，这点很重要，为什么不能像【最小路径和】一样是正序的？
// 因为【最小路径和】是无状态的，你会发现【最小路径和】倒序dp也是可以的，
// 这道题由于有“加血”的过程，只能依赖后面的值判断需要的血量。
// 所以这里的dp[i][j]表达的意思是：“从（i，j）出发，到达终点需要最少的血量”。因此，正序的含义为“从起点出发，到达位置（i，j）
// 所需要的最少血量”；倒序的含义是“从（i，j）出发，到达终点需要最少的血量”。初始血量本来就是要求的，所以只能倒序dp
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
    debugger
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
