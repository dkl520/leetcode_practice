function longestDupSubstring(s) {
    const n = s.length;
    
    // 辅助函数：构建后缀数组
    function buildSuffixArray(s) {
        // 生成所有后缀
        const suffixes = Array.from({ length: n }, (_, i) => s.slice(i));
        // 对所有后缀进行排序
        suffixes.sort();
        // 生成后缀数组，即每个后缀的起始位置
        const suffixArray = suffixes.map(suffix => n - suffix.length);
        return suffixArray;
    }
    
    // 辅助函数：计算两个字符串的最长公共前缀长度
    function longestCommonPrefix(str1, str2) {
        let i = 0;
        // 比较两个字符串直到字符不同或达到字符串末尾
        while (i < str1.length && i < str2.length && str1[i] === str2[i]) {
            i++;
        }
        return i;
    }

    // 辅助函数：构建LCP数组（Longest Common Prefix，最长公共前缀）
    function buildLCPArray(s, suffixArray) {
        const lcp = Array(n).fill(0);
        // 比较后缀数组中相邻后缀，计算LCP值
        for (let i = 1; i < n; i++) {
            lcp[i] = longestCommonPrefix(s.slice(suffixArray[i]), s.slice(suffixArray[i - 1]));
        }
        return lcp;
    }

    // 辅助函数：寻找最长重复子串
    function findLongestDupSubstring(s, suffixArray, lcp) {
        let maxLength = 0;
        let startIndex = 0;
        // 遍历LCP数组，找到最大LCP值对应的起始位置
        for (let i = 1; i < n; i++) {
            if (lcp[i] > maxLength) {
                maxLength = lcp[i];
                startIndex = suffixArray[i];
            }
        }
        // 返回最长重复子串
        return s.slice(startIndex, startIndex + maxLength);
    }
    
    const suffixArray = buildSuffixArray(s); // 构建后缀数组
    const lcp = buildLCPArray(s, suffixArray); // 构建LCP数组
    const longestDup = findLongestDupSubstring(s, suffixArray, lcp); // 寻找最长重复子串
    
    return longestDup;
}

// 示例用法
console.log(longestDupSubstring("banana"));  // 输出: "ana"
console.log(longestDupSubstring("abcd"));    // 输出: ""
