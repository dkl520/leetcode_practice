
/**
 * @param {number[][]} grid
 * @return {number}
 */
var cherryPickup = function (grid) {

    let m = grid.length;
    let n = grid[0].length;

    let step = m * 2;
    let dp = Array.from({
        length: m
    }, () => Array.from({ length: n }, () => Array.from({ length: n }, () => -Infinity)));
    let left = 0
    let right = n - 1;
    dp[0][left][right] = grid[0][left] + grid[0][right];
    let status = [[left, right]];

    for (let i = 1; i < m; i++) {
        let nextStatus = [];
        while (status.length > 0) {
            let [pcol1, pcol2] = status.shift();
            let preVal = dp[i - 1][pcol1][pcol2];
            let nextOneStatus = getNextState(pcol1, pcol2, n);
            for (let j = 0; j < nextOneStatus.length; j++) {
                const [col1, col2] = nextOneStatus[j];
                let currentNum = grid[i][col1] + grid[i][col2];
                dp[i][col1][col2] = Math.max(preVal + currentNum, dp[i][col1][col2]);
            }
            nextStatus = [...nextOneStatus, ...nextStatus];
        }
        status = nextStatus;
    }
    let result = dp[m - 1].flat(Infinity);
    return Math.max(...result)

};
function getNextState(i, j, n) {
    let list = [
        [i - 1, j],
        [i - 1, j - 1],
        [i - 1, j + 1],
        [i, j],
        [i, j - 1],
        [i, j + 1],

        [i + 1, j],
        [i + 1, j - 1],
        [i + 1, j + 1]
    ]
    return list.filter(([a, b]) => {
        return a >= 0 && a < n && b >= 0 && b < n && a < b
    })
}

let grid = [
    [0, 0, 10, 2, 8, 4, 0],
    [7, 9, 3, 5, 4, 8, 3],
    [6, 9, 8, 3, 5, 6, 0],
    [0, 4, 1, 1, 9, 3, 7],
    [5, 6, 9, 8, 8, 10, 10],
    [9, 2, 9, 7, 4, 8, 3],
    [1, 6, 1, 2, 0, 9, 9]];
    
console.time("1463. 摘樱桃 II");
console.log(cherryPickup(grid));
console.timeEnd("1463. 摘樱桃 II")

debugger