function minNumberOfSemesters(n, relations, k) {
    const indegree = Array(n + 1).fill(0); // 记录每门课程的入度
    const graph = Array.from({ length: n + 1 }, () => []); // 邻接表
    for (const [pre, next] of relations) {
        graph[pre].push(next);
        indegree[next]++;
    }

    const queue = []; // BFS 队列
    let semesters = 0; // 学期计数
    let totalCourses = 0; // 完成的课程计数

    // 找到入度为 0 的课程
    for (let i = 1; i <= n; i++) {
        if (indegree[i] === 0) {
            queue.push(i);
        }
    }

    while (queue.length > 0) {
        const size = Math.min(queue.length, k); // 本学期可上课程数
        const nextQueue = []; // 下学期的课程

        // 上课
        for (let i = 0; i < size; i++) {
            const course = queue.shift(); // 取出课程
            totalCourses++; // 完成课程计数

            // 遍历该课程的所有后续课程
            for (const nextCourse of graph[course]) {
                indegree[nextCourse]--; // 减少入度
                if (indegree[nextCourse] === 0) {
                    nextQueue.push(nextCourse); // 如果入度为 0，加入下学期队列
                }
            }
        }

        queue.push(...nextQueue); // 更新队列
        semesters++; // 增加学期
    }

    return totalCourses === n ? semesters : -1; // 判断是否能完成所有课程
}

// 示例用法
const relations = [
    [2, 1],
    [3, 1],
    [1, 4]
];
const n = 4; // 课程数量
const k = 2; // 每学期最多上 2 门课程
console.log(minNumberOfSemesters(n, relations, k)); // 输出所需学期数
