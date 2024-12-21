/**
 * @param {number[]} queries
 * @param {number} m
 * @return {number[]}
 */
var processQueries = function (queries, m) {
    let arr = [];
    for (let i = 0; i < m; i++) {
        arr.push(i + 1);
    }
    let result = [];
    for (const value of queries) {
        for (let i = 0; i < m; i++) {
            if (value == arr[i]) {
                result.push(i);
                arr.splice(i, 1);
            }
        }
        arr.unshift(value);
    }
    return result;
};

let queries = [3, 1, 2, 1]
let m = 5


// [1,2,3,4,5]