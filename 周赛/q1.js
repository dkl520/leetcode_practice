/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumOperations = function (nums) {
    let n = nums.length;
  
    let map = new Map();
    for (const num of nums) {
        map.set(num, (map.get(num) || 0) + 1);
    }
    let step = 0;
    for (let i = 0; i < nums.length; i += 3) {
        let isContinue = false;
        map.forEach((value, key) => {
            if (value >= 2) {
                isContinue = true;
            }
        });
        if (!isContinue) {
            break;
        }


        if (i < nums.length) {
            let a = nums[i];
            map.set(a, map.get(a) - 1);
        }
        if (i + 1 < nums.length) {
            let b = nums[i + 1];
            map.set(b, map.get(b) - 1);
        }

        if (i + 2 < nums.length) {
            let c = nums[i + 2];
            map.set(c, map.get(c) - 1);
        }

        step += 1;
    }
    return step;

};
let nums = [5,5];
let result = minimumOperations(nums)
debugger
