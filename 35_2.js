var searchInsert = function (nums, target) {
    let start = 0, end = nums.length - 1;

    while (start <= end) {
        let mid = Math.floor((start + end) / 2);
        if (target === nums[mid]) {
            return mid;
        } else if (target < nums[mid]) {
            end = mid - 1;
        } else {
            start = mid + 1;
        }
    }

    return start;
};

let nums = [1, 3, 5, 6], target = 2;

console.time("35. 搜索插入位置")
console.log(searchInsert(nums, target));
console.timeEnd("35. 搜索插入位置");