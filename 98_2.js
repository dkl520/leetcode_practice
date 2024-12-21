// 定义一个名为isValidBST的函数，它接受一个参数root，表示要验证的二叉树的根节点  
var isValidBST = function (root) {  
    // 调用validateBST函数，并传入root节点以及两个边界值，Number.NEGATIVE_INFINITY表示负无穷大，Number.POSITIVE_INFINITY表示正无穷大  
    // 这是一种技巧，用于检查一个二叉树是否是严格二叉搜索树（BST）  
    return validateBST(root, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);  
  };  
    
  // 定义一个名为validateBST的函数，它接受三个参数：一个节点node，一个最小值min，和一个最大值max  
  function validateBST(node, min, max) {  
    // 如果当前节点为null，表示已经到达了一个空节点，这是二叉树的一个正确部分，因此返回true  
    if (node === null) {  
      return true;  
    }  
    
    // 检查当前节点的值是否在给定的最小值和最大值之间，如果不在，则返回false，说明这不是一个BST  
    if (node.val <= min || node.val >= max) {  
      return false;  
    }  
    
    // 递归地验证左子树和右子树，确保它们都是BST  
    // 对于左子树，最小值保持不变，最大值更新为当前节点的值，以确保左子树中的所有值都小于当前节点的值  
    // 对于右子树，最小值更新为当前节点的值，最大值保持不变，以确保右子树中的所有值都大于当前节点的值  
    return (  
      validateBST(node.left, min, node.val) &&  
      validateBST(node.right, node.val, max)  
    );  
  }