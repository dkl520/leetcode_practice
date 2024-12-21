/**
 * @param {number} n
 * @return {number[]}
 */
function lexicalOrder(n) {
    // 初始化一个空数组，用于存储按字典序排列的数字
    let result = [];

    /**
     * 深度优先搜索 (DFS) 函数
     * @param {number} current - 当前要处理的数字
     */
    function dfs(current) {
        // 如果当前数字超过了 n，则返回，不再继续
        if (current > n) return;
        
        // 将当前数字添加到结果数组中
        result.push(current);

        // 生成下一个数字，范围从 current*10 到 current*10 + 9
        for (let i = 0; i <= 9; i++) {
            // 如果下一个数字超过了 n，则返回，不再继续
            if (current * 10 + i > n) return;
            
            // 递归调用 DFS 处理下一个数字
            dfs(current * 10 + i);
        }
    }

    // 从 1 到 9 的每个数字开始进行深度优先搜索
    for (let i = 1; i <= 9; i++) {
        dfs(i);
    }

    // 返回结果数组，其中包含按字典序排列的数字
    return result;
}

// 示例测试
console.log(lexicalOrder(202); // 输出: [1, 10, 11, 12, 13, 2, 3, 4, 5, 6, 7, 8, 9]
console.log(lexicalOrder(2));  // 输出: [1, 2]
