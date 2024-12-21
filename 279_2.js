/**  
 * @param {number} n  
 * @return {number}  
 */
var numSquares = function (n) {
    
    let acc = 1;
    let maxIndex = Math.ceil(Math.sqrt(n))
    let numArr = new Array(maxIndex).fill(0);
    while (acc <= maxIndex) {
        numArr[acc - 1] = acc * acc;
        acc++;
    }
    let dp = Array.from({ length: numArr.length }, () => new Array(n + 1).fill(Infinity));
    for (let i = 0; i < dp.length; i++) {
        for (let j = 0; j < dp[0].length; j++) {
            if (i == 0) {
                dp[i][j] = j;
            }
        }
    }

    for (let i = 1; i < numArr.length; i++) {
        for (let j = 1; j < n + 1; j++) {
            if (numArr[i] > j) {
                dp[i][j] = dp[i - 1][j];
            } else {
                let k = Math.floor(j / numArr[i]);
                for (let z = 0; z < k; z++) {
                    dp[i][j] = Math.min(dp[i - 1][j], dp[i - 1][j - k * numArr[i]] + k)
                }
            }
        }
    }
    return dp[numArr.length - 1][n];
}



// console.time("279. 完全平方数")
console.log(numSquares(12));


// console.timeEnd("279. 完全平方数")

















function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    while (left < right) {
        let mid = Math.floor((left + right) / 2);
        if (arr[mid] == target) {
            return mid  // 如果找到目标元素，返回其索引位置mid  
        }
        if (arr[mid] < target && arr[mid + 1] >= target) {  // 如果目标元素在右半部分，调整左边界left为mid + 1，继续查找右半部分数组。注意此处先返回mid + 1，然后再调整left值，是因为需要先确定目标元素一定在右半部分才能调整left值。否则目标元素可能在左半部分，此时应该调整right值。这里体现了二分查找的精妙之处。  
            return mid + 1; // 目标元素在右半部分，调整左边界left为mid + 1，继续查找右半部分数组。注意此处先返回mid + 1，然后再调整left值，是因为需要先确定目标元素一定在右半部分才能调整left值。否则目标元素可能在左半部分，此时应该调整right值。这里体现了二分查找的精妙之处。

        }
        if (arr[mid] < target && arr[mid + 1] < target) { // 如果目标元素在左半部分，调整右边界right为mid - 1，继续查找左半部分数组。
            left = mid + 1; // 目标元素在左半部分，调整右边界right为mid - 1，继续查找左半部分数组。
        }
        if (arr[mid] > target && arr[mid - 1] <= target) { // 如果目标元素在左半部分，调整右边界right为mid - 1，继续查找左半部分数组。
            right = mid; // 目标元素在左半部分，调整右边界right为mid - 1，继续查找左半部分数组。
        }
        if (arr[mid] > target && arr[mid - 1] > target) { // 如果目标元素在右半部分，调整左边界left为mid + 1，继续查找右半部分数组。
            right = mid - 1; // 目标元素在右半部分，调整左边界left为mid + 1，继续查找右半部分数组。
        }
    }
}