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
    let count = 0;
    let max = Math.max(...nums);
    let bitTree = new BIT(max);

    for (let i = 0; i < nums.length; i++) {
        const eli = nums[i];
        count += bitTree.query(max) - (bitTree.query(eli * 2));
        bitTree.update(eli, 1);
    }
    return count;
};


let nums = [1, 3, 2, 3, 1];
let resutlt = reversePairs(nums);

console.log(resutlt);


