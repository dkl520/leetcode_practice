/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {

    nums.sort((a, b) => a - b);

    for (let i = 0; i < k; i++) {
        // const element = array[i];
        if (i == k - 1) {
            return nums.pop();
        }
        nums.pop();
    }
};



let nums = [3, 2, 1, 5, 6, 4]; let k = 2;
console.time("215. 数组中的第K个最大元素")

console.log(findKthLargest(nums, k));

console.timeEnd("215. 数组中的第K个最大元素")