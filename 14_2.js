class TrieNode {
    constructor() {
        this.children = new Array(26);
        this.count = 0;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(str) {
        let node = this.root;
        for (const ch of str) {
            node.count++;
            const nextIndex = ch.charCodeAt(0) - 'a'.charCodeAt(0);
            if (!node.children[nextIndex]) {
                node.children[nextIndex] = new TrieNode();
            }
            node = node.children[nextIndex];
        }
    }
}

class Solution {
    longestCommonPrefix(strs) {
        const length = strs.length;
        if (length === 0) return "";

        const trie = new Trie();
        for (const str of strs) {
            trie.insert(str);
        }

        return this.findMax(trie.root, "", length);
    }

    findMax(root, s, length) {
        let countForDiv = 0;
        let divIndex = -1;

        for (let i = 0; i < 26; i++) {
            if (root.children[i]) {
                countForDiv++;
                divIndex = i;
            }
        }

        if (countForDiv === 1 && root.count === length) {
            s += String.fromCharCode('a'.charCodeAt(0) + divIndex);
            return this.findMax(root.children[divIndex], s, length);
        }

        return s;
    }
}

// 示例
const solution = new Solution();
const strs1 = ["flower", "flow", "flight"];
const strs2 = ["dog", "racecar", "car"];

console.log(solution.longestCommonPrefix(strs1)); // 输出："fl"
console.log(solution.longestCommonPrefix(strs2)); // 输出：""


// 字典树