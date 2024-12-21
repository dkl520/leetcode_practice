function minWindow(s, t) {
  // 创建两个计数器，分别用于记录字符串S和T中字符的出现次数
  const count = {};
  const target = {};
  // 初始化target计数器
  for (let i = 0; i < t.length; i++) {
    if (target[t[i]]) {
      target[t[i]]++;
    } else {
      target[t[i]] = 1;
    }
  }
  let left = 0; // 滑动窗口的左边界
  let minLen = Infinity; // 记录最小子串的长度
  let minStart = 0; // 记录最小子串的起始位置
  let countMatch = 0; // 记录已匹配的字符数
  // 遍历字符串S
  for (let right = 0; right < s.length; right++) {
    const char = s[right];
    // 如果当前字符是目标字符，则更新count计数器
    if (target[char]) {
      if (count[char]) {
        count[char]++;
      } else {
        count[char] = 1;
      }
      // 如果当前字符的出现次数达到目标字符的要求，则更新countMatch
      if (count[char] <= target[char]) {
        countMatch++;
      }
    }
    // 当已匹配的字符数等于字符串T的长度时，尝试移动左边界，缩小窗口
    while (countMatch === t.length) {
      // 更新最小子串的信息
      if (right - left + 1 < minLen) {
        minLen = right - left + 1;
        minStart = left;
      }

      // 尝试移动左边界
      const leftChar = s[left];
      if (target[leftChar]) {
        count[leftChar]--;
        if (count[leftChar] < target[leftChar]) {
          countMatch--;
        }
      }
      left++;
    }
  }
  // 返回最小子串
  if (minLen === Infinity) {
    return "";
  } else {
    return s.substr(minStart, minLen);
  }
}


s = "ADOBECODEBANC", t = "ABC";

console.time("76. 最小覆盖子串")
console.log(minWindow(s, t));
console.timeEnd("76. 最小覆盖子串")
