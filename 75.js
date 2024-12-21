// 定义一个名为 sortColors 的函数，参数为一个数组 nums  
function sortColors(nums) {
    // 获取数组的长度  
    let n = nums.length;
    // 初始化两个指针 p0 和 p1，都指向数组的起始位置  
    let p0 = 0, p1 = 0;
    // 遍历数组  
    for (let i = 0; i < n; ++i) {
        // 如果当前元素为1（红色）  
        if (nums[i] === 1) {
            // 临时存储当前元素的值  
            let temp = nums[i];
            // 将当前元素的值替换为 p1 指向的元素的值  
            nums[i] = nums[p1];
            // 将 p1 指向的元素的值替换为当前元素的值  
            nums[p1] = temp;
            // 将 p1 指针向后移动一位，指向下一个元素  
            ++p1;
            // 如果当前元素为0（白色）  
        } else if (nums[i] === 0) {
            // 临时存储当前元素的值  
            let temp = nums[i];
            // 将当前元素的值替换为 p0 指向的元素的值  
            nums[i] = nums[p0];
            // 将 p0 指向的元素的值替换为当前元素的值  
            nums[p0] = temp;
            // 如果 p0 小于 p1，交换当前元素与 p1 指向的元素的值  
            if (p0 < p1) {
                temp = nums[i];
                nums[i] = nums[p1];
                nums[p1] = temp;
            }
            // 将 p0 和 p1 指针都向后移动一位，指向下一个元素  
            ++p0;
            ++p1;
        }
    }
}

let nums = [0, 1, 1, 2, 2, 1, 0]



console.time("75. 颜色分类")

console.log(sortColors(nums));
console.timeEnd("75. 颜色分类")