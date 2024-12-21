class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = (val === undefined ? 0 : val);
        this.left = (left === undefined ? null : left);
        this.right = (right === undefined ? null : right);
    }

    static buildTreeFromArray(arr) {
        if (!arr.length) return null;
        let root = new TreeNode(arr[0]);
        let queue = [root];
        let i = 1;

        while (i < arr.length) {
            let current = queue.shift();
            if (arr[i] !== null) {
                current.left = new TreeNode(arr[i]);
                queue.push(current.left);
            }
            i++;
            if (i < arr.length && arr[i] !== null) {
                current.right = new TreeNode(arr[i]);
                queue.push(current.right);
            }
            i++;
        }

        return root;
    }
}



var rob = function(root) {
    // 如果根节点为空，则返回 0，因为没有节点可以偷
    if (!root) return 0;

    // 后序遍历以计算 DP 值
    function postorderTraversal(node) {
            if (!node) return [0, 0];

        // 遍历左子树和右子树
        let left = postorderTraversal(node.left);
        let right = postorderTraversal(node.right);

        // 当前节点的 DP 值
        let dp0 = Math.max(left[0], left[1]) + Math.max(right[0], right[1]);
        let dp1 = node.val + left[0] + right[0];

        return [dp0, dp1];
    }
    // 获取根节点的 DP 值
    let result = postorderTraversal(root);

    // 返回偷或不偷根节点的最大值
    return Math.max(result[0], result[1]);
};

// 示例用法
let list = [3, 2, 3, null, 3, null, 1];
let rootNode = TreeNode.buildTreeFromArray(list);
console.log(rob(rootNode)); // 输出: 7
