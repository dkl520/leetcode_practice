/**
 * @param {number[][]} edges
 * @return {number}
 */
var treeDiameter = function(edges) {
    if (edges.length === 0) return 0;
    if (edges.length === 1) return 1;

    // 构建邻接列表
    let n = edges.length + 1;
    let graph = Array.from({ length: n }, () => []);
    for (let [u, v] of edges) {
        graph[u].push(v);
        graph[v].push(u);
    }

    let diameter = 0;
    function dfs(node, parent) {
        let maxLength1 = 0, maxLength2 = 0;
        for (let neighbor of graph[node]) {
            if (neighbor !== parent) {
                let length = 1 + dfs(neighbor, node);
                if (length > maxLength1) {
                    maxLength2 = maxLength1;
                    maxLength1 = length;
                } else if (length > maxLength2) {
                    maxLength2 = length;
                }
            }
        }
        diameter = Math.max(diameter, maxLength1 + maxLength2);
        return maxLength1;
    }

    dfs(0, -1);
    return diameter;
};