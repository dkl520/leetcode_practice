/**
 * @param {number[]} instructions
 * @return {number}
 */
class FenwickTree {
    constructor(n) {
        this.size = n;
        this.cnt = new Array(n+1).fill(0);
    }
    lowBit(x) {
        return x & (-x);
    }
    query(rank) {
        let ans = 0;
        while (rank > 0) {
            ans += this.cnt[rank];
            rank -= this.lowBit(rank);
        }
        return ans;
    }
    update(rank, num) {
        while (rank <= this.size) {
            this.cnt[rank] += num;
            rank += this.lowBit(rank);
        }
    }
}




var createSortedArray = function (instructions) {
    let result = 0;
    let MOD = 1e9 + 7
    let n = instructions.length;
    let nums = Array.from(new Set(instructions));
    nums.sort((a, b) => a - b);
    let map = new Map();
    for (let i = 0; i < nums.length; i++) {
        map.set(nums[i], i + 1);
    };

    let tree = new FenwickTree(map.size);

    for (let i = 0; i < n; i++) {
        let index = map.get(instructions[i]);
        let left = tree.query(index - 1);

        let right = (tree.query(map.size) - tree.query(index));
        result += (Math.min(left, right)) % MOD;
        result %= MOD
        tree.update(index, 1);
    }
    return result;


};
console.time("start1");
let instructions = [1,3,3,3,2,4,2,1,2];
console.log(createSortedArray(instructions));
console.timeEnd("start1")