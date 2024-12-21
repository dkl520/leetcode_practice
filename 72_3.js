function minDistance(word1, word2) {
    let n = word1.length; // 获取第一个字符串的长度
    let m = word2.length; // 获取第二个字符串的长度

    // 有一个字符串为空串的情况，直接返回另一个字符串的长度
    if (n * m === 0) {
        return n + m;
    }

    // 初始化 DP 数组，D[i][j] 表示将 word1 的前 i 个字符转换为 word2 的前 j 个字符所需的最小操作数
    let D = Array.from(Array(n + 1), () => Array(m + 1).fill(0));

    // 初始化边界状态，即将一个字符串转换为空字符串所需的操作数
    for (let i = 0; i < n + 1; i++) {
        D[i][0] = i; // 将 word1 的前 i 个字符转换为空字符串需要 i 次删除操作
    }
    for (let j = 0; j < m + 1; j++) {
        D[0][j] = j; // 将空字符串转换为 word2 的前 j 个字符需要 j 次插入操作
    }

    // 计算所有 DP 值，填充数组
    for (let i = 1; i < n + 1; i++) {
        for (let j = 1; j < m + 1; j++) {
            let left = D[i - 1][j] + 1; // 从 D[i-1][j] 转移到 D[i][j]，表示删除 word1[i-1]
            let down = D[i][j - 1] + 1; // 从 D[i][j-1] 转移到 D[i][j]，表示在 word1[i-1] 后插入 word2[j-1]
            let leftDown = D[i - 1][j - 1]; // 从 D[i-1][j-1] 转移到 D[i][j]，表示替换 word1[i-1] 为 word2[j-1]

            // 如果当前字符不相等，需要加 1 表示替换操作
            if (word1.charAt(i - 1) !== word2.charAt(j - 1)) {
                leftDown += 1;
            }

            // 取三者中的最小值作为 D[i][j] 的值
            D[i][j] = Math.min(left, Math.min(down, leftDown));
        }
    }

    // 返回将整个 word1 转换为 word2 所需的最小操作数
    return D[n][m];
}

// 测试函数
console.log(minDistance("horse", "ros")); // 输出: 3
console.log(minDistance("intention", "execution")); // 输出: 5
