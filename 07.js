/**
 * @param {number} x
 * @return {number}
 */
var reverse = function (x) {
    let strBig = true
    let str;
    let num;
    if (x < 0) {
        strBig = false;
        str = (String(x).substring(1)).split('').reverse();
        num = -Number(str.join(''))
    } else {
        str = (String(x).slice(0)).split('').reverse();
        num = Number(str.join(''))
    }
    if (num < -(2 ** 31) || num > (2 ** 31 - 1)) {
        return 0
    }
    return num;

};


let x = 1534236469;

console.log(reverse(x));
debugger

