function reversePairs(nums) {
    // 内部函数：使用归并排序计算翻转对的数量
    function mergeSort(start, end) {
        // 如果子数组只有一个或零个元素，则没有翻转对
        if (start >= end) {
            return 0;
        }
        // 计算中间位置
        const mid = Math.floor((start + end) / 2);
        // 递归计算左半部分和右半部分的翻转对数量
        let j = mid + 1;
        let count = mergeSort(start, mid) + mergeSort(mid + 1, end);
        
        // 计数重要翻转对
        for (let i = start; i <= mid; i++) {
            while (j <= end && nums[i] > 2 * nums[j]) {
                j++;
            }
            count += j - (mid + 1);
        }
        // 归并两个已排序的子数组
        const temp = [];
        let l = start, r = mid + 1;
        while (l <= mid && r <= end) {
            if (nums[l] <= nums[r]) {
                temp.push(nums[l]);
                l++;
            } else {
                temp.push(nums[r]);
                r++;
            }
        }
        // 如果左半部分还有剩余元素，加入临时数组
        while (l <= mid) {
            temp.push(nums[l]);
            l++;
        }
        // 如果右半部分还有剩余元素，加入临时数组
        while (r <= end) {
            temp.push(nums[r]);
            r++;
        }
        // 将排序后的数组复制回原数组
        for (let i = 0; i < temp.length; i++) {
            nums[start + i] = temp[i];
        }
        // 返回翻转对数量
        return count;
    }
  
    // 调用归并排序函数并返回翻转对数量
    return mergeSort(0, nums.length - 1);
  }
  
  // 示例测试
  console.log(reversePairs([1, 3, 2, 3, 1]));  // 输出: 2
//   console.log(reversePairs([2, 4, 3, 5, 1]));  // 输出: 3
  