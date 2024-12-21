/**
 * 判断字符是否是数字
 * @param {string} s
 * @returns {boolean}
 */
function isNum(s) {
    return s !== 'A' && s !== 'B';
}

/**
 * 计算字符串的解码方式数量
 * @param {string} s - 给定的字符串
 * @return {number}
 */
var numDecodings = function (s) {
    let newS = ''; // 新的字符串，用于处理包含0的情况
    const ans = []; // 存储解码方式的数量

    // 处理字符串中的0
    for (let i = 0; i < s.length; i++) {

        if (s[i] === '0') {
            // 如果当前字符是0且前面没有有效字符，则无法解码
            if (!newS.length || (newS[newS.length - 1] !== '1' && newS[newS.length - 1] !== '2')) {
                return 0;
            } else if (newS[newS.length - 1] === '1') {
                // 如果前一个字符是1，则10可以解码为J（即用A代替）
                newS = newS.substring(0, newS.length - 1) + 'A';
                debugger
            } else {
                // 如果前一个字符是2，则20可以解码为T（即用B代替）
                newS = newS.substring(0, newS.length - 1) + 'B';
            }
        } else { 
            newS += s[i]; // 非0字符直接加入新的字符串
        }
    }

    // 处理只有一个字符的情况
    if (newS.length === 1) return 1;

    // 初始化解码方式数组
    ans.push(1);
    // 处理前两个字符
    if (isNum(newS[0]) && isNum(newS[1]) 
        && (newS[0] === '1' || (newS[0] === '2' && newS[1] > '0' && newS[1] <= '6'))
    ) {
        ans.push(2);
    } else {
        ans.push(1);
    }

    // 动态规划计算解码方式
    for (let i = 2; i < newS.length; i++) {
        if (
            isNum(newS[i - 1]) && isNum(newS[i]) 
            && (newS[i - 1] === '1' || (newS[i - 1] === '2' && newS[i] > '0' && newS[i] <= '6'))
        ) {
            ans.push(ans[ans.length - 2] + ans[ans.length - 1]);
        } else {
            ans.push(ans[ans.length - 1]);
        }
    }

    return ans[ans.length - 1]; // 返回解码方式数量
};


let s = "2611055971756562";
console.log(
    numDecodings(s))
