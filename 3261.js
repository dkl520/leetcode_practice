var countKConstraintSubstrings = function(s, k, queries) {
    const n = s.length; // 获取字符串长度
    const count = [0, 0]; // 用于记录当前窗口内 '0' 和 '1' 的数量
    const right = Array(n).fill(n); // 用于记录从每个位置开始第一个不满足条件的位置
    const prefix = Array(n + 1).fill(0); // 前缀和数组，用于计算合法子串的个数
    let i = 0; // 左指针，表示当前窗口的起始位置

    // 遍历字符串的每个字符，使用双指针方法扩展窗口
    for (let j = 0; j < n; ++j) {
        count[s[j] - '0']++; // 更新当前字符计数

        // 如果窗口内 '0' 和 '1' 的数量都超过了 k，收缩窗口
        while (count[0] > k && count[1] > k) {
            count[s[i] - '0']--; // 左指针字符计数减少
            right[i] = j; // 记录从 i 位置开始第一个不满足条件的位置
            i++; // 左指针右移
        }

        // 更新前缀和数组，表示从窗口 i 到 j 的合法子串数量
        prefix[j + 1] = prefix[j] + (j - i + 1);
    }

    const res = []; // 存储每个查询的结果

    // 遍历每个查询
    for (const query of queries) {
        const l = query[0], r = query[1]; // 获取查询的左右边界
        const i = Math.min(right[l], r + 1); // 找到从 l 开始第一个不满足条件的位置（或右边界 + 1）

        // 计算部分1：从 l 到 i-1 位置的合法子串数量（等差数列求和公式）
        const part1 = Math.floor((i - l + 1) * (i - l) / 2);

        // 计算部分2：从 i 到 r 位置的合法子串数量，使用前缀和计算
        const part2 = prefix[r + 1] - prefix[i];

        // 将两个部分的结果相加并加入结果数组
        res.push(part1 + part2);
    }

    return res; // 返回所有查询的结果
};
