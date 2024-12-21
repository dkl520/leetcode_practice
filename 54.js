

/**
 * @param {number[][]} matrix
 * @return {number[]}
 */



var spiralOrder = function (matrix) {
    const m = matrix.length;
    const n = matrix[0].length;
    if (m == 1 && n == 1) {
        return [matrix[0][0]];
    }
    let sum = m * n;
    let results = [];
    let colStart = 0;
    let colEnd = n - 1;
    let rowStart = 0;
    let rowEnd = m - 1;
    while (sum > 0) {
        //    左到右边
        for (let i = colStart; i <= colEnd; i++) {
            const element = matrix[rowStart][i];
            results.push(element)
            sum--;
            if (sum == 0) {
                return results;
            }
        }

        //    上边到下边
        for (let i = rowStart + 1; i < rowEnd; i++) {
            const element = matrix[i][colEnd];
            results.push(element)
            sum--;
            if (sum == 0) {
                return results;
            }
        }

        // 右到左
        for (let i = colEnd; i > colStart; i--) {
            const element = matrix[rowEnd][i];
            results.push(element)
            sum--;
            if (sum == 0) {
                return results;
            }
        }
        // 下到上    
        for (let i = rowEnd; i > rowStart; i--) {
            const element = matrix[i][rowStart];
            results.push(element)
            sum--;
            if (sum == 0) {
                return results;
            }

        }
        rowStart++;
        colStart++;
        colEnd--;
        rowEnd--;

    }
    return results;
};

 spiralOrder = function(matrix) {
    if (matrix.length === 0) {
      return []; // 空矩阵，返回空数组
    }
  
    const m = matrix.length; // 行数
    const n = matrix[0].length; // 列数
    const result = []; // 存储螺旋顺序的结果数组
  
    let top = 0; // 上边界
    let bottom = m - 1; // 下边界
    let left = 0; // 左边界
    let right = n - 1; // 右边界
  
    while (top <= bottom && left <= right) {
      // 遍历上边界，从左到右
      for (let i = left; i <= right; i++) {
        result.push(matrix[top][i]);
      }
      top++; // 上边界向下收缩
  
      // 遍历右边界，从上到下
      for (let i = top; i <= bottom; i++) {
        result.push(matrix[i][right]);
      }
      right--; // 右边界向左收缩
  
      // 检查是否遍历完所有行和列
      if (top <= bottom && left <= right) {
        // 遍历下边界，从右到左
        for (let i = right; i >= left; i--) {
          result.push(matrix[bottom][i]);
        }
        bottom--; // 下边界向上收缩
  
        // 遍历左边界，从下到上
        for (let i = bottom; i >= top; i--) {
          result.push(matrix[i][left]);
        }
        left++; // 左边界向右收缩
      }
    }
  
    return result;
  };





let matrix =
    [[1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16]]

console.time("54. 螺旋矩阵")
console.log(spiralOrder(matrix));
console.timeEnd("54. 螺旋矩阵")