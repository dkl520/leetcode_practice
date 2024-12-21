/**
 * @param {number[]} nums
 * @return {number}
 */
/**  
 * 在旋转排序数组中查找最小元素  
 *  
 * @param {number[]} nums - 输入的数字数组  
 * @return {number} - 数组中的最小数字  
 */  
function findMin(nums) {  
    // 初始化左右指针，左指针指向数组起始位置，右指针指向数组末尾位置  
    let left = 0;  
    let right = nums.length - 1;  
  
    // 当左指针小于右指针时，执行循环  
    while (left < right) {  
        // 计算中间指针位置，使用 Math.floor 进行向下取整，避免浮点数问题  
        const mid = Math.floor(left + (right - left) / 2);  
  
        // 如果中间元素大于右边界元素，说明最小值在右半部分  
        // 因为数组是旋转排序的，所以右半部分（包括右边界）是升序的  
        if (nums[mid] > nums[right]) {  
            // 将左指针移动到中间指针的右侧  
            left = mid + 1;  
        }  
        // 如果中间元素小于等于右边界元素，说明最小值在左半部分或中间元素就是最小值  
        // 这种情况下，左半部分（包括中间指针）可能是升序的，或者中间元素就是最小值  
        else {  
            // 将右指针移动到中间指针的位置  
            right = mid;  
        }  
    }  
  
    // 循环结束后，左指针和右指针指向同一个位置，这个位置就是最小元素的位置  
    return nums[left];  
}