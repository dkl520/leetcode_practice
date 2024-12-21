/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function (n, k) {
    let arrN = new Array(n);

    for (let i = 1; i <= arrN.length; i++) {
        arrN[i] = i;
    }

    let results = new Array();
    let result = new Array();
    debugger
    dfs(arrN, k, results, result);


};


function dfs(arrN, k, results, result) {
    if (result.length == k) {
        results.push(result.slice());
        result.pop();
    }   
    debugger
    for (let i = 1; i <= arrN.length; i++) {
        const element = arrN[i];
        result.push(element);
        dfs(arrN.slice(i + 1), k, results, result);
        result.pop();
    }

    return;
}