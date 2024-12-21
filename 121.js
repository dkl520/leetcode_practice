// 定义一个函数，输入是一个价格数组，返回能获得的最大利润  
var maxProfit = function (prices) {  
    // 初始化最低价格为最大安全整数，以保证它能被任何价格超过  
    let minInput = Number.MAX_SAFE_INTEGER;  
    // 初始化最大利润为0  
    let maxfit = 0;  
    // 遍历价格数组  
    for (let i = 0; i < prices.length; i++) {  
        // 获取当前价格  
        const element = prices[i];  
        // 如果当前价格比最低价格还低，更新最低价格  
        if (element < minInput) {  
            minInput = element;  
        } else {  
            // 否则，尝试计算当前价格卖出能得到的最大利润  
            maxfit = Math.max(maxfit, element - minInput)  
        }  
    }  
    // 返回最大利润  
    return maxfit;  
};  
// 定义一个价格数组作为例子  
let prices = [7, 1, 5, 3, 6, 4];  
// 使用console.time和console.timeEnd来测量代码执行时间（这里的计时标签是"121. 买卖股票的最佳时机"）  
console.time("121. 买卖股票的最佳时机")  
// 调用函数并打印结果  
console.log(maxProfit(prices))  
// 结束计时  
console.timeEnd("121. 买卖股票的最佳时机")