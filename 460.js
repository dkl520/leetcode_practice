








// LFU（Least Frequently Used）是一种缓存替换算法，用于在有限的缓存空间中管理和替换缓存项。
// LFU算法根据缓存项被访问的频率来确定替换哪些项，即最少使用频率最低的项将被替换掉。

// LFU缓存算法的基本思想是，对于每个缓存项，维护一个访问频率计数器。当某个缓存项被访问时，其对应的访问频率计数器会增加。
// 当缓存空间已满并且需要替换缓存项时，LFU算法会选择访问频率最低的缓存项进行替换。

// 以下是LFU缓存算法的详细步骤：

// 创建一个哈希表（key_table）用于存储缓存项的键值对，其中键是缓存项的键，值是缓存项本身。
// 创建一个有序集合（S），用于按照访问频率和时间戳排序缓存项。集合中的每个元素都是一个缓存项。
// 每个缓存项（Node）包含以下属性：
// cnt：表示缓存项的访问频率。
// time：表示缓存项最近一次被访问的时间戳。
// key：缓存项的键。
// value：缓存项的值。
// 初始化缓存容量（capacity）和时间戳（time）为0。
// 当需要从缓存中获取数据时，执行以下操作：
// 如果缓存容量为0，返回-1。
// 如果缓存中不存在指定的键，返回-1。
// 从哈希表中获取缓存项。
// 从有序集合中移除旧的缓存项。
// 增加缓存项的访问频率（cnt）和时间戳（time）。
// 将更新后的缓存项重新添加到有序集合和哈希表中。
// 返回缓存项的值。
// 当需要向缓存中存储数据时，执行以下操作：
// 如果缓存容量为0，直接返回。
// 如果缓存中不存在指定的键：
// 如果缓存已满，从哈希表和有序集合中删除访问频率最低的缓存项。
// 创建新的缓存项，并设置访问频率为1，时间戳为当前时间。
// 将新的缓存项添加到哈希表和有序集合中。
// 如果缓存中存在指定的键：
// 从有序集合中移除旧的缓存项。
// 增加缓存项的访问频率和时间戳。
// 更新缓存项的值。
// 将更新后的缓存项重新添加到有序集合和哈希表中。
// LFU缓存算法的优点是能够有效地淘汰访问频率较低的缓存项，适用于访问模式具有一定规律性的场景。
// 然而，LFU算法的实现相对复杂，需要维护额外的数据结构来记录访问频率和时间戳。
// 此外，LFU算法可能对访问频率较高但是突然不再被访问的缓存项保留时间较长，不够灵活。
// 因此，在实际应用中，需要根据具体场景和需求选择合适的缓存替换算法。



// 这段代码的主要逻辑是：当访问一个键时，首先检查缓存是否已满，然后检查键是否存在。如果存在，
// 则从当前的频率链表中移除该节点，并检查是否需要更新最小频率。然后，将该节点插入到下一个频率的链表头部。
// 这样，最不常用的元素（即最低频率的元素）会首先被移除，从而实现了 LFU 的效果。
class LFUCache {
    constructor(capacity) {
        this.minFreq = 0; // 最小频率  
        this.capacity = capacity; // 缓存容量  
        this.keyTable = new Map(); // 键值对映射  
        this.freqTable = new Map(); // 频率映射  
    }
    // 获取缓存中的值，如果不存在则返回-1  
    get(key) {
        if (this.capacity === 0) {
            return -1; // 如果缓存已满，则返回-1  
        }
        if (!this.keyTable.has(key)) {
            return -1; // 如果键不存在，则返回-1  
        }
        const node = this.keyTable.get(key); // 获取对应的节点  
        const val = node.val, freq = node.freq; // 获取值和频率  
        this.freqTable.get(freq).remove(node); // 从当前频率的链表中移除该节点  
        // 如果当前链表为空，则从频率映射中删除该频率，并更新最小频率  
        if (this.freqTable.get(freq).size === 0) {
            this.freqTable.delete(freq); // 删除频率映射中的该频率  
            if (this.minFreq === freq) {
                this.minFreq++; // 如果当前频率是当前最小频率，则增加最小频率  
            }
        }
        // 将节点插入到频率+1的链表头部  
        const list = this.freqTable.get(freq + 1) || new DoublyLinkedList(); // 获取或创建下一个频率的链表  
        list.addFirst(new Node(key, val, freq + 1)); // 将节点添加到链表头部  
        this.freqTable.set(freq + 1, list); // 在频率映射中更新链表  
        this.keyTable.set(key, this.freqTable.get(freq + 1).getHead()); // 在键值对映射中更新节点位置  
        return val; // 返回值  
    }
    put(key, value) {
        // 如果缓存容量已满，则不进行任何操作  
        if (this.capacity === 0) {
            return;
        }
        // 如果键不存在于缓存中  
        if (!this.keyTable.has(key)) {
            // 如果缓存已满，需要移除一个元素  
            if (this.keyTable.size === this.capacity) {
                // 从频率最低的链表中获取尾节点  
                const node = this.freqTable.get(this.minFreq).getTail();
                // 从键值对映射中移除该节点  
                this.keyTable.delete(node.key);
                // 从频率映射中移除该节点  
                this.freqTable.get(this.minFreq).remove(node);
                // 如果该频率的链表为空，则从频率映射中删除该频率  
                if (this.freqTable.get(this.minFreq).size === 0) {
                    this.freqTable.delete(this.minFreq);
                }
            }
            // 创建一个新的链表，并将新节点添加到头部  
            const list = this.freqTable.get(1) || new DoublyLinkedList();
            list.addFirst(new Node(key, value, 1));
            // 在频率映射中更新链表  
            this.freqTable.set(1, list);
            // 在键值对映射中更新节点的位置  
            this.keyTable.set(key, this.freqTable.get(1).getHead());
            // 更新最小频率为1  
            this.minFreq = 1;
        } else {
            // 如果键已存在于缓存中，则更新对应的值，并相应地更新频率和链表  
            const node = this.keyTable.get(key);
            const freq = node.freq;
            // 从当前频率的链表中移除该节点  
            this.freqTable.get(freq).remove(node);
            // 如果该频率的链表为空，则从频率映射中删除该频率，并检查是否需要更新最小频率  
            if (this.freqTable.get(freq).size === 0) {
                this.freqTable.delete(freq);
                if (this.minFreq === freq) {
                    this.minFreq++;
                }
            }
            // 创建一个新的链表，并将新节点添加到头部，并设置新的频率为 freq + 1  
            const list = this.freqTable.get(freq + 1) || new DoublyLinkedList();
            list.addFirst(new Node(key, value, freq + 1));
            // 在频率映射中更新链表  
            this.freqTable.set(freq + 1, list);
            // 在键值对映射中更新节点的位置  
            this.keyTable.set(key, this.freqTable.get(freq + 1).getHead());
        }
    }
    // 这段代码首先检查缓存是否已满，如果已满则需要移除一个元素。然后，根据键是否存在于缓存中来决定如何处理新的键值对。
    // 如果键不存在，则创建一个新的链表并将新节点添加到头部。如果键已存在，则更新对应的值和相应的链表
}
// 定义 Node 类  
class Node {
    // 构造函数，初始化 key、val、freq 属性  
    constructor(key = -1, val = -1, freq = 0) {
        this.key = key;  // 键  
        this.val = val;   // 值  
        this.freq = freq; // 频率  
        this.prev = null; // 前一个节点的引用  
        this.next = null;  // 下一个节点的引用  
    }
}
// 这个代码实现了一个双向链表，其中 Node 类代表链表中的一个节点，DoublyLinkedList 类代表整个双向链表。
// 定义 DoublyLinkedList 类  
class DoublyLinkedList {
    // 构造函数，初始化一些成员变量  
    constructor() {
        this.dummyHead = new Node();  // 虚拟头节点  
        this.dummyTail = new Node();  // 虚拟尾节点  
        this.dummyHead.next = this.dummyTail;  // 将虚拟头节点的下一个节点设置为虚拟尾节点  
        this.dummyTail.prev = this.dummyHead;    // 将虚拟尾节点的上一个节点设置为虚拟头节点  
        this.size = 0;  // 链表大小  
    }
    // 在链表头部添加一个节点  
    addFirst(node) {
        const prevHead = this.dummyHead.next;  // 获取虚拟头节点的下一个节点（即当前链表的头部节点）  
        node.prev = this.dummyHead;             // 设置新节点的上一个节点为虚拟头节点  
        this.dummyHead.next = node;             // 将虚拟头节点的下一个节点设置为新节点  
        node.next = prevHead;                  // 设置新节点的下一个节点为原来的头部节点  
        prevHead.prev = node;                  // 将原来头部节点的上一个节点设置为新节点  
        this.size++;                           // 链表大小加一  
    }
    // 从链表中移除一个节点  
    remove(node) {
        const prev = node.prev, next = node.next;  // 获取要移除节点的上一个节点和下一个节点  
        prev.next = next;                           // 将上一个节点的下一个节点设置为要移除节点的下一个节点  
        next.prev = prev;                           // 将下一个节点的上一个节点设置为要移除节点的上一个节点  
        this.size--;                               // 链表大小减一  
    }
    // 获取链表的头部节点  
    getHead() {
        return this.dummyHead.next;  // 返回虚拟头节点的下一个节点，即链表的头部节点  
    }
    // 获取链表的尾部节点  
    getTail() {
        return this.dummyTail.prev;  // 返回虚拟尾节点的上一个节点，即链表的尾部节点  
    }
}