/**
 * @param {string[]} matrix
 * @return {number}
 */
var maximalRectangle = function (matrix) {
    matrix = matrix.map(v => v.split(''));
    let m = matrix.length;
    let n = matrix[0].length;
    dp = Array.from({ length: m }, () => new Array(n).fill(0));
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            const element = matrix[i][j];
            
            
        }
        
    }




};

let matrix = ["10100", "10111", "11111", "10010"];
console.time("LCR 040. 最大矩形")
maximalRectangle(matrix)
console.timeEnd("LCR 040. 最大矩形")
