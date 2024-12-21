
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function (nums) {
    const n = nums.length;
    let dp = new Array(n).fill(false);
    dp[0] = true;
    jump(dp, nums, 0, nums[0]);
    return dp[n - 1];
}
function jump(dp, nums, start, maxStep) {
    if (dp[nums.length - 1]) {
        return;
    }
    for (let i = maxStep; i >= 0; i--) {
        if (!Boolean(dp[i + start])) {
            dp[i + start] = true;
            jump(dp, nums, i + start, nums[i + start])
            if (dp[nums.length - 1]) {
                return;
            }
        }
    }
}



console.time("55. 跳跃游戏")

console.log(canJump(nums));

console.timeEnd("55. 跳跃游戏")