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
var rob = function (root) {
    let binaryTree = new Array();
    let fetNum = new Array();
    let  binaryIndex = 0;
    for (let i = 0; i < root.length; i++) {
        const element = root[i];
        fetNum.push(element)
        if (fetNum.length === 2 ** binaryIndex) {
            binaryTree.push([...fetNum])
            binaryIndex += 1;
            fetNum = [];
        }
    }

    


};

let root = [3, 4, 5, 1, 3, null, 1]


console.time("rob")

console.log(rob(root));

console.timeEnd("rob")