/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function (text1, text2) {
    let dict = new Object;
    let textMax;
    if (text1.length < text2.length) {
        textMax = text2;
    } else if (text1.length > text2.length) {
        textMax = text1;
    } else {
        textMax = text1;
    }
    let textArr = textMax.split("");
    let initObj = new Object();
    for (let i = textArr.length - 1; i >= 0; i--) {
        const el = textArr[i];
        if (i === textArr.length - 1) {
            dict[el] = el;
            initObj[el] = el;
        } else {
            dict[el] = initObj;
            initObj = JSON.parse(JSON.stringify(dict));
        }
    }
    let textMin;
    if (text1.length < text2.length) {
        textMin = text1;
    } else if (text1.length > text2.length) {
        textMin = text2;
    } else {
        textMin = text2;
    }
    let textMinArr = textMin.split("");
    let dp = new Array(textMinArr.length).fill(0);
    for (let i = 0; i < textMinArr.length; i++) {
        const el = textMin[i];
        if (el in dict) {
            if (i === 0) {
                dp[i] = 1;
            } else {
                dp[i] =   dp[i - 1] + 1;
            }
        } else {
            if (i === 0) {
                dp[i] = 0;
            } else {
                dp[i] = dp[i - 1];
            }
        }
    }
    return dp[textMinArr.length - 1];
};


function findMaxLine(){

}


console.time("LCR 095. 最长公共子序列")

let text1 = "ezupkr", text2 = "ubmrapg"

console.log(longestCommonSubsequence(text1, text2))
console.timeEnd("LCR 095. 最长公共子序列")