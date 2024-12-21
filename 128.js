// function longestConsecutive(nums) {
//     let numSet = new Set(nums);
//     let maxLength = 0;
//     for (let num of numSet) {
//       if (!numSet.has(num - 1)) {
//         let currentNum = num;
//         let currentLength = 1;
  
//         while (numSet.has(currentNum + 1)) {
//           currentNum++;
//           currentLength++;
//         }
  
//         maxLength = Math.max(maxLength, currentLength);
//       }
//     }
//     return maxLength;
//   }
  
function longestConsecutive(nums) {
    

}
  // 使用示例
  let nums = [100, 4, 200, 1, 3, 2];
  let result = longestConsecutive(nums);
  console.log(result); // 输出 4
  
  nums = [0, 3, 7, 2, 5, 8, 4, 6, 0, 1];
  result = longestConsecutive(nums);
  console.log(result); // 输出 9