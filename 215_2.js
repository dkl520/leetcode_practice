function findKthLargest(nums, k) {
    let heapSize = nums.length;
    buildMaxHeap(nums, heapSize);
    for (let i = nums.length - 1; i >= nums.length - k + 1; --i) {
        swap(nums, 0, i);
        --heapSize;
        maxHeapify(nums, 0, heapSize);
    }
    return nums[0];
}

function buildMaxHeap(a, heapSize) {
    let start = Math.floor(heapSize / 2) - 1;
    for (let i = start; i >= 0; i--) {
        maxHeapify(a, i, heapSize);
    }
}

function maxHeapify(a, i, heapSize) {
    let l = i * 2 + 1,
        r = i * 2 + 2,
        largest = i;

    if (l < heapSize && a[l] > a[largest]) {
        largest = l;
    }

    if (r < heapSize && a[r] > a[largest]) {
        largest = r;
    }

    if (largest !== i) {
        swap(a, i, largest);
        maxHeapify(a, largest, heapSize);
    }
}

function swap(a, i, j) {
    let temp = a[i];
    a[i] = a[j];
    a[j] = temp;
}


let nums = [3, 2, 1, 5, 6, 4], k = 2;

console.time("215. 数组中的第K个最大元素")

console.log(findKthLargest(nums, k));

console.timeEnd("215. 数组中的第K个最大元素")