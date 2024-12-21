function shortestWay(source, target) {
    let count = 0; // 计数器，用于记录使用source的次数
    let i = 0; // target的指针

    while (i < target.length) {
        let prevI = i; // 记录target的当前指针位置

        for (let j = 0; j < source.length; j++) {
            if (i < target.length && source[j] === target[i]) {
                i++; // 如果匹配成功，移动target的指针
            }
        }

        if (i === prevI) return -1; // 如果i没有移动，表示无法匹配target中的字符

        count++; // 每次匹配结束后，计数器加一
    }

    return count; // 返回最少使用source的次数
}

// 测试示例
let source = "abc", target = "acdbc";
console.log(shortestWay(source, target)); // 输出-1
