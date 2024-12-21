//堆排序

class Solution { // 定义一个名为Solution的类  
    findKthLargest(nums, k) { // 定义一个方法findKthLargest，接受两个参数：一个数组nums和一个整数k  
        let heapSize = nums.length; // 定义变量heapSize，存储数组的长度  
        this.buildMaxHeap(nums, heapSize); // 调用buildMaxHeap方法，建立最大堆  
        // 循环从数组最后一个元素开始，直到数组长度减去k再加1  
        for (let i = nums.length - 1; i >= nums.length - k + 1; --i) {
            // 将当前堆顶元素（最大元素）与当前位置的元素交换  
            this.swap(nums, 0, i);
            --heapSize; // 由于元素交换，堆的大小减少1  

            // 对新的堆顶元素进行最大堆化，保证剩余元素仍然满足最大堆性质  
            this.maxHeapify(nums, 0, heapSize);
        }
        // 返回数组中的第k个最大元素，由于数组是从0开始计数的，因此返回的是第k-1个元素（索引）  
        return nums[0];
    }

    buildMaxHeap(a, heapSize) { // 定义一个方法buildMaxHeap，接受两个参数：一个数组a和一个整数heapSize  
        // 从最后一个非叶子节点开始，对每个非叶子节点进行最大堆化操作  
        let start = Math.floor(heapSize / 2);
        for (let i = start; i >= 0; i--) {
            this.maxHeapify(a, i, heapSize);
        }
    }

    maxHeapify(a, i, heapSize) { // 定义一个方法maxHeapify，接受三个参数：一个数组a，一个索引i和一个整数heapSize  
        let l = i * 2 + 1, // 左子节点索引  
            r = i * 2 + 2, // 右子节点索引  
            largest = i; // 假设当前节点是最大的  
        // 如果左子节点存在且大于当前最大值，则更新最大值索引为左子节点索引  

        if (l < heapSize && a[l] > a[largest]) {
            largest = l;
        }
        // 如果右子节点存在且大于当前最大值，则更新最大值索引为右子节点索引  
        if (r < heapSize && a[r] > a[largest]) {
            largest = r;
        }
        // 如果最大值索引不是当前节点，说明存在不满足最大堆性质的元素，交换它们并继续对被交换的子节点进行最大堆化操作  
        if (largest !== i) {
            this.swap(a, i, largest);
            this.maxHeapify(a, largest, heapSize);
        }
    }

    swap(a, i, j) { // 定义一个方法swap，接受三个参数：一个数组a，两个索引i和j  
        // 交换数组中索引为i和j的元素  
        let temp = a[i];
        a[i] = a[j];
        a[j] = temp;
    }
}


let nums = [3, 2, 1, 5, 6, 4];

let k = 2;
console.time("215. 数组中的第K个最大元素")

const solution = new Solution();
console.log(solution.findKthLargest(nums, k));

console.timeEnd("215. 数组中的第K个最大元素")