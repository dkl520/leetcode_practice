/**
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function (heights) {
    let sortedHeights = new Set([...heights]);
    sortedHeights = [...sortedHeights].sort((a, b) => a - b);
    let minAcc = 0;
    let max = 0;
    for (let i = 0; i < sortedHeights.length; i++) {
        const minElement = sortedHeights[i];
        for (let j = 0; j < heights.length; j++) {
            const element = heights[j];
            if (minElement <= element) {
                minAcc += minElement;
            } else {
                max = Math.max(minAcc, max);
                minAcc = 0;
            }
        }
        max = Math.max(minAcc, max);
        minAcc = 0;
    }
    return max;
};

let heights = [2, 1, 5, 6, 2, 3];

console.time("84. 柱状图中最大的矩形");

console.log(largestRectangleArea(heights))

console.timeEnd("84. 柱状图中最大的矩形");