/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {number}
 */


import TreeNode from "./TreeNode.js"

// 主函数，计算路径总和等于目标值的路径数量
var pathSum = function (root, targetSum) {
    // 使用 Map 来存储前缀和以及出现的次数
    let prefixSumCount = new Map();
    // 初始情况下，前缀和为 0 的路径有 1 条
    prefixSumCount.set(0, 1);
    // 开始深度优先搜索
    return dfs(root, prefixSumCount, 0, targetSum);
};

// 深度优先搜索函数
function dfs(node, prefixSumCount, currentSum, targetSum) {
    // 基本情况：如果节点为空，则返回 0
    if (node === null) {
        return 0;
    }

    // 更新当前路径的前缀和
    currentSum += node.val;
    // 查看有多少路径满足条件
    let numPathsToCurr = prefixSumCount.get(currentSum - targetSum) || 0;
    // 更新当前路径前缀和的计数
    prefixSumCount.set(currentSum, (prefixSumCount.get(currentSum) || 0) + 1);

    // 递归计算左右子树的路径数量
    let res = numPathsToCurr + dfs(node.left, prefixSumCount, currentSum, targetSum) 
    + dfs(node.right, prefixSumCount, currentSum, targetSum);

    // 回溯当前节点的前缀和计数
    prefixSumCount.set(currentSum, prefixSumCount.get(currentSum) - 1);

    return res;
}

// 示例输入
let root = [10, 5, -3, 3, 2, null, 11, 3, -2, null, 1], targetSum = 8;

// 构建二叉树
let treeRoot = TreeNode.buildTreeFromArray(root);
console.time("437. 路径总和 III");
// 计算并输出结果
console.log(pathSum(treeRoot, targetSum));
console.timeEnd("437. 路径总和 III");
