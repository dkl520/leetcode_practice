function hIndex(citations) {
    const n = citations.length;
    const count = Array(n + 1).fill(0);

    // 填充计数数组
    for (let citation of citations) {
        if (citation >= n) {
            count[n]++;
        } else {
            count[citation]++;
        }
    }
    // 从高到低计算 h 指数
    let total = 0;
    for (let i = n; i >= 0; i--) {
        total += count[i];
        if (total >= i) {
            return i;
        }
    }

    return 0;
}

// 示例用法
console.log(hIndex([3, 0, 6, 1, 5])); // 输出: 3
// console.log(hIndex([1, 3, 1])); // 输出: 1
