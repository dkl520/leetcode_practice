class SegmentTree {
    constructor(nums) {
        // 存储原始数组  
        this.nums = nums;
        // 初始化线段树，其大小通常为原始数组长度的4倍  
        this.tree = new Array(nums.length * 4);
        // 构建线段树  
        this.build(0, 0, nums.length - 1);
    }

    // 构建线段树  
    build(treeIndex, left, right) {
        // 如果左右索引相等，说明到了叶子节点  
        if (left === right) {
            // 将叶子节点的值设为原始数组中对应的值  
            this.tree[treeIndex] = this.nums[left];
            return;
        }
        // 计算中间索引  
        const mid = Math.floor((left + right) / 2);
        // 计算左孩子和右孩子的索引  
        const leftChild = 2 * treeIndex + 1;
        const rightChild = 2 * treeIndex + 2;
        // 递归构建左子树和右子树  
        
        this.build(leftChild, left, mid);
        this.build(rightChild, mid + 1, right);
        // 当前节点的值为其左右孩子节点值的和  
        this.tree[treeIndex] = this.tree[leftChild] + this.tree[rightChild];
    }

    // 更新线段树中某个索引的值  
    update(index, val) {
        this.updateHelper(0, 0, this.nums.length - 1, index, val);
    }

    // 更新线段树中某个索引的值的辅助函数  
    updateHelper(treeIndex, left, right, index, val) {
        // 如果左右索引相等，说明到了叶子节点  
        if (left === right) {
            // 更新叶子节点的值  
            this.tree[treeIndex] = val;
            return;
        }
        // 计算中间索引  
        const mid = Math.floor((left + right) / 2);
        // 计算左孩子和右孩子的索引  
        const leftChild = 2 * treeIndex + 1;
        const rightChild = 2 * treeIndex + 2;
        // 判断要更新的索引在左子树还是右子树，并递归更新对应的子树  
        if (index <= mid) {
            this.updateHelper(leftChild, left, mid, index, val);
        } else {
            this.updateHelper(rightChild, mid + 1, right, index, val);
        }
        // 更新当前节点的值为其左右孩子节点值的和  
        this.tree[treeIndex] = this.tree[leftChild] + this.tree[rightChild];
    }

    // 查询线段树中某个区间的和  
    query(queryLeft, queryRight) {
        return this.queryHelper(0, 0, this.nums.length - 1, queryLeft, queryRight);
    }
    queryHelper(treeIndex, left, right, queryLeft, queryRight) {
        // 如果左索引大于查询的右边界，或者右索引小于查询的左边界，说明当前区间与查询区间无交集  
        if (left > queryRight || right < queryLeft) {
            return 0; // 区间无重叠，返回 0  
        }
        // 如果当前区间的左边界大于等于查询的左边界，并且当前区间的右边界小于等于查询的右边界，说明当前区间完全包含查询区间  
        if (left >= queryLeft && right <= queryRight) {
            return this.tree[treeIndex]; // 完全包含，直接返回当前节点的值  
        }
        // 计算当前区间的中间索引  
        const mid = Math.floor((left + right) / 2);
        // 计算当前区间的左孩子的索引  
        const leftChild = 2 * treeIndex + 1;
        // 计算当前区间的右孩子的索引  
        const rightChild = 2 * treeIndex + 2;
        // 递归查询左孩子的值  
        const leftSum = this.queryHelper(leftChild, left, mid, queryLeft, queryRight);
        // 递归查询右孩子的值  
        const rightSum = this.queryHelper(rightChild, mid + 1, right, queryLeft, queryRight);
        // 返回左孩子和右孩子的和  
        return leftSum + rightSum;
    }
}

// 示例用法
const nums = [1, 3, 5, 7, 9, 11];
const segmentTree = new SegmentTree(nums);

debugger

console.log(segmentTree.query(1, 3)); // 输出 15，即 nums[1] + nums[2] + nums[3] = 3 + 5 + 7 = 15

segmentTree 

console.log(segmentTree.query(1, 3)); // 输出 28，即 nums[1] + nums[2] + nums[3] = 3 + 10 + 7 = 20
