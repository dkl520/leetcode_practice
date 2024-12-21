/**  
 * @param {number[]} prices  
 * @return {number}  
 */  
var maxProfit = function (prices) {  
    // 创建一个空栈  
    let stack = new Array();  
    // 初始化最小价格为最大安全整数  
    let minNum = Number.MAX_SAFE_INTEGER;  
    // 初始化利润为0  
    let profitAcc = 0;  
      
    // 遍历价格数组  
    for (let i = 0; i < prices.length; i++) {  
        const element = prices[i];  
          
        // 如果栈不为空，且当前价格比栈顶的价格低  
        if (stack.length !== 0 && stack[stack.length - 1] > element) {  
            // 计算利润，即栈顶价格减去最小价格，然后加上这个差值  
            profitAcc += (stack.pop() - minNum);  
            // 更新最小价格为当前价格  
            minNum = element;  
        }  
          
        // 如果栈为空，且当前价格大于最小价格，则更新最小价格  
        if ((minNum > element) && stack.length === 0) {  
            minNum = element;  
        }  
          
        // 如果栈不为空，且当前价格小于最小价格，则弹出栈顶元素，并更新最小价格为当前价格  
        if ((minNum < element)) {  
            stack.pop()  
            stack.push(element);  
        }  
          
        // 在循环结束时，如果栈不为空，则计算并添加最后的利润  
        if (i === prices.length - 1 && stack.length !== 0) {  
            profitAcc += (stack.pop() - minNum);   
        }  
    }  
    // 返回最大利润  
    return profitAcc;  
};  

// 定义一个价格数组作为例子  
let prices = [1, 2, 3, 4, 5]
// 使用console.time和console.timeEnd来测量代码执行时间（这里的计时标签是"121. 买卖股票的最佳时机"）  
console.time("122. 买卖股票的最佳时机二")
// 调用函数并打印结果  
console.log(maxProfit(prices))
// 结束计时  
console.timeEnd("122. 买卖股票的最佳时机二")