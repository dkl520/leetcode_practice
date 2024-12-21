class Solution {
    maxProduct(nums) {
        let maxF = nums[0], minF = nums[0], ans = nums[0];
        let length = nums.length;

        for (let i = 1; i < length; i++) {
            let mx = maxF, mn = minF;

            maxF = Math.max(mx * nums[i], nums[i], mn * nums[i]);
            minF = Math.min(mx * nums[i], nums[i], mn * nums[i]);
            ans = Math.max(maxF, ans);
        }

        return ans;
    }
}

// 示例测试
const solution = new Solution();
const nums1 = [2, 3, -2, 4];
console.log(solution.maxProduct(nums1));  // 输出: 6

// const nums2 = [-2, 0, -1];
// console.log(solution.maxProduct(nums2));  // 输出: 0