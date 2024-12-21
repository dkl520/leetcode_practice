/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
//枚举法
var twoSum = function (nums, target) {
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    const el = nums[i];
    const el2Index = nums.indexOf(target - el);
    if (el2Index >= 0 && el2Index !== i) {
      return [i, el2Index];
    }
  }
};

// 字典

var twoSum = function (nums, target) {
  const n = nums.length;
  let dict = {};
  for (let i = 0; i < n; i++) {
    dict[nums[i]] = i;
  }
  for (let i = 0; i < n; i++) {
    let el2 = target - nums[i];
    if (dict[el2] && dict[el2] !== i) {
      return [i, dict[el2]];
    }
  }
};
