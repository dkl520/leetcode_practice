function majorityElement(nums) { // 定义一个函数，名为majorityElement，接收一个参数nums，即待查找的数组  
    let cnt = 0; // 初始化计数器cnt为0，用于记录当前候选元素的出现次数  
    let candidate = 0; // 初始化候选元素为0，用于记录当前可能的多数元素  
    for (const t of nums) { // 遍历数组nums中的每一个元素  
      if (!cnt) // 如果计数器cnt为0，即还没有确定候选元素  
        candidate = t; // 将当前元素t设为候选元素  
      cnt += candidate === t ? 1 : -1; // 如果当前元素t与候选元素相同，则计数器cnt加1，否则减1  
    }  
    return candidate; // 返回最终确定的候选元素，这就是多数元素  
  }  
    
  // 示例用法  
  const nums = [2, 2, 1, 1, 1, 2, 2]; // 定义一个示例数组nums  
  const majority = majorityElement(nums); // 调用majorityElement函数，并将结果存储在变量majority中  
  console.log(majority); // 在控制台打印出多数元素，可以看到结果为2