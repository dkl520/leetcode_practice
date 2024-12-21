/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function (nums) {

    return nums.map(v => Math.pow(v, 2)).sort((a, b) => a - b);


};



let nums = [-4, -1, 0, 3, 10];

let result = sortedSquares(nums);

debugger