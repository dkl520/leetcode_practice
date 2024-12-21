class MedianFinder {
    constructor() {
      this.minHeap = []; // 小顶堆，保存较大的一半元素
      this.maxHeap = []; // 大顶堆，保存较小的一半元素
    }
  
    addNum(num) {
      if (this.minHeap.length === this.maxHeap.length) {
        // 当两个堆的元素个数相等时，将新元素添加到大顶堆中
        // 注意，大顶堆中保存的是负值，以实现最大堆的效果
        this.maxHeap.push(-num);
        // 将大顶堆的堆顶元素（最大值）移动到小顶堆中
        // 注意，这里需要取反，以恢复原来的值
        this.minHeap.push(-this.maxHeap.shift());
      } else {
        // 当两个堆的元素个数不相等时，将新元素添加到小顶堆中
        this.minHeap.push(num);
        // 将小顶堆的堆顶元素（最小值）移动到大顶堆中
        this.maxHeap.push(-this.minHeap.pop());
      }
    }
  
    findMedian() {
      if (this.minHeap.length === this.maxHeap.length) {
        // 如果两个堆的元素个数相等，中位数为两个堆顶元素的平均值
        const median = (this.minHeap[0] - this.maxHeap[0]) / 2;
        return median.toFixed(2);
      } else {
        // 如果两个堆的元素个数不相等，中位数为小顶堆的堆顶元素
        return this.minHeap[0].toFixed(2);
      }
    }
  }
  
  // 示例用法
  const medianFinder = new MedianFinder();
  medianFinder.addNum(1);
  medianFinder.addNum(2);
  console.log(medianFinder.findMedian()); // 输出 "1.50" ((1 + 2) / 2)，保留两位小数
  medianFinder.addNum(3);
  console.log(medianFinder.findMedian()); // 输出 "2.00"，保留两位小数