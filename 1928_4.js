class MinHeap {
    constructor() {
        this.heap = [];
    }

    push(val) {
        this.heap.push(val);
        this._heapifyUp();
    }

    pop() {
        if (this.heap.length === 1) return this.heap.pop();
        const top = this.heap[0];
        this.heap[0] = this.heap.pop();
        this._heapifyDown();
        return top;
    }

    _heapifyUp() {
        let index = this.heap.length - 1;
        while (index > 0) {
            let parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[parentIndex][0] <= this.heap[index][0]) break;
            [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
            index = parentIndex;
        }
    }

    _heapifyDown() {
        let index = 0;
        const length = this.heap.length;
        while (true) {
            let leftChildIndex = 2 * index + 1;
            let rightChildIndex = 2 * index + 2;
            let smallestIndex = index;

            if (leftChildIndex < length && this.heap[leftChildIndex][0] < this.heap[smallestIndex][0]) {
                smallestIndex = leftChildIndex;
            }
            if (rightChildIndex < length && this.heap[rightChildIndex][0] < this.heap[smallestIndex][0]) {
                smallestIndex = rightChildIndex;
            }
            if (smallestIndex === index) break;

            [this.heap[smallestIndex], this.heap[index]] = [this.heap[index], this.heap[smallestIndex]];
            index = smallestIndex;
        }
    }

    isEmpty() {
        return this.heap.length === 0;
    }
}

function minCost(maxTime, edges, passingFees) {
    const n = passingFees.length;

    // 建立邻接表
    let graph = Array.from({ length: n }, () => []);
    for (let [u, v, time] of edges) {
        graph[u].push([v, time]);
        graph[v].push([u, time]);
    }

    // 最小堆，保存[当前费用, 当前城市, 已耗费时间]，按照费用升序
    let pq = new MinHeap();
    pq.push([passingFees[0], 0, 0]);  // 初始状态：费用为passingFees[0]，城市0，时间0

    // dp数组，dp[i][t]表示到达城市i并且耗费t时间时的最小费用
    let dp = Array.from({ length: n }, () => Array(maxTime + 1).fill(Infinity));
    dp[0][0] = passingFees[0];

    while (!pq.isEmpty()) {
        const [currentCost, city, timeSpent] = pq.pop();

        // 如果已经到达终点并且在时间限制内，直接返回结果
        if (city === n - 1) return currentCost;

        // 扩展当前城市的所有相邻城市
        for (const [nextCity, travelTime] of graph[city]) {
            let newTime = timeSpent + travelTime;
            let newCost = currentCost + passingFees[nextCity];

            // 只有当新时间小于等于 maxTime 且找到的费用更小时，才更新dp
            if (newTime <= maxTime && newCost < dp[nextCity][newTime]) {
                dp[nextCity][newTime] = newCost;
                pq.push([newCost, nextCity, newTime]);
            }
        }
    }

    // 如果没办法在 maxTime 内到达终点，返回 -1
    return -1;
}