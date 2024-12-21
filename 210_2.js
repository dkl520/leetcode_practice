var findOrder = function(numCourses, prerequisites) {
    // 创建邻接表
    const graph = Array.from({ length: numCourses }, () => []);
    
    // 构建图
    for (const [course, pre] of prerequisites) {
        graph[pre].push(course);
    }
    
    // 记录访问状态
    const visited = new Array(numCourses).fill(0);
    // 0: 未访问 
    // 1: 正在访问（检测环）
    // 2: 已访问完成
    
    // 存储结果的数组
    const result = [];
    
    // DFS函数
    const dfs = (course) => {
        // 如果检测到环，返回false
        if (visited[course] === 1) return false;
        
        // 如果已经访问完成，直接返回true
        if (visited[course] === 2) return true;
        
        // 标记为正在访问
        visited[course] = 1;
        
        // 遍历当前课程的所有依赖课程
        for (const nextCourse of graph[course]) {
            // 如果存在环，返回false
            if (!dfs(nextCourse)) return false;
        }
        
        // 标记为已访问完成
        visited[course] = 2;
        
        // 将课程加入结果（逆序）
        result.push(course);
        
        return true;
    };
    
    // 遍历所有课程
    for (let i = 0; i < numCourses; i++) {
        // 如果存在环，返回空数组
        if (!dfs(i)) return [];
    }
    
    // 返回课程顺序
    return result.reverse();
};


var findOrder = function(numCourses, prerequisites) {
    // 使用数组代替Map，提高性能
    const graph = Array.from({ length: numCourses }, () => []);
    const inDegree = new Array(numCourses).fill(0);
    
    // 预处理依赖关系，使用数组索引直接建图
    for (const [course, pre] of prerequisites) {
        graph[pre].push(course);
        inDegree[course]++;
    }
    
    // 使用队列替代数组，更符合拓扑排序标准实现
    const queue = [];
    for (let i = 0; i < numCourses; i++) {
        if (inDegree[i] === 0) queue.push(i);
    }
    
    const result = [];
    
    // 优化：使用while循环，减少不必要的判断
    while (queue.length) {
        const current = queue.shift(); // 使用shift()代替pop()，保证顺序
        result.push(current);
        
        // 直接遍历依赖当前课程的课程
        for (const nextCourse of graph[current]) {
            if (--inDegree[nextCourse] === 0) {
                queue.push(nextCourse);
            }
        }
    }
    
    // 简化返回判断
    return result.length === numCourses ? result : [];
};