/**
 * 二叉树节点的定义
 * @param {number} val - 节点的值
 * @param {TreeNode} left - 左子树
 * @param {TreeNode} right - 右子树
 */
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
}
/**
 * 生成所有由 1 到 n 组成的不同的二叉搜索树
 * @param {number} n - 节点的数量
 * @return {TreeNode[]} - 所有可能的二叉搜索树的根节点组成的数组
 */
var generateTrees = function (n) {
    if (n === 0) return [];
    let list = generateSubtrees(1, n);
    return list;
};
/**
 * 生成从 L 到 R 的所有可能的二叉搜索树
 * @param {number} L - 开始的节点值
 * @param {number} R - 结束的节点值
 * @return {TreeNode[]} - 所有可能的二叉搜索树的根节点组成的数组
 */
function generateSubtrees(L, R) {
    let allTrees = [];
    if (L > R) {
        allTrees.push(null); // 如果 L 大于 end，则没有树，加入 null
        return allTrees;
    }
    // 遍历从 L 到 R 的每个值作为根节点
    for (let i = L; i <= R; i++) {
        // 递归生成所有可能的左子树
        let left = i - 1;
        let leftTrees = generateSubtrees(L, left);
        // 递归生成所有可能的右子树
        let right = i + 1;
        let rightTrees = generateSubtrees(right, R);
        debugger
        // 将当前节点 i 作为根节点，将所有左子树和右子树组合
        for (let left of leftTrees) {
            for (let right of rightTrees) {
                let currentTree = new TreeNode(i); // 创建新的根节点 i
                currentTree.left = left; // 设置左子树
                currentTree.right = right; // 设置右子树
                allTrees.push(currentTree); // 将当前树加入结果列表
            }
        }
    }
    debugger
    return allTrees;
}
// 辅助函数：将树转换为列表形式（可选）
function treeToList(root) {
    if (!root) return null;
    let queue = [root];
    let result = [];
    while (queue.length > 0) {
        let node = queue.shift();
        if (node) {
            result.push(node.val);
            queue.push(node.left);
            queue.push(node.right);
        } else {
            result.push(null);
        }
    }
    // 去掉结果末尾的 null
    while (result[result.length - 1] === null) {
        result.pop();
    }
    return result;
}
// 测试示例
let n = 3;
let trees = generateTrees(n);
let result = trees.map(treeToList);
console.log(result);
