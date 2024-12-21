/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function (x) {
    let xStr = x.toString();
    let reverseStr = x.toString().split("").reverse().join("");
    if (xStr === reverseStr) {
        return true;
    }
    return false;
};



console.time("9. 回文数")
const x = -122;
console.log(isPalindrome(x))
console.timeEnd("9. 回文数")