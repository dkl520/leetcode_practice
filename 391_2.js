class Solution {
    // 判断一组矩形是否能恰好覆盖一个完整的矩形区域   
    isRectangleCover(rectangles) {
        const n = rectangles.length;
        const rs = new Array(n * 2).fill(0).map(() => new Array(4));

        // 将每个矩形的左上角和右下角坐标存入rs数组，并标记正负号  
        for (let i = 0, idx = 0; i < n; i++) {
            const re = rectangles[i];                // 0 为列  1 为行，
                                                     // 2为列 3 为行
            rs[idx++] = [re[0], re[1], re[3], 1];  // 左下角坐标，标记为1   1 为x 轴正方向
            rs[idx++] = [re[2], re[1], re[3], -1]; // 右下角坐标，标记为-1  -1 为x 轴负方向
        }
        //         数据准备:
        // 代码开始通过创建一个新数组rs来存储矩形的坐标。rs数组的每个元素都代表一个矩形，
        // 有两个条目分别表示左上角和右下角。
        // 矩形用正1或负1标记，以区分左上角和右下角。

        // 按x坐标排序，若x坐标相同则按y坐标排序  
        rs.sort((a, b) => {
            if (a[0] !== b[0]) return a[0] - b[0];
            return a[1] - b[1];
        });


        const l1 = [], l2 = [];
        // 遍历rs数组，处理每个x坐标相同的矩形  
        for (let l = 0; l < n * 2;) {
            let r = l;

            // 初始化两个列表l1和l2，用于存储当前x坐标下的矩形  
            l1.length = 0;
            l2.length = 0;

            // 找到当前x坐标下所有矩形的右边界  
            while (r < n * 2 && rs[r][0] === rs[l][0]) {
                r++;
            }
            // 处理当前x坐标下的矩形  
            for (let i = l; i < r; i++) {
                const cur = [rs[i][1], rs[i][2]];
                var list = rs[i][3] === 1 ? l1 : l2;
                // 根据正负号将矩形添加到l1或l2列表中  
                if (list.length === 0) {
                    debugger
                    list.push(cur);
                } else {
                    let prev = list[list.length - 1];
                    // 检查是否有重叠或顺序错误  
                    if (cur[0] < prev[1]) {
                        return false;
                    } else if (cur[0] === prev[1]) {
                        prev[1] = cur[1];
                    } else {
                        debugger
                        list.push(cur);
                    }
                }
            }
            debugger
            // 检查当前x坐标下的矩形是否能完全覆盖  
            if (l > 0 && r < n * 2) {
                debugger
                if (l1.length !== l2.length) {
                    return false;
                }
            
                for (let i = 0; i < l1.length; i++) {
                    if (l1[i][0] === l2[i][0] && l1[i][1] === l2[i][1]) {
                        continue;
                    }
                    return false;
                }
            } else {
                debugger
                // 检查最左边和最右边的矩形是否能完全覆盖  
                if (l1.length + l2.length !== 1) {
                    return false;
                }
            }            
            l = r;
        }
        // 所有矩形都处理完毕，返回true表示可以完全覆盖  
        return true;
    }
}

// 创建Solution类的实例  
let solution = new Solution();

// 将isRectangleCover方法赋值给变量isRectangleCover，方便后续调用  
let isRectangleCover = solution.isRectangleCover;


let rectangles = [[1, 1, 3, 3], [3, 1, 4, 2], [3, 2, 4, 4], [1, 3, 2, 4], [2, 3, 3, 4]];

isRectangleCover(rectangles);

debugger


// 这段代码定义了一个名为Solution的类，其中包含一个方法isRectangleCover，
// 用来判断一组矩形是否能恰好覆盖一个完整的矩形区域，不重叠、无空缺。接下来我会逐段解释代码的功能，并添加中文注释。

// 这段代码的核心思想是利用扫描线算法，
// 通过排序和遍历每个x坐标下的矩形，检查是否存在重叠或空缺，从而判断是否能恰好覆盖一个完整的矩形区域。