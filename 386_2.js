/**
 * @param {string[]} list
 * @return {string[]}
 */
function lexicalOrder(list) {
    // 获取数组的长度
    let n = list.length;
    // 插入排序算法
    for (let i = 1; i < n; i++) {
        let key = list[i];
        let j = i - 1;
        // 比较当前元素与已排序部分的元素，如果当前元素较小，则交换位置
        while (j >= 0 && list[j] > key) {
            list[j + 1] = list[j];
            j = j - 1;
        }
        list[j + 1] = key;
    }
    return list;
}

let arr = [
    'c',
    "apple",
    'ax',
];

console.log(lexicalOrder(arr)); // ["apple", "ax", "c"]
