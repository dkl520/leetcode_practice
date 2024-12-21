/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number[]}
 */
var findMinHeightTrees = function (n, edges) {
    if (n === 1) return [0]; // 特殊情况：只有一个节点

    // 构建邻接表
    const graph = Array.from({ length: n }, () => []);
    for (let [start, end] of edges) {
        graph[start].push(end);
        graph[end].push(start);
    }

    let minHeight = Number.MAX_VALUE;
    let result = [];

    // 遍历每个节点，计算以它为根的树的高度
    for (let i = 0; i < n; i++) {
        const visited = new Array(n).fill(false);
        const height = dfs(graph, visited, i);
        if (height < minHeight) {
            result = [i];
            minHeight = height;
        } else if (height === minHeight) {
            result.push(i);
        }
    }

    return result;
};

// 深度优先搜索计算树的高度
function dfs(graph, visited, node) {
    visited[node] = true;
    let maxDepth = 0;

    for (let neighbor of graph[node]) {
        if (!visited[neighbor]) {
            maxDepth = Math.max(maxDepth, dfs(graph, visited, neighbor));
        }
    }

    return maxDepth + 1; // 返回当前节点为根的子树高度
}
