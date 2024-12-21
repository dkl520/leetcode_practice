var cherryPickup = function (grid) {
    let m = grid.length;
    let n = grid[0].length;

    let dp = Array.from({ length: m }, () =>
        Array.from({ length: n }, () =>
            Array.from({ length: m }, () => Number.MIN_SAFE_INTEGER)
        )
    );
    dp[0][0][0] = grid[0][0];

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            let kMax = Math.min(i + j, m - 1);
            let kMin = Math.max(0, i + j - (m - 1));
            for (let k = kMin; k <= kMax; k++) {
                if (i == 0 && j == 0 && k == 0) {
                    continue;
                }
                if (grid[i][j] == -1 || grid[k][i + j - k] == -1) {
                    dp[i][j][k] = Number.MIN_SAFE_INTEGER;
                    continue;
                }

                let stateList = getState(i, j, k);
                if (stateList.length == 0) {
                    dp[i][j][k] = Number.MIN_SAFE_INTEGER;
                    continue;
                }

                let max = Number.MIN_SAFE_INTEGER;
                for (let z = 0; z < stateList.length; z++) {
                    const [a, b, c] = stateList[z];
                    max = Math.max(dp[a][b][c], max);
                }
                if (max != Number.MIN_SAFE_INTEGER) {
                    if (i !== k || j !== i + j - k) {
                        dp[i][j][k] = grid[i][j] + grid[k][i + j - k] + max;
                    } else {
                        dp[i][j][k] = grid[i][j] + max;
                    }
                }
            }
        }
    }
    return Math.max(dp[m - 1][n - 1][m - 1], 0);
}

function getState(i, j, k) {
    let list = [
        [i - 1, j, k - 1],
        [i - 1, j, k],
        [i, j - 1, k - 1],
        [i, j - 1, k]
    ];
    return list.filter(arr => arr.every(v => v >= 0));
}

let grid = [
    [1, -1, 1, -1, 1, 1, 1, 1, 1, -1],
    [-1, 1, 1, -1, -1, 1, 1, 1, 1, 1],
    [1, 1, 1, -1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [-1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, -1, 1, 1, 1, 1, -1, 1, 1, 1],
    [1, 1, 1, -1, 1, 1, -1, 1, 1, 1],
    [1, -1, 1, -1, -1, 1, 1, 1, 1, 1],
    [1, 1, -1, -1, 1, 1, 1, -1, 1, -1],
    [1, 1, -1, 1, 1, 1, 1, 1, 1, 1]
];

console.log(cherryPickup(grid));
