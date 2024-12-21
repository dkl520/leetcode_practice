

/**
 * @param {number[]} nums
 * @return {number}
 */

// 这段代码实现了一个函数singleNumber，它接收一个数字数组nums作为参数，并返回一个数字。
// 该函数的目的是找出一个在数组中只出现一次的数字，
var singleNumber = function (nums) {
    let ans = 0;
    for (let i = 0; i < nums.length; i++) {
        const element = nums[i];
        ans ^= element;
    }
    return ans;
};


let nums = [2, 2, 1];
console.time("136. 只出现一次的数字");
console.log(singleNumber(nums))

console.timeEnd("136. 只出现一次的数字");