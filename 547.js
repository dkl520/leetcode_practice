// findCircleNum 函数接受一个二维数组 isConnected 作为参数，该数组表示城市之间的连接关系。  
// 函数返回 isConnected 中独立集合（或“圈”）的数量。  
var findCircleNum = function (isConnected) {
    // 获取城市的数量，即 isConnected 数组的长度。  
    const cities = isConnected.length;

    // 初始化一个 parent 数组，用于存储每个城市的“父”城市。  
    // 初始时，每个城市的父城市就是它自己。  
    const parent = new Array(cities).fill(0).map((element, index) => index);
    // 遍历所有的城市对 (i, j)，其中 i < j。  
    for (let i = 0; i < cities; i++) {
        for (let j = i + 1; j < cities; j++) {
            // 如果城市 i 和城市 j 之间有连接（isConnected[i][j] == 1），则将它们合并到同一个集合中。  
            if (isConnected[i][j] == 1) {
                union(parent, i, j);
            }
        }
    }
    // 初始化一个 provinces 变量，用于记录独立集合的数量。  
    let provinces = 0;

    // 遍历 parent 数组，统计独立集合的数量。  
    // 如果一个城市的父城市是它自己，那么它就是一个独立集合的代表。  
    parent.forEach((element, index) => {
        let root = find(parent, element);
        parent[index] = root;
    });
    debugger
    parent.forEach((element, index) => {
        if (element === index) {
            provinces++;
        }
    });



    // 返回独立集合的数量。  
    return provinces;
};

// union 函数用于合并两个集合。  
// 它接受 parent 数组和要合并的两个城市的索引 index1 和 index2 作为参数。  
const union = (parent, index1, index2) => {
    // 找到 index1 和 index2 的根节点（代表元素）。  
    // 如果它们的根节点相同，说明它们已经属于同一个集合，不需要合并。  
    // 否则，将 index1 的根节点设置为 index2 的根节点，实现合并。  
    parent[find(parent, index1)] = find(parent, index2);
}

// find 函数用于查找一个城市的根节点（代表元素）。  
// 它使用路径压缩技术来优化查找性能。  
// 如果一个城市的父城市不是它自己，则递归地继续查找其父城市的根节点，并将沿途的父城市直接连接到根节点上。  
const find = (parent, index) => {
    if (parent[index] !== index) {
        // 路径压缩：将当前城市的父城市直接连接到根节点上，避免重复查找。  
        parent[index] = find(parent, parent[index]);
    }
    // 返回根节点的索引。  
    return parent[index];
}

console.time("547. 省份数量")

let isConnected = [
    [1, 0, 0, 1],
    [0, 1, 1, 0],
    [0, 1, 1, 1],
    [1, 0, 1, 1]
];
console.log(findCircleNum(isConnected))

console.timeEnd("547. 省份数量")






