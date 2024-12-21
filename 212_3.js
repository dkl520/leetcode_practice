class TrieNode {
    constructor() {
        this.children = {};
        this.isEnd = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word) {
        let node = this.root;
        for (const char of word) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
        node.isEnd = true;
    }

    search(word) {
        let node = this.root;
        for (const char of word) {
            if (!node.children[char]) {
                return false;
            }
            node = node.children[char];
        }
        return node.isEnd;
    }

    startsWith(prefix) {
        let node = this.root;
        for (const char of prefix) {
            if (!node.children[char]) {
                return false;
            }
            node = node.children[char];
        }
        return true;
    }
}

const findWords = function(board, words) {
    let result = new Set();
    let trie = new Trie();

    // Insert all words into the trie
    words.forEach(word => trie.insert(word));

    const rows = board.length;
    const cols = board[0].length;
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];

    // Helper function for DFS search
    const dfs = (i, j, node, path) => {
        const char = board[i][j];

        if (!node.children[char]) {
            return;
        }

        node = node.children[char];
        path += char;

        if (node.isEnd) {
            result.add(path);
        }

        // Mark the cell as visited
        board[i][j] = '#';

        for (const [dx, dy] of directions) {
            const newRow = i + dx;
            const newCol = j + dy;

            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && board[newRow][newCol] !== '#') {
                dfs(newRow, newCol, node, path);
            }
        }

        // Restore the cell's original value
        board[i][j] = char;
    };

    // Iterate over each cell in the board and start a DFS search if the cell's character is in the trie
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (trie.startsWith(board[i][j])) {
                dfs(i, j, trie.root, '');
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
console.time("3计时")

console.log(findWords(board, words)); // 预期输出所有单词

console.timeEnd("3计时")
