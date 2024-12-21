// 定义 pathSum 函数，接受一个二叉树的根节点和一个目标和 targetSum  

// 这个 pathSum 函数是用来计算二叉树中从根节点到叶子节点的所有路径中，
// 路径和等于给定目标值 targetSum 的路径数量。下面是对代码的详细注释：
var pathSum = function (root, targetSum) {  
    // 如果根节点不存在，则没有路径可以计算，返回0  
    if (!root) {  
        return 0;  
    }  
  
    // 定义深度优先搜索函数 dfs，用于从当前节点开始寻找路径和为目标值的路径数量  
    const dfs = (node, target) => {  
        // 如果当前节点不存在，则没有路径可以计算，返回0  
        if (!node) {  
            return 0;  
        }  
        // 初始化计数器，如果当前节点的值等于目标值，则路径数量为1，否则为0  
        let count = node.val === target ? 1 : 0;  
        // 递归搜索左子树，目标值减去当前节点的值  
        count += dfs(node.left, target - node.val);  
        // 递归搜索右子树，目标值减去当前节点的值  
        count += dfs(node.right, target - node.val);  
  
        // 返回从当前节点出发的路径数量  
        return count;  
    };  
  
    // 定义遍历函数 traverse，用于从根节点开始递归搜索整棵树  
    const traverse = (node) => {  
        // 如果当前节点不存在，则没有路径可以计算，返回0  
        if (!node) {  
            return 0;  
        }  
        // 从当前节点开始，递归计算路径数量  
        let count = dfs(node, targetSum);  
        // 递归搜索左子树，并累加路径数量  
        count += traverse(node.left);  
        // 递归搜索右子树，并累加路径数量  
        count += traverse(node.right);  
        // 返回整棵树的路径数量  
        return count;  
    };  
  
    // 从根节点开始递归搜索整棵树，并返回路径数量  
    return traverse(root);  
};