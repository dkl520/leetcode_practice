function countingSortWithNegatives(arr) {
    if (arr.length === 0) return arr;

    // 找到数组中的最大值和最小值
    const max = Math.max(...arr);
    const min = Math.min(...arr);

    // 计算偏移量
    const range = max - min + 1;
    const offset = -min;

    // 初始化计数数组
    const count = new Array(range).fill(0);
    debugger
    // 统计每个元素出现的次数
    for (let i = 0; i < arr.length; i++) {
        count[arr[i] + offset]++;
    }

    // 重建排序后的数组
    let sortedIndex = 0;
    for (let i = 0; i < count.length; i++) {
        while (count[i] > 0) {
            arr[sortedIndex++] = i - offset;
            count[i]--;
        }
    }

    return arr;
}

// 测试计数排序
const arr = [4, -2, 2, -8, 3, -3, 1];
console.log("排序前：", arr);
const sortedArr = countingSortWithNegatives(arr);
console.log("排序后：", sortedArr);
