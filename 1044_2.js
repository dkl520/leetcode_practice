function longestDupSubstring(s) {
    const n = s.length;

    // 辅助函数：构建后缀数组
    function buildSuffixArray(s) {
        // 生成所有后缀
        const suffixes = Array.from({ length: n }, (_, i) => s.slice(i));
        // 按字典序排序
        suffixes.sort();
        // 生成后缀数组（存储每个后缀的起始位置）
        const suffixArray = suffixes.map(suffix => n - suffix.length);
        return suffixArray;
    }

    // 辅助函数：使用后缀数组构建LCP（最长公共前缀）数组
    function buildLCPArray(s, suffixArray) {
        const rank = Array(n).fill(0); // 存储每个字符在后缀数组中的排名
        const lcp = Array(n).fill(0); // 存储LCP值

        // 生成rank数组
        // rank数组的作用是记录每个后缀在suffixArray中的位置
        for (let i = 0; i < n; i++) {
            rank[suffixArray[i]] = i;
        }

        let h = 0; // 当前最长公共前缀长度
        // 计算LCP值
        for (let i = 0; i < n; i++) {
            let rankIndex = rank[i]
            if (rankIndex > 0) { // 只有在rank[i] > 0时才计算LCP值
                const j = suffixArray[rankIndex - 1]; // 取得suffixArray中rank[i]前一个后缀的位置
                // 比较两个后缀的最长公共前缀长度
                while (i + h < n && j + h < n && s[i + h] === s[j + h]) {
                    h++;
                }
                lcp[rankIndex] = h; // 将计算得到的LCP长度存入LCP数组中
                if (h > 0) h--; // 减少h以进行下一次计算
            }
        }
        debugger
        return lcp;
    }


    // 二分查找最长重复子串
    function findLongestDupSubstring(s, suffixArray, lcp) {
        let maxLength = 0; // 最长重复子串的长度
        let startIndex = 0; // 最长重复子串的起始位置
        debugger
        // 遍历LCP数组，找到最长的LCP值
        for (let i = 1; i < n; i++) {
            if (lcp[i] > maxLength) {
                maxLength = lcp[i];
                startIndex = suffixArray[i];

            }
        }
        // 返回最长重复子串
        return s.slice(startIndex, startIndex + maxLength);
    }

    // 构建后缀数组
    const suffixArray = buildSuffixArray(s);
    // 构建LCP数组
    const lcp = buildLCPArray(s, suffixArray);
    // 查找最长重复子串
    const longestDup = findLongestDupSubstring(s, suffixArray, lcp);

    return longestDup;
}

// 示例用法
console.log(longestDupSubstring("banana"));  // 输出："ana"
// console.log(longestDupSubstring("abcd"));    // 输出：""
