class SegTree {
    constructor(l, r, val) {
        this.l = l;
        this.r = r;
        this.val = val;
    }

    build(o, l, r) {
        this[o] = new SegTree(l, r, 0);
        if (l === r) {
            return;
        }
        const m = (l + r) >> 1;
        this.build(o << 1, l, m);
        this.build(o << 1 | 1, m + 1, r);
    }

    inc(o, i) {
        if (this[o].l === this[o].r) {
            this[o].val++;
            return;
        }
        const childIndex = i <= (this[o].l + this[o].r) >> 1 ? o << 1 : o << 1 | 1;
        this.inc(childIndex, i);
        this[o].val = this[childIndex].val + this[childIndex ^ 1].val;
    }

    query(o, l, r) {
        if (l <= this[o].l && this[o].r <= r) {
            return this[o].val;
        }
        const m = (this[o].l + this[o].r) >> 1;
        if (r <= m) {
            return this.query(o << 1, l, r);
        }
        if (l > m) {
            return this.query(o << 1 | 1, l, r);
        }
        return this.query(o << 1, l, r) + this.query(o << 1 | 1, l, r);
    }
}

function countRangeSum(nums, lower, upper) {
    const n = nums.length;

    let allNums = [0];
    let preSum = Array(n + 1).fill(0);

    for (let i = 0; i < n; i++) {
        preSum[i + 1] = preSum[i] + nums[i];
        allNums.push(preSum[i + 1], preSum[i + 1] - lower, preSum[i + 1] - upper);
    }

    allNums = Array.from(new Set(allNums)).sort((a, b) => a - b);
    const k = allNums.length;
    const kth = {};

    for (let i = 0; i < k; i++) {
        kth[allNums[i]] = i + 1;
    }

    const t = new SegTree(1, 1, k);
    t.build(1, 1, k);
    t.inc(1, kth[0]);

    let cnt = 0;

    for (let i = 1; i <= n; i++) {
        const sum = preSum[i];
        const left = kth[sum - upper];
        const right = kth[sum - lower];
        cnt += t.query(1, left, right);
        t.inc(1, kth[sum]);
    }

    return cnt;
}


console.time("327. 区间和的个数--线段树")

let lower = -26287, upper = 1451;

console.log(countRangeSum(nums, lower, upper))
console.timeEnd("327. 区间和的个数--线段树")

debugger
