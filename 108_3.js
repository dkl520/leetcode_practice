// 定义一个 TreeNode 类，每个节点有一个值 val，以及左右子节点的引用  
class TreeNode {  
    constructor(val) {  
      // 节点值  
      this.val = val;  
      // 左子节点为空  
      this.left = null;  
      // 右子节点为空  
      this.right = null;  
    }  
  }  
  
  // 定义一个 Solution 类，包含一个方法 sortedArrayToBST，用于将有序数组转化为二叉搜索树  
class Solution {  
    // sortedArrayToBST 方法接收一个有序数组 nums 作为参数  
    sortedArrayToBST(nums) {  
      // 如果 nums 为 null 或者长度为 0，返回 null，表示没有节点  
      if (nums === null || nums.length === 0) {  
        return null;  
      }  
    
      // 调用 constructBinaryTree 方法，以 nums、0 和 nums.length - 1 作为参数，表示构造二叉搜索树的开始和结束位置  
      return this.constructBinaryTree(nums, 0, nums.length - 1);  
    }  
    
    // constructBinaryTree 方法用于构造二叉搜索树，参数是 nums（有序数组）、start（开始位置）、end（结束位置）  
    constructBinaryTree(nums, start, end) {  
      // 如果 start 大于 end，说明当前子数组为空，返回 null  
      if (start > end) {  
        return null;  
      }  
    
      // 计算中间位置索引，取整数值  
      const mid = Math.floor(start + (end - start) / 2);  
      // 使用中间位置的值创建一个新的 TreeNode 实例，作为当前的根节点  
      const root = new TreeNode(nums[mid]);  
      // 递归构造左子树，参数是 nums、start 和 mid - 1  
      root.left = this.constructBinaryTree(nums, start, mid - 1);  
      // 递归构造右子树，参数是 nums、mid + 1 和 end  
      root.right = this.constructBinaryTree(nums, mid + 1, end);  
    
      // 返回构造好的根节点  
      return root;  
    }  
  }  
    
  // 创建一个 Solution 实例，赋值给 solution 变量  
  const solution = new Solution();  
  // 创建一个有序数组 nums，包含五个元素 [-10, -3, 0, 5, 9]  
  const nums = [-10, -3, 0, 5, 9];  
  // 调用 solution 的 sortedArrayToBST 方法，参数是 nums，将返回构造好的二叉搜索树的根节点赋值给 result 变量  
  const result = solution.sortedArrayToBST(nums);  
  // 打印 result 到控制台，输出构造好的二叉搜索树的结果  
  console.log(result);