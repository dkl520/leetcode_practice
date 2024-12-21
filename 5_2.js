

// 这个函数使用动态规划的方法，通过构建一个二维数组 dp 来存储每个子串是否是回文串。
// 然后，它通过遍历字符串 s 的每个字符，并检查长度为2和大于2的子串是否是回文串，
// 来更新最长回文子序列的起始位置和长度。
// 最后，函数返回从最长回文子序列的起始位置开始，长度为最长回文子序列长度的子字符串。
// 定义名为 longestPalindrome 的函数，接受一个字符串 s 作为参数  
function longestPalindrome(s) {  
    // 获取字符串 s 的长度  
    const n = s.length;  
      
    // 创建一个二维数组 dp，用于存储每个子串是否是回文串  
    const dp = Array.from(Array(n), () => Array(n).fill(false));  
      
    // 初始化最长回文子序列的起始位置为 0  
    let start = 0;  
      
    // 初始化最长回文子序列的长度为 1  
    let maxLength = 1;  
    
    // 单个字符一定是回文串  
    for (let i = 0; i < n; i++) {  
      dp[i][i] = true;  
    }  
    // 判断长度为2的子串是否是回文串  
    for (let i = 0; i < n - 1; i++) {  
      if (s[i] === s[i + 1]) {  
        dp[i][i + 1] = true;  
        start = i;  
        maxLength = 2;  
      }  
    }  
    // 判断长度大于2的子串是否是回文串  
    for (let len = 3; len <= n; len++) {  
      for (let i = 0; i < n - len + 1; i++) {  
        const j = i + len - 1;  
        if (s[i] === s[j] && dp[i + 1][j - 1]) {  
          dp[i][j] = true;  
          start = i;  
          maxLength = len;  
        }  
      }  
    }  
    // 返回从最长回文子序列的起始位置开始，长度为最长回文子序列长度的子字符串  
    return s.substring(start, start + maxLength);  
  }  

  console.time("5. 最长回文子串")
  // 定义字符串 s 为 "babad"  
  const s = "cabbacaassac";  
  // 调用 longestPalindrome 函数并传入 s 作为参数，获取最长回文子序列的子字符串  
  const longestPalindromeSubstr = longestPalindrome(s);  
  // 将最长回文子序列的子字符串输出到控制台  
  console.log(longestPalindromeSubstr);
  console.timeEnd("5. 最长回文子串")