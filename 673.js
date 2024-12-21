/**  
 * @param {number[]} nums - 给定的未排序整数数组  
 * @return {number} - 最长递增子序列的个数  
 */  
var findNumberOfLIS = function(nums) {  
    let n = nums.length, maxLen = 0, ans = 0; // n为数组长度，maxLen为最长递增子序列的长度，ans为最长递增子序列的个数  
    const dp = new Array(n).fill(0); // dp数组，用于存储以当前元素为结尾的最长递增子序列的长度  
    const cnt = new Array(n).fill(0); // cnt数组，用于存储以当前元素为结尾的最长递增子序列的个数  
  
    for (let i = 0; i < n; ++i) { // 遍历数组  
        dp[i] = 1; // 初始化dp[i]为1，因为每个元素本身可以构成一个递增子序列  
        cnt[i] = 1; // 初始化cnt[i]为1，因为每个元素本身可以构成一个递增子序列  
  
        for (let j = 0; j < i; ++j) { // 遍历当前元素之前的所有元素  
            if (nums[i] > nums[j]) { // 如果当前元素大于之前的元素，则考虑将其加入之前的递增子序列中  
                if (dp[j] + 1 > dp[i]) { // 如果加入后子序列长度增加  
                    dp[i] = dp[j] + 1; // 更新dp[i]为新的子序列长度  
                    cnt[i] = cnt[j]; // 重置cnt[i]为之前子序列的个数  
                } else if (dp[j] + 1 === dp[i]) { // 如果加入后子序列长度不变  
                    cnt[i] += cnt[j]; // 将之前子序列的个数累加到当前cnt[i]上  
                }  
            }  
        }  
  
        if (dp[i] > maxLen) { // 如果当前子序列长度大于已知的最长递增子序列长度  
            maxLen = dp[i]; // 更新最长递增子序列长度  
            ans = cnt[i]; // 重置ans为当前子序列的个数  
        } else if (dp[i] === maxLen) { // 如果当前子序列长度等于已知的最长递增子序列长度  
            ans += cnt[i]; // 将当前子序列的个数累加到ans上  
        }  
    }  
  
    return ans; // 返回最长递增子序列的个数  
};  
  
// 测试代码  
console.time("673. 最长递增子序列的个数"); // 开始计时  
let nums = [1, 2, 4, 3, 5, 4, 7, 2]; // 测试数组  
console.log(findNumberOfLIS(nums)); // 输出结果  
console.timeEnd("673. 最长递增子序列的个数"); // 结束计时