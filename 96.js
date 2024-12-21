/**
 * @param {number} n
 * @return {number}
 */
var numTrees = function (n) {
    return getfactorial(2 * n) / (getfactorial(n + 1) * getfactorial(n))
};

function getfactorial(n) {
    let numOne = 1;
    for (let i = 1; i <= n; i++) {
        numOne *= i;
    }
    return numOne;
}