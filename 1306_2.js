/**
 * @param {number[]} arr
 * @param {number} start
 * @return {boolean}
 */
var canReach = function (arr, start) {
    let dp = new Array(arr.length).fill(false);
    let arrZero = arr.reduce((acc, v, i) => {
        if (v === 0) {
            acc.push(i);
            dp[i] = true;
        }
        return acc;
    }, []);

    let dict = new Map();
    let dictReverse = new Map();

    for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        if (i - element >= 0) {
            dict.set(i - element, (dict.get(i - element) || []).concat(i));
            dictReverse.set(i, (dictReverse.get(i) || []).concat(i - element));
        }
        if (i + element < arr.length) {
            dict.set(i + element, (dict.get(i + element) || []).concat(i));
            dictReverse.set(i, (dictReverse.get(i) || []).concat(i + element));
        }
    }

    let stack = [...arrZero];
    while (stack.length > 0) {
        const current = stack.pop();
        if (dict.has(current)) {
            let arrCanReach = dict.get(current).filter((v) => !dp[v]);
            arrCanReach.forEach((v) => {
                dp[v] = true;
                stack.push(v);
            });
        }
    }

    return dp[start];
};

let arr = [0, 3, 0, 6, 3, 3, 4];
let start = 6;
console.time("1306. Jump Game III");
console.log(canReach(arr, start));
console.timeEnd("1306. Jump Game III");
