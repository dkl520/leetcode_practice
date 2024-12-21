class TrieNode {
    constructor() {
        this.children = new Array(26);
        this.isLeaf = false;

        // Initialize children nodes to null
        for (let i = 0; i < 26; i++) {
            this.children[i] = null;
        }
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
        this.index = 0;
    }

    insert(key) {
        let length = key.length;
        let index;
        let pCrawl = this.root;

        for (let level = 0; level < length; level++) {
            index = key.charCodeAt(level) - 'a'.charCodeAt(0);
            if (!pCrawl.children[index]) {
                pCrawl.children[index] = new TrieNode();
            }
            pCrawl = pCrawl.children[index];
        }

        pCrawl.isLeaf = true;
    }

    countChildren(node) {
        let count = 0;
        for (let i = 0; i < 26; i++) {
            if (node.children[i] !== null) {
                count++;
                this.index = i;
            }
        }
        return count;
    }

    walkTrie() {
        let pCrawl = this.root;
        this.index = 0;
        let prefix = "";

        while (this.countChildren(pCrawl) === 1 && !pCrawl.isLeaf) {
            pCrawl = pCrawl.children[this.index];
            prefix += String.fromCharCode('a'.charCodeAt(0) + this.index);
        }
        return prefix;
    }
}

function commonPrefix(arr) {
    const trie = new Trie();
    arr.forEach(word => trie.insert(word));

    // Perform a walk on the trie
    return trie.walkTrie();
}

// Example usage:
const arr = ["geeksforgeeks", "geeks", "geek", "geezer"];
const ans = commonPrefix(arr);

if (ans.length !== 0) {
    console.log("The longest common prefix is " + ans);
} else {
    console.log("There is no common prefix");
}


// 字典树实现方案。