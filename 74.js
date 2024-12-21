/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
    let flatMatrix = matrix.flat(2);
    let start = 0; let end = flatMatrix.length - 1;
   while (start <= end) {
        let mid = Math.floor((start + end) / 2);
        if (target == flatMatrix[mid]) {
            return true;
        }
        if (target < flatMatrix[mid]) {
            end = mid - 1;
        } else {
            start = mid + 1;
        }
    }
    return false;
};









console.time("74. 搜索二维矩阵");
let matrix = [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], target = 4;
console.log(searchMatrix(matrix, target))
console.timeEnd("74. 搜索二维矩阵");

