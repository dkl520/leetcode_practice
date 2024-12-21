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
 * @return {number[]}
 */

import buildBinaryTreeAccordingArray from "./BuildBinaryTreeAccordingArray.js";

var rightSideView = function (root) {
    let rootTree = buildBinaryTreeAccordingArray(root);
    let arrRight = new Array();
    let arrNode = [rootTree];
    if (rootTree===null) {
        return new Array();
    }
    while (arrNode.length > 0) {
        let size = arrNode.length;
        for (let i = 0; i < size; i++) {
            const node = arrNode.shift();
            if (i === (size - 1)) {
                arrRight.push(node.val)
            }
            if (node.left != null) {
                arrNode.push(node.left);
            }
            if (node.right != null) {
                arrNode.push(node.right);
            }
        }
    }
    return arrRight;
};

let root = [1, 2, 3, null, 5, null, 4];

console.time("199. 二叉树的右视图");
console.log(rightSideView(root));
console.timeEnd("199. 二叉树的右视图");