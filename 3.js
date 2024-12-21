/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
    let maxStr = "";
    let ans = 0;
    for (let i = 0; i < s.length; i++) {
        const el = s[i];
        if (!maxStr.includes(el)) {
            maxStr += el;
        } else {
            let index = maxStr.indexOf(el)
            maxStr = maxStr.slice(index + 1) + el;
        }
        ans = Math.max(ans, maxStr.length);
    }
    return ans;
};

let s = "dvdf";
console.time("3. 无重复字符的最长子串");
console.log(lengthOfLongestSubstring(s));
console.timeEnd("3. 无重复字符的最长子串");