// 定义Solution类  
class Solution {  
    // longestCommonPrefix方法，接受一个字符串数组作为参数  
    longestCommonPrefix(strs) {  
        // 初始化一个空数组result，用于存储公共前缀的字符  
        const result = [];  
        // 使用zip函数将输入的字符串数组按列组合成一个新数组  
        for (const i of zip(...strs)) {  
            // 如果新数组i的长度不为1，说明当前位置的字符不是公共前缀的一部分  
            if (new Set(i).size !== 1) {  
                // 跳出循环  
                break;  
            }  
            // 将当前位置的字符添加到结果数组result中  
            result.push(i[0]);  
        }  
        // 将结果数组result中的字符连接成一个字符串并返回  
        return result.join("");  
    }  
}  
  
// Helper函数，用于模拟JavaScript中的zip操作  
function zip(...arrays) {  
    // 返回一个新的数组，该数组的长度为输入数组中长度最小的那个  
    // 数组的每个位置都包含输入数组中对应位置的元素组成的子数组  
    return Array.from({ length: Math.min(...arrays.map(arr => arr.length)) }, (_, i) =>  
        arrays.map(array => array[i])  
    );  
}  
  
// 创建一个Solution类的实例task  
const task = new Solution();  
  


// 垂直扫描”算法
// 测试代码，输出"3a. flower"和"3b. dog"  
console.log("3a. " + task.longestCommonPrefix(["flower", "flow", "flight"]));  
console.log("3b. " + task.longestCommonPrefix(["dog", "racecar", "car"]));