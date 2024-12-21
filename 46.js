

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
    let results = new Array();
    let n = nums.length;
    recrusion(nums, results, n, [])
    return results;
};


function recrusion(nums, results, n, result) {
    if (result.length === n) {
        results.push(result.slice());
        return;
    }
    for (let i = 0; i < nums.length; i++) {
        const element = nums[i];
        result.push(element);
        let newNums = nums.slice();
        newNums.splice(i, 1);
        recrusion(newNums, results, n, result)
        result.pop();
    }
}

let nums = [1, 2, 3];

console.time("46. 全排列")
console.log(permute(nums));
console.timeEnd("46. 全排列")
