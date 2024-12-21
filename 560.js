// /**
//  * @param {number[]} nums
//  * @param {number} k
//  * @return {number}
//  */
// var subarraySum = function (nums, k) {

//     let subarrayList = calcsubArray(nums);
//     return subarrayList.reduce((sumA, v) => {
//         const currentNum = v.reduce((acc, v) => acc += v, 0)
//         if (currentNum === k) {
//             sumA++;
//         }
//         return sumA;
//     }, 0)

// };

// function calcsubArray(nums) {
//     const first = null;
//     let subarrayList = new Array();
//     for (let i = 0; i < nums.length; i++) {
//         let element = [nums[i]];
//         subarrayList = [...subarrayList.map(v => [...v, nums[i]]), ...subarrayList];
//         subarrayList.push(element)
//     }
//     // subarrayList = [...new Set(subarrayList.map(v => JSON.stringify(v)))].map(v=>JSON.parse(v));
//     return subarrayList;
// }


// 方法二：前缀和 + 哈希表优化
// 定义一个名为 subarraySum 的函数，它接收两个参数：一个名为 nums 的数组和一个名为 k 的数字  
function subarraySum(nums, k) {  
    // 初始化一个计数器，用于记录满足条件的子数组的数量  
    let count = 0;  
    // 初始化一个变量，表示当前子数组的前缀和  
    let pre = 0;  
    // 创建一个 Map 数据结构，用于存储前缀和以及对应的出现次数  
    const mp = new Map();  
    // 设置初始条件，即前缀和为0的次数为1  
    mp.set(0, 1);  
    // 遍历 nums 数组  
    for (let i = 0; i < nums.length; i++) {  
        // 计算当前位置的前缀和，即把当前元素加到以前缀和上  
        pre += nums[i];  
        // 检查是否存在一个前缀和，它与当前前缀和之差为 k  
        if (mp.has(pre - k)) {  
            // 如果存在这样的前缀和，那么将其出现次数累加到计数器上  
            count += mp.get(pre - k);  
        }  
        // 将当前前缀和对应的出现次数加1，如果之前不存在这个前缀和，则先创建它，再将其出现次数加1  
        mp.set(pre, (mp.get(pre) || 0) + 1);  
    }  
    // 返回计数器的值，即满足条件的子数组的数量  
    return count;  
}


// 示例用法
const nums = [1, 1, 1];
const k = 2;
// const result = subarraySum(nums, k);
// console.log(result); // 输出: 2
console.time("560. 和为 K 的子数组");
console.log(subarraySum(nums, k));

console.timeEnd("560. 和为 K 的子数组");


// let bol = false;
// const boolObj =  Boolean(false);

// if (Boolean(boolObj)) {
// }

// if (Boolean(bol) === Boolean(false)) {

// }

// let num = 123;


// // 低手
// let str = nums + ""

// // 高手

// let str = String(num);









