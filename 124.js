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
var maxPathSum = function (root) {
    let ans = Number.NEGATIVE_INFINITY;

    dp(root, ans);

    return ans;

};

function dp(root, ans) {
    if (root==null) {
        return 0;
    }
    let maxLeft = dp(root.left, ans);
    let maxRight = dp(root.right, ans);
    ans = Math.max(root.left + root.right + root)
    return Math.max(maxLeft + maxRight) + rootl;


}