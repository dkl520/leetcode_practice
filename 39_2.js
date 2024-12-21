// 定义一个名为 combinationSum 的函数，接受两个参数：candidates 和 target  
var combinationSum = function(candidates, target) {  
    // 初始化一个空数组，用于存储最后的结果  
    let results = [];  
    // 定义一个名为 backtrack 的内部函数，它是一个递归函数，用于回溯地搜索所有可能的组合  
    const backtrack = (candidates, target, start, path) => {  
      // 如果目标值小于0，则直接返回，不再继续搜索  
      if (target < 0) {  
        return;  
      }  
      // 如果目标值等于0，表示找到了一个满足条件的组合，将其加入到结果数组中，并返回  
      if (target === 0) {  
        results.push([...path]);  // 注意这里使用了展开运算符，将 path 数组转换为一个新数组并添加到 results 中  
        return;  
      }  
      // 从 start 索引开始遍历 candidates 数组，尝试将每个数作为当前组合的一部分  
      for (let i = start; i < candidates.length; i++) {  
        // 获取当前候选数（即尝试加入当前组合的数）  
        const num = candidates[i];  
        // 将当前候选数加入到当前的组合中  
        path.push(num);  
        // 递归调用 backtrack 函数，继续搜索下一个数，以凑出满足条件的组合  
        backtrack(candidates, target - num, i, path);  // 注意这里将 i 作为 start 参数传递，这样可以保证在每次递归时都从当前位置开始继续搜索  
        // 在回溯搜索结束后，将刚刚加入的数从当前组合中移除，以便尝试其他候选数  
        path.pop();  
      }  
    };  
    // 在开始搜索之前，先过滤掉 candidates 数组中大于 target 的数，因为这些数不可能出现在最终的组合中  
    candidates = candidates.filter(v => v <= target);  
    // 从候选数的第一个数开始搜索，初始的 target 为原始的 target，start 为 0，path 为一个空数组  
    backtrack(candidates, target, 0, []);  
    // 返回最终找到的所有满足条件的组合  
    return results;  
  };

  let candidates = [7,3,2], target = 18;

console.time("39. 组合总和")
console.log(combinationSum(candidates, target));
console.timeEnd("39. 组合总和")
debugger