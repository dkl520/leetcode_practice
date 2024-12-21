class Solution {
    numWays(n, k) {
        // 如果没有柱子(n=0)，那么没有办法涂颜色
        if (n === 0) return 0;
        // 如果只有一个柱子(n=1)，那么有k种方式涂颜色
        if (n === 1) return k;

        // 初始化两个数组f和g，长度为n，并用0填充
        // f[i]表示前i个柱子涂颜色的方式数，并且第i个柱子与第i-1个柱子颜色不同
        // g[i]表示前i个柱子涂颜色的方式数，并且第i个柱子与第i-1个柱子颜色相同
        const f = new Array(n).fill(0);
        const g = new Array(n).fill(0);

        // 第一个柱子有k种颜色的涂法
        f[0] = k;

        // 遍历每一个柱子，计算不同的涂色方式
        for (let i = 1; i < n; ++i) {
            // 如果第i个柱子与第i-1个柱子颜色不同，则前i-1个柱子的所有涂色方式（f[i-1]和g[i-1]）都可以乘以(k-1)种不同颜色
            f[i] = (f[i - 1] + g[i - 1]) * (k - 1);
            // 如果第i个柱子与第i-1个柱子颜色相同，则第i-1个柱子必须与第i-2个柱子颜色不同
            g[i] = f[i - 1];
            
        }

        // 最后一个柱子可以是颜色相同（g[n-1]）或颜色不同（f[n-1]），所以结果是两者之和
        return f[n - 1] + g[n - 1];
    }
}

// 测试
const solution = new Solution();
console.log(solution.numWays(7, 7)); // 输出 0，修正注释
// console.log(solution.numWays(7, 3)); // 输出 246
