class LRUCache {  
    constructor(capacity) {  
        // 缓存的最大容量  
        this.capacity = capacity;  
        // 使用Map数据结构来存储缓存的键值对，Map在插入元素时按照插入顺序排序  
        this.cache = new Map();  
    }  
  
    // 获取缓存中的值  
    get(key) {  
        // 如果缓存中有这个键  
        if (this.cache.has(key)) {  
            // 获取该键对应的值  
            const value = this.cache.get(key);  
            // 从缓存中删除该键值对，因为我们需要把它移到最近使用的位置  
            this.cache.delete(key);  
            // 重新设置该键值对，使其排到最后，表示最近被使用过  
            this.cache.set(key, value);  
            // 返回获取到的值  
            return value;  
        }  
        // 如果缓存中没有这个键，返回-1表示未找到  
        return -1;  
    }  
  
    // 向缓存中添加新的键值对  
    put(key, value) {  
        // 如果缓存中已经存在这个键  
        if (this.cache.has(key)) {  
            // 删除旧的键值对，因为我们需要更新它的位置到最近使用的位置  
            this.cache.delete(key);  
        }   
        // 如果缓存已满  
        else if (this.cache.size >= this.capacity) {  
            // 获取最旧的键（也就是第一个被插入的键），并删除对应的键值对，以腾出空间存放新的键值对  
            const oldestKey = this.cache.keys().next().value;  
            this.cache.delete(oldestKey);  
        }  
        // 添加新的键值对到缓存中，由于我们使用的是Map数据结构，新添加的键值对会自动排到最后，表示最近被使用过  
        this.cache.set(key, value);  
    }  
}

const cache = new LRUCache(2); // Initialize LRU cache with capacity 2

cache.put(1, 1);
cache.put(2, 2);
console.log(cache.get(1)); // Output: 1

cache.put(3, 3); // Key 2 is evicted as it was the least recently used key
console.log(cache.get(2)); // Output: -1

cache.put(4, 4); // Key 1 is evicted as it was the least recently used key
console.log(cache.get(1)); // Output: -1
console.log(cache.get(3)); // Output: 3
console.log(cache.get(4)); // Output: 4