/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function (numCourses, prerequisites) {
    let graph = new Map();

    for (let i = 0; i < prerequisites.length; i++) {
        const list = prerequisites[i];
        if (graph.has(list[1])) {
            let arr = graph.get(list[1]);
            arr.push(list[0])
        } else {
            graph.set(list[1], [list[0]])
        }
    }
     return !hasCycle(graph);

};


function hasCycle(graph) {
    const indegree = new Map();
    const queue = [];

    // 计算入度
    for (const [node, neighbors] of graph) {
        indegree.set(node, indegree.get(node) || 0);
        for (const neighbor of neighbors) {
            indegree.set(neighbor, (indegree.get(neighbor) || 0) + 1);
        }
    }

    // 将入度为0的节点加入队列
    for (const [node, inDegree] of indegree) {
        if (inDegree === 0) {
            queue.push(node);
        }
    }

    while (queue.length > 0) {
        const node = queue.shift();

        for (const neighbor of graph.get(node) || []) {
            indegree.set(neighbor, indegree.get(neighbor) - 1);

            if (indegree.get(neighbor) === 0) {
                queue.push(neighbor);
            }
        }
    }

    // 检查是否有入度不为0的节点
    for (const [node, inDegree] of indegree) {
        if (inDegree > 0) {
            return true;
        }
    }

    return false;
}


console.time("207. 课程表");
let numCourses = 3, prerequisites = [[1, 0], [2, 1], [1, 2]];
console.log(canFinish(numCourses, prerequisites))

console.timeEnd("207. 课程表")