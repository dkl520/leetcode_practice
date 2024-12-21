/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
    let dict = {
        ')': '(',
        ']': '[',
        "}": '{',
        // '(': ')',
        // '[': ']',
        // '{': '}'
    }
    let stack = new Array();
    for (let i = 0; i < s.length; i++) {
        const el = s[i];
        if (el in dict) {
            const key = stack.pop();
            if (key !== dict[el]) {
                return false
            }
        } else {
            stack.push(el);
        }
    }
    if (stack.length > 0) {
        return false;
    }
    return true;
};
let s = "()";
console.time("有效括号")
console.log(isValid(s))
console.timeEnd("有效括号")