// // function stockPairs(stocksProfit, target) {
// //     // Write your code here
// //     let dict = {};
// //     let seenPairs = new Set();
// //     // stocksProfit = [...new Set(stocksProfit)];
// //     for (let i = 0; i < stocksProfit.length; i++) {
// //         dict[stocksProfit[i]] = (dict[stocksProfit[i]] || 0) + 1;
// //     }
// //     let result = 0;
// //     for (let j = 0; j < stocksProfit.length; j++) {
// //         let cur = stocksProfit[j];
// //         let next = target - stocksProfit[j];
// //             // 确保配对未被计算过
// //             if (seenPairs.has(cur) || seenPairs.has(next)) {
// //                 continue;  // 已处理过的配对跳过
// //             }
// //         if (cur == next && (dict[next] || 0) >= 2) {
// //             dict[target - stocksProfit[j]]--;
// //             dict[stocksProfit[j]]--;
// //             result++;
// //         } else {
// //             if ((dict[next] || 0) > 0 && (dict[cur] || 0) > 0) {
// //                 dict[target - stocksProfit[j]]--;
// //                 dict[stocksProfit[j]]--;
// //                 result++;
// //             }
// //         }
// //     }
// //     return result;



// // }

// // // let  stocksProfit= [5,7,9,13,11,6,6,3,3], target=12;
// // let stocksProfit = [6,
// //     12,
// //     3,
// //     9,
// //     3,
// //     5,
// //     1], target = 12;

// // console.log(stockPairs(stocksProfit, target));








// // function maxElement(n, maxSum, k) {
// //     // 初始化数组和其他变量
// //     let arr = new Array(n).fill(0);
// //     let left = k, right = k, maxVal = maxSum;

// //     // 初始化第 k 位置的值为 1，开始构建数组
// //     arr[k] = 1;
// //     maxSum--;

// //     // 不断增加两侧的值，直到 maxSum 耗尽
// //     while (maxSum > 0) {
// //         if (left > 0) {
// //             // 向左侧扩展
// //             arr[--left] = Math.min(arr[left + 1] + 1, maxSum);
// //             maxSum -= arr[left];
// //         }
// //         if (right < n - 1) {
// //             // 向右侧扩展
// //             arr[++right] = Math.min(arr[right - 1] + 1, maxSum);
// //             maxSum -= arr[right];
// //         }
// //         // 确保不超出 maxSum
// //         if (left == 0 && right == n - 1) {
// //             break;
// //         }
// //     }

// //     // 调整数组以满足 sum(arr) <= maxSum
// //     while (maxSum < 0) {
// //         for (let i = 0; i < n; i++) {
// //             if (arr[i] > 0) {
// //                 arr[i]--;
// //                 maxSum++;
// //                 if (maxSum == 0) break;
// //             }
// //         }
// //     }

// //     return arr[k]; // 返回第 k 位置的值
// // }

// // // 示例测试
// // console.log(maximizeAtIndexK(3, 7, 1)); // 输出 3
// // console.log(maximizeAtIndexK(3, 8, 1)); // 输出 3












// const P = 131;
// const M = 10**9 + 7;
// const PP = Array.from({ length: 11 }, (_, i) => P ** i);
// const APPENDS = ["", ...Array.from("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"), ...Array.from("0123456789")];
// function calc_hash(pw) {
//     let cur_h = 0;
//     for (let i = 0; i < pw.length; i++) {
//         cur_h += pw.charCodeAt(pw.length - (i + 1)) * PP[i];
//     }
//     return cur_h % M;
// }

// function authEvents(events) {
//     let cur_h = null;
//     let good_hashs = null;
//     let ans = [];

//     for (let [event, value] of events) {
//         if (event === "setPassword") {
//             good_hashs = new Set(APPENDS.map(x => calc_hash(value + x)));
//         } else if (event === "authorize") {
//             ans.push(good_hashs.has(parseInt(value)) ? 1 : 0);
//         }
//     }

//     return ans;
// }

// // 示例使用
// let events = [
//     ["setPassword", "abc"],
//     ["authorize", "123456"],
//     ["authorize", "654321"]
// ];
// console.log(authEvents(events)); // 示例输出




function optimizeTikTokRoutes(numServers, disconnectedPairs) {
    // Write your code here

    disconnectedPairs.sort((a, b) => a[0] - b[0]);

    let strDisconnectedPairs = disconnectedPairs.map((pair) => String(pair));
    let result = 0;
    for (let i = 1; i <= numServers; i++) {
        const element = i;
        result++;
        if (i != numServers) {

            const pair = String([i, i + 1]);
            if (strDisconnectedPairs.indexOf(pair) >= 0) {
                debugger
                continue;
            }
            result++;
        }
    }
    return result;
}

let numServers = 3;
let disconnectedPairs = [[1, 3], [2, 3]];

optimizeTikTokRoutes(numServers, disconnectedPairs);



