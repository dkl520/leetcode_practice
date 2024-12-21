/**
 * @param {number[]} arr
 * @return {number}
 */
var minJumps = function (arr) {
    let n = arr.length;
    let dp = new Array(n).fill(Infinity);
    dp[0] = 0;
    let map = new Map();
    map = optimizeArrayMapping(arr);
    let lineArrMap = new Array(arr.length).fill(false);
    for (let i = 0; i < arr.length; i++) {
        if (lineArrMap[i]) {
            continue;
        }
        const element = arr[i];
        if (i - 1 >= 0) {
            dp[i] = Math.min(dp[i], dp[i - 1] + 1);

        }
        if (i + 1 < n) {
            dp[i] = Math.min(dp[i], dp[i + 1] + 1);

        }
        let nextArr = map.get(element).filter((v) => (v !== i));
        nextArr.map(v => {
            if (!lineArrMap[v]) {
                lineArrMap[v] = true;
                dp[v] = dp[i] + 1;
              
            }
        });
        lineArrMap[i] = true;
    }
    return dp[n - 1];
};
function optimizeArrayMapping(arr) {
    const map = new Map();
    const len = arr.length;
    for (let i = 0; i < len; i++) {
        const v = arr[i];
        map.set(v, (map.get(v) || []).concat(i));
    }

    return map;
}


let arr =
    [-76, 3, 66, -32, 64, 2, -19, -8, -5, -93, 80, -5, -76, -78, 64, 2, 16];

console.time("1345. 跳跃游戏 IV");
console.log(minJumps(arr));
console.timeEnd("1345. 跳跃游戏 IV");
