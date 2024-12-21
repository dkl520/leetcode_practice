class CampusBikesII {
    assignBikes(workers, bikes) {
        const n = workers.length;
        const m = bikes.length;
        const dp = new Array(1 << m).fill(Infinity);
        dp[0] = 0;
        // 遍历每个工人
        for (let i = 0; i < n; i++) {
            const nextDp = new Array(1 << m).fill(Infinity);
            // 遍历每种状态的自行车分配情况
            for (let mask = 0; mask < (1 << m); mask++) {
                if (dp[mask] === Infinity) continue;
                // 尝试给工人 i 分配一辆未使用的自行车
                for (let j = 0; j < m; j++) {
                    if ((mask & (1 << j)) === 0) { // 判断自行车 j 是否已被使用
                        const newMask = mask | (1 << j);
                        const dist = Math.abs(workers[i][0] - bikes[j][0]) + Math.abs(workers[i][1] - bikes[j][1]);
                        nextDp[newMask] = Math.min(nextDp[newMask], dp[mask] + dist);
                    }
                }
            }
            dp.fill(Infinity);
            for (let k = 0; k < nextDp.length; k++) {
                dp[k] = nextDp[k];
            }
        }
        let minDistance = Infinity;
        // 找到最小的总距离
        for (let distance of dp) {
            minDistance = Math.min(minDistance, distance);
        }
        return minDistance;
    }
}

// 测试代码
const solution = new CampusBikesII();
const workers = [[0, 0], [2, 1]];
const bikes = [[1, 2], [3, 3]];
const result = solution.assignBikes(workers, bikes);
console.log(result); // 输出应为 6
