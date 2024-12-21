function partitionLabels(s) {
    // 创建一个对象来记录每个字母最后出现的位置
    const lastOccurrence = {};
    
    // 遍历字符串，填充 lastOccurrence 对象
    for (let i = 0; i < s.length; i++) {
        lastOccurrence[s[i]] = i;
    }
    debugger
    // 创建一个数组来存储每个片段的长度
    const partitions = [];
    // 初始化两个指针，start 表示当前片段的起始位置，end 表示当前片段的结束位置
    let start = 0, end = 0;

    // 遍历字符串
    for (let i = 0; i < s.length; i++) {
        // 更新当前片段的结束位置为当前字符最后出现的位置
        end = Math.max(end, lastOccurrence[s[i]]);
    
        // 如果当前指针 i 到达了当前片段的结束位置
        if (i === end) {
            // 将当前片段的长度加入到 partitions 数组中
            partitions.push(end - start + 1);
            // 更新 start 指针为下一个片段的起始位置
            start = i + 1;
        }
    }
    
    // 返回所有片段的长度
    return partitions;
}

// 示例测试
const s1 = "ababcbacadefegdehijhklij";
console.log(partitionLabels(s1));  // 输出: [9, 7, 8]

const s2 = "eccbbbbdec";
console.log(partitionLabels(s2));  // 输出: [10]
