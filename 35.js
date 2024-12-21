/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function (nums, target) {
    let start = 0, end = nums.length - 1;
    if (nums[start] > target) {
        return start;
    }
    if (nums[end] < target) {
        return end + 1;
    }
    return binarySearch(nums, target, start, end)
};

function binarySearch(nums, target, start, end) {

    let mid = Math.floor((start + end) / 2);
    if (target > nums[mid] && target < nums[mid + 1]) {
        return mid + 1;
    }
    if (target == nums[mid]) {
        return mid;
    }
    if (target == nums[mid + 1]) {
        return mid + 1;
    }

    if (target < nums[mid]) {
        return binarySearch(nums, target, start, mid)
    }

    if (target > nums[mid + 1]) {
        return binarySearch(nums, target, mid + 1, end)
    }
}

let nums = [1, 3, 5, 6], target = 7;

console.time("35. 搜索插入位置")

console.log(searchInsert(nums, target));
console.timeEnd("35. 搜索插入位置")