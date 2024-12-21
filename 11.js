/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
    const n = height.length;
    let i = 0;
    let j = n - 1;
    let maxArea = Number.NEGATIVE_INFINITY;
    let leftMax = height[i];
    let rightMax = height[j];
    while (i < j) {
        let left = height[i];
        let right = height[j];
        // leftMax
        if (right >= left) {
            maxArea = Math.max(maxArea, left * (j - i))
            while (leftMax >= height[i]) {
                i++;
            }
            leftMax = height[i];
        }
        if (right < left) {
            maxArea = Math.max(maxArea, right * (j - i))
            while (rightMax >= height[j]) {
                j--;
            }
            rightMax = height[j];
        }
    }
    return maxArea;
};

let height = [1, 8, 6, 2, 5, 4, 8, 3, 7];

console.time("11. 盛最多水的容器_双指针")
console.log(maxArea(height));
console.timeEnd("11. 盛最多水的容器_双指针")


