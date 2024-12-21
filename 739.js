

/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
var dailyTemperatures = function (temperatures) {
    let answer = new Array();
    let stack = new Array();
    for (let i = 0; i < temperatures.length; i++) {
        const element = temperatures[i];
        while (stack.length > 0 && ((temperatures[stack[stack.length - 1]] < element))) {
            let stackIndex = stack.pop();
            answer[stackIndex] = i - stackIndex;
        }
        stack.push(i);
        while (stack.length > 0 && (i === temperatures.length - 1)) {
            let stackIndex = stack.pop();
            answer[stackIndex] = 0;
        }
    }
    return answer;
};

let temperatures = [73, 74, 75, 71, 69, 72, 76, 73];


console.time("739. 每日温度")

console.log(dailyTemperatures(temperatures))


console.timeEnd("739. 每日温度")
