function countSmaller(nums) {
    const counts = new Array(nums.length).fill(0);
    const indexArray = new Array(nums.length).fill(0).map((_, i) => i);

    function mergeSort(start, end) {
        if (end - start <= 1) {
            return;
        }

        const mid = Math.floor((start + end) / 2);
        mergeSort(start, mid);
        mergeSort(mid, end);

        merge(start, mid, end);
    }

    function merge(start, mid, end) {
        const merged = [];
        let leftIndex = start;
        let rightIndex = mid;

        while (leftIndex < mid || rightIndex < end) {
            if (rightIndex === end || (leftIndex < mid && nums[indexArray[leftIndex]] <= nums[indexArray[rightIndex]])) {
                // Element on the left is smaller or equal
                counts[indexArray[leftIndex]] += rightIndex - mid;
                merged.push(indexArray[leftIndex]);
                leftIndex++;
            } else {
                // Element on the right is smaller
                merged.push(indexArray[rightIndex]);
                rightIndex++;
            }
        }

        for (let i = start; i < end; i++) {
            indexArray[i] = merged[i - start];
        }
    }

    mergeSort(0, nums.length);
    return counts;
}

// 示例
const nums = [5, 2, 6, 1];
const result = countSmaller(nums);
console.log(result); // 输出：[2, 1, 1, 0]
