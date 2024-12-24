/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxDistinctElements = function (nums, k) {
    let set = new Set();
    if (nums.length <= 1) return nums.length;
    let n = nums.length;
    let arrChange = [];
    for (let i = -k; i <= k; i++) {
        arrChange.push(i);
    }

    nums.sort((a, b) => a - b);

    let left = 0;
    let right = n - 1;
   
    if(k==0) return (new Set(nums)).size;
    while (left <= right) {
        if (left == right) {
            for (let i = 0; i < arrChange.length; i++) {
                if (!set.has(nums[left] + arrChange[i])) {
                    set.add(nums[left] + arrChange[i]);
                    break;
                }
            }
            break;
        }
        let countleft = 0;
        for (let i = 0; i < arrChange.length; i++, countleft = i) {
            if (!set.has(nums[left] + arrChange[i])) {
                set.add(nums[left] + arrChange[i]);
                break;
            }
        }
        if (countleft == arrChange.length) {
            break;
        }
        let countright = 0;
        for (let i = arrChange.length - 1; i >= 0; i--, countright = i) {
            if (!set.has(nums[right] + arrChange[i])) {
                set.add(nums[right] + arrChange[i]);
                break;
            }
        }
        if (countright == -1) {
            break;
        }



        left++;
        right--;

    }
    return set.size;



};
let nums = [6, 7, 5, 10, 5];
console.log(

    maxDistinctElements(nums, 0)
)