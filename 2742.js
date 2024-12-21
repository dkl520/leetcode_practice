function paintWalls(cost, time) {
    // 获取墙壁数量  
    const n = cost.length;
    // 创建一个数组dp，用于存储最小成本，初始化为无穷大（除了dp[0]为0，表示不涂任何墙壁的成本为0）  
    let dp = Array(n + 1).fill(Number.MAX_SAFE_INTEGER);
    dp[0] = 0;

    // 遍历每一面墙壁  
    for (let i = 0; i < n; i++) {
        // 从最大的墙壁数量（n）开始向下遍历到1，确保在计算dp[j]时，dp[j-time[i]-1]已经被计算过  
        // 这是为了符合题目要求的“必须在当前墙壁之前”的涂墙顺序  
        for (let j = n; j >= 1; j--) {

            let v; // 用于存储如果涂当前墙壁i，则前面的最小成本  
            // 如果当前考虑的墙壁数量j大于涂当前墙壁i所需的时间加上1（因为要至少留一天不涂墙）  
            if (j > time[i] + 1) {
                // 那么v就是涂完前面的墙壁（数量为j-time[i]-1）的最小成本  
                v = dp[j - time[i] - 1];
            } else {
                // 如果不够时间间隔，则不能涂当前墙壁，所以v为0（因为不涂就没有成本）  
                v = 0;
            }
            // 如果v是无穷大（即前面的墙壁组合不可行），则跳过当前循环  
            if (v == Number.MAX_SAFE_INTEGER) {
                continue;
            }
            // 更新dp[j]，即在涂完j面墙壁时，包括当前墙壁i的最小成本  
            dp[j] = Math.min(dp[j], v + cost[i]);
            console.log(dp[j]);
        }
    }
    // 返回涂完所有墙壁的最小成本  
    return dp[n];
}



// 在paintWalls函数中，dp[j]是一个动态规划（DP）数组的元素，用于存储涂完j面墙壁时的最小成本。这个数组是函数的核心部分，
// 用于逐步构建出涂完不同数量墙壁所需的最小成本。

// 具体来说，当你遍历每一面墙壁i时，你会考虑如果涂了这面墙壁，那么涂完前面j-time[i]-1面墙壁（因为涂完当前墙壁后需要等待至少一天，
// 即time[i]+1天之后才能涂下一面）的最小成本是多少。这个成本被存储在变量v中。

// 然后，你会通过dp[j] = Math.min(dp[j], v + cost[i]);这行代码来更新dp[j]的值。这里的意思是：在涂完j面墙壁的所有可能方式中，
// 选择成本最小的那种方式。v + cost[i]表示如果涂当前墙壁i，则总成本是前面墙壁的最小成本v加上当前墙壁的成本cost[i]。dp[j]原先可能存储了一个更大的成本（如果之前已经被计算过的话），现在你用Math.min函数来更新它，确保它总是存储涂完j面墙壁的最小成本。

// 需要注意的是，由于我们从j = n（涂完所有墙壁）开始逆向遍历到j = 1，所以当我们计算dp[j]时，所有依赖于它的更小j值（即dp[j-time[i]-1]）
// 都已经被计算并存储在dp数组中了。这确保了动态规划的正确性，即我们可以利用之前计算的结果来避免重复计算，并找到全局最优解。

// 最终，dp[n]将包含涂完所有n面墙壁的最小成本，这就是函数的返回值。

let cost = [1, 2, 3, 2], time = [1, 2, 3, 2];


paintWalls(cost, time)



SSSSSSSSSSSS
SwwwwwwwSSSS
SwSSSSwwSSSS
SwSSSSwwSKSS
SwSSSSwwSwSS
SwwwwwPwwwww
SSSSSSSwSwSw
SSSSSSMwSwww
SSSSSSSSSSSS
SSSSSSSSSSSS