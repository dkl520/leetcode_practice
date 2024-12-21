/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
// BFS 实现
var searchMatrix = function (matrix, target) {
    return bfs(0, 0, matrix[0][0], matrix, target)
};
function bfs(row, col, element, matrix, target) {
    const m = matrix.length;
    const n = matrix[0].length;
    let queue = new Array();
    let Obj = { row, col, element };
    queue.push(Obj);
    while (queue.length > 0) {
        const { row, col, element } = queue.shift();
        if (element === target) {
            return true;
        }
        let dirX = [0, 1];
        let dirY = [1, 0];
        for (let i = 0; i < dirX.length; i++) {
            const newX = row + dirY[i];
            const newY = col + dirX[i];
            if (newX < m && newY < n) {
                if (queue.length > 0) {
                    let { row, col } = queue[queue.length - 1];
                    if (JSON.stringify([row, col]) !== JSON.stringify([newX, newY])) {
                        queue.push({ row: newX, col: newY, element: matrix[newX][newY] })
                    }
                } else {
                    queue.push({ row: newX, col: newY, element: matrix[newX][newY] })
                }
            }
        }
    }
    return false;
}
//  二维矩阵 双指针
// 这个函数利用了矩阵的特性：在排序的矩阵中，值是按行递增然后按列递减的。因此，只需要从右上角的元素开始搜索，
// 如果目标值比当前元素小，就向左移动一列；如果目标值比当前元素大，就向下移动一行。这样就可以在 O(m+n) 
// 的时间复杂度内找到目标值（其中 m 是矩阵的行数，n 是矩阵的列数）。
// 定义一个名为 searchMatrix 的函数，接收两个参数：一个二维数组 matrix 和一个目标值 target  
function searchMatrix(matrix, target) {  
  
    // 获取矩阵的行数  
    const m = matrix.length;  
    // 获取矩阵的列数  
    const n = matrix[0].length;  
    // 初始化行索引 i 为 0  
    let i = 0;  
    // 初始化列索引 j 为 n-1，因为我们将从矩阵的右上角开始搜索  
    let j = n - 1;  
    // 在矩阵中遍历，直到 i 到达矩阵的最后一行或者 j 到达矩阵的左上角  
    while (i < m && j >= 0) {  
      // 获取当前索引 (i, j) 处的值  
      const v = matrix[i][j];  
      // 如果当前值等于目标值，则返回 true  
      if (v === target) {  
        return true;  
      }   
      // 如果当前值大于目标值，则将 j 减 1，因为我们知道在更小的 j 值处不可能找到目标值  
      else if (v > target) {  
        j -= 1;  
      }   
      // 如果当前值小于目标值，则将 i 加 1，因为我们知道在更大的 i 值处不可能找到目标值  
      else {  
        i += 1;  
      }  
    }  
    // 如果在遍历完整个矩阵后都没有找到目标值，则返回 false  
    return false;  
  }
let matrix =
    [[5, 6, 10, 14],
    [6, 10, 13, 18],
    [10, 13, 18, 19]];
let target = 13;
console.time("240. 搜索二维矩阵 II");
console.log(searchMatrix(matrix, target))
console.timeEnd("240. 搜索二维矩阵 II");