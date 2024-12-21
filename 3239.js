/**
 * @param {number[][]} grid
 * @return {number}
 */
var minFlips = function (grid) {
    let m = grid.length;
    let n = grid[0].length;
    let resultRow = 0
    let resultCol = 0;

    for (let j = 0; j < n; j++) {
         let col = []
        for (let i = 0; i < m; i++) {
            col[i] = grid[i][j]
        }
        resultCol+= caclF(col);
    }

    for (let i = 0; i < m; i++) {
        resultRow += caclF(grid[i]);
    }
    return Math.min(resultRow,resultCol);
};

function caclF(row) {
    let left = 0;
    let right = row.length - 1;
    let count = 0;
    while (left < right) {
        if (row[left] != row[right]) {
            count++;
        }
        left++;
        right--;
    }
    return count;
}

let grid =[ [0,1]];

console.log(
    minFlips(grid)
);

