/**
 * @param {number} n - 二叉搜索树的节点数量
 * @return {number} - 不同结构的二叉搜索树的数量
 */
var numTrees = function(n) {
    // 初始化一个长度为 n+1 的数组 dp 并用 0 填充
    let dp = Array(n + 1).fill(0);
  
    // 当节点数量为 0 或 1 时，只有一种结构的二叉搜索树
    dp[0] = 1;
    dp[1] = 1;
  
    // 计算节点数量为 2 到 n 的不同二叉搜索树的数量
    for (let i = 2; i <= n; ++i) {
      // 对于每个节点数量 i，计算不同结构的二叉搜索树数量
      for (let j = 1; j <= i; ++j) {
        // dp[i] 是通过将节点 j 作为根节点，左子树有 j-1 个节点，右子树有 i-j 个节点的所有可能组合数累加得到的
        dp[i] += dp[i - j] * dp[j - 1];
      }
    }
    // 返回节点数量为 n 的不同二叉搜索树的数量
    return dp[n];
  };
  