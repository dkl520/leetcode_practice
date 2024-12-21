// 定义 TrieNode 类，它是构建 Trie 的节点，每个节点包含一个子节点映射表（children）和一个布尔标志（isWordEnd），标志该节点是否为一个单词的结尾  
class TrieNode {  
    // 构造函数，初始化子节点映射表和标志位  
    constructor() {  
      this.children = new Map(); // 创建一个新的子节点映射表  
      this.isWordEnd = false; // 默认情况下，节点不是一个单词的结尾  
    }  
      
    // 设置该节点为单词的结尾  
    setEndOfWord() {  
      this.isWordEnd = true;  
    }  
      
    // 判断该节点是否为单词的结尾  
    isEndOfWord() {  
      return this.isWordEnd;  
    }  
      
    // 获取指定字符的子节点，如果不存在则返回undefined  
    getChild(char) {  
      return this.children.get(char);  
    }  
      
    // 设置指定字符的子节点，如果子节点不存在，则创建新的子节点并设置  
    setChild(char, node) {  
      this.children.set(char, node);  
    }  
  }  
      
  // 定义 Trie 类，它包含一个根节点（root）和三个方法：insert、search 和 startsWith，分别用于插入单词、查找单词和查找前缀  
  class Trie {  
    // 构造函数，初始化根节点  
    constructor() {  
      this.root = new TrieNode(); // 创建一个新的根节点  
    }  
      
    // 插入一个单词到 Trie 中，单词由字符数组 word 给出  
    insert(word) {  
      let node = this.root; // 从根节点开始插入  
      for (const char of word) { // 遍历单词中的每个字符  
        if (!node.getChild(char)) { // 如果当前节点的子节点中不存在当前字符的节点，则创建一个新的节点并设置到子节点中  
          node.setChild(char, new TrieNode()); // 创建新的子节点并设置到当前节点的子节点中  
        }  
        node = node.getChild(char); // 移动到当前字符的子节点，继续插入下一个字符  
      }  
      node.setEndOfWord(); // 在插入完单词的所有字符后，将最后一个节点的标志位设置为 true，表示该节点是一个单词的结尾  
    }  
      
    // 查找 Trie 中是否存在一个完整的单词（与给定的 word 一致）  
    search(word) {  
      let node = this.root; // 从根节点开始查找  
      for (const char of word) { // 遍历单词中的每个字符  
        node = node.getChild(char); // 移动到当前字符的子节点，继续查找下一个字符  
        if (!node) { // 如果找不到下一个字符的节点，说明单词不存在于 Trie 中，返回 false  
          return false;  
        }  
      }  
      return node.isEndOfWord(); // 如果找到了单词的所有字符，并且最后一个字符的节点是一个单词的结尾，返回 true，否则返回 false  
    }  
      
    // 判断 Trie 中是否存在以给定前缀开始的单词  
    startsWith(prefix) {  
      let node = this.root; // 从根节点开始查找前缀  
      for (const char of prefix) { // 遍历前缀中的每个字符  
        node = node.getChild(char); // 移动到当前字符的子节点，继续查找下一个字符  
        if (!node) { // 如果找不到下一个字符的节点，说明前缀不存在于 Trie 中，返回 false  
          return false;  
        }  
      }  
      return true; // 如果找到了前缀的所有字符，无论最后一个字符的节点是否是一个单词的结尾，都返回 true（因为前缀存在）  
    }  
  }
  
  const trie = new Trie();
  trie.insert("apple");
  console.log(trie.search("app"));     // Output: false
  console.log(trie.search("apple"));   // Output: true
  console.log(trie.startsWith("app")); // Output: true
  trie.insert("app");
  console.log(trie.search("app"));     // Output: true