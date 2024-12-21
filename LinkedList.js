class Node {
    constructor(data) {
      this.data = data;
      this.next = null;
    }
  }
  
  class LinkedList {
    constructor() {
      this.head = null;
    }
  
    // 在链表末尾添加一个节点
    append(data) {
      const newNode = new Node(data);
  
      if (!this.head) {
        this.head = newNode;
      } else {
        let current = this.head;
        while (current.next) {
          current = current.next;
        }
        current.next = newNode;
      }
    }
  
    // 在指定位置插入一个节点
    insertAt(position, data) {
      const newNode = new Node(data);
  
      if (position === 0) {
        newNode.next = this.head;
        this.head = newNode;
      } else {
        let current = this.head;
        let count = 0;
        let previous = null;
  
        while (count < position) {
          previous = current;
          current = current.next;
          count++;
        }
  
        newNode.next = current;
        previous.next = newNode;
      }
    }
  
    // 删除指定位置的节点
    removeAt(position) {
      if (!this.head) {
        return;
      }
  
      if (position === 0) {
        this.head = this.head.next;
      } else {
        let current = this.head;
        let count = 0;
        let previous = null;
  
        while (count < position) {
          previous = current;
          current = current.next;
          count++;
        }
  
        previous.next = current.next;
      }
    }
  
    // 打印链表中的节点数据
    print() {
      let current = this.head;
      let result = '';
  
      while (current) {
        result += current.data + ' -> ';
        current = current.next;
      }
  
      result += 'null';
      console.log(result);
    }
  }
  export default LinkedList;
  
//   // 创建一个链表并进行操作
//   const linkedList = new LinkedList();
  
//   linkedList.append(10);
//   linkedList.append(20);
//   linkedList.append(30);
  
//   linkedList.insertAt(1, 15);
//   linkedList.print(); // 输出：10 -> 15 -> 20 -> 30 -> null
  
//   linkedList.removeAt(2);
//   linkedList.print(); // 输出：10 -> 15 -> 30 -> null