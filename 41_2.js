/**
 * @param {number[]} nums
 * @return {number}
 */


var firstMissingPositive = function (nums) {
    let hashObj = new Object();

    for (let i = 0; i < nums.length; i++) {
        const element = nums[i];
        hashObj[element] = element;
    }
     
      
    for (let i = 1; i <= nums.length+1 ; i++) {
        if (!(i in hashObj)) {
                return i;
        }
    }
};

console.time("41. 缺失的第一个正数");

let nums = [1,2,0]

console.log(firstMissingPositive(nums))

console.timeEnd("41. 缺失的第一个正数");