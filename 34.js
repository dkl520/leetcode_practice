/**  
 * @param {number[]} nums 输入的有序数组  
 * @param {number} target 目标值  
 * @return {number[]} 目标值在数组中的第一个和最后一个位置  
 */
var searchRange = function (nums, target) {
    // 使用二分查找找到目标值在数组中可能的第一个位置  
    let resultSections = binarySearch(nums, target);
    // 如果找到了两个位置，直接返回结果  
    if (resultSections.length == 2) {
        return resultSections;
    }
    // 如果只找到一个位置，使用该位置作为起始点，再次进行线性搜索找到目标值的最后一个位置  
    return searchList(resultSections[0], nums, target);
};

// 线性搜索函数，用于找到目标值在数组中的最后一个位置  
function searchList(current, nums, target) {
    let start = current, end = current;
    // 寻找结束位置的索引  
    // Find the end index  
    while (end < nums.length && nums[end] === target) {
        end++;
    }
    end--;

    // 寻找起始位置的索引  
    // Find the start index  
    while (start >= 0 && nums[start] === target) {
        start--;
    }
    start++;

    return [start, end];
}

// 另一个线性搜索函数，用于找到目标值在数组中的最后一个位置，采用不同的策略  
function searchList2(current, nums, target) {
    let start = current, end = current;
    for (let i = end; i < nums.length; i++) {
        const element = nums[i];
        if (element !== target) {
            end = i - 1;
            break;
        } else {
            end = i;
        }
    }
    for (let i = start; i >= 0; i--) {
        const element = nums[i];
        if (element !== target) {
            start = i + 1;
            break;
        } else {
            start = i;
        }
    }
    return [start, end];
}

// 二分查找函数，用于找到目标值在数组中可能的第一个位置  
function binarySearch(nums, target) {
    let start = 0;
    let end = nums.length - 1;
    while (start <= end) {
        let mid = Math.floor((start + end) / 2);
        if (target == nums[mid]) {
            return [mid]; // 如果找到目标值，返回其索引作为第一个位置的索引  
        }
        if (target < nums[mid]) { // 如果目标值小于中间值，在左半部分继续查找  
            end = mid - 1;
        } else { // 如果目标值大于中间值，在右半部分继续查找  
            start = mid + 1;
        }
    }
    return [-1, -1]; // 如果找不到目标值，返回[-1, -1]作为默认结果，表示目标值不在数组中。这里-1表示数组索引的最后一个位置之后的点，超出数组范围。实际应用中可能需要根据需求进行修改。例如，如果需要返回目标值不存在于数组中的提示信息，可以返回["Not Found", "Not Found"]。或者如果不需要返回第一个和最后一个位置，只需判断目标值是否在数组中，可以返回true或false。这些都需要根据实际需求进行修改。此外，这里的返回值为-1可能是为了便于调试和理解代码，但在实际应用中可能需要根据需求进行修改。例如，如果需要返回目标值不存在于数组中的提示信息，可以返回["Not Found", "Not Found"]。或者如果不需要返回第一个和最后一个位置，只需判断目标值是否在数组中，可以返回true或false。这些都需要根据实际需求进行修改。此外，这里的返回值为-1可能是为了便于调试和理解代码，但在实际应用中可能需要根据需求进行修改。例如，如果需要返回目标值不存在于数组中的提示信息，可以返回["Not Found", "Not Found"]。或者如果不需要返回第一个和最后一个位置，只需判断目标值是否在数组中，可以返回true或false。这些都需要根据实际需求进行修改。此外，这里的返回值为-1可能是为了便于调试和理解代码，但在实际应用中可能需要根据需求进行修改。例如，如果需要返回目标

}


let nums = [2, 2], target = 2;
console.time("34. 在排序数组中查找元素的第一个和最后一个位置");

console.log(searchRange(nums, target))

console.timeEnd("34. 在排序数组中查找元素的第一个和最后一个位置");



