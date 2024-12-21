function backtrack(start, combination, result) {
    if (combination.length === 2) {
        result.push([...combination]); // 将组合结果加入结果集
        return;
    }

    for (let i = start; i < letters.length; i++) {
        combination.push(letters[i]); // 添加当前字母到组合中
        backtrack(i + 1, combination, result); // 递归生成剩余组合
        combination.pop(); // 回溯，移除最后一个字母
    }
}

const letters = ['a', 'b', 'c'];
const result = [];
backtrack(0, [], result);
