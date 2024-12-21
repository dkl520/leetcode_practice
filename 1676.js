/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode[]} nodes
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, nodes) {
    


    return dfs(root,nodes);

};  


function dfs(root, nodes) {

    if (root == null) {
        return root;
    }
    for(let node of nodes){
        if(node == root){
            return node;
        }
    }

    let l = dfs(root.left, nodes);
    let r = dfs(root.right,nodes);

    return l == null ? r : (r == null ? l : root);

}