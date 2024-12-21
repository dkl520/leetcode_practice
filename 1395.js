class BIT {
    // 初始化树状数组
    constructor(size) {
        this.size = size;
        this.tree = new Array(size + 1).fill(0);
    }

    // 更新树状数组
    update(index, delta) {
        while (index <= this.size) {
            this.tree[index] += delta;
            index += index & -index;
        }
    }

    // 查询前缀和
    query(index) {
        let sum = 0;
        while (index > 0) {
            sum += this.tree[index];
            index -= index & -index;
        }
        return sum;
    }
}

function numTeams(rating) {
    // 如果评分数组长度小于3，无法组成作战单位，直接返回0
    if (rating.length < 3) {
        return 0;
    }

    const n = rating.length;
    const maxRating = Math.max(...rating); // 找到评分数组中的最大值

    // 初始化两个树状数组
    const bitLeft = new BIT(maxRating);
    const bitRight = new BIT(maxRating);

    // 将所有评分加入bitRight树状数组中
    for (const r of rating) {
        bitRight.update(r, 1);
    }
    debugger

    let result = 0;

    // 遍历评分数组
    for (const r of rating) {
        bitRight.update(r, -1); // 从bitRight树状数组中移除当前评分

        // 计算左侧比当前评分小的士兵数量
        const leftSmaller = bitLeft.query(r - 1);
        // 计算右侧比当前评分大的士兵数量
        const rightGreater = bitRight.query(maxRating) - bitRight.query(r);

        // 计算左侧比当前评分大的士兵数量
        const leftGreater = bitLeft.query(maxRating) - bitLeft.query(r);
        // 计算右侧比当前评分小的士兵数量
        const rightSmaller = bitRight.query(r - 1);

        // 计算满足条件的三元组数量
        result += leftSmaller * rightGreater + leftGreater * rightSmaller;

        // 将当前评分加入bitLeft树状数组中
        bitLeft.update(r, 1);
    }

    return result;
}

// 测试用例
console.log(numTeams([2, 5, 3, 4, 1])); // 输出: 3
console.log(numTeams([2, 1, 3]));       // 输出: 0
console.log(numTeams([1, 2, 3, 4]));    // 输出: 4