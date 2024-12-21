/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function (n, k) {
    let arrN = new Array();
    for (let i = 1; i <= n; i++) {
        arrN.push(i);
    }
    let results = new Array();
    let result = new Array();
    dfs(arrN, k, results, result);
    return results;

};

function dfs(arrN, k, results, result) {
    if (result.length == k) {
        results.push(result.slice());
        return;
    }
    for (let i = 0; i < arrN.length; i++) {
        const element = arrN[i];
        result.push(element);
        dfs(arrN.slice(i + 1), k, results, result);
        result.pop();
    }

    return;
}

console.time("LCR 080. 组合")
console.log(combine(4, 2))
console.timeEnd("LCR 080. 组合")