// 跳跃更多的函数  
var jumpMore = function (dp, nums, start, maxStep) {  
    // 如果已经到达数组的最后一个索引，则无需继续跳跃，直接返回  
    if (start >= nums.length - 1) {  
        return;  
    }  
    let max = Number.NEGATIVE_INFINITY;  // 用于记录当前可以到达的最远位置  
    let maxIndex = -1;  // 记录最远位置的索引  
    // 遍历可以跳跃的每一步  
    for (let i = 1; i <= maxStep; i++) {  
        // 更新当前步数对应的最大跳跃距离  
        dp[i + start] = Math.min(dp[start] + 1, dp[i + start]);  
  
        // 如果已经到达或超过数组的最后一个索引，则无需继续计算  
        if (i + start >= nums.length - 1) {  
            return;  
        }  
        // 计算当前位置可以到达的最远距离  
        if (nums[i + start] + start + i > max) {  
            max = nums[i + start] + start + i;  
            maxIndex = i + start;  
        }  
    }  
    // 递归调用，从最远位置开始跳跃  
    jumpMore(dp, nums, maxIndex, nums[maxIndex]);  
}  
// 跳跃函数  
var jump = function (nums) {  
    const n = nums.length;  // 数组的长度  
    let dp = new Array(n).fill(Infinity);  // 创建一个与数组长度相同的dp数组，初始值为无穷大  
    dp[0] = 0;  // 起始位置的跳跃次数为0  
    jumpMore(dp, nums, 0, nums[0]);  // 从起始位置开始跳跃  
    return dp[n - 1];  // 返回到达最后一个索引需要的最少跳跃次数  
}  
let nums = [5, 7, 4, 4, 6, 5, 4, 4, 7, 4, 8, 2, 6, 8, 1, 5, 9, 6, 5, 2];  // 给定的数组  
console.time("55. 跳跃游戏");  // 开始计时  
console.log(jump(nums));  // 输出最少跳跃次数  
console.timeEnd("55. 跳跃游戏");  // 结束计时