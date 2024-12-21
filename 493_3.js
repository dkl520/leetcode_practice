/**
 * @param {number[]} nums
 * @return {number}
 */

class BIT {
    constructor(size) {
        this.size = size;
        this.root = new Array(size + 1).fill(0);
    }
    query(index) {
        if (index > this.size) {
            return this.query(this.size);
        }
        let sum = 0;

        while (index > 0) {
            sum += this.root[index];
            index -= index & -index;
        }
        return sum;
    }
    update(index, delta) {
        while (index <= this.size) {
            this.root[index] += delta;
            index += index & - index;
        }
    }
}

let reversePairs = function (nums) {

    if (nums.length === 0) return 0;
    const allNumbers = Array.from(new Set(nums.concat(nums.map(x => x * 2))));
    allNumbers.sort((a, b) => a - b);
    const hashMap = new Map();
    allNumbers.forEach((num, index) => {
        hashMap.set(num, index + 1);
    });
    let max = Math.max(...nums);
    let maxRank = hashMap.get(max);
    const bitTree = new BIT(allNumbers.length);
    let count = 0;

    for (let i = 0; i < nums.length; i++) {
        const eli = nums[i];
        let eli2 = eli * 2;
        let rankEli2 = hashMap.get(eli2);
        let rankEli = hashMap.get(eli);
        count += bitTree.query(maxRank) - (bitTree.query(rankEli2));
        bitTree.update(rankEli, 1);
    }
    return count;
};


let nums = [1, 3, 2, 3, 1];
let resutlt = reversePairs(nums);

console.log(resutlt);


