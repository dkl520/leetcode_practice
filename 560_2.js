// 定义一个名为 subarraySum 的函数，接收两个参数：一个数字数组 nums 和一个整数 k。  

// 这段代码的主要思想是利用前缀和来解决问题。在遍历数组的过程中，同时维护一个前缀和及其频率的映射关系。
// 这样在判断是否存在和为 k 的子数组时，只需查找是否存在对应的前缀和即可。
function subarraySum(nums, k) {  
  
    // 创建一个 Map 对象，名为 preSumFreq，用于存储前缀和的频率。前缀和指的是某个位置之前的数字之和。  
    const preSumFreq = new Map();  
    
    // 对于数组的第一个元素，其前缀和即为它本身，设置其频率为 1。  
    // 这里我们假设前缀和为0的频率为0，所以需要特殊处理。  
    preSumFreq.set(0, 1);  
    
    // 定义一个变量 preSum 用于记录前缀和，初始值为0。  
    let preSum = 0;  
      
    // 定义一个变量 count 用于记录满足条件的子数组个数，初始值为0。  
    let count = 0;  
    
    // 使用 for...of 循环遍历 nums 数组。  
    for (const num of nums) {  
      // 对当前元素进行累加操作，并更新 preSum 的值。  
      preSum += num;  
    
      // 在遍历过程中，判断是否存在前缀和为 preSum - k 的情况，如果存在，则将对应的计数加到 count 中。  
      // 这里的思想是利用前缀和的特性，找出所有可能的子数组和，然后判断是否存在和为 k 的子数组。  
      if (preSumFreq.has(preSum - k)) {  
        count += preSumFreq.get(preSum - k);  
      }  
    
      // 在维护 preSumFreq 的同时，更新 preSum 的频率。此处用到了 Map 对象的特性，能够高效地查找到对应的键值对。  
      // 如果 preSumFreq 中不存在 preSum，则初始化为1；如果存在，则将其值加1。  
      preSumFreq.set(preSum, (preSumFreq.get(preSum) || 0) + 1);  
    }  
    // 返回最终的计数结果 count。  
    return count;  
  }