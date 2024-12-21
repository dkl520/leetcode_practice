/**
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function(nums) {
    let left = 1, right = nums.length - 1;

    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        let count = 0;

        for (const num of nums) {
            if (num <= mid) {
                count++;
            }
        }

        if (count > mid) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }

    return left;
};

// 示例
const nums1 = [11, 13, 14, 12, 12];
console.log(findDuplicate(nums1)); // 输出: 12
