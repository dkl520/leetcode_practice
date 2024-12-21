function hasCircle(graph) {
    const visited = new Set();
    const queue = [];
  
    for (const node of Object.keys(graph)) {
      if (!visited.has(node)) {
        if (hasCycle(node, graph, visited, queue)) {
          return true;
        }
      }
    }
  
    return false;
  }
  
  function hasCycle(startNode, graph, visited, queue) {
    visited.add(startNode);
    queue.push([startNode, null]); // 将起始节点及其父节点(null)加入队列
  
    while (queue.length > 0) {
      const [currentNode, parent] = queue.shift();
  
      for (const neighbor of graph[currentNode]) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push([neighbor, currentNode]); // 将邻居节点及其父节点加入队列
        } else if (neighbor !== parent) {
          // 如果邻居节点已经被访问过,且不是当前节点的父节点,说明找到了环
          return true;
        }
      }
    }
  
    return false;
  }
  
  // 示例用例
  const graph = {
    A: ['B', 'C'],
    B: ['A', 'C', 'D'],
    C: ['A', 'B', 'D'],
    D: ['B', 'C', 'E'],
    E: ['D'],
  };
  
  if (hasCircle(graph)) {
    console.log('该无向图存在环');
  } else {
    console.log('该无向图不存在环');
  }



//   无向图判断环