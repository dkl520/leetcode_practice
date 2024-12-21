// 定义一个名为CustomPriorityQueue的类  
class CustomPriorityQueue {
    // 构造函数，初始化一个空数组来存储堆元素  
    constructor() {
        this.heap = [];
    }

    // 返回堆的大小  
    size() {
        return this.heap.length;
    }

    // 检查堆是否为空  
    isEmpty() {
        return this.heap.length === 0;
    }

    // 返回堆顶元素，但不移除它  
    peek() {
        return this.heap[0];
    }

    // 向堆中添加一个元素，并可能通过“上浮”调整其位置以确保最小堆性质  
    push(value) {
        this.heap.push(value);  // 将元素添加到堆的末尾  
        this.bubbleUp(this.heap.length - 1);  // 通过上浮调整位置，如果新添加的元素比其父节点小的话  
    }

    // 从堆中移除并返回堆顶元素，然后通过“下沉”调整其位置以确保最小堆性质  
    pop() {
        const last = this.heap.pop();  // 移除并返回堆顶元素  
        if (!this.isEmpty()) {  // 如果堆不为空  
            const item = this.heap[0];  // 保存当前堆顶元素  
            this.heap[0] = last;  // 将返回的元素设置为新的堆顶元素  
            this.bubbleDown(0);  // 通过下沉调整位置，确保新的堆顶元素仍然是最小的  
            return item;  // 返回原来的堆顶元素  
        }
        return last;  // 如果堆为空，直接返回移除的元素  
    }

    // 如果给定索引的元素比其父节点的值小，则通过交换它们来“上浮”该元素，并递归地调整父节点。  
    bubbleUp(index) {
        while (index > 0) {  // 当索引大于0时继续循环，即直到达到根节点之前。  
            const parentIndex = Math.floor((index - 1) / 2);  // 计算父节点的索引。  
            if (this.heap[index][1] < this.heap[parentIndex][1]) {  // 如果当前元素小于其父节点。  
                [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];  // 交换它们。  
                index = parentIndex;  // 更新索引为父节点。  
            } else {
                break;  // 如果当前元素不小于其父节点，则停止循环。  
            }
        }
    }

    // 通过与子节点比较并交换来“下沉”给定索引的元素，直到它不再比任何子节点小。这个过程是递归的。  
    bubbleDown(index) {
        const lastIndex = this.heap.length - 1;  // 获取堆的最后一个元素的索引。  
        while (true) {  // 无限循环直到满足条件。  
            let minIndex = index;  // 初始化最小索引为当前索引。  
            const leftChildIndex = 2 * index + 1;  // 计算左子节点的索引。  
            const rightChildIndex = 2 * index + 2;  // 计算右子节点的索引。  

            // 如果左子节点存在且小于当前最小值，则更新最小值和索引。  
            if (leftChildIndex <= lastIndex && this.heap[leftChildIndex][1] < this.heap[minIndex][1]) {
                minIndex = leftChildIndex;
            }

            // 如果右子节点存在且小于当前最小值，则更新最小值和索引。  
            if (rightChildIndex <= lastIndex && this.heap[rightChildIndex][1] < this.heap[minIndex][1]) {
                minIndex = rightChildIndex;
            }

            // 如果最小值不是当前索引，则交换它们并递归地调整新索引。  
            if (minIndex !== index) {
                [this.heap[index], this.heap[minIndex]] = [this.heap[minIndex], this.heap[index]];  // 交换它们。  
                index = minIndex;  // 更新索引为新的最小值的位置。  
            } else {
                break;  // 如果最小值就是当前
            }
        }
    }
}

function topKFrequent(nums, k) { // 定义一个名为topKFrequent的函数，接受两个参数：nums（输入的数组）和k（需要找出的高频元素的数量）。  
    const occurrences = new Map(); // 创建一个Map数据结构，用于存储每个数字出现的次数。  
    for (const num of nums) { // 遍历输入的数组。  
        occurrences.set(num, (occurrences.get(num) || 0) + 1); // 对每个数字进行计数，如果该数字已存在Map中，则增加其计数；如果不存在，则将其添加到Map中并设置计数为1。  
    }  
  
    const heap = new CustomPriorityQueue(); // 创建一个自定义的优先队列（最小堆），用于存储数字和它们的出现次数。  
    for (const [key, value] of occurrences) { // 遍历之前创建的Map。  
        heap.push([key, value]); // 将数字和它们的出现次数作为数组添加到优先队列中。  
        if (heap.size() > k) { // 如果优先队列的大小超过了k，则需要移除出现次数最小的元素（因为它是频率最低的元素）。  
            heap.pop(); // 移除出现次数最小的元素。  
        }  
    }  
  
    const ret = new Array(k); // 创建一个大小为k的空数组，用于存储结果。  
    for (let i = k - 1; i >= 0; i--) { // 从k-1开始倒序遍历优先队列。  
        ret[i] = heap.pop()[0]; // 每次从优先队列中移除并返回数组的第一个元素（即数字），并将其添加到结果数组中。  
    }  
  
    return ret; // 返回结果数组。  
}  
  
let nums = [1, 1, 1, 2, 2, 3], k = 2; // 定义输入的数组nums和需要找出的高频元素的数量k。  
  
console.time("347. 前 K 个高频元素") // 开始计时，用于计算该操作的执行时间。  
  
console.log(topKFrequent(nums, k)); // 调用函数并打印结果。  
console.timeEnd("347. 前 K 个高频元素") // 结束计时，显示该操作的执行时间。


// 需要注意的是，这段代码使用了自定义的优先队列（最小堆），这需要实现一些额外的方法，如push、pop、size等。
// 这些方法的实现超出了本注释的范围，但它们的目标是将频率最高的元素放在队列的顶部，并允许在队列大小超过k时移除元素。