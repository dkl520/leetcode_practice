class MinHeap {
    constructor() {
      this.heap = [];
    }
  
    // 获取父节点的索引
    getParentIndex(index) {
      return Math.floor((index - 1) / 2);
    }
  
    // 获取左子节点的索引
    getLeftChildIndex(index) {
      return 2 * index + 1;
    }
  
    // 获取右子节点的索引
    getRightChildIndex(index) {
      return 2 * index + 2;
    }
  
    // 交换数组中两个元素的位置
    swap(i, j) {
      [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }
  
    // 上移操作，将指定索引的元素上移以保持最小堆性质
    siftUp(index) {
      if (index === 0) {
        return; // 已经是根节点，无需上移
      }
  
      const parentIndex = this.getParentIndex(index);
      if (this.heap[parentIndex] > this.heap[index]) {
        this.swap(parentIndex, index);
        this.siftUp(parentIndex);
      }
    }
  
    // 下移操作，将指定索引的元素下移以保持最小堆性质
    siftDown(index) {
      const leftChildIndex = this.getLeftChildIndex(index);
      const rightChildIndex = this.getRightChildIndex(index);
      let minIndex = index;
  
      if (leftChildIndex < this.heap.length && this.heap[leftChildIndex] < this.heap[minIndex]) {
        minIndex = leftChildIndex;
      }
  
      if (rightChildIndex < this.heap.length && this.heap[rightChildIndex] < this.heap[minIndex]) {
        minIndex = rightChildIndex;
      }
  
      if (minIndex !== index) {
        this.swap(index, minIndex);
        this.siftDown(minIndex);
      }
    }
  
    // 插入元素到堆中
    insert(value) {
      this.heap.push(value);
      this.siftUp(this.heap.length - 1);
    }
  
    // 弹出堆中的最小值
    extractMin() {
      if (this.heap.length === 0) {
        return null; // 堆为空，返回null
      }
  
      if (this.heap.length === 1) {
        return this.heap.pop(); // 堆中只有一个元素，直接弹出并返回
      }
  
      const min = this.heap[0];
      this.heap[0] = this.heap.pop();
      this.siftDown(0);
      return min;
    }
  
    // 获取堆中的最小值
    getMin() {
      return this.heap[0];
    }
  
    // 获取堆的大小（元素个数）
    size() {
      return this.heap.length;
    }
  
    // 检查堆是否为空
    isEmpty() {
      return this.heap.length === 0;
    }
  }