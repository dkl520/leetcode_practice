/**  
 * @param {number[]} matchsticks - 火柴棍长度的数组  
 * @return {boolean} - 如果可以组成正方形则返回true，否则返回false  
 */
var makesquare = function (matchsticks) {
    let n = matchsticks.length; // 火柴棍的数量  
    if (n < 4) return false; // 如果火柴棍数量少于4根，则无法组成正方形  
    let sum = matchsticks.reduce((a, b) => a + b, 0); // 计算所有火柴棍的总长度  
    if (sum % 4 !== 0) return false; // 如果总长度不能被4整除，则无法组成正方形  
    let sideLength = Math.floor(sum / 4); // 计算正方形每条边的长度  
    matchsticks.sort((a, b) => a - b); // 将火柴棍按长度升序排序，方便后续处理  
    // 使用动态规划解决问题  
    // dp[mask] 表示当前火柴棍使用状态为mask时，能组成的正方形某一边的剩余长度（模sideLength的值）  
    // 使用二进制数表示火柴棍的使用状态，共n根火柴棍，所以状态数为2^n  
    let dp = new Array(1 << n).fill(-1); // 初始化dp数组，初始值为-1表示未计算  
    dp[0] = 0; // 不使用任何火柴棍时，某一边的剩余长度为0  
    // 遍历所有可能的状态         32
    for (let mask = 0; mask < (1 << n); mask++) {
        if (dp[mask] === -1) {
            continue; // 如果当前状态未计算过，则跳过  
        }
        // 遍历每根火柴棍  
        for (let i = 0; i < n; i++) {
            // 如果当前火柴棍已经被使用，则跳过  
            if ((mask & (1 << i)) !== 0) {
                continue;
            }
            // mask & (1 << i) !== 0：最后，这个表达式检查上一步的位与操作的结果是否不等于0。
            // 如果不等于0，说明mask的第i+1位是1（即被设置了）。如果等于0，说明这个位是0（即未被设置）。
            // 计算下一个状态，即将第i根火柴棍加入当前状态  
            let nextMask = mask | (1 << i);
            // 如果加上当前火柴棍后不超过边长，则更新dp[nextMask]  
            if (dp[mask] + matchsticks[i] <= sideLength) {
                dp[nextMask] = (dp[mask] + matchsticks[i]) % sideLength;
            }
            // 如果加上当前火柴棍后超过边长，则无需更新dp[nextMask]，因为无法组成正方形  
        }
    }
    // 如果所有火柴棍都被使用后（即状态为(1 << n) - 1时），某一边的剩余长度为0，则表示可以组成正方形  
    return dp[(1 << n) - 1] === 0;
};
// let matchsticks = [1, 1, 2, 2, 2];
let matchsticks = [3,3,3,3,4];

console.log(makesquare(matchsticks))


// 1, 1, 2, 2, 2总长度为8 。。。在形成边长为2 的这件事情上，所有火柴全用了
// ，并且没有剩余，所以隐式了保证了形成了4条边（并不明确）
 
// 这段代码通过动态规划的方式，利用状态压缩和模运算来判断给定的火柴棍是否可以组成一个正方形。
// 它首先检查火柴棍数量和总长度是否满足基本条件，然后对火柴棍进行排序以便后续处理。
// 接着，使用一个二维数组（实际通过一维数组和状态压缩实现）来记录每种火柴棍使用状态下
// 能组成的正方形某一边的剩余长度。
// 最后，检查所有火柴棍都被使用时，某一边的剩余长度是否为0，从而判断是否可以组成正方形。