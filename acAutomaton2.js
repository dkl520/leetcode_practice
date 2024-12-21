// 定义一个名为StringDemo的包。
// 在JavaScript中，包的概念不是很强烈，可以忽略包的定义。
// ac自动机_斗破苍穹示例jspng.png
// 导入Node.js的fs模块，该模块用于文件操作。
// ac自动机_斗破苍穹示例jspng.png
import fs from "fs";

// 定义一个类CheckDocument。
class CheckDocument {
    // 定义主方法，JavaScript程序的入口点。
    static main() {
        // 获取程序开始执行的时间（以毫秒为单位）。
        const startTime = Date.now();

        // 定义一个字符串变量path，存储要检查的文件的路径。
        const path = 'C:\\Users\\dkl520\\Documents\\《斗破苍穹》.txt';

        // 调用readTextFile方法读取文件的内容，并将结果存储在一个字符串列表中。
        const lines = this.readTextFile(path);

        // 定义一个字符串数组patterns，存储要查找的关键词。
        const patterns = ["桀桀", "恐怖如斯", "凉气", "灰衣老者", "足以自傲", "没事儿吧", "斗气化马", "美眸", "眼神闪烁", "斗气化翼"];

        // 创建一个AC对象，传入关键词数组patterns。
        const automaton = new AC(patterns);

        // 创建一个Map对象allCounts，用于存储每个关键词出现的次数。
        const allCounts = new Map();

        // 初始化Map，将每个关键词作为键，出现次数为0作为值。
        for (const pattern of patterns) {
            allCounts.set(pattern, 0);
        }

        // 遍历文件中的每一行。
        for (const line of lines) {
            // 使用AC对象在行中搜索关键词，并将结果存储在一个新的Map中。
            const occurrences = automaton.search(line);
            // 对新的Map中的每个元素进行处理，如果关键词在allCounts的Map中存在，则将其出现次数增加当前找到的次数。
            for (const [key, value] of occurrences) {
                allCounts.set(key, allCounts.get(key) + value);
            }
        }

        // 获取程序结束执行的时间（以毫秒为单位）。
        const endTime = Date.now();

        // 打印出所有关键词及其出现次数。
        console.log(allCounts);
        // 计算程序执行的时间（毫秒）。
        const executionTime = endTime - startTime;
        // 打印出程序执行的时间。
        console.log("Code execution time: " + executionTime + " milliseconds");
    }

    // 定义一个静态方法readTextFile，读取指定路径的文件内容并返回一个字符串数组。如果读取失败，返回null。
    static readTextFile(filePath) {
        // 尝试同步读取文件的所有行并返回。如果发生异常，则打印异常信息并返回null。
        try {
            const content = fs.readFileSync(filePath, 'utf8');
            return content.split('\n');
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}

// 定义一个名为AC的类，此类用于构建和操作Aho-Corasick自动机
class AC {
    // 构造函数，接收一个字符串数组patterns作为参数，用于构建AC自动机
    constructor(patterns) {
        // 初始化root节点
        this.root = new TrieNode();

        // 使用patterns中的每个字符串构建Trie树（前缀树）
        for (const pattern of patterns) {
            this.insert(pattern);
        }
        // 构建AC自动机的失败链接，这是Aho-Corasick自动机的重要部分
        this.buildFailureLinks();
    }

    // 私有方法，用于向Trie树中插入一个字符串
    insert(word) {
        let node = this.root;
        // 对于要插入的字符串中的每个字符，创建一个新的子节点，并将当前节点更新为该子节点
        for (const ch of word) {
            node.children[ch] = node.children[ch] || new TrieNode();
            node = node.children[ch];
        }
        // 标记该节点为单词的结尾，并保存该单词
        node.isEndOfWord = true;
        node.word = word;
    }

    // 私有方法，用于构建AC自动机的失败链接
    buildFailureLinks() {
        // 使用队列存储需要处理的节点
        const queue = [];
        // 将根节点的所有子节点加入队列，并设置他们的失败链接为根节点
        for (const childNode of Object.values(this.root.children)) {
            childNode.fail = this.root;
            queue.push(childNode);
        }

        // 循环处理队列中的节点，直到队列为空
        while (queue.length > 0) {
            const current = queue.shift(); // 取出队列中的第一个节点

            // 对于当前节点的每个子节点，设置其失败链接，并将子节点加入队列
            for (const [ch, childNode] of Object.entries(current.children)) {
                queue.push(childNode); // 将子节点加入队列

                // 获取当前节点的失败链接，并沿着失败链接查找包含字符ch的子节点，如果没有则向上查找，直到找到或回到根节点
                let failNode = current.fail;
                while (failNode !== null && !failNode.children[ch]) {
                    failNode = failNode.fail;
                }

                // 如果找到了包含字符ch的失败链接节点，则设置子节点的失败链接为该节点；否则设置失败链接为根节点
                if (failNode !== null) {
                    childNode.fail = failNode.children[ch];
                } else {
                    childNode.fail = this.root;
                }
            }
        }
    }

    /**
     * 在给定的文本中搜索之前插入的所有关键词，并返回每个关键词在文本中出现的次数。
     *
     * @param text 要搜索的文本
     * @return 一个Map，其中键是找到的关键词，值是它们在文本中出现的次数
     */
    search(text) {
        // 创建一个结果Map来存储搜索到的关键词及其出现次数
        const result = new Map();
        // 从根节点开始搜索
        let current = this.root;

        // 遍历文本中的每个字符
        for (const ch of text) {
            // 如果当前节点不包含文本中的字符，并且当前节点不是根节点，那么跟随失败链接继续查找
            while (current !== null && !current.children[ch]) {
                current = current.fail;
            }

            // 如果找到了包含字符的节点，移动到该节点；否则回到根节点
            if (current !== null) {
                current = current.children[ch];
                debugger
            } else {
                current = this.root;
            }

            // 从当前节点开始，沿着失败链接查找所有到达的单词结尾节点，并将它们加入到结果Map中
            let temp = current;
            while (temp !== null) {
                if (temp.isEndOfWord) {
                    // 使用Map的set方法来更新值，如果单词是第一次出现，则设置为1，否则增加1
                    result.set(temp.word, (result.get(temp.word) || 0) + 1);
                }
                temp = temp.fail;
            }
        }

        // 返回搜索结果
        return result;
    }
}

/**
 * Trie树的节点类，包含了子节点、失败链接、是否是单词结尾的标记和单词本身的信息。
 */
class TrieNode {
    // 构造函数，初始化节点的各个属性
    constructor() {
        this.children = {};
        this.fail = null;
        this.isEndOfWord = false;
        this.word = null;
    }
}

// 调用主方法
CheckDocument.main();
