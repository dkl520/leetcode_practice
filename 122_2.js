var maxProfit = function(prices) {
    let minPrice = Number.MAX_SAFE_INTEGER;
    let maxProfit = 0;
  
    for (let i = 0; i < prices.length; i++) {
      const currentPrice = prices[i];
      
      if (currentPrice < minPrice) {
        minPrice = currentPrice; // Update the minimum price
      } else if (currentPrice > minPrice) {
        maxProfit += currentPrice - minPrice; // Add the profit to the total
        minPrice = currentPrice; // Update the minimum price
      }
    }
  
    return maxProfit;
  };
  
  let prices = [1, 2, 3, 4, 5];
  console.time("121. 买卖股票的最佳时机二");
  console.log(maxProfit(prices));
  console.timeEnd("121. 买卖股票的最佳时机二");