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

import TreeNode from "./TreeNode.js";

var maxPathSum = function (root) {
    let max = Number.MIN_SAFE_INTEGER;
    getMaxSide(root)
    function getMaxSide(root) {
        if (root == null) {
            return 0;
        }

        let left = getMaxSide(root.left);
        let right = getMaxSide(root.right);
        max = Math.max(left + root.val, right + root.val, max, left + right + root.val, root.val);
        return Math.max(left, right, 0) + root.val;

    }
    return max;
};




let root = [9, 6, -3, null, null, -6, 2, null, null, 2, null, -6, -6, -6];
let treeNode = TreeNode.buildTreeFromArray(root);
console.log(maxPathSum(treeNode));






