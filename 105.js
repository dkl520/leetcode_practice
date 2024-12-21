/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */

// 定义一个构造函数 TreeNode，创建一个具有特定值的二叉树节点  
function TreeNode(val) {
    // 设置节点的值  
    this.val = val;
    // 设置节点的左子节点为 null  
    this.left = null;
    // 设置节点的右子节点为 null  
    this.right = null;
}

// 定义 buildTree 函数，它接收两个数组 preorder 和 inorder 作为输入，根据前序遍历和中序遍历重建二叉树  
function buildTree(preorder, inorder) {
    // 检查前序遍历和中序遍历是否有效，如果无效则返回 null  
    if (!preorder || !inorder || preorder.length === 0 || inorder.length === 0)
        return null;

    // 调用辅助函数 buildTreeHelper 进行重建二叉树的操作  
    return buildTreeHelper(preorder, 0, preorder.length - 1, inorder, 0, inorder.length - 1);
}

// 定义 buildTreeHelper 函数，它是递归地根据前序遍历和中序遍历重建二叉树  
function buildTreeHelper(preorder, preStart, preEnd, inorder, inStart, inEnd) {
    // 如果前序遍历或中序遍历的子数组为空，返回 null  
    if (preStart > preEnd || inStart > inEnd)
        return null;

    // 获取当前子树的前序遍历的根节点值，并创建一个新的 TreeNode 实例作为当前子树的根节点  
    const rootVal = preorder[preStart];
    const root = new TreeNode(rootVal);

    // 在中序遍历中找到根节点的位置  
    let rootIndex = 0;
    for (let i = inStart; i <= inEnd; i++) {
        // 如果找到了与当前根节点值相同的元素，记录其索引并跳出循环  
        if (inorder[i] === rootVal) {
            rootIndex = i;
            break;
        }
    }

    const leftSize = rootIndex - inStart;

    // 根据找到的根节点在中序遍历中的位置，计算左子树的大小，然后递归地构建左子树和右子树  
    // 递归调用的参数为：前序遍历的下一部分、中序遍历的下一部分、左子树的大小、左子树的根节点、右子树的大小、右子树的根节点  
    root.left = buildTreeHelper(preorder, preStart + 1, preStart + leftSize, inorder, inStart, rootIndex - 1);
    root.right = buildTreeHelper(preorder, preStart + leftSize + 1, preEnd, inorder, rootIndex + 1, inEnd);

    // 返回当前子树的根节点  
    return root;
}

let preorder = [1, 2]
let inorder = [2, 1]
console.time("105. 从前序与中序遍历序列构造二叉树")
console.log(buildTree(preorder, inorder))
console.timeEnd("105. 从前序与中序遍历序列构造二叉树")
