import BinarySearchTree from "./BinarySearchTree.js";
import TreeNode from "./TreeNode.js";

function preorderTraversal(root) {
    const preorderList = new TreeNode(0);
    preOrder(root, preorderList);
    return preorderList.right;
}

function preOrder(node, preorderList) {
    if (node === null) {
        return preorderList;
    }
    preorderList.right = new TreeNode(node.val);
    preorderList = preorderList.right;
    preorderList = preOrder(node.left, preorderList);
    preorderList = preOrder(node.right, preorderList);
    return preorderList;
}

const bst = new BinarySearchTree();
bst.insert(0);
bst.insert(-10);
bst.insert(1);
bst.insert(-11);
bst.insert(-9);
bst.insert(2);
bst.insert(3);
preorderTraversal(bst.root);
debugger