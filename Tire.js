class TrieNode {
    constructor() {
        this.children = {};  // 子节点
        this.isEnd = false;  // 标记是否为单词的结尾
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word) {
        let node = this.root;
        for (const alphabet of word) {
            if (!(alphabet in node.children)) {
                node.children[alphabet] = new TrieNode();
            }
            node = node.children[alphabet];
        }
        node.isEnd = true;
    }

    startsWith(prefix) {
        let node = this.root;
        for (const alphabet of prefix) {
            if (!(alphabet in node.children)) {
                return false;
            }
            node = node.children[alphabet];
        }
        return true;
    }

    search(word) {
        let node = this.root;
        for (const alphabet of word) {
            if (!(alphabet in node.children)) {
                return false;
            }
            node = node.children[alphabet];
        }
        return node.isEnd;
    }
}

export default Trie