/**  
 * 计算给定答案密钥中的最长连续正确或错误答案的长度  
 * @param {string} answerKey - 答案密钥字符串，包含'T'和'F'  
 * @param {number} k - 允许的错误答案的最大数量  
 * @return {number} - 最长连续正确或错误答案的长度  
 */  
var maxConsecutiveAnswers = function(answerKey, k) {  
    // 辅助函数：计算给定字符（'T'或'F'）的最大连续长度  
    // 这个函数通过滑动窗口的方式，计算在给定的错误数量k下，某个字符可以连续出现的最大长度  
    const maxConsecutive = (ch) => {  
        let left = 0; // 滑动窗口的左边界  
        let count = 0; // 当前窗口内错误答案的数量  
        let maxLen = 0; // 最大连续长度  
          
        for (let right = 0; right < answerKey.length; right++) {  
            // 如果当前字符不是我们要找的字符，则错误答案数量加1  
            if (answerKey[right] !== ch) {  
                count++;  
            }  
              
            // 如果当前窗口内的错误答案数量超过了允许的最大数量k，需要移动左边界来缩小窗口  
            while (count > k) {  
                // 如果左边界的字符不是我们要找的字符，则将其移出窗口时，错误答案数量减1  
                if (answerKey[left] !== ch) {  
                    count--;  
                }  
                left++; // 移动左边界  
            }  
              
            // 更新最大连续长度  
            maxLen = Math.max(maxLen, right - left + 1);  
        }  
          
        return maxLen; // 返回给定字符的最大连续长度  
    };  
      
    // 分别计算'T'和'F'的最大连续长度，并返回两者中的较大值  
    // 这表示在给定的错误数量k的限制下，最长连续正确或错误答案的长度  
    return Math.max(maxConsecutive('T'), maxConsecutive('F'));  
};