/**
 * @param {number} red
 * @param {number} blue
 * @return {number}
 */
var maxHeightOfTriangle = function (red, blue) {
    let max = Math.max(red, blue);
    let min = Math.min(red, blue);
    if (max == 0) return 0;
    if (max == 1) return 1;
    let result = 0;
    let odd = 0;
    let even = 0;
    for (let i = 1; i < 300; i++) {
      

        if (i % 2 == 1) {
            odd += i;
        } else {
            even += i;
        }
        if (odd > even) {
            if (odd <= max && even <= min) {
                result = Math.max(result, i);
            } else {
                break;
            }
        } else {
            if (odd <= min && even <= max) {
                result = Math.max(result, i);
            } else {
                break;
            }
        }
    }
    return result;
};

let red=2, blue=4;

maxHeightOfTriangle(red,blue)

