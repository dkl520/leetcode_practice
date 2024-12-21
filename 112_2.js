/**
 * @param {number[][]} matrix
 * @param {number} k
 * @return {number}
 */

// LCR 112. 矩阵中的最长递增路径  动态规划 +字典
var longestIncreasingPath = function (matrix) {
  let m = matrix.length;
  let n = matrix[0].length;
  // 创建一个大小为 m x n 的二维数组 dp，并将每个元素初始化为 1
  let dp = Array.from({ length: m }, () => Array(n).fill(1));
  let visited = Array.from({ length: m }, () => Array(n).fill(false))
  let ans = Number.NEGATIVE_INFINITY;
  // 遍历矩阵中的每个元素，调用 getMaxLine 函数获取以该元素为起点的最长递增路径长度，并更新 ans
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      const element = matrix[i][j];
      result = getMaxLine(i, j, element, matrix, dp, visited);
      ans = Math.max(ans, result);
    }
  }
  return ans;
};

function getMaxLine(i, j, element, matrix, dp, visited) {
  // 如果 dp[i][j] 不等于 1，说明已经计算过该位置的最长递增路径长度，直接返回结果
  if (visited[i][j]) {
    return dp[i][j]
  }
  // if (dp[i][j] !== 1) {
  //   return dp[i][j];
  // }
  // 定义下、上、右、右四个方向的偏移量
  const directX = [0, 0, 1, -1];
  const directY = [1, -1, 0, 0];
  for (let p = 0; p < directX.length; p++) {
    let newRow = i + directY[p];
    let newCol = j + directX[p];
    // 检查新的坐标是否在矩阵范围内
    if (newRow >= 0 && newRow < matrix.length && newCol >= 0 && newCol < matrix[0].length) {
      let nextEl = matrix[newRow][newCol];
      // 如果下一个元素的值比当前元素大，递归调用 getMaxLine 函数，并更新 dp[i][j] 的值
      if (element < nextEl) {
        let result = getMaxLine(newRow, newCol, nextEl, matrix, dp, visited) + 1;
        dp[i][j] = Math.max(dp[i][j], result);
        visited[i][j] = true;
      }
    }
  }
  return dp[i][j];
}

let matrix = [
  [7, 7, 5],
  [2, 4, 6],
  [8, 2, 0]
];

console.time("11LCR 112. 矩阵中的最长递增路径");
console.log(longestIncreasingPath(matrix));
console.timeEnd("11LCR 112. 矩阵中的最长递增路径");

// 将代码修改为dp[i][j] = Math.max(getMaxLine(newRow, newCol, nextEl, matrix, dp) + 1);会导致结果不正确。

// 在原始代码中，dp[i][j]的值是通过比较当前路径长度dp[i][j]和
// 递归调用getMaxLine函数得到的路径长度getMaxLine(newRow, newCol, nextEl, matrix, dp) + 1的较大值来更新的。
// 这样可以确保dp[i][j]始终记录了以(i, j)为起点的最长递增路径长度。

// 如果将代码修改为dp[i][j] = Math.max(getMaxLine(newRow, newCol, nextEl, matrix, dp) + 1);，则dp[i][j]的值将只取决于递归调用的结果，而不会与当前路径长度进行比较。这将导致dp[i][j]始终被更新为递归调用得到的路径长度，而不考虑当前路径长度。因此，最终得到的结果将不正确。

// // 因此，为了确保正确性，应该保留原始代码中的比较操作Math.max(dp[i][j], getMaxLine(newRow, newCol, nextEl, matrix, dp) + 1)，以获取较大的路径长度并更新dp[i][j]的值