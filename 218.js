var getSkyline = function(buildings) {
    // 创建边界数组
    let boundaries = [];
    for (let building of buildings) {
        // 将每个建筑物的左边界和右边界加入到边界数组中
        boundaries.push(building[0]);
        boundaries.push(building[1]);
    }
    // 将边界数组按从小到大排序
    boundaries.sort((a, b) => a - b);

    let ret = []; // 初始化结果数组
    // 创建一个最大优先队列，用于存储建筑物的高度。优先级为高度值
    let pq = new MaxPriorityQueue({ priority: x => x[1] });
    let idx = 0, n = buildings.length; // idx 表示当前处理的建筑物索引，n 表示建筑物的总数
    
    // 遍历所有边界
    for (let boundary of boundaries) {
        // 将所有左边界小于等于当前边界的建筑物加入优先队列
        while (idx < n && buildings[idx][0] <= boundary) {
            pq.enqueue([buildings[idx][1], buildings[idx][2]]);
            idx++;
        }
        // 移除所有右边界小于等于当前边界的建筑物
        while (!pq.isEmpty() && pq.front().element[0] <= boundary) {
            pq.dequeue();
        }

        // 当前最高的建筑物高度
        let maxn = pq.isEmpty() ? 0 : pq.front().element[1];
        // 如果结果数组为空或当前最高高度与最后一个关键点高度不同，添加新的关键点
        if (ret.length === 0 || maxn !== ret[ret.length - 1][1]) {
            ret.push([boundary, maxn]);
        }
    }
    
    return ret; // 返回结果数组
};
