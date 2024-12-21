

/**
 * @param {number[][]} dungeon
 * @return {number}
 */
function isArray2D(arr) {
    if (Array.isArray(arr) && arr.length > 0) {
        return Array.isArray(arr[0]);
    }
    return false;
}
function filterArray(arr) {
    return arr.filter(([a, b], index) => {
        const largerValuesExist = arr.some(([x, y], i) => i !== index && x > a && y > b);
        return !largerValuesExist;
    });
}


var calculateMinimumHP = function (dungeon) {
    const m = dungeon.length;
    const n = dungeon[0].length;
    let results = Array.from({ length: m }, () => new Array(n));
    for (let i = 0; i < m; i++) {
        if (i == 0) {
            results[i][0] = [dungeon[i][0], dungeon[i][0]];
        } else {
            results[i][0] = [
                dungeon[i][0] + results[i - 1][0][0],
                Math.min(dungeon[i][0] + results[i - 1][0][0], results[i - 1][0][1])
            ]
        }
    }
    for (let j = 0; j < n; j++) {
        if (j == 0) {
            results[0][j] = [dungeon[0][j], dungeon[0][j]];
        } else {
            results[0][j] = [
                dungeon[0][j] + results[0][j - 1][0],
                Math.min(dungeon[0][j] + results[0][j - 1][0], results[0][j - 1][1])
            ]
        }
    }
    if (m === 1 || n == 1) {
        if (results[m-1][n-1][1] > 0) {
            return 1;
        } else {
            return Math.abs(results[m-1][n-1][1]) + 1;
        }
    }
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {

            let numA = results[i][j - 1]
            let numB = results[i - 1][j]
            let formatA = [], formatB = [];
            if (isArray2D(numA)) {
                formatA = numA;
            } else {
                formatA = [numA];
            }
            if (isArray2D(numB)) {
                formatB = numB;
            } else {
                formatB = [numB];
            }
            results[i][j] = [...formatA, ...formatB].map(arr => {
                const modifiedArr = [arr[0] + dungeon[i][j], Math.min(arr[1], arr[0] + dungeon[i][j])];
                return [...modifiedArr];
            });
            results[i][j] = filterArray(results[i][j])
        }
    }
    let healthPoint = Math.max(...results[m - 1][n - 1].map(arr => arr[1]));
    if (healthPoint > 0) {
        return 1;
    } else {
        return Math.abs(healthPoint) + 1;
    }
}



let dungeon = [[0,0]]
console.time("74. 地下城游戏")

console.log(calculateMinimumHP(dungeon));


console.timeEnd("74. 地下城游戏");



