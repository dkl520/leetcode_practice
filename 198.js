/**
 * @param {number[]} nums
 * @return {number}
 */

let nums =[2,7,9,3,1];
var rob = function (nums) {
    let n = nums.length;
    let dp = new Array(n).fill(0);

    for (let i = 0; i < n; i++) {
        const element = nums[i];
        if (i == 0 || i == 1) {
            dp[i] = element
        }
        if (i == 2) {
            dp[i] = element + dp[i - 2];
        }
        if (i >= 3) {
            dp[i] = element + Math.max(dp[i - 2], dp[i - 3])
        }
    }
    if (n == 1) {
        return dp[n-1]
    }
    if (n == 2) {
        return Math.max(dp[n - 1], dp[n - 2])
    }
    return Math.max(dp[n - 1], dp[n - 2]);
};
console.time("198. 打家劫舍")

console.log(rob(nums));

console.timeEnd("198. 打家劫舍")