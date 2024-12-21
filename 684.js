/**
 * @param {number[][]} edges
 * @return {number[]}
 */
var findRedundantConnection = function (edges) {

    let point = [...new Set(edges.flat(Infinity))].sort((a, b) => a - b);
    let root = new Array();
    for (let i = 0; i < point.length; i++) {
        const element = point[i];
        root[element] = element;
    }

    for (let i = 0; i < edges.length; i++) {
        const [start, end] = edges[i];
        let start1 = find(start, root);
        let end1 = find(end, root);
        if (start1 !== end1) {
            root[start1] = end;
        } else {
           



            return edges[i];
        }
    }
    debugger
};

function find(num, root) {
    if (root[num] == num) {
        return root[num];
    }
    return find(root[num], root);
}




console.time("684. 冗余连接");

let edges =[[2,1],[3,1],[4,2],[1,4]];

console.log(findRedundantConnection(edges));

console.timeEnd("684. 冗余连接");