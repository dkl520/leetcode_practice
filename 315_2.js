class Solution {  
    // 构造函数，初始化两个空数组c和a  
    constructor() {  
        this.c = []; // 用于存储每个位置上比它小的元素个数  
        this.a = []; // 用于存储排序后的元素集合  
    }  
  
    // 计算数组中每个元素左边比它小的元素个数  
    countSmaller(nums) {  
        const resultList = []; // 存储结果的数组  
        this.discretization(nums); // 对输入的数组进行离散化处理  
        this.init(nums.length + 5); // 初始化数组c，长度为nums的长度加5  
        // 从右往左遍历nums数组，对每个元素执行以下操作：  

        for (let i = nums.length - 1; i >= 0; --i) {  
            const id = this.getId(nums[i]); // 获取当前元素在离散化数组中的id  
            resultList.push(this.query(id - 1)); // 查询id-1位置上的元素个数，并添加到结果列表中  
            this.update(id); // 更新id位置上的元素个数  
        }  
        // 将结果列表反转，因为是从右往左遍历的，所以需要反转结果列表使其从左往右递增  
        resultList.reverse();  
        return resultList; // 返回结果列表  


        
    }  
    // 初始化数组c，长度为length，并将所有元素初始化为0  
    init(length) {  
        this.c = new Array(length).fill(0);  
    }  
    // 获取x的最低位1的位置，即x的二进制表示中最低位的1所对应的十进制数  
    lowBit(x) {  
       let result = x & (-x);  
        return result;
    }  
    // 更新pos位置上的元素个数，将其增加1，并向上更新所有比它小的位置上的元素个数  
    update(pos) {  
        while (pos < this.c.length) {  
            this.c[pos] += 1; // pos位置上的元素个数加1  
            pos += this.lowBit(pos); // pos位置向上更新，直到无法再更新为止  
        }  
    }  
    // 查询pos位置上的元素个数之和，即从数组开头到pos位置上所有元素个数的总和  
    query(pos) {  
        let ret = 0; // 初始化结果为0  
        while (pos > 0) {  
            ret += this.c[pos]; // 将pos位置上的元素个数加到结果中  
            pos -= this.lowBit(pos); // pos位置向下查询，直到无法再查询为止  
        }  
        return ret; // 返回结果  
    }  
    // 对输入的数组进行离散化处理，即将数组中的元素存储到集合中，并排序，然后转换为数组形式存储到属性a中  
    discretization(nums) {  
        const set = new Set(nums); // 创建一个集合，并将nums中的元素添加到集合中，集合会自动去重  
        this.a = Array.from(set); // 将集合转换为数组形式，并存储到属性a中  
        this.a.sort((a, b) => a - b); // 对属性a中的元素进行升序排序  
    }  
    // 获取输入的整数x在离散化数组a中的id，id从1开始计数，如果找不到x则返回0  
    getId(x) {  
        return this.a.indexOf(x) + 1; // 使用indexOf方法获取x在数组a中的索引，然后加1得到id，如果找不到则返回-1+1=0  
    }  
}
// Example usage:


console.time("315. 计算右侧小于当前元素的个数");
const solution = new Solution();
const nums = [5, 2, 6, 1];
const result = solution.countSmaller(nums);
console.log(result);

console.timeEnd("315. 计算右侧小于当前元素的个数");