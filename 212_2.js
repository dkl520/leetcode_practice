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

class Alphabet {
    constructor(i, j, s) {
        this.i = i;
        this.j = j;
        this.s = s;
    }
}



var findWords = function (board, words) {
    let wordList = new Set();
    let trie = new Trie();
    let startsWithList = new Set(words.map((s) => s.charAt(0)));
    words.forEach((s) => trie.insert(s));

    let rows = board.length;
    let cols = board[0].length;

    function bfs(lineAlphabetList) {
        let directions = [
            [0, 1], [0, -1],
            [-1, 0], [1, 0]
        ];

        let alphabet = lineAlphabetList[lineAlphabetList.length - 1];
        const { i, j } = alphabet;

        for (const [dx, dy] of directions) {
            const nextY = i + dx;
            const nextX = j + dy;
            if (nextY >= 0 && nextY < rows && nextX >= 0 && nextX < cols) {
                const bol = !lineAlphabetList.some(({ i, j }) => i === nextY && j === nextX);
                if (bol) {
                    let word = lineAlphabetList.map(({ s }) => s).join('') + board[nextY][nextX];
                    if (trie.search(word)) {
                        wordList.add(word);
                    }
                    if (trie.startsWith(word)) {
                        let newAlphabet = new Alphabet(nextY, nextX, board[nextY][nextX]);
                        lineAlphabetList.push(newAlphabet);
                        bfs(lineAlphabetList);
                        lineAlphabetList.pop();
                    }
                }
            }
        }
    }

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (startsWithList.has(board[i][j])) {
                let alphabet = new Alphabet(i, j, board[i][j]);
                if (trie.search(alphabet.s)) {
                    wordList.add(alphabet.s);
                }
                bfs([alphabet]);
            }
        }
    }

    return Array.from(wordList);
};

// 示例用法
let board = [['a']];
let words = ["ab"];
console.log(findWords(board, words));  // 输出找到的单词数组
