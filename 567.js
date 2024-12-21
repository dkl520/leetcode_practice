/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */

// 滑动窗口
var checkInclusion = function (s1, s2) {
    let s1Arr = s1.split("").map(v => v.charCodeAt() - 'a'.charCodeAt());
    let s2Arr = s2.split("").map(v => v.charCodeAt() - 'a'.charCodeAt());
    const s1Count = new Array(26).fill(0);
    const s2Count = new Array(26).fill(0);

    for (let i = 0; i < s1Arr.length; i++) {

        s1Count[s1Arr[i]]++;
        s2Count[s2Arr[i]]++;
    }
    if (s1Count.toString() == s2Count.toString()) {
        return true;
    }
    for (let i = s1Arr.length; i < s2Arr.length; i++) {
        s2Count[s2Arr[i]]++;
        s2Count[s2Arr[i - s1Arr.length]]--;
        if (s1Count.toString() == s2Count.toString()) {
            return true;
        }

    }
    return false;

};

let s1 = "ab", s2 = "eidbaooo";

console.time("567. 字符串的排列")
console.log(checkInclusion(s1, s2));
console.timeEnd("567. 字符串的排列")