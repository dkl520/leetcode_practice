/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */



var lowestCommonAncestor = function (root, p, q) {


    let leftBol = false;
    let rightBol = false;

    var findAll = function (root, p, q) {
        if (root == null) {
            return;
        }
        if (root == p) {
            leftBol = true;
        }
        if (root == q) {
            rightBol = true;
        }
        findAll(root.left, p, q);
        findAll(root.right, p, q);
    }


    findAll(root, p, q);
    if (!leftBol || !rightBol) {
        return null;
    }

    let result = dfs(root, p, q);
    return result;

};




function dfs(root, p, q) {
    if (root == null || p == root || q == root) {
        return root;
    }

    let l = dfs(root.left, p, q);
    let r = dfs(root.right, p, q);

    return l == null ? r : (r == null ? l : root);

}