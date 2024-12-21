class MaxHeap {
  constructor() {
    this.heap = [];
    this.keyToIndexMap = new Map(); // 用于快速查找键在堆中的索引
  }

  insert(key, value) {
    this.heap.push({ key, value });
    this.keyToIndexMap.set(key, this.heap.length - 1);
    this.heapifyUp(this.heap.length - 1);
  }

  remove(key) {
    const index = this.findKeyIndex(key);

    if (index !== -1) {
      this.swap(index, this.heap.length - 1);
      this.keyToIndexMap.delete(key);
      this.heap.pop();

      if (index < this.heap.length) {
        this.heapifyUp(index);
        this.heapifyDown(index);
      }
    }
  }

  update(key, newValue) {
    if (newValue == 0) {
      this.remove(key)
      return;
    }
    const index = this.findKeyIndex(key);

    if (index !== -1) {
      this.heap[index].value = newValue;
      this.heapifyUp(index);
      this.heapifyDown(index);
    }
  }

  getMax() {
    return this.heap.length > 0 ? this.heap[0] : null;
  }

  findKeyIndex(key) {
    let index = this.keyToIndexMap.get(key);
    if (index >= 0) {
      return index
    }
    return -1;
  }

  swap(index1, index2) {
    const temp = this.heap[index1];
    this.heap[index1] = this.heap[index2];
    this.heap[index2] = temp;
    this.keyToIndexMap.set(this.heap[index1].key, index1);
    this.keyToIndexMap.set(this.heap[index2].key, index2);
  }

  heapifyUp(index) {
    const element = this.heap[index];

    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      const parent = this.heap[parentIndex];

      if (element.key <= parent.key) {
        break;
      }

      this.swap(index, parentIndex);
      index = parentIndex;
    }
  }

  heapifyDown(index) {
    const element = this.heap[index];
    const lastIndex = this.heap.length - 1;

    while (true) {
      const leftChildIndex = 2 * index + 1;
      const rightChildIndex = 2 * index + 2;
      let swapIndex = null;

      if (leftChildIndex <= lastIndex) {
        const leftChild = this.heap[leftChildIndex];

        if (leftChild.key > element.key) {
          swapIndex = leftChildIndex;
        }
      }

      if (rightChildIndex <= lastIndex) {
        const rightChild = this.heap[rightChildIndex];

        if (
          (swapIndex === null && rightChild.key > element.key) ||
          (swapIndex !== null && rightChild.key > this.heap[swapIndex].key)
        ) {
          swapIndex = rightChildIndex;
        }
      }

      if (swapIndex === null) {
        break;
      }

      this.swap(index, swapIndex);
      index = swapIndex;
    }
  }
}

export default MaxHeap;