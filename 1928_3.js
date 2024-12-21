/**
 * @param {number} maxTime
 * @param {number[][]} edges
 * @param {number[]} passingFees
 * @return {number}
 */
class Point {
    constructor(numberPoint, free, distance) {
        this.numberPoint = numberPoint;
        this.free = free;
        this.distance = distance;
    }
}
var minCost = function(maxTime, edges, passingFees) {
    let n = passingFees.length;
    
    // 预处理边，确保双向性
    let graph = Array(n).fill().map(() => []);
    for (let [u, v, time] of edges) {
        graph[u].push([v, time]);
        graph[v].push([u, time]);
    }
    
    let distance = Array(n).fill().map(() => []);
    let queue = [new Point(0, passingFees[0], 0)];
    distance[0].push(queue[0]);
    
    while (queue.length > 0) {
        let current = queue.shift();
        
        // 对于当前节点的所有相邻节点
        for (let [nextNode, time] of graph[current.numberPoint]) {
            let newDistance = current.distance + time;
            let newFree = current.free + passingFees[nextNode];
            
            // 如果超过时间限制，跳过
            if (newDistance > maxTime) continue;
            
            let point = new Point(nextNode, newFree, newDistance);
            let toList = distance[nextNode];
            
            // 检查是否有更好的路径
            let hasBetterPath = toList.some(existingPoint => 
                existingPoint.free <= point.free && existingPoint.distance <= point.distance
            );
            
            if (!hasBetterPath) {
                // 移除所有劣于当前路径的点
                distance[nextNode] = toList.filter(existingPoint => 
                    !(existingPoint.free >= point.free && existingPoint.distance >= point.distance)
                );
                distance[nextNode].push(point);
                queue.push(point);
            }
        }
    }
    
    // 检查是否能到达终点
    if (distance[n-1].length === 0) return -1;
    
    // 返回到达终点的最小费用
    return Math.min(...distance[n-1].map(p => p.free));
};


let maxTime = 119, edges =[[9,18,2],[1,35,4],[24,26,34],[2,47,19],[15,31,33],[21,10,37],[35,33,20],[32,15,40],[13,5,33],[28,34,4],[31,11,31],[17,34,20],[49,48,33],[37,35,34],[21,26,2],[42,11,22],[15,49,1],[4,36,26],[32,31,39],[37,23,4],[32,34,39],[2,46,13],[34,19,9],[11,14,20],[34,12,50],[43,8,38],[24,8,19],[3,28,42],[38,8,44],[10,34,11],[37,1,33],[28,31,11],[4,42,42],[23,13,4],[12,27,29],[33,6,17],[32,27,16],[26,29,24],[26,14,39],[36,42,36],[17,22,50],[9,6,45],[48,24,27],[45,9,23],[49,42,47],[3,27,47],[38,46,45],[4,2,11],[33,23,38],[14,38,48],[46,20,29],[30,13,25],[5,30,22],[6,32,9],[37,15,48],[27,0,23],[37,44,43],[21,11,39],[36,25,8],[31,30,1],[27,39,14],[11,0,25],[31,1,7],[9,29,7],[15,44,32],[44,39,42],[22,1,42],[3,6,39],[41,32,48],[28,10,38],[19,47,46],[16,14,13],[29,8,37],[48,12,11],[37,41,19],[6,21,22],[25,34,8],[30,29,42],[30,35,3],[7,3,13],[48,22,13],[49,34,41],[7,0,39],[48,42,45],[44,42,46],[2,39,12],[19,10,34],[28,21,48],[42,39,28],[13,12,11],[1,36,12],[6,43,21],[13,6,48],[2,46,41],[10,15,35],[46,9,5],[35,45,21],[37,27,6],[23,20,26],[36,31,18],[2,40,24],[42,40,37],[13,29,42],[41,7,16],[48,40,15],[20,23,14],[46,15,14],[38,32,13],[23,9,17],[24,30,2],[21,32,32],[39,3,37],[35,6,42],[5,28,13],[38,11,13],[31,7,33],[11,20,10],[34,27,29],[6,3,21],[2,17,40],[41,22,48],[14,28,21],[42,38,2],[3,47,47],[36,33,1],[20,31,45],[34,22,11],[5,39,16],[39,32,20],[35,13,31],[4,8,50],[29,22,15],[29,2,29],[11,47,40],[39,48,4],[33,21,38],[25,0,35],[15,19,21],[44,11,49],[28,23,48],[10,38,9],[49,34,36],[1,39,1],[22,6,13],[40,27,27],[34,26,16],[9,10,15],[11,12,15],[33,29,13],[20,25,45],[41,22,39],[24,42,33],[12,3,24],[9,37,10],[10,32,14],[5,26,10],[20,49,31],[33,37,3],[25,0,25],[17,11,50],[22,33,48],[14,11,20],[26,47,11],[13,32,33],[12,27,5],[20,32,27],[28,15,45],[37,27,40],[1,29,26],[30,44,16],[20,34,41],[41,17,47],[32,24,34],[41,42,35],[9,15,16],[30,34,3],[15,27,11],[34,4,36],[8,9,1],[12,31,18],[38,42,27],[22,28,7],[18,22,50],[41,40,32],[24,26,7],[41,4,13],[7,44,42],[25,49,30],[8,28,26],[25,7,46],[11,3,24],[32,40,6],[24,0,3],[20,26,8],[41,24,23],[44,0,47],[6,17,47],[4,6,50],[25,34,14],[46,35,48],[43,33,20],[46,19,48],[40,15,17],[6,4,44],[38,23,3],[6,8,15],[17,13,15],[2,0,31],[45,31,26],[5,1,25],[46,17,30],[5,46,24],[42,15,44],[16,14,12],[23,48,36],[30,23,2],[11,48,22],[27,8,22],[30,32,2],[46,23,1],[26,43,36],[5,39,32],[23,27,36],[44,18,27],[9,43,21],[25,34,28],[4,38,50],[23,21,42],[38,39,41],[35,45,28],[8,1,23],[6,27,4],[30,44,21],[37,4,32],[44,36,29],[23,32,23],[47,3,33],[34,39,15],[37,32,31],[9,22,9],[2,23,37],[10,31,24],[11,8,1],[33,15,7],[40,11,26],[33,8,46],[1,41,5],[45,13,4],[15,40,41],[7,4,14],[28,9,15],[23,49,4],[15,22,42],[13,39,10],[4,19,37],[34,21,22],[2,33,13],[1,18,40],[17,46,27],[44,15,41],[3,20,11],[13,0,44],[15,44,50],[20,24,14],[49,39,15],[27,45,16],[5,8,19],[2,39,16],[37,20,28],[49,28,39],[39,12,15],[23,41,23],[1,19,30],[25,41,39],[25,17,23],[46,9,4],[37,11,21],[21,9,17],[30,10,18],[35,2,46],[10,19,37],[17,32,12],[26,4,34],[8,35,46],[10,42,43],[23,21,17],[29,47,31],[29,4,13],[18,36,40],[27,15,32],[20,14,4],[23,22,45],[37,5,1],[12,20,23],[37,32,8],[22,20,26],[12,48,37],[14,42,12],[14,8,7],[0,14,49],[37,39,45],[15,46,3],[17,13,18],[30,34,39],[23,8,20],[12,17,19],[29,21,40],[48,11,39],[37,7,3],[34,7,35],[20,9,39],[6,3,26],[11,29,50],[21,3,30],[33,24,31],[2,1,21],[22,3,38],[34,21,16],[7,42,42],[27,16,49],[23,12,15],[16,22,25],[27,23,15],[48,7,33],[14,18,45],[45,4,50],[7,36,42],[16,19,1],[16,35,3],[48,25,36],[10,8,29],[37,13,19],[36,41,20],[8,40,7],[35,32,15],[30,4,49],[7,27,41],[35,1,30],[38,48,3],[37,33,9],[48,5,41],[44,30,22],[9,7,29],[21,3,31],[0,45,8],[0,9,9],[48,49,5],[17,39,31],[29,18,1],[22,44,37],[18,9,10],[17,39,5],[13,25,47],[12,38,16],[38,25,31],[27,24,46],[35,20,18],[0,24,36],[42,8,12],[19,12,39],[45,43,20],[47,2,28],[22,29,49],[11,30,29],[36,25,16],[43,24,6],[32,40,43],[34,4,16],[14,18,46],[20,21,19],[41,30,43],[38,34,17],[10,17,27],[21,48,24],[21,4,42],[35,37,30],[8,45,1],[43,20,39],[10,11,25],[35,46,42],[27,35,20],[4,2,34],[43,44,14],[16,15,14],[9,24,28],[29,8,45],[40,0,1],[10,21,9],[4,9,43],[3,7,28],[48,11,14],[3,24,6],[28,11,36],[1,41,45],[45,1,5],[32,9,21],[15,7,2],[3,49,21],[13,12,5],[36,14,40],[11,39,29],[45,37,22],[41,5,9],[49,11,15],[46,22,15],[1,23,9],[10,40,19],[33,1,37],[31,45,29],[39,47,31],[28,2,22],[43,9,44],[30,3,48],[29,32,36],[5,39,17],[26,4,17],[18,3,5],[24,20,49],[33,8,3],[20,1,12],[46,9,11],[2,37,33],[27,0,20],[30,3,36],[5,4,46],[3,1,24],[22,23,24],[35,10,45],[45,8,18],[38,16,44],[48,9,9],[34,0,11],[46,23,23],[28,21,33],[9,8,11],[47,29,18],[38,22,17],[46,37,21],[7,5,48],[16,39,4],[49,46,40],[27,9,36],[17,33,13],[47,22,5],[5,46,7],[20,16,9],[27,23,36],[9,4,43],[47,36,42],[6,28,46],[31,4,33],[34,43,46],[18,11,7],[29,25,46],[36,33,46],[42,15,5],[49,13,2],[20,38,8],[37,31,3],[32,44,2],[31,11,29],[9,18,31],[1,15,43],[28,36,7],[40,5,35],[13,24,43],[37,12,38],[12,44,33],[34,9,15],[16,19,32],[42,4,36],[37,3,14],[19,1,5],[31,2,11],[4,49,28],[23,31,42],[17,9,28],[32,19,14],[29,9,24],[15,21,22],[36,8,36],[9,31,8],[37,16,47],[32,30,37],[26,0,19],[20,21,20],[47,21,44],[43,47,37],[5,28,42],[7,37,9],[40,45,48],[24,27,4],[1,13,21],[36,48,26],[3,11,34],[25,29,8],[23,48,29],[37,35,18],[37,6,26],[25,22,48],[23,32,18],[33,10,37],[25,24,27],[17,36,30],[25,40,3],[23,16,20],[0,2,28],[19,24,1],[14,4,40],[17,31,7],[38,21,15],[45,14,7],[32,28,14],[12,5,41],[33,19,15],[19,5,29],[29,41,41],[43,2,13],[37,6,40],[7,11,25],[19,41,38],[43,39,20],[8,2,18],[34,30,37],[24,42,31],[42,39,25],[40,33,28],[3,22,8],[11,32,23],[7,2,8],[45,25,25],[28,12,12],[21,11,37],[28,32,27],[0,21,8],[36,0,13],[25,3,38],[13,18,15],[45,18,7],[47,45,29],[15,35,45],[17,26,9],[34,4,16],[41,12,39],[28,31,25],[41,7,23],[13,25,4],[43,9,2],[49,11,35],[1,0,44],[30,2,34],[28,34,29],[36,17,12],[3,0,3],[16,13,39],[21,48,46],[14,34,45],[9,13,24],[46,16,49],[25,29,40],[7,34,47],[20,14,21],[4,43,12],[19,37,48],[35,40,22],[44,19,3],[20,34,24],[5,33,12],[35,22,9],[7,37,2],[7,27,10],[20,10,18],[42,26,26],[15,5,48],[44,40,10],[45,39,34],[3,1,48],[39,3,40],[25,44,25],[39,12,35],[2,33,47],[13,28,19],[43,21,29],[26,12,45],[32,30,39],[6,24,4],[48,2,32],[26,29,22],[4,37,35],[12,42,47],[10,9,1],[0,16,49],[5,32,20],[40,14,16],[3,23,32],[23,19,19],[23,42,38],[41,47,17],[35,7,50],[20,31,44],[36,42,20],[45,5,22],[30,46,37],[28,14,18],[13,27,16],[24,42,50],[13,45,30],[42,23,27],[23,6,7],[38,20,37],[6,34,25],[30,1,28],[16,33,28],[26,17,50],[25,28,10],[29,18,38],[7,25,22],[20,42,48],[36,2,46],[34,47,4],[10,3,40],[5,19,32],[32,10,9],[32,6,11],[32,6,9],[5,25,33],[36,44,13],[44,33,18],[35,42,18],[17,2,41],[42,18,49],[41,46,37],[23,26,26],[30,19,5],[22,6,26],[32,42,26],[49,21,38],[12,10,9],[18,11,27],[30,40,2],[31,34,19],[31,36,19]],
 passingFees =[73,745,752,321,138,703,619,28,645,724,388,653,58,298,354,790,674,885,954,928,18,712,636,450,325,599,11,781,546,324,942,905,747,806,402,712,968,778,750,53,598,833,700,458,875,703,707,667,100,434];

console.log(minCost(maxTime, edges, passingFees))