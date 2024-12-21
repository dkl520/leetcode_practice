// 定义一个名为 sortedArrayToBST 的函数，它接收一个有序数组 nums 作为参数  
var sortedArrayToBST = function (nums) {  
    // 调用 constructBinaryTree 函数，传入 nums、0（左边界）和 nums.length - 1（右边界）  
    // 这个函数将根据给定的左右边界构造一个二叉搜索树  
    return constructBinaryTree(nums, 0, nums.length - 1);  
  };  
    
  // 定义一个名为 constructBinaryTree 的递归函数，它接收一个有序数组 nums、一个左边界 left 和一个右边界 right  
  function constructBinaryTree(nums, left, right) {  
    // 如果左边界大于右边界，说明当前子数组为空，返回 null  
    if (left > right) {  
      return null;  
    }  
    
    // 计算中间索引，通过 floor 函数可以获得最接近的整数  
    // 这里使用的是中序遍历的思想，以左边界和右边界的平均位置作为根节点  
    const mid = Math.floor((left + right) / 2);  
      
    // 创建一个新的 TreeNode 实例，值为 nums[mid]，作为当前的根节点  
    const root = new TreeNode(nums[mid]);  
      
    // 递归构造左子树，左子树的数组范围是 [left, mid - 1]  
    root.left = constructBinaryTree(nums, left, mid - 1);  
      
    // 递归构造右子树，右子树的数组范围是 [mid + 1, right]  
    root.right = constructBinaryTree(nums, mid + 1, right);  
      
    // 返回构造好的根节点  
    return root;  
  }  
    
  // 定义一个名为 nums 的有序数组，包含五个元素 [-10, -3, 0, 5, 9]  
  let nums = [-10, -3, 0, 5, 9];  
    
  // 使用 console.time 和 console.timeEnd 来计时 sortedArrayToBST 函数的执行时间  
  // 这可以帮助我们评估算法的性能，输出类似于 "108. 将有序数组转换为二叉搜索树: xxxms" 的消息  
  console.time("108. 将有序数组转换为二叉搜索树");  
  // 调用 sortedArrayToBST 函数，将 nums 转换为二叉搜索树，但这个函数没有返回值，实际返回的是内部函数 constructBinaryTree 的返回值（即二叉树的根节点）  
  sortedArrayToBST(nums);  
  console.timeEnd("108. 将有序数组转换为二叉搜索树");