/**
 * @param {number[]} nums
 * @return {number}
 */
function maxProduct(nums) {
    if (nums.length === 0) return 0;

    // 初始化全局最大值和当前子数组的最大值和最小值
    let globalMax = nums[0];
    let currentMax = nums[0];
    let currentMin = nums[0];

    // 遍历数组，从第二个元素开始
    for (let i = 1; i < nums.length; i++) {
        let num = nums[i];

        // 如果当前数字为负数，则交换 currentMax 和 currentMin
        debugger
        if (num < 0) {
            [currentMax, currentMin] = [currentMin, currentMax];
        }
        debugger
        // 更新当前子数组的最大值和最小值
        currentMax = Math.max(num, currentMax * num);
        currentMin = Math.min(num, currentMin * num);

        // 更新全局最大值
        globalMax = Math.max(globalMax, currentMax);
        debugger

    }

    return globalMax;
}

let nums = [2, 3, -2, 4]


console.log(maxProduct(nums))