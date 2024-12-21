/**
 * @param {number} k
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (k, prices) {

    let n = prices.length;
    // let daysK_0 = Array.from({ length: n }, () => new Array(k).fill(0));
    // let daysK_1 = Array.from({ length: n }, () => new Array(k).fill(0));
    let daysK_0 = new Array(k).fill(0);
    let daysK_1 = new Array(k).fill(Number.NEGATIVE_INFINITY);
    // let k = 2, prices = [3, 2, 6, 5, 0, 3];



    for (let i = 0; i < prices.length; i++) {
        for (let j = k; j >= 1; j--) {
            if (i == 0) {
                daysK_0[j] = 0;
                daysK_1[j] = - prices[i]

            } else {
                debugger
                daysK_0[j] = Math.max(daysK_0[j], daysK_1[j] + prices[i])
                daysK_1[j] = Math.max(daysK_1[j], daysK_0[j - 1] - prices[i])
            }
        }
        debugger
    }
    return daysK_0[k];

};
let k = 2, prices = [3, 2, 6, 5, 0, 3];
console.time("188. 买卖股票的最佳时机 IV")
console.log(maxProfit(2, prices));

console.timeEnd("188. 买卖股票的最佳时机 IV");