/**
 * 生成有效的括号组合
 * @param {number} n - 括号对数
 * @return {string[]} - 所有可能的并且有效的括号组合
 */
function generateParenthesis(n) {
    const result = []; // 用于存储最终生成的括号组合

    /**
     * 回溯函数，用于生成括号组合
     * @param {string} current - 当前的括号字符串
     * @param {number} open - 已使用的左括号数量
     * @param {number} close - 已使用的右括号数量
     */
    function backtrack(current, open, close) {
        // 如果当前生成的括号字符串长度等于 2 * n，则添加到结果数组中
        if (current.length === n * 2) {
            result.push(current);
            return;
        }

        // 如果左括号数量小于 n，则可以添加左括号
        if (open < n) {
            backtrack(current + '(', open + 1, close);
        }
        
        // 如果右括号数量小于左括号数量，则可以添加右括号
        if (close < open) {
            backtrack(current + ')', open, close + 1);
        }
    }

    // 从空字符串开始回溯，初始状态下没有使用任何括号
    backtrack('', 0, 0);
    return result;
}

// 示例用法
console.log(generateParenthesis(3)); // 输出: ["((()))","(()())","(())()","()(())","()()()"]
console.log(generateParenthesis(1)); // 输出: ["()"]
