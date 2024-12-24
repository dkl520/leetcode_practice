/**
 * @param {number} m
 * @param {number} n
 * @param {number[]} horizontalCut
 * @param {number[]} verticalCut
 * @return {number}
 */
var minimumCost = function(m, n, horizontalCut, verticalCut) {
    const memo = new Array(m * m * n * n).fill(-1);
    const index = (row1, col1, row2, col2) => {
        return (row1 * n + col1) * m * n + row2 * n + col2;
    };

    const dp = (row1, col1, row2, col2) => {
        if (row1 === row2 && col1 === col2) {
            return 0;
        }
        const ind = index(row1, col1, row2, col2);
        if (memo[ind] >= 0) {
            return memo[ind];
        }

        memo[ind] = Number.MAX_SAFE_INTEGER;
        for (let i = row1; i < row2; i++) {
            memo[ind] = Math.min(memo[ind], dp(row1, col1, i, col2) + dp(i + 1, col1, row2, col2) + horizontalCut[i]);
        }
        for (let i = col1; i < col2; i++) {
            memo[ind] = Math.min(memo[ind], dp(row1, col1, row2, i) + dp(row1, i + 1, row2, col2) + verticalCut[i]);
        }
        return memo[ind];
    };

    return dp(0, 0, m - 1, n - 1);
};