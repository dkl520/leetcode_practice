// 定义二叉搜索树节点类
class Node {
    constructor(val) {
      this.val = val;
      this.left = null;
      this.right = null;
    }
  }
  
  // 定义二叉搜索树类
  class BinarySearchTree {
    constructor() {
      this.root = null;
    }
  
    // 插入节点
    insert(val) {
      const newNode = new Node(val);
  
      if (this.root === null) {
        this.root = newNode;
      } else {
        this.insertNode(this.root, newNode);
      }
    }
  
    insertNode(node, newNode) {
      if (newNode.val < node.val) {
        if (node.left === null) {
          node.left = newNode;
        } else {
          this.insertNode(node.left, newNode);
        }
      } else {
        if (node.right === null) {
          node.right = newNode;
        } else {
          this.insertNode(node.right, newNode);
        }
      }
    }
  
    // 查找节点
    search(val) {
      return this.searchNode(this.root, val);
    }
  
    searchNode(node, val) {
      if (node === null) {
        return false;
      }
  
      if (val === node.val) {
        return true;
      } else if (val < node.val) {
        return this.searchNode(node.left, val);
      } else {
        return this.searchNode(node.right, val);
      }
    }
  
    // 中序遍历
    inOrderTraversal(callback) {
      this.inOrderTraversalNode(this.root, callback);
    }
  
    inOrderTraversalNode(node, callback) {
      if (node !== null) {
        this.inOrderTraversalNode(node.left, callback);
        callback(node.val);
        this.inOrderTraversalNode(node.right, callback);
      }
    }
  }
    export default BinarySearchTree;
  // 示例用法
//   const bst = new BinarySearchTree();
//   bst.insert(8);
//   bst.insert(3);
//   bst.insert(10);
//   bst.insert(1);
//   bst.insert(6);
//   bst.insert(14);
  
//   console.log(bst.search(6)); // 输出: true
//   console.log(bst.search(11)); // 输出: false
  
//   bst.inOrderTraversal((val) => {
//     console.log(val);
//   });
//   // 输出:
//   // 1
//   // 3
//   // 6
//   // 8
//   // 10
//   // 14