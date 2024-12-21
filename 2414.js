/**
 * @param {string} s
 * @return {number}
 */
var longestContinuousSubstring = function (s) {
    const n = s.length;
    let connect = 1;
    let result = 1;
    for (let i = 0; i < n; i++) {
        const curA = s.charAt(i);
        const curB = s.charCodeAt(i);
        // const next = String.fromCharCode(curB);
        if (i + 1 < n) {
            const next = s.charCodeAt(i + 1);
            if (next == curB + 1) {
                connect++;
                result = Math.max(result, connect);
            } else {
                connect = 1;
            }
        }

    }
    return result;
};

console.log(

    longestContinuousSubstring("abacaba")
)