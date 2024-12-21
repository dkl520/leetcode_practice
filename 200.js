/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
    let m = grid.length;
    let n = grid[0].length;
    let visitGrid = Array.from({ length: m }, () => new Array(n).fill(false));
    let ans = 0;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            const el = grid[i][j];
            if (el === '1' && (!visitGrid[i][j])) {
                visitGrid[i][j] = true;
                bfs(grid, i, j, visitGrid)
                ans++;
            }
        }
    }
    return ans;
};


function bfs(grid, row, col, visitGrid) {
    let queue = new Array();
    let dirX = [0, 0, 1, -1];
    let dirY = [1, -1, 0, 0]
    // 下 上 右 左
    queue.push([row, col]);
    while (queue.length > 0) {
        let [row, col] = queue.shift();
        for (let index = 0; index < dirX.length; index++) {
            let newY = row + dirY[index];
            let newX = col + dirX[index];
            if (newX >= 0 && newX < grid[0].length && newY >= 0 && newY < grid.length && grid[newY][newX] === "1" && (!visitGrid[newY][newX])) {
                visitGrid[newY][newX] = true;
                queue.push([newY, newX])
            }
        }
    }

}

let grid = [
    ["1", "1", "1", "1", "0"],
    ["1", "1", "0", "0", "1"],
    ["1", "1", "0", "0", "0"],
    ["0", "0", "0", "1", "0"]
];

console.time("200. 岛屿数量");
console.log(numIslands(grid));
console.timeEnd("200. 岛屿数量");