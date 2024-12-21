/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalRectangle = function (matrix) {
    const n = matrix.length;
    const m = matrix[0].length;

    let dp = Array.from({ length: n }, () => new Array(m).fill([0, 0]));
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (i == 0 && j == 0) {
                dp[i][j] = matrix[i][j] === "1" ? [1, 1] : [0, 0];
                continue;
            }
            if (i == 0) {
                if (matrix[i][j] === "1") {
                    dp[i][j] = matrix[i][j - 1] === "1" ? ([dp[i][j - 1][0] + 1, 0]) : [1, 0]
                }
            }
            if (j == 0) {
                if (matrix[i][j] === "1") {
                    dp[i][j] = matrix[i - 1][j] === "1" ? [0, dp[i - 1][j][1] + 1] : [0, 1]
                }
            }
        }
    }
    for (let i = 1; i < n; i++) {
        for (let j = 1; j < m; j++) {
            if (matrix[i][j] === "1") {
                
            }
        }
    }



};


let matrix = [["1", "0", "1", "0", "0"], ["1", "0", "1", "1", "1"], ["1", "1", "1", "1", "1"], ["1", "0", "0", "1", "0"]]
console.time("85. 最大矩形")
console.log(maximalRectangle(matrix))
console.timeEnd("85. 最大矩形")