/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function(nums) {
    // 计算数组总和
    let sum = nums.reduce((a, b) => a + b, 0);
    
    // 如果总和是奇数，不可能平分成两个和相等的子集
    if (sum % 2 !== 0) {
        return false;
    }
    
    // 目标是找到一个子集，其和为总和的一半
    let target = sum / 2;
    
    // 动态规划数组，dp[i] 表示是否能找到和为 i 的子集
    let dp = new Array(target + 1).fill(false);
    dp[0] = true;  // 初始状态：和为 0 的子集总是存在
    
    // 遍历每个数字，更新动态规划数组
    for (let num of nums) {
        // 必须从后向前遍历，以免重复计算
        for (let j = target; j >= num; j--) {
            dp[j] = dp[j] || dp[j - num];
        }
    }
    
    // 返回目标和是否能被找到
    return dp[target];
};

