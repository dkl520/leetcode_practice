class WordFilter {
    constructor(words) {
        this.trie = {};
        this.weightKey = '{'; // 使用一个特殊字符作为分隔符，该字符在字典顺序上比 'z' 大

        // 构建 Trie 树
        for (let weight = 0; weight < words.length; weight++) {
            let word = words[weight] + this.weightKey; // 将单词和分隔符组合在一起
            for (let i = 0; i < word.length; i++) {
                let current = this.trie;
                for (let j = i; j < 2 * word.length - 1; j++) {
                    let k = word[j % word.length]; // 循环遍历单词的字符
                    if (!current[k]) current[k] = {}; // 如果节点不存在，则创建一个新节点
                    current = current[k];
                    if (!current.weight) current.weight = []; // 如果节点没有 weight 数组，则初始化
                    current.weight.push(weight); // 将单词的下标存储在节点的 weight 数组中
                }
            }
        }
    }

    f(pref, suff) {
        let current = this.trie;
        let searchWord = suff + this.weightKey + pref; // 将后缀和前缀用分隔符连接
        for (let char of searchWord) {
            if (!current[char]) return -1; // 如果节点不存在，则返回 -1
            current = current[char];
        }
        return current.weight.length ? current.weight[current.weight.length - 1] : -1; // 返回最大下标
    }
}

// 示例测试
let wordFilter = new WordFilter(["apple"]);
console.log(wordFilter.f("a", "e")); // 输出: 0
