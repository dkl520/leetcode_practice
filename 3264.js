/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} multiplier
 * @return {number[]}
 */
var getFinalState = function (nums, k, multiplier) {
    let n = nums.length;
    while (k > 0) {
      let min = Number.MAX_VALUE;
      let index = -1;
      for (let i = 0; i < n; i++) {
        if (min > nums[i]) {
          min = nums[i];
          index = i;
        }
      }
      nums[index] = nums[index] * multiplier;
  
  
      k--;
    }
  
    return nums;
  
  };

  let min= Number.MAX_VALUE;
  let a = 2**32-1;
  console.log(min,"最大值");
  console.log(a,"aaaaa");