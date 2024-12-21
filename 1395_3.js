class Solution {
    constructor() {
        this.maxN = 0;
        this.c = []; // 树状数组（Fenwick Tree）
        this.rankMap = new Map(); // 离散化映射表
        this.iLess = []; // 记录当前元素左侧比它小的元素数量
        this.iMore = []; // 记录当前元素左侧比它大的元素数量
        this.kLess = []; // 记录当前元素右侧比它小的元素数量
        this.kMore = []; // 记录当前元素右侧比它大的元素数量
    }

    /**
     * 计算可以组成的 "团队" 的数量
     * @param {number[]} rating - 士兵的评分数组
     * @return {number} - 团队数量
     */
    numTeams(rating) {
        const n = rating.length; // 士兵数量
        this.rankMap = new Map(); // 初始化离散化映射表
        this.maxN = n + 1; // 树状数组的最大长度
        this.c = new Array(this.maxN).fill(0); // 初始化树状数组

        // 对评分数组进行离散化处理，生成 rankMap
        const sortedRating = [...rating].sort((a, b) => a - b); // 排序
        for (let i = 0; i < sortedRating.length; i++) {
            this.rankMap.set(sortedRating[i], i + 1); // 离散化值从 1 开始
        }

        // 初始化四个数组
        this.iLess = new Array(n).fill(0);
        this.iMore = new Array(n).fill(0);
        this.kLess = new Array(n).fill(0);
        this.kMore = new Array(n).fill(0);

        // 从左到右计算 iLess 和 iMore
        this.processTreeArray(rating, this.iLess, this.iMore, true);

        // 清空树状数组
        this.c.fill(0);

        // 从右到左计算 kLess 和 kMore
        this.processTreeArray(rating, this.kLess, this.kMore, false);

        // 计算结果
        let ans = 0;
        for (let i = 0; i < n; i++) {
            ans += this.iLess[i] * this.kMore[i] + this.iMore[i] * this.kLess[i];
        }
        return ans;
    }

    /**
     * 使用树状数组计算某一方向上的统计值
     * @param {number[]} rating - 士兵评分数组
     * @param {number[]} less - 记录比当前值小的数量
     * @param {number[]} more - 记录比当前值大的数量
     * @param {boolean} isLeftToRight - 是否从左到右遍历
     */
    processTreeArray(rating, less, more, isLeftToRight) {
        const n = rating.length;
        const start = isLeftToRight ? 0 : n - 1; // 起始索引
        const end = isLeftToRight ? n : -1; // 结束索引
        const step = isLeftToRight ? 1 : -1; // 遍历步长

        for (let i = start; i !== end; i += step) {
            const id = this.rankMap.get(rating[i]); // 获取离散化后的索引
            less[i] = this.query(id - 1); // 查询当前值左侧比它小的数量
            more[i] = this.query(this.maxN - 1) - this.query(id); // 查询当前值左侧比它大的数量
            this.update(id, 1); // 更新树状数组，记录当前值
        }
    }

    /**
     * 树状数组前缀和查询
     * @param {number} p - 查询索引
     * @return {number} - 前缀和
     */
    query(p) {
        let sum = 0;
        while (p > 0) {
            sum += this.c[p];
            p -= p & -p; // 移除最低位的 1
        }
        return sum;
    }

    /**
     * 更新树状数组
     * @param {number} p - 更新索引
     * @param {number} delta - 增量值
     */
    update(p, delta) {
        while (p < this.maxN) {
            this.c[p] += delta;
            p += p & -p; // 加上最低位的 1
        }
    }
}
