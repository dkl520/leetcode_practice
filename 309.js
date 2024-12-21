
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
    // 买入，卖出， 冷冻期
    const n = prices.length;
    if (n <= 1) {
        return 0
    }


    let profitBuy = new Array(n + 1).fill(0);
    let profitSell = new Array(n + 1).fill(0);
    let profitBuyForzen = new Array(n + 1).fill(0);
    let profitSellForzen = new Array(n + 1).fill(0);
    profitBuy[0] = -prices[0];
    profitSell[0] = 0
    profitBuyForzen[0] = -prices[0];
    profitSellForzen[0] = 0;
    for (let i = 1; i < n; i++) {
        const price = prices[i];
        profitSell[i] = Math.max(profitBuyForzen[i - 1], profitBuy[i - 1]) + price;
        profitBuy[i] = profitSellForzen[i - 1] - price;
        profitBuyForzen[i] = Math.max(profitBuyForzen[i - 1], profitBuy[i - 1]);
        profitSellForzen[i] = Math.max(profitSellForzen[i - 1], profitSell[i - 1]);
    }
    return Math.max(profitBuyForzen[n - 1], profitSell[n - 1], profitBuy[n - 1], profitSellForzen[n - 1],)
};
