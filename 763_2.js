
function partitionLabels(s) {
    const lastOccurrence = {};
    
    // 记录每个字母最后出现的位置
    for (let i = 0; i < s.length; i++) {
        lastOccurrence[s[i]] = i;
    }

    const partitions = [];
    let start = 0, end = 0;

    // 使用双指针遍历字符串
    for (let i = 0; i < s.length; i++) {
        end = Math.max(end, lastOccurrence[s[i]]);
        
        // 如果当前指针 i 到达了当前片段的结束位置
        if (i === end) {
            partitions.push(end - start + 1);
            start = i + 1;
        }
    }
    
    return partitions;
}
