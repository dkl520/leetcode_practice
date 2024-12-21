class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word) {
        let node = this.root;
        for (let char of word) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
        node.isEndOfWord = true;
    }

    startsWith(prefix) {
        let node = this.root;
        for (let char of prefix) {
            if (!node.children[char]) {
                return false;
            }
            node = node.children[char];
        }
        return true;
    }

    search(word) {
        let node = this.root;
        for (let char of word) {
            if (!node.children[char]) {
                return false;
            }
            node = node.children[char];
        }
        return node.isEndOfWord;
    }
}

var findWords = function (board, words) {
    let trie = new Trie();
    for (let word of words) {
        trie.insert(word);
    }
    
    let result = new Set();
    let visited = Array.from({ length: board.length }, () => Array(board[0].length).fill(false));

    const directions = [
        [0, 1], [0, -1], [-1, 0], [1, 0]
    ];

    const dfs = (i, j, node, path) => {
        if (node.isEndOfWord) {
            result.add(path);
        }
        if (i < 0 || j < 0 || i >= board.length || j >= board[0].length || visited[i][j]) {
            return;
        }

        let char = board[i][j];
        if (!node.children[char]) {
            return;
        }

        visited[i][j] = true;
        for (let [dx, dy] of directions) {
            let x = i + dx;
            let y = j + dy;
            dfs(x, y, node.children[char], path + char);
        }
        visited[i][j] = false;
    };

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            if (trie.root.children[board[i][j]]) {
                dfs(i, j, trie.root, "");
            }
        }
    }

    return Array.from(result);
};

// 测试用例
let board = [
    ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a"],
    ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a"],
    ["a", "a", "a", "a", "t", "a", "a", "a", "a", "a", "a", "a"],
    ["a", "a", "a", "a", "h", "e", "a", "a", "a", "a", "a", "a"],
    ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a"],
    ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a"],
    ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a"],
    ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a"],
    ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a"],
    ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a"],
    ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a"],
    ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a"]
];
let words = ["a", "aa", "aaa", "aaaa", "aaaaa", "aaaaaa", "aaaaaaa", "aaaaaaaa", "aaaaaaaaa", "aaaaaaaaaa"];
console.time("4计时")

console.log(findWords(board, words)); // 预期输出所有单词

console.timeEnd("4计时")
