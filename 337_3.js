/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */


import TreeNode from "./BinaryTree.js"

var rob = function (root) {


    let list = [3, 2, 3, null, 3, null, 1];
    let node = new TreeNode();
    let rootNode = node.buildTreeFromArray(list);
    let arr = new Array();

    postorderTraversal(rootNode, arr);

    return Math.max(rootNode.dpList[0], rootNode.dpList[1])


};

function postorderTraversal(root, arr) {
    if (root == null) {
        return;
    }
    postorderTraversal(root.left, arr);

    postorderTraversal(root.right, arr);
    root.dpList = new Array();
    if (root.left == null && root.right == null) {
        root.dpList[1] = root.val;
        root.dpList[0] = 0;
        return;
    }
    if (root.left == null) {
        root.dpList[1] = 0 + root.right.dpList[0] + root.val;
        root.dpList[0] = 0 + Math.max(root.right.dpList[0], root.right.dpList[1]);
        return
    }
    if (root.right == null) {
        root.dpList[1] = root.left.dpList[0] + 0 + root.val;
        root.dpList[0] = Math.max(root.left.dpList[0], root.left.dpList[1])
            + 0;
        return
    }
    root.dpList[1] = root.left.dpList[0] + root.right.dpList[0] + root.val;
    root.dpList[0] = Math.max(root.left.dpList[0], root.left.dpList[1])
        + Math.max(root.right.dpList[0], root.right.dpList[1]);
}



rob();










