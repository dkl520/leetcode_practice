/**
 * @param {number[][]} grid
 * @return {number}
 */
var orangesRotting = function (grid) {
    let m = grid.length;
    let n = grid[0].length;
    let targetList = findTarget(2, grid);
    let count = 0
    let limitTarget = findTarget(1, grid);
    if (limitTarget.length == 0) {
        return 0;
    }
    while (targetList.length > 0) {
        let x = [-1, 1, 0, 0];
        let y = [0, 0, -1, 1];
        let neighborList = new Array();
        let limitTarget = findTarget(1, grid);
        if (limitTarget.length == 0) {
            return count;
        }
        for (let i = 0; i < targetList.length; i++) {
            const targetPosition = targetList[i];
            for (let p = 0; p < x.length; p++) {
                let neighborPositionY = y[p] + targetPosition[0];
                let neighborPositionX = x[p] + targetPosition[1];
                if (neighborPositionX >= 0 && neighborPositionX < n && neighborPositionY >= 0 && neighborPositionY < m
                    && grid[neighborPositionY][neighborPositionX]
                    && grid[neighborPositionY][neighborPositionX] === 1) {
                    grid[neighborPositionY][neighborPositionX] = 2;
                    neighborList.push([neighborPositionY, neighborPositionX]);
                }
            }
        }
        count++;
        targetList = neighborList
    }
    limitTarget = findTarget(1, grid);
    if (limitTarget.length > 0) {
        return -1;
    }
    return count;
    function findTarget(target, grid) {
        let targetList = new Array();
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                if (grid[i][j] === target) {
                    targetList.push([i, j])
                }
            }
        }
        return targetList;
    }


};

let grid = [
    [2, 1, 1],
    [1, 1, 0],
    [0, 1, 1]
]
console.time("994. 腐烂的橘子");
console.log(orangesRotting(grid));

console.timeEnd("994. 腐烂的橘子")