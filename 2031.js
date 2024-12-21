/**
 * @param {number[]} nums
 * @return {number}
 */
var subarraysWithMoreZerosThanOnes = function (nums) {

    let n = nums.length;
    let prefixSum = new Array(n + 1).fill(0)
    let sum = 0;

    for (let i = 0; i < n; i++) {
        if (nums[i] == 0) {
            sum--;
        } else {
            sum++;
        }
        prefixSum[i + 1] = sum;
    }

    let result = 0;
    for (let i = 0; i <= n; i++) {
        let left = 0;
        let right = i;
            





    }
    return result;
};


//   if(prefixSum[j+1] - prefixSum[i] > 0   ){
//     result++;
// }

let nums = [0, 1, 1, 0, 1];
subarraysWithMoreZerosThanOnes(nums)
