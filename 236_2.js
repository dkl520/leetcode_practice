// 定义二叉树节点
function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

var lowestCommonAncestor = function(root, p, q) {
    if (root === null || root === p || root === q) {
        return root;
    }

    // 在左子树中递归查找最近公共祖先
    const left = lowestCommonAncestor(root.left, p, q);
    
    // 在右子树中递归查找最近公共祖先
    const right = lowestCommonAncestor(root.right, p, q);

    // 如果左右子树都找到了目标节点，则当前节点为最近公共祖先
    if (left !== null && right !== null) {
        return root;
    }

    // 如果只在左子树或右子树中找到了目标节点，则返回找到的节点
    return left !== null ? left : right;
};

// 示例用法
// 创建二叉树
const root = new TreeNode(3);
root.left = new TreeNode(5);
root.right = new TreeNode(1);
root.left.left = new TreeNode(6);
root.left.right = new TreeNode(2);
root.right.left = new TreeNode(0);
root.right.right = new TreeNode(8);
root.left.right.left = new TreeNode(7);
root.left.right.right = new TreeNode(4);

const p = root.left; // 节点 5
const q = root.right; // 节点 1

// 调用函数找到最近公共祖先
const result = lowestCommonAncestor(root, p, q);

console.log(result.val); // 输出：3
