var cherryPickup = function (grid) {
    let m = grid.length;
    let n = grid[0].length;

    let dp = Array.from({ length: m }, () =>
        Array.from({ length: n }, () =>
            Array.from({ length: m }, () =>
                Array.from({ length: n }, () => Number.MIN_SAFE_INTEGER)
            )
        )
    );
    dp[0][0][0][0] = grid[0][0];
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            for (let k = 0; k < m; k++) {
                for (let l = 0; l < n; l++) {
                    if (i == 0 && j == 0 && k == 0 && l == 0) {
                        continue;
                    }
                    if (grid[i][j] == -1 || grid[k][l] == -1) {
                        dp[i][j][k][l] = Number.MIN_SAFE_INTEGER;
                        continue;
                    }
                    let stateList = getState(i, j, k, l);
                    if (stateList.length == 0) {
                        dp[i, j, k, l] == 0;
                        continue;
                    }
                    let max = Number.MIN_SAFE_INTEGER;

                    for (let z = 0; z < stateList.length; z++) {
                        const [a, b, c, d] = stateList[z];
                        let number = dp[a][b][c][d];
                        max = Math.max(number, max);
                    }
                    if (max != Number.MIN_SAFE_INTEGER) {
                        if (i !== k || j !== l) {

                            dp[i][j][k][l] = grid[i][j] + grid[k][l] + max;
                        } else {
                            dp[i][j][k][l] = grid[i][j] + max;
                        }
                    }
                }

            }

        }

    }
    return Math.max(dp[m - 1][n - 1][m - 1][n - 1], 0)


}

function getState(i, j, k, l) {


    let list = [
        [i - 1, j, k - 1, l],
        [i - 1, j, k, l - 1],
        [i, j - 1, k - 1, l],
        [i, j - 1, k, l - 1]
    ];

    return list.filter(arr => arr.every((v) => v >= 0))


}

let grid = [
    [1, 1, -1],
    [1, -1, 1],
    [-1, 1, 1]]

console.log(cherryPickup(grid));