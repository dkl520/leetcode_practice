var kthSmallest = function (root, k) {
    let count = 0;
    let result = null;
  
    function inOrderTraversal(node) {
      if (node === null) {
        return;
      }
  
      inOrderTraversal(node.left);
  
      count++;
      if (count === k) {
        result = node.val;
        return;
      }
  
      inOrderTraversal(node.right);
    }
  
    inOrderTraversal(root);
  
    return result;
  };