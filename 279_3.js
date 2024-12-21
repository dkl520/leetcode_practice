var numSquares = function(n) {
    // 创建一个长度为n+1的数组，初始值全部为Infinity
    let dp = new Array(n + 1).fill(Infinity);
    // 第一个完全平方数为1，设置dp[1]为1
    dp[0] = 0;
  
    for (let i = 1; i <= n; i++) {
      // 对于每个数i，找到小于等于i的完全平方数j*j
      for (let j = 1; j * j <= i; j++) {
        // 对于每个完全平方数j*j，更新dp[i]的值
        dp[i] = Math.min(dp[i], dp[i - j * j] + 1);
      }
    }
    return dp[n];
  };

  console.time("279. 完全平方数")
  console.log(numSquares(12));
  console.timeEnd("279. 完全平方数")