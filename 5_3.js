// 定义一个名为 longestPalindrome 的函数，接受一个字符串 s 作为参数  
function longestPalindrome(s) {
    // 初始化两个变量 start 和 end，分别表示最长回文子序列的起始和结束位置  
    let start = 0, end = -1;

    // 创建一个新的字符串 t，初始化为 "#"  
    let t = "#";

    // 遍历原始字符串 s 的每个字符  
    for (let i = 0; i < s.length; ++i) {
        // 将当前字符添加到 t 中，并在其后面添加 "#"  
        t += s.charAt(i);
        t += "#";
    }

    // 在 t 的末尾添加一个 "#"  
    t += "#";

    // 将原始字符串 s 替换为新字符串 t，这样 s 中的每个字符都会被一个 "#" 分隔开  
    s = t;

    // 创建一个数组 arm_len，用于存储每个子串的最小长度（即回文长度）  
    let arm_len = [];

    // 初始化两个变量 right 和 j，分别表示当前回文子序列的右边界和左边界的索引  
    let right = -1, j = -1;

    // 遍历新字符串 s 的每个字符  
    for (let i = 0; i < s.length; ++i) {
        // 定义一个变量 cur_arm_len，用于存储当前回文子序列的长度  
        let cur_arm_len;

        // 如果右边界 right 大于等于当前索引 i  
        if (right >= i) {
            // 计算一个对称索引 i_sym，它是 j 的两倍减去 i  
            let i_sym = j * 2 - i;

            // 计算当前回文子序列的最小长度 min_arm_len，它是 arm_len[i_sym] 和 right - i 中的较小值  
            let min_arm_len = Math.min(arm_len[i_sym], right - i);

            // 调用 expand 函数，获取以 i 为中心，长度为 min_arm_len 的回文子序列的长度  
            cur_arm_len = expand(s, i - min_arm_len, i + min_arm_len);
        } else {
            // 如果右边界 right 小于当前索引 i，则调用 expand 函数，获取以 i 为中心的回文子序列的长度  
            cur_arm_len = expand(s, i, i);
        }

        // 将当前回文子序列的长度添加到 arm_len 数组中  
        arm_len.push(cur_arm_len);

        // 如果当前回文子序列的右边界大于之前的右边界 right，则更新 j 和 right 的值  
        if (i + cur_arm_len > right) {
            j = i;
            right = i + cur_arm_len;
        }

        // 如果当前回文子序列的长度乘以 2 加 1 大于 end - start，则更新 start 和 end 的值  
        if (cur_arm_len * 2 + 1 > end - start) {
            start = i - cur_arm_len;
            end = i + cur_arm_len;
        }
    }

    // 初始化一个空字符串 ans，用于存储最长回文子序列的字符  
    let ans = "";

    // 遍历最长回文子序列的起始和结束位置之间的字符  
    for (let i = start; i <= end; ++i) {
        // 如果当前字符不是 "#"，则将其添加到 ans 中  
        if (s.charAt(i) !== '#') {
            ans += s.charAt(i);
        }
    }

    // 返回最长回文子序列的字符作为函数的返回值  
    return ans;
}
function expand(s, left, right) {
    // 当左边界 left 大于等于 0、右边界 right 小于 s 的长度并且 s.charAt(left) 等于 s.charAt(right) 时执行循环体内容  
    while (left >= 0 && right < s.length && s.charAt(left) === s.charAt(right)) {
        // 左边界左移，即从当前字符开始向左查找  
        --left;
        // 右边界右移，即从当前字符开始向右查找  
        ++right;
    }
    // 返回右边界 right 减去左边界 left 再减去 2，然后向下取整除以 2 的结果  
    return Math.floor((right - left - 2) / 2);
}

console.time("5. 最长回文子串")

// 定义字符串 s 为 "babad"  
const s = "cabbacaassac";
// 调用 longestPalindrome 函数并传入 s 作为参数，获取最长回文子序列的子字符串  
const longestPalindromeSubstr = longestPalindrome(s);
// 将最长回文子序列的子字符串输出到控制台  
console.log(longestPalindromeSubstr);
console.timeEnd("5. 最长回文子串")