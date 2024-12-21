
/**
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfTwo = function (n) {
    if (n<0) {
        return false;
    }
    let binaryTwo = n.toString(2);
    return containsOnlyOneOne(binaryTwo);


};


function containsOnlyOneOne(str) {
    let count = 0;

    for (let i = 0; i < str.length; i++) {
        if (str[i] === '1') {
            count++;
        }

        if (count > 1) {
            return false;
        }
    }

    return count === 1;
}




console.time("231. 2 的幂")


let n = 1024;


console.log(isPowerOfTwo(n))


console.timeEnd("231. 2 的幂")