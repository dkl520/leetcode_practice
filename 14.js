/**  
 * 查找字符串数组中的最长公共前缀  
 * @param {string[]} strs - 输入的字符串数组  
 * @return {string} 返回最长公共前缀  
 */  
var longestCommonPrefix = function(strs) {  
    // 如果输入的数组为空或者长度为0，直接返回空字符串  
    if (!strs || strs.length === 0) {  
        return "";  
    }  
    // 取出第一个字符串并将其转换为字符数组作为初始的后缀数组  
    // 这里用“后缀数组”这个命名其实有些混淆，因为我们实际上在找的是前缀  
    let suffixArray = strs[0].split('');  
    // 从第二个字符串开始，与后缀数组（即当前的最长公共前缀）进行比较  
    for (let i = 1; i < strs.length; i++) {  
        const str = strs[i]; // 当前要比较的字符串  
        let j = 0; // 初始化索引  
        // 当后缀数组和当前字符串都有字符可以比较，并且字符相同时，增加索引  
        while (j < suffixArray.length && j < str.length && suffixArray[j] === str[j]) {  
            j++;  
        }  
        // 根据比较结果，更新后缀数组（即截取公共部分）  
        suffixArray = suffixArray.slice(0, j);  
    }  
    // 将字符数组转换回字符串并返回  
    return suffixArray.join('');  
};  
// 示例测试  
const strs1 = ["flower", "flow", "flight"]; // 最长公共前缀为 "fl"  
const strs2 = ["dog", "racecar", "car"]; // 最长公共前缀为空字符串，因为这三个单词没有公共前缀  
console.time("14. 最长公共前缀")
console.log(longestCommonPrefix(strs1)); // 输出："fl"
console.log(longestCommonPrefix(strs2)); // 输出：""
console.timeEnd("14. 最长公共前缀")
