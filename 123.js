/**  
 * @param {number[]} prices  
 * @return {number}  
 */
class Profit {
    constructor(start, end, startValue, endValue) {
        this.start = start;
        this.end = end;
        this.startValue = startValue;
        this.endValue = endValue;
        this.profit = endValue - startValue;
    }
}

var maxProfit = function (prices) {
    // 创建一个空栈  
    let stack = new Array();
    // 初始化最小价格为最大安全整数  
    let minNum = Number.MAX_SAFE_INTEGER;
    let minIndex = -1;
    // 初始化利润为0  
    let profitArr = new Array();
    // 遍历价格数组  
    for (let i = 0; i < prices.length; i++) {
        const element = prices[i];
        if (stack.length !== 0 && prices[stack[stack.length - 1]] > element) {
            // 计算利润，即栈顶价格减去最小价格，然后加上这个差值
            let stackIndex = stack.pop();
            let profit = new Profit(minIndex, stackIndex, prices[minIndex], prices[stackIndex]);

            profitArr.push(profit);
            minNum = element;
            minIndex = i;
        }
        if ((minNum > element) && stack.length === 0) {
            minNum = element;
            minIndex = i;
        }
        if ((minNum < element)) {
            stack.pop()
            stack.push(i);
        }
        if (i === prices.length - 1 && stack.length !== 0) {
            let stackIndex = stack.pop();
            let profit = new Profit(minIndex, stackIndex, prices[minIndex], prices[stackIndex]);
            profitArr.push(profit);
        }
    }
    debugger
    let maxProOne = Number.MIN_SAFE_INTEGER;
    let maxIndex = -1;
    for (let i = 0; i < profitArr.length; i++) {
        const element = profitArr[i];
        if (element.profit > maxProOne) {
            maxProOne = element.profit;
            maxIndex = i;
        }
    }
    let leftMinStart = Number.MAX_SAFE_INTEGER; let lefMaxend = Number.MIN_SAFE_INTEGER;
    for (let i = 0; i < maxIndex; i++) {
        const element = profitArr[i];
        if (element.startValue < leftMinStart) {
            leftMinStart = element.startValue
        }
        if (element.endValue > lefMaxend) {
            lefMaxend = element.endValue
        }
    }
    let rightMinStart = Number.MAX_SAFE_INTEGER; let rightMaxend = Number.MIN_SAFE_INTEGER;;
    for (let i = maxIndex + 1; i < profitArr.length; i++) {
        const element = profitArr[i];
        if (element.startValue < rightMinStart) {
            rightMinStart = element.startValue
        }
        if (element.endValue > rightMaxend) {
            rightMaxend = element.endValue
        }
    }
    let leftMax = (lefMaxend - leftMinStart) < 0 ? 0 : (lefMaxend - leftMinStart);
    let rightMax = (rightMaxend - rightMinStart) < 0 ? 0 : (rightMaxend - rightMinStart);
    let resultArr = [leftMax, rightMax, maxProOne].sort((a, b) => b - a);
    debugger
    let firstMaxPorfit = resultArr.shift();
    let secondMaxProfit = resultArr.shift();
    return firstMaxPorfit + secondMaxProfit;

};




let prices =[14, 9, 10, 12, 4, 8, 1, 16]
console.time("121. 买卖股票的最佳时机Ⅲ");
console.log(maxProfit(prices));
console.timeEnd("121. 买卖股票的最佳时机Ⅲ");