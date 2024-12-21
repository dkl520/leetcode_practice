/**
 * @param {number[]} nums
 * @return {number}
 */


var firstMissingPositive = function (nums) {
    nums= [...new Set(nums)];
    nums.sort((a, b) => a - b);
    let start = nums.indexOf(1);
    let count = 1;
    if (start === -1) {
        return 1;
    } else {
        for (let i = start; i < nums.length; i++) {
            let el = nums[i];
            if (count !== el) {
                return count;
            }
            count++;
        }
        return count;

    }
};

console.time("41. 缺失的第一个正数");

let nums = [0,2,2,1,1];

console.log(firstMissingPositive(nums))

console.timeEnd("41. 缺失的第一个正数");