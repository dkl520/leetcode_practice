function partitionString(s) {
    let result = []; // 用于存储所有可能的分割结果
    let minParts = 1; // 最小分割部分数量
    let maxParts = s.length; // 最大分割部分数量，即每个字符单独成为一部分

    // 回溯函数，用于生成所有可能的分割方式
    function backtrack(start, path) {
        // 如果当前路径中的部分数量在规定范围内且已经遍历到字符串末尾
        if (path.length >= minParts && path.length <= maxParts && start === s.length) {
            result.push([...path]); // 将当前路径加入结果集
            return;
        }
        // 如果路径中的部分数量超过最大部分数量，则停止递归
        if (path.length > maxParts) {
            return;
        }
        // 尝试每一种可能的分割方式
        for (let end = start + 1; end <= s.length; end++) {
            path.push(s.substring(start, end)); // 将当前部分加入路径
            backtrack(end, path); // 递归调用，处理剩余的字符串
            path.pop(); // 回溯，移除当前部分，尝试下一个分割方式
        }
    }

    // 从字符串的起始位置开始回溯
    backtrack(0, []);
    return result; // 返回所有可能的分割方式
}

let s = "abcd";
let partitions = partitionString(s);
console.log(partitions); // 输出分割方式的总数量
debugger
// 此代码为了解决 cn-1+cn-2...cn-n 的所有组合的可能。