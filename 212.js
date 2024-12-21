/**
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */
import Trie from "./Tire.js";
class Alphabet {
    constructor(i, j, s) {
        this.i = i;
        this.j = j;
        this.s = s;
    }

}

var findWords = function (board, words) {
    let trie = new Trie();
    let wordList = new Set();
    const rows = board.length;
    const cols = board[0].length;
    let startsWithList = words.map((s) => s.charAt(0));
    let startLocation = new Array();
    for (let word of words) {
        trie.insert(word);
    }



    // for (let i = 0; i < board.length; i++) {
    //     const eli = board[i];
    //     for (let j = 0; j < eli.length; j++) {
    //         const el = eli[j];
    //         if (startsWithList.findIndex((v) => v == el) >= 0) {
    //             let alphabet = new Alphabet(i, j, el);
    //             startLocation.push(alphabet);
    //         }
    //     }
    // }
    // for (let i = 0; i < startLocation.length; i++) {
    //     const el = startLocation[i];
    //     let searchBol = trie.search(el.s);
    //     if (searchBol) {
    //         wordList.add(el.s);
    //     }
    //     dfs(board, [el]);
    // }

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const el = board[i][j];
            if (trie.startsWith(el)) {
                let alphabet = new Alphabet(i, j, el);
                dfs(board, [alphabet]);
            }
        }
    }

    return Array.from(wordList)

    function dfs(board, lineAlphabetList) {
        let direction = [
            [0, 1],
            [0, -1],
            [-1, 0],
            [1, 0]
        ];
        let alphabet = lineAlphabetList[lineAlphabetList.length - 1];

        let searchBols = trie.search(alphabet.s);
        if (searchBols) {
            wordList.add(alphabet.s);
        }
        const { i, j } = alphabet;
        for (const dirt of direction) {
            const nextY = i + dirt[0];
            const nextX = j + dirt[1];
            const bol = findalphabetLoacation(lineAlphabetList, [nextY, nextX]);
            if (nextY >= 0 && nextY < board.length && nextX >= 0 && nextX < board[0].length && bol) {

                const sliceWord = lineAlphabetList.map((a) => a.s).join('');
                let word = sliceWord + board[nextY][nextX];
                let searchBol = trie.search(word);
                if (searchBol) {
                    wordList.add(word);
                }
                if (trie.startsWith(word)) {
                    let newAlphabet = new Alphabet(nextY, nextX, board[nextY][nextX]);
                    let newlineAlphabetList = [...lineAlphabetList];
                    newlineAlphabetList.push(newAlphabet);
                    dfs(board, newlineAlphabetList);
                }
            }
        }
    }
};

function findalphabetLoacation(lineAlphabetList, location) {
    let strlineAlphabetList = lineAlphabetList.map(({ i, j, s }) => ([i, j])).map((v) => String(v));
    let strLocation = String(location);
    return strlineAlphabetList.findIndex((v) => v == strLocation) >= 0 ? false : true;
}





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
console.time("1计时")

console.log(findWords(board, words)); // 预期输出所有单词

console.timeEnd("1计时")
