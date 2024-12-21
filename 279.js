/**  
 * @param {number} n  
 * @return {number}  
 */
var numSquares = function (n) {
    // 初始化累计器为1，表示第一个完全平方数1^2  
    let acc = 1;
    // 设置最大索引为10000，用于创建存储完全平方数的数组  
    let maxIndex = 10000;
    // 创建一个长度为maxIndex的数组，初始值全部为0  
    let numArr = new Array(maxIndex).fill(0);
    // 将数组中的每个元素的平方值存储到numArr中，同时累计每个完全平方数的个数  
    while (acc <= maxIndex) {
        numArr[acc - 1] = acc * acc;
        acc++;
    }
    // 通过二分查找找到n能够被哪些完全平方数整除  
    let arrS = numArr.slice(0, binarySearch(numArr, n) + 1);
    // 计算每个完全平方数n可以整除多少次  
    let multipleArr = arrS.map((v) => Math.floor(n / v));
    // 创建一个空数组用于存储每个完全平方数可以整除n的次数  
    let resultArr = new Array();
    // 递归函数，用于计算每个完全平方数可以整除n的次数，并将结果存储到resultArr中  
    dpRrcruision(0, 0, multipleArr, arrS, n, resultArr);
    // 返回resultArr数组中的最小值，即n可以被多少个不同的完全平方数整除  
    return Math.min(...resultArr)
};

// 定义递归函数dpRrcruision  
function dpRrcruision(start, frequence, multipleArr, arrS, n, resultArr) {
    // 如果multipleArr数组为空，表示已经遍历完所有完全平方数  
    if (multipleArr.length == 0) {
        // 如果start等于n，说明已经遍历完所有完全平方数，此时将当前遍历次数frequence添加到结果数组中  
        if (start == n) {
            resultArr.push(frequence);
        }
        return;
    }
    // 取出multipleArr数组的第一个元素和对应的完全平方数key  
    let maxIndex = multipleArr.shift();
    let key = arrS.shift();
    let element;
    // 对于每个完全平方数key，计算n可以整除多少次key，并将结果添加到递归调用中继续遍历  
    for (let i = 0; i < maxIndex + 1; i++) {
        element = i * key
        dpRrcruision(element + start, i + frequence, multipleArr, arrS, n, resultArr)
    }
    // 将已经移除的完全平方数和对应的次数重新添加回数组中，以便后续遍历使用  
    multipleArr.unshift(maxIndex);
    arrS.unshift(key);
}
// 定义二分查找函数binarySearch，用于找到n能够被哪些完全平方数整除  
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
console.time("279. 完全平方数")
console.log(numSquares(72));
console.timeEnd("279. 完全平方数")