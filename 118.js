/**
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function (numRows) {
    let result = [];
    if (numRows == 1) {
        return [[1]]
    }
    if (numRows == 2) {
        return [[1], [1, 1]]
    }

    result = [[1], [1, 1]];
    while (numRows > 2) {
        let next = [];
        const last = result[result.length - 1];
        for (let i = 0; i < last.length - 1; i++) {
            const el1 = last[i];
            const el2 = last[i + 1];
            next.push(el1 + el2);
        }
        next.push(1);
        next.unshift(1);

        result.push(next);
        numRows--;
    }
    return result;

};



console.time("118. 杨辉三角")
let numRows = 6;
console.log(generate(numRows))

console.timeEnd("118. 杨辉三角")