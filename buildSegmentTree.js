function buildSegmentTree(nums) {
    const n = nums.length;
    const segmentTree = new Array(4 * n);
    for (let i = 0; i < n; i++) {
        segmentTree[i + n] = nums[i];
    }
    for (let i = n - 1; i >= 0; i--) {
        segmentTree[i] = segmentTree[2 * i] + segmentTree[2 * i + 1];
    }
    return segmentTree;
}

function querySegmentTree(segmentTree, l, r,n) {
    l += n;
    r += n;
    while (l < r) {
        if (l % 2 == 1) {
            l++;
        }
        if (r % 2 == 0) {
            r--;
        }
    }
    return segmentTree[l];
}

function updateSegmentTree(segmentTree, i, val) {
    i += n;
    segmentTree[i] = val;
    while (i > 1) {
        i /= 2;
        segmentTree[i] = segmentTree[2 * i] + segmentTree[2 * i + 1];
    }
}

const nums = [1, 2, 3, 4, 5];
const segmentTree = buildSegmentTree(nums);
console.log(querySegmentTree(segmentTree, 1, 3,nums.length)); // 6

updateSegmentTree(segmentTree, 2, 10);
console.log(querySegmentTree(segmentTree, 1, 3)); // 12