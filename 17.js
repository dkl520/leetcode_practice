
/**
 * @param {string} digits
 * @return {string[]}
 */

const getCombination = (arr) => {
    const _arr = arr
    if (arr.length > 2) {
       let sliceArr = getCombination(arr.splice(0, 2));
       let nextArr = [sliceArr].concat(_arr);
        return getCombination(nextArr);
    } else {
        let resultArr = []
        for (let index = 0; index < _arr[0].length; index++) {
            for (let _index = 0; _index < _arr[1].length; _index++) {
                resultArr.push(_arr[0][index] + _arr[1][_index])
            }
        }
        return resultArr
    }
}
var letterCombinations = function (digits) {
    const list = [["a", "b", "c"], ["d", "e", "f"], ["g", "h", "i"],
    ["j", "k", "l"], ["m", "n", "o"], ["p", "q", "r", "s"], ["t", "u", "v"], ["w", "x", "y", "z"]];

    const number = digits.split('').map(v => list[v - 2]);
    if (number.length===0) {
        return []
    }
    if (number.length === 1) {
        return number[0];
    }
    else return getCombination(number)
};

console.time("17. 电话号码的字母组合")

console.log(letterCombinations("2"));

console.timeEnd("17. 电话号码的字母组合")