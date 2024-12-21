/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function (matrix) {
    let m = matrix.length;
    let n = matrix[0].length;
    let rotateMatrix = Array.from({ length: n }, () => new Array(m));
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            const element = matrix[i][j]
            rotateMatrix[j][n - 1] = element;
        }
        n--;
    }
    for (let i = 0; i < rotateMatrix.length; i++) {
        for (let j = 0; j < rotateMatrix[0].length; j++) {
            matrix[i][j] = rotateMatrix[i][j];
        }
    }
    return matrix;
}

// chatGPT版本；

var rotate = function(matrix) {
    let n = matrix.length;
  
    // 先进行转置操作
    for (let i = 0; i < n; i++) {
      for (let j = i; j < n; j++) {
        [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
      }
    }
    
    // 再进行水平翻转操作
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < Math.floor(n / 2); j++) {
        [matrix[i][j], matrix[i][n - 1 - j]] = [matrix[i][n - 1 - j], matrix[i][j]];
      }
    }
  };




let matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
console.time("48. 旋转图像")
console.log(rotate(matrix))
console.timeEnd("48. 旋转图像")