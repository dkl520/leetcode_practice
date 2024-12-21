/**
 * @param {number[]} nums
 * @return {number}
 */
var reversePairs = function (nums) {
    let count = 0;
    for (let i = 0; i < nums.length - 1; i++) {
        const eli = nums[i];
        for (let j = i + 1; j < nums.length; j++) {
            const elj = nums[j];
            if (2 * elj < eli) {
                count++;
            }
        }
    }
    return count;
};


let nums = [1, 3, 2, 3, 1];
let resutlt = reversePairs(nums);

console.log(resutlt);


