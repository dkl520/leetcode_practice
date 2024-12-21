/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
    let left = 0;
    let right = nums.length - 1;
    if (nums.length == 1 && nums[0] == target) {
        return 0;
    }
    while (left < right) {
        const mid = Math.floor(left + (right - left) / 2);
        if (target == nums[left]) {
            return left;
        }
        if (target == nums[mid]) {
            return mid;
        }
        if (target == nums[right]) {
            return right;
        }

        if (nums[mid] > nums[right]) {

            if (target < nums[mid] && target > nums[left]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }

        } else {
            if (target > nums[mid] && target < nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    return -1;
};

console.time("33. 搜索旋转排序数组")
let nums = [4, 5, 6, 7, 0, 1, 2], target = 0;
console.log(search(nums, target))
console.timeEnd("33. 搜索旋转排序数组")