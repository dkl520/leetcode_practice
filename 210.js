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