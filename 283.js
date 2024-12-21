/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
// var moveZeroes = function (nums) {
//     let arrNormal = new Array();
//     let zeroNum = new Array();
//     for (let index = 0; index < nums.length; index++) {
//         const element = nums[index];
//         if (element == 0) {
//             zeroNum.push(element)
//         } else {
//             arrNormal.push(element)
//         }
//     }
//     return [...arrNormal, ...zeroNum];
// }

// nums = [0, 1, 0, 3, 12];

// var moveZeroes = function (nums) {
//     const zeroNums = nums.filter((v) => v == 0).length
//     for (let index = 0; index < nums.length; index++) {
//         const element = nums[index];
//         if (element == 0) {
//             nums.splice(index, 1);
//             nums.push(0);
//             index--;
//         }
//         let validZeroNums = nums.slice(nums.length - zeroNums);
//         if (validZeroNums.every(value => value == 0)) {
//             return nums;
//         }
//     }
// }

// 双指针
// function moveZeroes(nums) {
//     // 如果传入的数组为空，则直接返回，不进行任何操作  
//     if (nums === null) {
//         return;
//     }
//     // 定义一个变量j，用来记录非零元素在数组中新的位置的索引  
//     let j = 0;
//     // 遍历数组中的每一个元素  
//     for (let i = 0; i < nums.length; ++i) {
//         // 如果当前元素不等于0  
//         if (nums[i] !== 0) {
//             // 将非零元素按照其在原数组中的位置赋值给新数组的对应位置  
//             nums[j++] = nums[i];
//         }
//     }
//     // 遍历数组中所有位置，从j到数组末尾的元素都设为0，因为这些位置原本是0，现在被移动到了数组的末尾  
//     for (let i = j; i < nums.length; ++i) {
//         nums[i] = 0;
//     }
//     return nums;
// }


function moveZeroes(nums) {
    // 如果传入的数组为空，则直接返回，不进行任何操作  
    if (nums === null) {
        return;
    }
    let key = 0;
    for (let i = 0; i < nums.length; i++) {
        const element = nums[i];
        if (element !== 0) {
            [nums[key], nums[i]] = [nums[i], nums[key]];
            key++;
        }
    }
    return nums;
}






nums = [0, 1, 0, 3, 12];

// 移动零到最后

let result = moveZeroes(nums);
debugger
