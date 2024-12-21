function largestRectangleArea(heights) {
    let maxArea = 0;
    const stack = []; // 用于存储柱子的索引
    for (let i = 0; i <= heights.length; i++) {
        // 如果当前柱子高度小于栈顶柱子高度，说明找到了右边界
        while (stack.length > 0 && (i === heights.length || heights[i] < heights[stack[stack.length - 1]])) {
            const height = heights[stack.pop()]; // 弹出栈顶柱子的高度
            const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1; // 计算宽度
            const area = height * width; // 计算面积
            console.log(height,"hhhhh",area)
            maxArea = Math.max(maxArea, area); // 更新最大面积
        }
        stack.push(i); // 将当前柱子索引入栈
    }
    return maxArea;
}
let heights = [2, 1, 5, 6, 2, 3];
console.time("84. 柱状图中最大的矩形");

console.log(largestRectangleArea(heights))

console.timeEnd("84. 柱状图中最大的矩形");