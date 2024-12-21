/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
    if (nums.length <= 3) {
        return Math.max(...nums);
    }
    let dp = new Array(nums.length).fill(0);

    for (let i = 0; i < nums.length - 1; i++) {
        const element = nums[i];
        if (i < 2) {
            dp[i] = nums[i]
        }
        if (i == 2) {
            dp[i] = nums[i] + dp[i - 2];
        }
        if (i > 2) {

            dp[i] = Math.max(nums[i] + dp[i - 2], nums[i] + dp[i - 3])
        }
    }
    let dp2 = new Array(nums.length).fill(0);
    for (let i = 1; i < nums.length ; i++) {
        if (i < 3) {
            dp2[i] = nums[i]
        }
        if (i == 3) {
            dp2[i] = nums[i] + dp2[i - 2];
        }
        if (i > 3) {
            dp2[i] = Math.max(nums[i] + dp2[i - 2], nums[i] + dp2[i - 3])
        }
    }
    return   Math.max(...[...dp,...dp2]);
};

let nums = [1, 2, 3, 1];

console.time("rob")

console.log(rob(nums));

console.timeEnd("rob")


// 这段代码是一个函数rob，它的目的是解决一个经典的动态规划问题：打家劫舍。给定一个数组nums，表示每个房屋中的钱数，
// 一个窃贼想要偷窃房屋，但他不能偷窃相邻的房屋，因为这样会增加他被抓住的风险。他的目标是偷窃的房屋中的最大金额。

// rob函数，输入是一个数组nums，表示每个房屋中的钱数  
var rob = function(nums) {  
    // 获取数组的长度  
    const n = nums.length;  
    // 如果数组的长度小于或等于3，那么直接返回数组中的最大值，因为即使偷窃相邻的房屋，也最多只有三个房屋可以选择  
    if (n <= 3) {  
        return Math.max(...nums);  
    }  
    // calculateMax函数，用于计算在不偷窃相邻房屋的情况下，可以偷窃的最大金额  
    function calculateMax(nums) {  
        // prevMax表示前一个房屋的最大金额  
        let prevMax = nums[0];  
        // currentMax表示当前房屋的最大金额  
        let currentMax = Math.max(nums[0], nums[1]);  
  
        // 从第三个房屋开始遍历数组  
        for (let i = 2; i < nums.length; i++) {  
            // 临时保存currentMax的值，以便在下一次迭代中使用  
            const temp = currentMax;  
            // 更新currentMax，要么选择偷窃当前房屋（加上前一个房屋的最大金额），要么选择不偷窃当前房屋（保持上一个房屋的最大金额不变）  
            currentMax = Math.max(currentMax, prevMax + nums[i]);  
            // 更新prevMax为之前的currentMax的值  
            prevMax = temp;  
        }  
  
        // 返回偷窃房屋的最大金额  
        return currentMax;  
    }  
  
    // 返回两种情况下的最大值：偷窃从第一个房屋到倒数第二个房屋的最大金额，以及偷窃从第二个房屋到最后一个房屋的最大金额  
    return Math.max(  
        calculateMax(nums.slice(0, n - 1)),  
        calculateMax(nums.slice(1, n))  
    );  
};











console.time("213. 打家劫舍 II")

console.log(rob(nums))

console.timeEnd("213. 打家劫舍 II")