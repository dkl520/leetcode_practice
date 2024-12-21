/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {
    let results = new Array();
    candidates = candidates.filter(v => v <= target);
    let multipleList = candidates.map(v => {
        return Math.floor(target / v);
    })
    recrusion(candidates, multipleList, new Array(), results, target, 0)


}

function recrusion(candidates, multipleList, result, results, target, index) {
    if (target < 0) {
        return;
    }
    if (target === 0) {
        results.push(result.slice());
        result.pop();
        return
    }
    if (index >= candidates.length) {
        return;
    }
    let currentNum = candidates[index];
    let currenMultiple = multipleList[index];
    for (let i = 0; i <= currenMultiple; i++) {
        const element = currentNum * i;
        index++;
        target = target - element;
        result = [...result, ...new Array(i).fill(currentNum)];
        recrusion(candidates, multipleList, result, results, target, index);
        result.splice(-i, i);
        index--;
        target = target + element;
    }

}




let candidates = [2, 3, 6, 7], target = 7;

console.time("39. 组合总和")
console.log(combinationSum(candidates, target));
console.timeEnd("39. 组合总和")
debugger