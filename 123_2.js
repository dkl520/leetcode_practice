/**  
 * 计算最多进行两次交易的最大利润  
 *  
 * @param prices 股票价格数组  
 * @returns 最大利润  
 */  
function maxProfit(prices) {  
    const n = prices.length; // 获取股票价格数组的长度  
    if (n === 0) {  
        return 0; // 如果数组为空，则无法进行交易，直接返回0  
    }  
  
    // 初始化三维动态规划数组，dp[i][k][0]表示第i天结束时进行了k次交易且未持有股票的最大利润  
    // dp[i][k][1]表示第i天结束时进行了k次交易且持有股票的最大利润  
    const dp = new Array(n).fill(0).map(() => new Array(3).fill(0).map(() => [0, 0]));  
    debugger
  debugger
    // 遍历每一天  
    for (let i = 0; i < n; i++) {  
        // 从第二次交易开始向前遍历，因为最多只允许两次交易  
        for (let k = 2; k >= 1; k--) {  
            if (i === 0) {  
                // 第一天的情况  
                // 如果不交易，则利润为0  
                dp[i][k][0] = 0;  
                // 如果买入股票，则利润为当前股票价格的负数  
                dp[i][k][1] = -prices[i];  
                debugger
            } else {  
                // 非第一天的情况，根据状态转移方程更新dp数组  
                // dp[i][k][0] = max(dp[i-1][k][0], dp[i-1][k][1] + prices[i])  
                // 如果前一天未持有股票且进行了k次交易，利润继承前一天的  
                // 或者前一天持有股票且进行了k次交易后卖出，利润为前一天利润加上当前股票价格的差值  
                dp[i][k][0] = Math.max(dp[i - 1][k][0], dp[i - 1][k][1] + prices[i]);  
  
                // dp[i][k][1] = max(dp[i-1][k][1], dp[i-1][k-1][0] - prices[i])  
                // 如果前一天就持有股票且进行了k次交易，利润继承前一天的  
                // 或者前一天未持有股票且进行了k-1次交易后买入股票，利润为前一天利润减去当前股票价格的差值  
                dp[i][k][1] = Math.max(dp[i - 1][k][1], dp[i - 1][k - 1][0] - prices[i]);  
                debugger
            }  
        }  
    }  
  
    // 返回最后一天结束时进行了两次交易且未持有股票的最大利润  
    // return dp[n - 1][2][0]; 
    return dp; 
}  
  
// 示例测试  
const prices1 = [3, 2, 6, 5, 0, 3];
console.log(maxProfit(prices1)); // 输出：6  
  
const prices2 = [1, 2, 3, 4, 5];  
console.log(maxProfit(prices2)); // 输出：4