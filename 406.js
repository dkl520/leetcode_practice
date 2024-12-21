class Solution {
    reconstructQueue(people) {
        const n = people.length; // 获取数组长度
        const res = new Array(n); // 初始化结果数组
        const bit = new BIT(n + 10); // 创建一个二叉索引树（BIT），长度设置为 n + 10

        // 初始化BIT，所有位置初始值设置为1
        for (let i = 1; i <= n; i++) {
            bit.add(i, 1);
        }

        // 根据身高升序排序，如果身高相同，则按 k 值降序排序
        people.sort((a, b) => a[0] === b[0] ? b[1] - a[1] : a[0] - b[0]);

        // 遍历每一个人，按顺序插入到正确位置
        for (const person of people) {
            const height = person[0]; // 当前人的身高
            const preCount = person[1]; // 当前人的 k 值（前面有多少人身高 >= 当前身高）
            debugger
            // 使用二分查找确定目标插入位置
            let left = 1, right = n;
            while (left <= right) {
                const mid = Math.floor((left + right) / 2); // 中间位置
                if (bit.query(mid) >= preCount + 1) { // 检查从1到mid的空位数量是否满足要求
                    right = mid - 1; // 如果满足，缩小右边界
                } else {
                    left = mid + 1; // 如果不满足，缩小左边界
                }
            }
            debugger
            // 将当前人插入目标位置
            res[left - 1] = [height, preCount];
            bit.add(left, -1); // 更新BIT，将目标位置标记为已占用
        }

        return res; // 返回最终结果数组
    }
}


// 主要逻辑解释：
// 排序逻辑：

// 首先，按照身高从小到大排序：这样可以优先安排较矮的成员，避免限制高身高的成员的安排。
// 如果身高相同，则按照 k 值从大到小排序：这样安排相同身高的人，使得k值大的先进入队列，从而减少后续安排的限制。这样可以确保每个人的k值都被最小化
// ，减少前面的人对他们安排的限制。
// BIT（二叉索引树）：

// 使用 BIT 来快速维护当前数组中的空位数量。因为每个人要插入的位置是根据其k值（即前面有多少人身高大于等于他）来决定的，而 BIT 允许我们快速查询和更新这些空位信息。
// 初始化：我们初始化 BIT 的树状数组为 0，并且每个位置对应的空位数初始化为 1。这意味着所有的位置都可以用来插入新元素。
// 更新BIT树：当插入一个新元素时，我们会通过 add 方法将该位置标记为已占用，即减少该位置的空位数。这允许我们在插入时保持有效的空位数统计。
// 二分查找：

// 使用二分查找来快速定位目标插入位置。通过结合 BIT 的 query 方法，我们可以快速找到空位数满足 k 的要求的位置。
// 过程：
// 定义二分查找的左右边界：初始时，left = 1 和 right = n，其中 n 是队列的长度。
// 每次计算 mid（中间位置）：
// mid = Math.floor((left + right) / 2)
// 使用 BIT 的 query(mid) 方法查询从位置 1 到 mid 的所有空位数之和。
// 如果查询结果大于等于 k + 1，说明 k 个或更多人已经排在 mid 之前，因此我们可以将 right 缩小到 mid - 1 以继续查找较小的位置。
// 如果查询结果小于 k + 1，说明还不足 k 个，因此我们将 left 增大到 mid + 1 以查找较大的位置。
// 当 left 穿越 right 时，left 即是我们要插入的位置。
// 细节解释：
// BIT 数据结构：它是一种有效的线性数据结构，用于解决点更新和前缀和查询。BIT 的 add 方法用来在给定索引位置上增加一个值，同时向上更新更大的索引位置。这种操作的时间复杂度为 O(log n)。
// 查询操作：query(index) 方法从位置 1 到 index 的和，通过逐步减去最低有效位（lowbit）。时间复杂度也为 O(log n)。
// 二分查找：结合 BIT 进行二分查找可以在 O(log n) 时间内找到目标插入位置。这比直接遍历所有可能插入位置要快得多，尤其是当 n 很大时。
// 通过上述步骤，可以有效地重建队列，时间复杂度主要由 BIT 的操作决定，因此整体时间复杂度为 O(n log n)。








// BIT类（二叉索引树，Binary Indexed Tree）
class BIT {
    constructor(n) {
        this.size = n; // 树的大小
        this.tree = new Array(n + 1).fill(0); // 初始化树，索引从1开始
    }

    // 获取最低有效位
    lowbit(x) {
        return x & -x;
    }

    // 在指定索引处增加一个值
    add(index, delta) {
        if (index <= 0) {
            throw new Error("索引必须为正整数。"); // 防止非法索引
        }
        while (index <= this.size) { // 在树中更新节点
            this.tree[index] += delta;
            index += this.lowbit(index); // 跳到下一个相关节点
        }
    }

    // 查询前缀和，范围从1到index
    query(index) {
        if (index > this.size) {
            index = this.size; // 防止越界
        }
        let res = 0;
        while (index > 0) { // 累加从index到根节点的所有值
            res += this.tree[index];
            index -= this.lowbit(index); // 跳到上一个相关节点
        }
        return res;
    }

    // 查询区间[left, right]的和
    sumRange(left, right) {
        return this.query(right) - this.query(left - 1);
    }
}

// 使用示例
const solution = new Solution();
const people = [
    [7, 0], // 身高7，前面没有人
    [4, 4], // 身高4，前面有4个人
    [7, 1], // 身高7，前面有1个人
    [5, 0], // 身高5，前面没有人
    [6, 1], // 身高6，前面有1个人
    [5, 2]  // 身高5，前面有2个人
];


// (2) [5, 0]
// 406.js:96
// (2) [7, 0]
// 406.js:96
// (2) [5, 2]
// 406.js:96
// (2) [6, 1]
// 406.js:96
// (2) [4, 4]
// 406.js:96
// (2) [7, 1]

const result = solution.reconstructQueue(people);

// 输出结果
result.forEach(person => {
    console.log(person);
});
