// 定义一个名为searchMatrix的函数，该函数接受一个二维数组matrix和一个目标值target作为参数  
var searchMatrix = function(matrix, target) {  
    // 在matrix的第一列进行二分查找，返回目标值可能存在的行的索引  
    const rowIndex = binarySearchFirstColumn(matrix, target);  
    // 如果返回的行索引小于0，说明目标值不在matrix中，返回false  
    if (rowIndex < 0) {  
        return false;  
    }  
    // 在可能存在的行中进行二分查找，返回查找结果  
    return binarySearchRow(matrix[rowIndex], target);  
};  
  
// 定义一个名为binarySearchFirstColumn的函数，该函数用于在matrix的第一列进行二分查找  
const binarySearchFirstColumn = (matrix, target) => {  
    // 初始化最低索引low为-1，最高索引high为matrix的长度减1  
    let low = -1, high = matrix.length - 1;  
    // 当low小于high时，执行循环  
    while (low < high) {  
        // 计算中间索引mid  
        const mid = Math.floor((high - low + 1) / 2) + low;  
        // 如果matrix[mid][0]（即第一列的中间元素）小于等于目标值  
        if (matrix[mid][0] <= target) {  
            // 更新low为mid  
            low = mid;  
        } else {  
            // 否则，更新high为mid - 1  
            high = mid - 1;  
        }  
    }  
    // 返回low作为可能存在的行的索引  
    return low;  
}  
  
// 定义一个名为binarySearchRow的函数，该函数用于在特定的行中进行二分查找  
const binarySearchRow = (row, target) => {  
    // 初始化最低索引low为0，最高索引high为row的长度减1  
    let low = 0, high = row.length - 1;  
    // 当low小于等于high时，执行循环  
    while (low <= high) {  
        // 计算中间索引mid  
        const mid = Math.floor((high - low) / 2) + low;  
        // 如果row[mid]（即行的中间元素）等于目标值  
        if (row[mid] == target) {  
            // 返回true，表示找到了目标值  
            return true;  
        } else if (row[mid] > target) {  
            // 如果row[mid]大于目标值，更新high为mid - 1  
            high = mid - 1;  
        } else {  
            // 如果row[mid]小于目标值，更新low为mid + 1  
            low = mid + 1;  
        }  
    }  
    // 如果循环结束还没有找到目标值，返回false  
    return false;  
}