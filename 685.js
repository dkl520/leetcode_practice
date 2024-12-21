/**
 * @param {number[][]} edges
 * @return {number[]}
 */
var findRedundantDirectedConnection = function (edges) {

    let point = [...new Set(edges.flat(Infinity))].sort((a, b) => a - b);
    if (hasSameEnd(edges)) {
        let indexArr = new Array();
        edges.sort((a, b) => a[1] - b[1]);
        for (let i = 0; i < edges.length - 1; i++) {
            const el1 = edges[i];
            const el2 = edges[i + 1];
            if (el1[1] == el2[1]) {
                indexArr.push(el1[1]);
            }
        }
        let nextObj = edges.reduce((acc, v, i, arr) => {
            if (indexArr.indexOf(v[1]) >= 0) {
                acc[i] = v;
            }
            return acc;
        }, {});
        Object.keys(nextObj).forEach((v) => edges[v] = null);
        edges = [...edges, ...Object.values(nextObj)].filter((v) => v !== null);
    }


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
            root[end1] = start1;
        } else {
            return edges[i];
        }
    }
};



function find(num, root) {
    if (root[num] == num) {
        return root[num];
    }
    return find(root[num], root);
}



function hasSameEnd(arr) {
    return arr.some(([s1, e1], i, arr) => {
        return arr.slice(i + 1).some(([s2, e2]) => e1 === e2);
    });
}

console.time("685. 冗余连接 II");

let edges = [[1, 2], [2, 3], [3, 4], [4, 1], [1, 5]];

console.log(findRedundantDirectedConnection(edges));


console.timeEnd("685. 冗余连接 II")