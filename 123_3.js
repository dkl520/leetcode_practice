/**  
 * 计算在最多进行两次交易的情况下，投资者可以获得的最大利润  
 *  
 * @param prices 股票价格数组  
 * @returns 最大利润  
 */  
function maxProfit(prices) {  
    const n = prices.length; // 获取股票价格数组的长度  
    if (n === 0) {  
        return 0; // 如果数组为空，则无法进行交易，直接返回0  
    }  
  
    // 初始化状态数组，dp_ik0表示第i天结束时进行了k次交易且未持有股票的最大利润  
    // dp_ik1表示第i天结束时进行了k次交易且持有股票的最大利润  
    // 初始时，未持有股票的最大利润为0，持有股票的最大利润为负无穷大（表示不可能持有股票）  
    const dp_ik0 = new Array(3).fill(0);  
    const dp_ik1 = new Array(3).fill(Number.MIN_SAFE_INTEGER);  
  
    // 遍历每一天  
    for (let i = 0; i < n; i++) {  
        // 从第二次交易开始向前遍历，因为最多只允许两次交易  
        for (let k = 2; k >= 1; k--) {  
            // 更新未持有股票的最大利润  
            // 要么是前一天未持有股票的最大利润（不进行操作）  
            // 要么是前一天持有股票的最大利润加上当前股票价格的差值（卖出股票）  
            dp_ik0[k] = Math.max(dp_ik0[k], dp_ik1[k] + prices[i]);  
  
            // 更新持有股票的最大利润  
            // 要么是前一天持有股票的最大利润（不进行操作）  
            // 要么是前一天未持有股票的最大利润减去当前股票价格的差值（买入股票）  
            // 注意这里使用k-1，因为买入股票后交易次数减少一次  
            dp_ik1[k] = Math.max(dp_ik1[k], dp_ik0[k - 1] - prices[i]);  
        }  
    }  
  
    // 返回最后一天结束时进行了两次交易且未持有股票的最大利润  
    return dp_ik0[2];  
}  
  
// 示例测试  
const prices1 = [3, 3, 5, 0, 0, 3, 1, 4];  
console.log(maxProfit(prices1)); // 输出：6  
  
const prices2 = [1, 2, 3, 4, 5];  
console.log(maxProfit(prices2)); // 输出：4