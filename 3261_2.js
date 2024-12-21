/**
 * @param {string} s
 * @param {number} k
 * @param {number[][]} queries
 * @return {number[]}
 */


var countKConstraintSubstrings = function (s, k, queries) {

    queries.forEach(v => {
        v[1]++
    });
    let result = new Array();
    for (const [left, right] of queries) {
        let newS = s.substring(left, right);
        let count = 0;
        let perv = 0;
        let map = new Array(2).fill(0);
        for (let i = 0; i < newS.length; i++) {
            map[Number(newS.charAt(i))]++;
            while (Math.min(map[0], map[1]) > k) {
                count += i - 1 - perv + 1;
                map[Number(newS.charAt(perv))]--;
                perv++;
            }
        }
        let remain = newS.length - 1 - perv + 1;
        count += (remain * (remain + 1)) / 2;

        result.push(count);
    }
    return result;
};





let s = "0001111";
let k = 2;
let queries = [
    [0, 6]
];
console.log(

    countKConstraintSubstrings(s, k, queries)
)




