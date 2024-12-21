/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function (s) {
    let map = new Object();
    map['I'] = 1;
    map['V'] = 5;
    map['X'] = 10;
    map['L'] = 50;
    map['C'] = 100;
    map['D'] = 500;
    map['M'] = 1000;
    map['IV'] = 4;
    map['IX'] = 9;
    map['XL'] = 40;
    map['XC'] = 90;
    map['CD'] = 400;
    map['CM'] = 900;

    if (s in map) {
        return map[s]
    }
    let count = 0;
    for (let i = 0; i < s.length; i++) {
        if (s[i] + s[i + 1] in map) {
            count += map[(s[i] + s[i + 1])]
            i++;
        } else {
            count += map[s[i]]
        }
    }
    return count;

};