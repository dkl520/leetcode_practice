// FenwickTree类定义了一个Fenwick树数据结构  
class FenwickTree {
    constructor(size) { // 构造函数初始化一个大小为size+1的数组，并用0填充  
        this.tree = new Array(size + 1).fill(0);
    }
    update(index, delta) { // 更新树中指定位置的元素值，增加delta  
        while (index < this.tree.length) { // 循环更新直到达到数组的最后一个位置  
            this.tree[index] += delta; // 当前位置的元素值增加delta  
            index += index & -index; // 移动到下一个位置，并更新索引值  
        }
    }
    query(index) { // 查询树中指定位置之前的元素值之和  
        let sum = 0; // 初始化求和变量为0  
        while (index > 0) { // 循环查询直到达到数组的第一个位置  
            sum += this.tree[index]; // 当前位置的元素值加入求和变量  
            index -= index & -index; // 移动到前一个位置，并更新索引值  
        }
        return sum; // 返回求和结果  
    }
}

// countSmaller函数是主要的逻辑部分，它使用Fenwick树计算每个元素左边比它小的元素个数  
function countSmaller(nums) {
    // 将输入数组去重并排序  
    const sortedNums = Array.from(new Set(nums)).sort((a, b) => a - b);
    // 使用Map数据结构创建排名映射，key是元素，value是排名  
    const rankMap = new Map();
    for (let i = 0; i < sortedNums.length; i++) {
        rankMap.set(sortedNums[i], i + 1); // 排名从1开始，因为去重并排序后的数组元素是唯一的  
    }
    // 创建Fenwick树并初始化  
    const tree = new FenwickTree(sortedNums.length);
    const counts = new Array(nums.length).fill(0); // 存储每个元素左边比它小的元素个数，初始化为0  
    // 从右往左遍历输入数组，因为结果是从右往左返回的  
    for (let i = nums.length - 1; i >= 0; i--) {
        // 根据当前元素获取排名  
        
        const rank = rankMap.get(nums[i]);
        // 使用Fenwick树查询排名-1的位置之前的元素值之和，即左边比当前元素小的元素个数  
        counts[i] = tree.query(rank - 1);
        // 更新Fenwick树中排名位置的元素值为1，表示这个位置已经被访问过了  
        tree.update(rank, 1);
        debugger
    }
    // 返回结果数组，即每个元素左边比它小的元素个数  
    return counts;
}

// 示例：使用给出的数组[5, 2, 6, 1]调用函数countSmaller，并打印结果[2, 1, 1, 0]  
const nums = [5, 2,2, 6, 1];
const result = countSmaller(nums);
console.log(result); // 输出：[2, 1, 1, 0]