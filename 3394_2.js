/**
 * @param {number} n - 矩形的数量
 * @param {number[][]} rectangles - 矩形的数组，每个矩形由四个数字 [a, b, c, d] 表示
 * @return {boolean} - 返回是否可以通过三次或更多次水平或垂直切割将所有矩形分割开
 */
var checkValidCuts = function(n, rectangles) {
    // 创建对象来模拟 defaultdict 行为，用于记录水平和垂直方向的切割点
    let dx = {}; // 用于记录水平切割点的对象
    let dy = {}; // 用于记录垂直切割点的对象
    
    // 处理每个矩形
    for (let [a, b, c, d] of rectangles) {
        // 加 0.1 来创建间隙以便计数，避免整数重叠
        dx[a + 0.1] = (dx[a + 0.1] || 0) + 1; // 在左边界 a + 0.1 处增加一个切割点
        dx[c - 0.1] = (dx[c - 0.1] || 0) - 1; // 在右边界 c - 0.1 处减少一个切割点
        dy[b + 0.1] = (dy[b + 0.1] || 0) + 1; // 在下边界 b + 0.1 处增加一个切割点
        dy[d - 0.1] = (dy[d - 0.1] || 0) - 1; // 在上边界 d - 0.1 处减少一个切割点
    }
    
    // 计算水平切割次数
    let resx = 0; // 用于记录水平切割次数
    let tmp = 0; // 临时变量，用于累加切割点的变化
    // 遍历所有水平切割点，按数值大小排序
    for (let x of Object.keys(dx).sort((a, b) => parseFloat(a) - parseFloat(b))) {
        tmp += dx[x]; // 累加当前切割点的变化值
        if (tmp === 0) { // 如果累加值为 0，表示找到一个完整的切割
            resx++; // 水平切割次数加 1
        }
    }
    if (resx >= 3) return true; // 如果水平切割次数大于等于 3，返回 true
    
    // 计算垂直切割次数
    let resy = 0; // 用于记录垂直切割次数
    tmp = 0; // 重置临时变量
    // 遍历所有垂直切割点，按数值大小排序
    for (let x of Object.keys(dy).sort((a, b) => parseFloat(a) - parseFloat(b))) {
        tmp += dy[x]; // 累加当前切割点的变化值
        if (tmp === 0) { // 如果累加值为 0，表示找到一个完整的切割
            resy++; // 垂直切割次数加 1
        }
    }
    if (resy >= 3) return true; // 如果垂直切割次数大于等于 3，返回 true
    
    return false; // 如果水平和垂直切割次数都小于 3，返回 false
};