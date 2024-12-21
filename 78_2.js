/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
    let resultArr = new Array();
    resultArr.push([]);
    let listArr = new Array();
    for (let i = 1; i < nums.length; i++) {
        BackTracking(nums, i, resultArr, listArr)
    }
    resultArr.push(nums);
    return resultArr;
};

function BackTracking(nums, number, resultArr, listArr) {
    if (listArr.length === number) {
        resultArr.push(JSON.parse(JSON.stringify(listArr)));
        return;
    }
    for (let i = 0; i < nums.length; i++) {
        const element = nums[i];
        listArr.push(element)
        BackTracking(nums.slice(i + 1), number, resultArr, listArr);
        listArr.pop();
    }
}


// 连续子集
let nums = [1, 2, 3]
console.time("78. 子集");

console.log(subsets(nums));
console.timeEnd("78. 子集");