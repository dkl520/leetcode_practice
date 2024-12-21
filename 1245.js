/**
 * @param {number[][]} edges
 * @return {number}
 */
var treeDiameter = function (edges) {


    function dfs(start, visited, graph) {

        visited[start] = true;
        let neighborListLen = [];
        for (let neighbor of graph[start]) {
            if (!visited[neighbor]) {
                let curLine = dfs(neighbor, visited, graph);
                neighborListLen.push(curLine)
            }
        }
        neighborListLen.sort((a, b) => a - b);
        let maxfirst;
        if (neighborListLen.length == 1) {
            maxfirst = neighborListLen.pop();
            max = Math.max(maxfirst, max);
        } else if (neighborListLen.length >= 2) {
            maxfirst = neighborListLen.pop();
            let maxSecond = neighborListLen.pop();
            max = Math.max(maxfirst + maxSecond, max);
        }

        if (!maxfirst) {
            return 1;
        }
        return maxfirst + 1;
    }

    if (edges.length == 0) return 0;
    if (edges.length == 1) return 1;


    let lines = Array.from({ length: edges.length + 1 }, () => []);

    for (let edge of edges) {
        lines[edge[0]].push(edge[1]);
        lines[edge[1]].push(edge[0]);
    }

    let max = 1;

    dfs(0,  , lines);

    return max;



};


let edges =
    [[0, 1], [1, 2], [2, 3], [1, 4], [4, 5]]


treeDiameter(edges)
