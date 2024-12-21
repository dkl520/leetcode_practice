/**
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function(s) {
    let maxLength = 0; // 用于存储最长有效括号的长度
    const stack = [-1]; // 初始化栈，栈中放入 -1 作为基准位置

    // 遍历字符串的每个字符
    for (let i = 0; i < s.length; i++) {
        if (s[i] === '(') {
            // 如果当前字符是 '('，将其索引压入栈
            stack.push(i);
        } else {
            // 如果当前字符是 ')'
            stack.pop(); // 弹出栈顶元素
            if (stack.length === 0) {
                // 如果栈为空，说明当前的 ')' 没有匹配的 '('
                // 将当前的索引压入栈，作为新的基准位置
                stack.push(i);
            } else {
                // 如果栈不为空，计算当前有效括号的长度
                // 当前索引 i 减去栈顶元素的索引
                maxLength = Math.max(maxLength, i - stack[stack.length - 1]);
            }
        }
    }

    return maxLength; // 返回最长有效括号的长度
};

// 示例测试
// console.log(longestValidParentheses("(()")); // 输出: 2
// console.log(longestValidParentheses(")()())")); // 输出: 4
// console.log(longestValidParentheses("")); // 输出: 0
console.log(longestValidParentheses("(())")); // 输出: 4