function shortestWay(source, target) {
    let count = 0; // 计数器，用于记录使用source的次数

    // 首先检查target中的每个字符是否在source中存在，如果不存在，则返回-1
    for (let i = 0; i < target.length; i++) {
        const tE = target.charAt(i); // 获取target中的当前字符
        if (source.indexOf(tE) == -1) return -1; // 如果source中没有这个字符，返回-1
    }

    // 如果target中的字符都存在于source中，开始计算最少的子序列数
    for (let i = 0; i < target.length;) { // 外层循环遍历target中的字符
        for (let j = 0; j < source.length; j++) { // 内层循环遍历source中的字符
            const tE = target.charAt(i); // 获取target中的当前字符
            const sE = source.charAt(j); // 获取source中的当前字符
            if (tE == sE) { // 如果source中的字符与target中的字符相同
                i++; // 移动target的指针，匹配下一个字符
            }
        }
        count++; // 每次内层循环完成，表示用完了一次source，计数器加一
    }
    return count; // 返回最少使用source的次数
}

let source = "abc", target = "acdbc";
console.log(shortestWay(source, target)); // 输出-1，因为target中的'd'不在source中

