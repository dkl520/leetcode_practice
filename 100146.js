/**
 * @param {number} n
 * @param {number[]} sick
 * @return {number}
 */
var numberOfSequence = function (n, sick) {
    let personList = new Array(n);
    for (let i = 0; i < n; i++) {
        personList[i] = i;
    }
    if (sick.length == 1 && (sick[0] === 0 || sick[0] === n - 1)) {
        return 1;
    }
    if (sick.length == 1 && sick[0] != 0 && sick[0] != n - 1) {
        return n - 1;
    }

    if (sick.length === 2 && sick[0] === 0 && sick[0] === n - 1) {
        return 2 ** (n - 2 - 1);
    }



    // debugger



};
let n = 5;
let sick = [0, 4];
console.time("100146. 统计感冒序列的数目");
console.log(numberOfSequence(n, sick))
console.timeEnd("100146. 统计感冒序列的数目")