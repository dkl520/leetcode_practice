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
 * @param {number} k
 * @return {number}
 */
var kthLargestLevelSum = function (root, k) {

    let sumList = new Array();


    let arrbfs = [root];

    while (arrbfs.length > 0) {
        let lth = arrbfs.length;
        let account = 0;
        let nextList = new Array();
        for (let i = 0; i < lth; i++) {
            const node = arrbfs[i];
            account += node.val;
            if (node.left !== null) {
                nextList.push(node.left)
            }
            if (node.right !== null) {
                nextList.push(node.right)
            }
        }
        arrbfs = nextList;
        sumList.push(account);
    }

    sumList.sort((a, b) => b - a);
    if (sumList[k - 1]) {
        return sumList[k - 1]
    } else {
        return -1;
    }


};