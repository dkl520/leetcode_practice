/**
 * 最小堆实现
 */
class MinHeap {
    constructor() {
        this.heap = [];
    }
    
    push(val) {
        this.heap.push(val);
        this.bubbleUp(this.heap.length - 1);
    }
    
    pop() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();
        
        const result = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown(0);
        return result;
    }
    
    bubbleUp(index) {
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[parentIndex][2] <= this.heap[index][2]) break;
            
            [this.heap[parentIndex], this.heap[index]] = 
                [this.heap[index], this.heap[parentIndex]];
            index = parentIndex;
        }
    }
    
    bubbleDown(index) {
        while (true) {
            let smallest = index;
            const leftChild = 2 * index + 1;
            const rightChild = 2 * index + 2;
            
            if (leftChild < this.heap.length && 
                this.heap[leftChild][2] < this.heap[smallest][2]) {
                smallest = leftChild;
            }
            if (rightChild < this.heap.length && 
                this.heap[rightChild][2] < this.heap[smallest][2]) {
                smallest = rightChild;
            }
            
            if (smallest === index) break;
            
            [this.heap[index], this.heap[smallest]] = 
                [this.heap[smallest], this.heap[index]];
            index = smallest;
        }
    }
    
    isEmpty() {
        return this.heap.length === 0;
    }
}

/**
 * @param {number} maxTime
 * @param {number[][]} edges
 * @param {number[]} passingFees
 * @return {number}
 */
var minCost = function(maxTime, edges, passingFees) {
    const n = passingFees.length;
    
    // 构建邻接表
    const graph = Array.from({ length: n }, () => []);
    for (const [from, to, time] of edges) {
        graph[from].push([to, time]);
        graph[to].push([from, time]);
    }
    
    // dp[i][t] 表示在时间 t 到达节点 i 的最小费用
    const dp = Array.from({ length: n }, () => 
        new Array(maxTime + 1).fill(Infinity));
    
    const pq = new MinHeap();
    pq.push([0, 0, passingFees[0]]); // [node, time, totalFee]
    dp[0][0] = passingFees[0];
    
    while (!pq.isEmpty()) {
        const [node, time, totalFee] = pq.pop();
        
        // 如果已经找到更好的路径，跳过
        if (totalFee > dp[node][time]) continue;
        
        // 遍历所有相邻节点
        for (const [nextNode, edgeTime] of graph[node]) {
            const newTime = time + edgeTime;
            if (newTime > maxTime) continue;
            
            const newFee = totalFee + passingFees[nextNode];
            
            // 如果找到更好的路径，更新并加入队列
            if (newFee < dp[nextNode][newTime]) {
                // 优化：更新所有大于newTime的时间点
                for (let t = newTime; t <= maxTime; t++) {
                    if (newFee < dp[nextNode][t]) {
                        dp[nextNode][t] = newFee;
                    }
                }
                pq.push([nextNode, newTime, newFee]);
            }
        }
    }
    
    let minFee = Math.min(...dp[n-1]);
    return minFee === Infinity ? -1 : minFee;
};