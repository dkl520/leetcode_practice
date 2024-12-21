/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function (nums, k) { // 定义一个名为 rotate 的函数，接收两个参数：一个数组 nums 和一个数字 k  
    let newArr = nums.splice(nums.length - k, k); // 从 nums 中移除最后 k 个元素并存储到 newArr 数组中  
    return [...newArr, ...nums]; // 使用扩展运算符将 newArr 和 nums 拼接起来，并返回这个新数组  
};
var rotate2 = function (nums, k) { // 定义第二个名为 rotate2 的函数，接收两个参数：一个数组 nums 和一个数字 k  
    k = k % nums.length; // 对 k 取余数，确保其值在有效范围内（0 到 nums.length-1）  
    nums.splice(0, 0, ...nums.splice(-k)); // 在 nums 数组前面插入移除的元素（从尾部开始），实现循环右移  
};
var rotate3 = function (nums, k) { // 定义第三个名为 rotate3 的函数，接收两个参数：一个数组 nums 和一个数字 k  
    k = k % nums.length; // 对 k 取余数，确保其值在有效范围内（0 到 nums.length-1）  
    let newArr = nums.splice(nums.length - k, k); // 从 nums 中移除最后 k 个元素并存储到 newArr 数组中  
    nums.splice(0, 0, ...newArr); // 在 nums 数组前面插入移除的元素（从尾部开始），实现循环右移  
    return nums; // 返回修改后的 nums 数组  
};

let nums = [1, 2, 3, 4, 5, 6, 7], k = 3;
console.time("189. 轮转数组");
console.log(rotate3(nums, k))
console.timeEnd("189. 轮转数组");