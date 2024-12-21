/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
    let resultArr = new Array();
    resultArr.push([]);
    let list = new Array();
    for (let i = 0; i < nums.length; i++) {
        const element = nums[i];
        list.map(v => v.push(element));
        list.push([element]);
        resultArr.push(...JSON.parse(JSON.stringify(list)));
    }

};


// 连续子集
let nums= [1,2,3]
console.time("78. 子集");

console.log(subsets(nums));
console.timeEnd("78. 子集");