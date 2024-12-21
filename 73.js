/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */

var setMatrix = function (row, col, matrix) {

    for (let j = 0; j < matrix[row].length; j++) {
        if (matrix[row][j] !== 0) {
            matrix[row][j] = "0";
        }
    }
    for (let i = 0; i < matrix.length; i++) {
        if (matrix[i][col] !== 0) {
            matrix[i][col] = "0";
        }
    }
}
var setZeroes = function (matrix) {
    const m = matrix.length;
    const n = matrix[0].length
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            const element = matrix[i][j];
            if (element === 0) {
                setMatrix(i, j, matrix);
            }
        }
    }
    matrix = matrix.map(arr => {
        return arr.map(v => Number(v))
    })
    return matrix;
};

//gpt 版本

var setZeroes = function(matrix) {
    const m = matrix.length;
    const n = matrix[0].length;
    const rows = new Array(m).fill(false); // 标记需要置零的行
    const cols = new Array(n).fill(false); // 标记需要置零的列
  
    // 遍历矩阵，记录需要置零的行和列
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        if (matrix[i][j] === 0) {
          rows[i] = true;
          cols[j] = true;
        }
      }
    }
    // 根据标记数组，将对应的行和列置零
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        if (rows[i] || cols[j]) {
          matrix[i][j] = 0;
        }
      }
    }
  
    return matrix;
  };

const matrix =
    [[0, 1, 2, 0],
    [3, 4, 5, 2],
    [1, 3, 1, 5]]


console.time("73. 矩阵置零")

console.log(setZeroes(matrix))

console.timeEnd("73. 矩阵置零")

