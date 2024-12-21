// 定义一个TrieNode类，Trie树是一种数据结构，常用于存储单词的集合，以便快速检索  
class TrieNode {
    constructor() {
        // 每个TrieNode节点都有一组子节点，key为字符，value为对应的TrieNode对象  
        this.children = {};
        // 一个布尔值，标识当前节点是否为一个单词的末尾  
        this.isEndOfWord = false;
        this.word = null;
        // 当一个节点失败（即找不到与下一个字符匹配的子节点）时，失败链接会指向下一个应该考虑的节点  
        this.failureLink = null;
    }
}

// 构建Trie树，输入是一组模式词  
// ["he", "she", "hers", "his"];
function buildTrie(patterns) {
    // 创建Trie树的根节点  
    const root = new TrieNode();
    for (const pattern of patterns) {
        // 对于每一个模式词，从根节点开始遍历  
        let node = root;
        for (const char of pattern) {
            // 对于模式词中的每一个字符，检查当前节点的子节点是否包含该字符  
            if (!node.children[char]) {
                // 如果不包含，就在当前节点的子节点中创建一个以该字符为key的新节点  
                node.children[char] = new TrieNode();
            }
            // 继续遍历下一个字符，更新当前节点为该字符对应的子节点  
            node = node.children[char];
        }
        // 当遍历完一个模式词后，将当前节点标记为一个单词的末尾  
        node.isEndOfWord = true;
        node.word= pattern;
    }
    // 返回Trie树的根节点  
    return root;
}

// 为Trie树中的每个节点添加failureLink，这个过程叫做构建失败链接  
function buildFailureLinks(root) {
    // 使用队列来存储待处理的节点  
    const queue = [];
    // 对于根节点的每个子节点，设置其failureLink为根节点，并将它们加入队列中  
    for (const child of Object.values(root.children)) {
        child.failureLink = root;
        queue.push(child);
    }

    // 当队列不为空时，循环处理队列中的节点  
    while (queue.length > 0) {
        // 从队列中取出一个节点进行操作  
        const current = queue.shift();
        // 遍历该节点的每个子节点  
        for (const [char, child] of Object.entries(current.children)) {
            // 将该子节点加入队列中  
            queue.push(child);
            // 初始化failureLink为当前节点的failureLink  
            let failureLink = current.failureLink;
            // 如果failureLink存在且它的子节点中没有当前字符，则将failureLink更新为它的failureLink  
            while (failureLink && !failureLink.children[char]) {
                failureLink = failureLink.failureLink;
            }
            // 将当前节点的failureLink设置为failureLink中与当前字符对应的子节点，如果不存在则设置为根节点  
            child.failureLink = failureLink ? failureLink.children[char] : root;
        }
    }
    console.log(root)
}

// AC自动机是一个有向图，由一组节点（对应于模式字符串）和一组有向边（对应于字符）组成。  
// 它还有一个特殊的“失败链接”用于跳过不匹配的节点。  
// acAutomaton函数接受一个文本和一个AC自动机的根节点，返回所有匹配模式的开始和结束索引。  
// AC自动机是一个字符串搜索算法，它通过构建一个有向图来执行高效的字符串匹配。  
// 这个函数是AC自动机的主要部分，它接受文本、AC自动机的根节点和模式长度作为参数。  
function acAutomaton(text, root, patternLength) {
    // 初始化当前节点为根节点。  
    let current = root;
    // 用于存储匹配结果的位置区间。  
    const results = [];
    // 遍历输入的文本。  
    for (let i = 0; i < text.length; i++) {
        // 获取当前字符。  
        const char = text[i];
        // 如果当前节点存在，并且当前字符不在当前节点的子节点中，那么将当前节点移动到失败链接所指向的节点。  
        // 这是一种跳过不匹配节点的机制。  
        while (current && !current.children[char]) {
            current = current.failureLink;
        }
        // 如果当前节点不存在（即为null），那么将其重新设置为根节点，并继续下一次循环。  
        if (!current) {
            current = root;
            continue;
        }
        // 更新当前节点为当前字符对应的子节点。  
        current = current.children[char];
        // 如果当前节点是一个单词的结束，那么将匹配该模式的开始和结束索引添加到结果数组中。  
        if (current.isEndOfWord) {
            // results.push([i - patternLength + 1, i]);
            results.push(current.word);
            // 在这里，你可以执行其他操作，比如存储或打印匹配的模式。  

        }
    }
    // 返回匹配结果。  
    return results;
}
// 定义一个数组patterns，其中包含了我们要查找的模式字符串。  
const patterns = ["he", "she", "hers", "his"];
// 定义一个字符串text，这是我们要在其中查找模式的文本。  
const text = "ahershehishers";
// buildTrie函数用于构建AC自动机的trie树部分。这个函数的实现没有在给出的代码中，所以无法给出具体的注释。  
const root = buildTrie(patterns);
// console.log(root);
// buildFailureLinks函数用于构建AC自动机的失败链接部分。这个函数的实现没有在给出的代码中，所以无法给出具体的注释。  
buildFailureLinks(root);
// acAutomaton函数是AC自动机的主要部分，它接受文本、AC自动机的根节点和模式长度作为参数。  
// 在这一行，我们将模式长度作为参数传递给acAutomaton函数，以进行匹配。  
const matches = acAutomaton(text, root, patterns[0].length); // Pass the pattern length as an argument  
// console.log函数用于将结果打印到控制台。这里，它将打印出匹配的结果。  
console.log("Matches:", matches);