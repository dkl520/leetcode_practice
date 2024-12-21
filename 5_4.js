/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
    if (s < 2) {
        return s;
    }
    let reverseStr = s.split("").reverse().join("");

    let longStr = s + "$" + reverseStr;
    const suffixes = Array.from({ length: longStr.length }, (_, i) => ({
        // 每个后缀对象的index属性为它在原字符串中的索引  
        index: i,
        // 每个后缀对象的suffix属性为它在原字符串中的后缀  
        suffix: longStr.slice(i)
    }));

    suffixes.sort((a, b) => a.suffix.localeCompare(b.suffix));

    let maxStr = "";
    for (let i = 0; i < suffixes.length - 1; i++) {
        const el1 = suffixes[i].suffix;
        const el2 = suffixes[i + 1].suffix;
        if (el1[0] === '$' || el2[0] === '$') {
            continue;
        }
        if (el1.indexOf('$') !== -1 && el2.indexOf('$') !== -1) {
            continue;
        }
        if (el1.indexOf('$') == -1 && el2.indexOf('$') == -1) {
            continue;
        }
        let length = el1.length > el2.length ? el2.length : el1.length;
        let palindrome = "";
        let j;
        for (j = 0; j < length; j++) {
            const element1 = el1[j];
            const element2 = el2[j];
            if (element1 === element2) {
                palindrome += element1;
            }
            if (element1 !== element2) {
                break;
            }
        }
        maxStr = maxStr.length > palindrome.length ? maxStr : palindrome;
    }
    return maxStr;
};


let s = "cabbacaassac";
console.time("5. 最长回文子串")
console.log(longestPalindrome(s))

console.timeEnd("5. 最长回文子串")