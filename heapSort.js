function heapSort(arr) {  
    // 构建最大堆  
    buildMaxHeap(arr);  
    let len = arr.length;  
    // 从最后一个元素开始，循环遍历数组，每次循环都将当前最大的元素放到数组的末尾。  
    for (let i = len - 1; i > 0; i--) {  
      // 将当前最大的元素（根节点）与当前堆的最后一个元素交换。  
      swap(arr, 0, i);  
      // 对交换后的根节点进行堆化操作，确保其满足最大堆的性质。  
      heapify(arr, 0, i);  
    } 
  }  
      
  function buildMaxHeap(arr) {  
    const len = arr.length;  
    const start = Math.floor(len / 2) - 1;  
    // 从最后一个非叶子节点开始向上遍历，对每个节点进行堆化操作，构建最大堆。  
    for (let i = start; i >= 0; i--) {  
      heapify(arr, i, len);  
    }  
  }  
      
  function heapify(arr, index, heapSize) {  
    let largest = index; // 假设当前节点为最大值  
    const left = 2 * index + 1; // 左子节点索引  
    const right = 2 * index + 2; // 右子节点索引  
    // 如果左子节点存在且大于当前最大值，则更新最大值索引  
    if (left < heapSize && arr[left] > arr[largest]) {  
      largest = left;  
    }  
    // 如果右子节点存在且大于当前最大值，则更新最大值索引  
    if (right < heapSize && arr[right] > arr[largest]) {  
      largest = right;  
    }  
    // 如果最大值不是当前节点，则交换当前节点与最大值，并继续堆化交换后的子树。  
    if (largest !== index) {  
      swap(arr, index, largest);  
      heapify(arr, largest, heapSize);  
    }  
  }  
      
  function swap(arr, i, j) {  
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  
  // 示例使用
  const arr = [9, 5, 2, 7, 1, 8];
  heapSort(arr);
  console.log(arr); // 输出：[ 1, 2, 5, 7, 8, 9 ]