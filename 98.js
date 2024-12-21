import BinarySearchTree from "./BinarySearchTree.js";

var isValidBST = function (root) {
    let arr = new Array();
    inOrderTraversal(root, arr);
    for (let i = 0; i < arr.length-1; i++) {
        const el1 = arr[i];
        const el2 = arr[i + 1];
        if (el1.val >= el2.val) {
            return false;
        }
    }
    return true;
};

function inOrderTraversal(root, arr) {
    if (root == null) {
        return;
    }
    inOrderTraversal(root.left, arr)
    arr.push(root);
    inOrderTraversal(root.right, arr)
}

const bst = new BinarySearchTree();
bst.insert(5);
bst.insert(4);
bst.insert(6);
// bst.insert(null);
// bst.insert(null);
bst.insert(3);
bst.insert(7);

console.time("98. 验证二叉搜索树");


console.log(isValidBST(bst.root));
console.timeEnd("98. 验证二叉搜索树");