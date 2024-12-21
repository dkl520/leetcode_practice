/**
 * @param {number[][]} forest
 * @return {number}
 */
var cutOffTree = function (forest) {
    const m = forest.length;
    const n = forest[0].length;
    let steps = 0;
    let dictTable = Array.from({ length: m }, () => new Array(n).fill(false));
    dictTable[0][0] = true;
    let minTree = {
        row: 0,
        col: 0,
        value: Number.MAX_SAFE_INTEGER
    }
    steps = bfs(0, 0, forest, steps, m, n, dictTable, minTree)
    let bol = calcDict(dictTable, forest, m, n);
    return bol ? steps : -1;
};
function calcDict(dictTable, forest, m, n) {
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (dictTable[i][j] === false && forest[i][j] !== 0) {
                return false;
            }
        }
    }
    return true;
}


function bfs(row, col, forest, steps, m, n, dictTable) {
    const dirtX = [0, 0, -1, 1];
    const dirtY = [-1, 1, 0, 0];
    let currentTree = forest[row][col]
    let nextArr = new Array();
    for (let d = 0; d < dirtX.length; d++) {
        const nextX = col + dirtX[d];
        const nextY = row + dirtY[d];
        if (nextX < n && nextX >= 0 && nextY >= 0 && nextY < m) {
            let nextTreeNum = forest[nextY][nextX];
            // (nextTreeNum > currentTree) &&
            if ((nextTreeNum !== 0) && (!dictTable[nextY][nextX])) {
                let nextTree = {
                    row: nextY,
                    col: nextX,
                    value: nextTreeNum
                }
                nextArr.push(nextTree);
            }
        }
    }

    nextArr.sort((a, b) => a.value - b.value);
    if (nextArr.length == 0) {
        return steps;
    }
    steps++;

    let minTree = nextArr.shift();
    row = minTree.row;
    col = minTree.col;
    console.log(minTree.value);
    dictTable[row][col] = true;
    return bfs(row, col, forest, steps, m, n, dictTable)
}

let forest = [
    [545, 640, 243, 691],
    [863, 613, 687, 797],
    [6,   921, 898, 947],
    [839, 227, 462, 475],
    [890, 189, 254, 608]];


console.time("675. 为高尔夫比赛砍树")
console.log(cutOffTree(forest))
console.timeEnd("675. 为高尔夫比赛砍树")
