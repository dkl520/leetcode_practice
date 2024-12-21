/**  
 * wordBreak函数用于判断给定的字符串s是否可以被拆分成字典wordDict中的单词。  
 *   
 * @param {string} s - 需要被拆分的字符串  
 * @param {Array<string>} wordDict - 字典，包含了一系列可以被用来拆分的单词  
 * @returns {boolean} - 如果s可以被完全拆分成wordDict中的单词，则返回true；否则返回false  
 */
function wordBreak(s, wordDict) {
    const n = s.length;

    // 创建一个长度为n+1的布尔数组dp，dp[i]表示s的前i个字符是否可以被拆分成wordDict中的单词  
    // 初始化时，所有元素都设为false，表示尚未确定能否被拆分  
    const dp = new Array(n + 1).fill(false);

    // 空字符串总是可以被拆分的，所以dp[0]设为true  
    dp[0] = true;

    // 从第一个字符开始遍历到最后一个字符  
    for (let i = 1; i <= n; i++) {
        // 对于每个位置i，我们尝试从0到i-1的所有位置j  
        for (let j = 0; j < i; j++) {
            // 如果s的前j个字符可以被拆分，并且s的第j到第i个字符组成的子串在wordDict中  
            // 那么s的前i个字符也可以被拆分
            let word = s.slice(j, i);
            if (dp[j] && wordDict.includes(word)) {
                dp[i] = true;
                // 一旦找到一个可能的拆分方式，我们就可以跳出内层循环，因为我们已经确定了dp[i]为true  
                break;
            }
        }
    }
    // 返回dp[n]，即s是否可以被完全拆分成wordDict中的单词  
    return dp[n];
}

console.time("139. 单词拆分")
const s = "catsandog", wordDict =  ["and", "cats", "dog", "sand", "cat"];

console.log(wordBreak(s, wordDict));

console.timeEnd("139. 单词拆分")



