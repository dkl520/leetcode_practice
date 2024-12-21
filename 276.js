function numWays(n, k) {
    // 如果没有栅栏柱，返回 0
    if (n === 0) return 0;
    // 如果只有一个栅栏柱，返回 k，因为有 k 种涂色方案
    if (n === 1) return k;
    
    // 初始化 dp 数组
    let dp0 = new Array(n + 1).fill(0); // dp0[i] 表示第 i 根柱子颜色与前一根不同的涂色方案数
    let dp1 = new Array(n + 1).fill(0); // dp1[i] 表示第 i 根柱子颜色与前一根相同的涂色方案数
    
    // 基础情况
    dp0[1] = k; // 第 1 根柱子有 k 种涂色方案，因为没有前一根柱子
    dp1[1] = 0; // 第 1 根柱子不能有相同颜色的前一根柱子，因此方案数为 0
    
    // 动态规划填充 dp 数组
    for (let i = 2; i <= n; i++) {
        // 第 i 根柱子颜色与前一根不同，可以从 dp0[i-1] 或 dp1[i-1] 转移而来，每种方案有 k-1 种颜色选择
        dp0[i] = (dp0[i - 1] + dp1[i - 1]) * (k - 1);
        // 第 i 根柱子颜色与前一根相同，只能从 dp0[i-1] 转移而来
        dp1[i] = dp0[i - 1];
    }
    
    // 返回第 n 根柱子的所有有效涂色方案数，即 dp0[n] 和 dp1[n] 的和
    return dp0[n] + dp1[n];
}

// 示例用法：
console.log(numWays(3, 2)); // 输出：6
console.log(numWays(1, 1)); // 输出：1
console.log(numWays(7, 2)); // 输出：42
