class Solution {
    numWays(n, k) {
        // 初始化 f 和 g
        let f = k, g = 0;

        // 遍历每一个柱子，计算不同的涂色方式
        for (let i = 1; i < n; ++i) {
            // 计算新的 f 值
            let ff = (f + g) * (k - 1);
            // 更新 g 为旧的 f 值
            g = f;
            // 更新 f 为新的 ff 值
            f = ff;
        }

        // 最后一个柱子可以是颜色相同（g）或颜色不同（f），所以结果是两者之和
        return f + g;
    }
}

// 测试
const solution = new Solution();
console.log(solution.numWays(2, 1)); // 输出 0
console.log(solution.numWays(7, 3)); // 输出 246
