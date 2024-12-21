/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function(nums) {
    const n = nums.length;
    
    // 如果数组长度小于2，不可能分成两个和相等的子集
    if (n < 2) {
        return false;
    }
    
    // 计算数组的总和和最大值
    let sum = 0, maxNum = 0;
    for (const num of nums) {
        sum += num;
        maxNum = Math.max(maxNum, num);
    }
    
    // 如果总和是奇数，不能平分成两个和相等的子集
    if (sum % 2 !== 0) {
        return false;
    }
    
    // 目标是找到一个子集，其和为总和的一半
    const target = Math.floor(sum / 2);
    
    // 如果最大值大于目标值，不可能存在这样的子集
    if (maxNum > target) {
        return false;
    }
    
    // 动态规划数组，dp[i][j] 表示前 i 个数中是否存在和为 j 的子集
    const dp = new Array(n).fill(0).map(() => new Array(target + 1).fill(false));
    
    // 和为 0 的子集总是存在（空集）
    for (let i = 0; i < n; i++) {
        dp[i][0] = true;
    }
    
    // 初始化第一个元素的状态
    dp[0][nums[0]] = true;
    
    // 填充动态规划数组
    for (let i = 1; i < n; i++) {
        const num = nums[i];
        for (let j = 1; j <= target; j++) {
            if (j >= num) {
                // 如果当前和 j 大于等于 num，考虑两种情况：
                // 1. 不选当前数，dp[i-1][j]
                // 2. 选当前数，dp[i-1][j-num]
                dp[i][j] = dp[i - 1][j] || dp[i - 1][j - num];
            } else {
                // 当前和 j 小于 num，只能不选当前数
                dp[i][j] = dp[i - 1][j];
            }
        }
    }
    
    // 返回是否能找到和为 target 的子集
    return dp[n - 1][target];
};

// 示例测试
let nums = [1, 5, 2, 4];
console.log(canPartition(nums)); // 输出: true
