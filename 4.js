/**  
 * @param {number[]} nums1 - 第一个已排序的数组  
 * @param {number[]} nums2 - 第二个已排序的数组  
 * @return {number} - 两个数组的中位数  
 */  
function findMedianSortedArrays(nums1, nums2) {  
    // 获取两个数组的长度  
    const length1 = nums1.length, length2 = nums2.length;  
    // 计算两个数组的总长度  
    const totalLength = length1 + length2;  
  
    /**  
     * 获取两个数组中第 k 小的元素  
     * @param {number} k - 要找的第 k 小的元素的位置（从 1 开始计数）  
     * @return {number} - 第 k 小的元素  
     */  
    function getKthElement(k) {  
        // 定义两个数组的索引  
        let index1 = 0, index2 = 0;  
  
        while (true) {  
            // 如果 nums1 的所有元素都已被遍历，则从 nums2 中获取第 k 小的元素  
            if (index1 === nums1.length) {  
                return nums2[index2 + k - 1];  
            }  
            // 如果 nums2 的所有元素都已被遍历，则从 nums1 中获取第 k 小的元素  
            if (index2 === nums2.length) {  
                return nums1[index1 + k - 1];  
            }  
            // 如果 k 为 1，则返回两个数组中较小的那个元素  
            if (k === 1) {  
                return Math.min(nums1[index1], nums2[index2]);  
            }  
  
            // 计算 k 的一半，用于确定在哪个数组中查找第 k 小的元素  
            const half = Math.floor(k / 2);  
            // 计算两个数组中新的索引位置  
            const newIndex1 = Math.min(index1 + half, nums1.length) - 1;  
            const newIndex2 = Math.min(index2 + half, nums2.length) - 1;  
            // 获取两个数组中第 half 小的元素  
            const pivot1 = nums1[newIndex1], pivot2 = nums2[newIndex2];  
  
            // 如果 nums1 中的元素小于等于 nums2 中的元素，则继续在 nums1 中查找  
            if (pivot1 <= pivot2) {  
                k -= (newIndex1 - index1 + 1);  
                index1 = newIndex1 + 1;  
            } else {  
                // 否则，在 nums2 中查找  
                k -= (newIndex2 - index2 + 1);  
                index2 = newIndex2 + 1;  
            }  
        }  
    }  
  
    // 如果总长度是奇数，则中位数就是第 (总长度 + 1) / 2 小的元素  
    if (totalLength % 2 === 1) {  
        const midIndex = Math.floor(totalLength / 2);  
        return getKthElement(midIndex + 1);  
    } else {  
        // 如果总长度是偶数，则中位数是第总长度 / 2 和 (总长度 / 2) + 1 小的元素的平均值  
        const midIndex1 = totalLength / 2 - 1, midIndex2 = totalLength / 2;  
        const median = (getKthElement(midIndex1 + 1) + getKthElement(midIndex2 + 1)) / 2.0;  
        return median;  
    }  
}