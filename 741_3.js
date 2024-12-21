var cherryPickup = function (grid) {
    const n = grid.length;
    // 初始化三维数组 dp，dp[k][i][j] 表示总步数为 k 时，从 (0,0) 到 (i,k-i) 和从 (0,0) 
    // 到 (j,k-j) 的最多樱桃数
    const dp = Array.from({ length: 2 * n - 1 }, () =>
        Array.from({ length: n }, () =>
            Array(n).fill(-Infinity)  //初始化最小最值 负无穷 这样 
    // 在遇到grid[i][k - i] === -1 || grid[j][k - j] === -1 状态是直接判断为没有路径可走。
        )
    );
    //
    // 初始状态，从 (0,0) 出发，摘到的樱桃数为 grid[0][0]
    dp[0][0][0] = grid[0][0];
    // 遍历所有步数 k，从 1 到 2*n-2
    for (let k = 1; k < 2 * n - 1; k++) {

        // 遍历所有可能的 i 和 j，这两个值代表在步数 k 时，两条路径的当前位置
        for (let i = Math.max(0, k - n + 1); i <= Math.min(n - 1, k); i++) {

            for (let j = Math.max(0, k - n + 1); j <= Math.min(n - 1, k); j++) {
                // 如果当前格子有荆棘（值为 -1），跳过
                if (grid[i][k - i] === -1 || grid[j][k - j] === -1) {
                    dp[k][i][j] = -Infinity;
                    continue;
                }
                // 初始化当前状态的樱桃数为上一步的状态
                let cherries = dp[k - 1][i][j];
                // 如果 i 可以向上走，则取向上走的最大樱桃数
                if (i > 0) cherries = Math.max(cherries, dp[k - 1][i - 1][j]);
                // 如果 j 可以向左走，则取向左走的最大樱桃数
                if (j > 0) cherries = Math.max(cherries, dp[k - 1][i][j - 1]);
                // 如果 i 和 j 都可以移动，则取最大樱桃数
                if (i > 0 && j > 0) cherries = Math.max(cherries, dp[k - 1][i - 1][j - 1]);

                // 如果没有合法路径，跳过
                if (cherries == -Infinity) continue;

                // 更新当前状态的樱桃数，累加当前位置的樱桃数
                dp[k][i][j] = cherries + grid[i][k - i];
                // 如果 i 和 j 不同，累加不同位置的樱桃数
                if (i != j) dp[k][i][j] += grid[j][k - j];
            }
        }
    }

    // 返回从 (0,0) 到 (n-1,n-1) 并返回 (0,0) 的最多樱桃数，若不可达则返回 0
    return Math.max(dp[2 * n - 2][n - 1][n - 1], 0);
};

// 示例用例
console.log(cherryPickup([
    [0, 1, -1],
    [1, 0, -1],
    [1, 1, 1]
]));  // 输出：5
console.log(cherryPickup([[1, 1, -1], [1, -1, 1], [-1, 1, 1]])); // 输出：0
