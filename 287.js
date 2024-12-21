// 定义一个函数 findDuplicate，接受一个数组 nums 作为参数  

// 这种方法的原理基于这样一个事实：在 1 到 n 的整数中，如果有 x 个数字小于等于 mid，那么应该恰好有 x 个数字大于 mid。
// 如果出现偏差，说明重复的数字就在这个偏差的区间内。通过不断调整左右边界，最终可以找到重复的数字。
var findDuplicate = function (nums) {  
    // 初始化左边界 left 为 1，右边界 right 为数组 nums 的最后一个元素的索引  
    let left = 1, right = nums.length - 1;  
  
    // 使用 while 循环进行二分查找  
    while (left < right) {  
        // 计算中间索引 mid  
        const mid = Math.floor((left + right) / 2);  
          
        // 初始化计数器 count 为 0，用于统计数组中小于等于 mid 的数字的数量  
        let count = 0;  
  
        // 遍历数组 nums  
        for (const num of nums) {  
            // 如果当前数字 num 小于等于 mid，则计数器 count 加 1  
            if (num <= mid) {  
                count++;  
            }  
        }  
  
        // 如果 count（小于等于 mid 的数字的数量）大于 mid  
        // 说明重复的数字在 mid 的右侧，因此更新右边界 right 为 mid  
        debugger
        if (count > mid) {  
            right = mid;  
        } else {  
            // 否则，重复的数字在 mid 的左侧或就是 mid 本身  
            // 因此更新左边界 left 为 mid + 1  
            left = mid + 1;  
        }  
    }  
  
    // 循环结束后，left 和 right 会相等，指向重复的数字  
    // 因此返回 left（或 right）作为结果  
    return left;  
};

// 示例
const nums1 = [11, 13, 14, 12, 12];
console.log(findDuplicate(nums1)); // 输出: 2

const nums2 = [3, 1, 3, 4, 2];
console.log(findDuplicate(nums2)); // 输出: 3
