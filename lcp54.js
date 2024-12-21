// 定义FindVDcc类  
class FindVDcc {
    // 构造函数，接受顶点数量v和边的列表edges作为参数  
    constructor(v, edges) {
        // 初始化深度优先搜索的标记数组，初始值都为0  
        this.dfn = new Array(v).fill(0);
        // 初始化low数组，用于记录每个顶点能够追溯到的最小深度优先搜索序号  
        this.low = new Array(v).fill(0);
        // 初始化cut数组，用于标记是否为割点（在Tarjan算法中，对于无向图，cut数组实际上并不用于记录割点，但对于有向图，这是必须的）  
        this.cut = new Array(v).fill(false);
        // 存储图的边信息  
        this.edges = edges;
        // 初始化栈，用于存放深度优先搜索的遍历顺序  
        this.stack = new Array(v).fill(0);
        // 栈顶指针，初始值为0  
        this.top = 0;
        // 存储强连通分量的数组  
        this.dcc = [];

        // 初始化总的深度优先搜索序号  
        this.total = 0;
        // 遍历所有顶点，如果某个顶点还未被访问过，则从这个顶点开始进行深度优先搜索  
        for (let i = 0; i < v; i++) {
            if (this.dfn[i] === 0) {
                this.tarjan(i, i);
            }
        }
    }

    // Tarjan算法的实现  
    tarjan(root, sn) {
        // 初始化当前顶点的深度优先搜索序号和low值  
        this.dfn[sn] = this.low[sn] = ++this.total;
        // 将当前顶点压入栈中  
        this.stack[this.top++] = sn;
        let flag = 0; // 用于标记是否找到了一个新的强连通分量  
        // 遍历当前顶点的所有邻接顶点
         debugger
        //  sn 为当前点 fn 为邻点。
        for (const fn of this.edges[sn]) {
            // 如果邻接顶点还未被访问过  
            if (this.dfn[fn] === 0) {
                debugger
                // 递归访问邻接顶点  
                this.tarjan(root, fn);
                debugger
                // 更新当前顶点的low值  
                this.low[sn] = Math.min(this.low[sn], this.low[fn]);

                // 如果邻接顶点的low值不小于当前顶点的深度优先搜索序号，说明找到了一个新的强连通分量  
                if (this.low[fn] >= this.dfn[sn]) {
                    flag++;
                    // 如果当前顶点不是根顶点，或者已经找到了多个新的强连通分量，则将当前顶点标记为割点  
                    if (sn !== root || flag > 1) {
                        this.cut[sn] = true;
                    }

                    let t; // 用于临时存储从栈中弹出的顶点  
                    const newDcc = []; // 存储当前找到的强连通分量的顶点  
                    this.dcc.push(newDcc); // 将新找到的强连通分量添加到dcc数组中  

                    // 将栈中从当前顶点到邻接顶点的所有顶点弹出，并添加到新的强连通分量中  
                    do {
                        t = this.stack[--this.top];
                        newDcc.push(t);
                    } while (t !== fn);

                    // 将当前顶点也添加到新的强连通分量中  
                    newDcc.push(sn);
                }
            } else {
                debugger
                // 如果邻接顶点已经被访问过，则更新当前顶点的low值  
                this.low[sn] = Math.min(this.low[sn], this.dfn[fn]);
            }
        }
    }
}

class Solution {
    // minimumCost方法接受两个参数：cost（房屋的成本数组）和roads（道路连接数组）  
    minimumCost(cost, roads) {
        const n = cost.length; // 获取房屋的数量  

        // 如果只有一个房屋，直接返回该房屋的成本  
        if (n === 1) {
            return cost[0];
        }

        // 初始化边的数组，每个房屋都有一组与之相连的房屋  
        const edges = new Array(n).fill(null).map(() => []);
        // 遍历每条道路，将其添加到对应的房屋的连接数组中  
        for (const road of roads) {
            const [x, y] = road; // 分解道路连接为两个房屋编号  
            edges[x].push(y); // 将y添加到x的房屋连接数组中  
            edges[y].push(x); // 将x添加到y的房屋连接数组中（因为道路是双向的）  
        }
        // 使用FindVDcc类来找出无向图中的强连通分量  
        const dccFinder = new FindVDcc(n, edges);
        // 如果只有一个强连通分量，则选择成本最低的房屋作为中心，返回其他房屋的成本之和  
        if (dccFinder.dcc.length === 1) {
            return Math.min(...cost); // 返回所有房屋中的最小成本  
        }

        // 初始化一个数组，用于存储每个强连通分量中作为中心房屋的成本  
        const vec = [];
        // 遍历每个强连通分量  
        for (const c of dccFinder.dcc) {
            let cnt = 0; // 计数器，用于记录每个强连通分量中的割点数量  
            let mn = 2e9; // 初始化一个很大的数，用于存储非割点房屋中的最小成本  

            // 遍历强连通分量中的每个房屋  
            for (const x of c) {
                if (dccFinder.cut[x]) {
                    cnt++; // 如果房屋是割点，增加计数器  
                } else {
                    mn = Math.min(mn, cost[x]); // 如果房屋不是割点，更新最小成本  
                }
            }
            debugger
            // 如果强连通分量中只有一个割点，则将该割点房屋的成本添加到vec数组中  
            if (cnt === 1) {
                vec.push(mn);
            }
        }

        // 对vec数组进行排序，以便之后选择最小的成本作为中心房屋  
        vec.sort((a, b) => a - b);

        let ans = 0; // 初始化答案变量  
        // 遍历vec数组，除了最后一个元素（因为最后一个元素将是最后一个选择的中心房屋），其余元素都加到答案中  
        for (let i = 0; i + 1 < vec.length; i++) {
            ans += vec[i];
        }

        // 返回最终答案，即除了最后一个中心房屋外，所有选择的中心房屋的成本之和  
        return ans;
    }
}
// 示例输入
const solution = new Solution();

let minimumCost = solution.minimumCost;


// 这个Solution类中的minimumCost方法旨在解决一个特定的问题：给定一组房屋的成本和它们之间的道路连接，
// ，要么通过一条道路连接到一个选择的房屋。这里的“选择的房屋”是指被选中作为中心，并且其成本将不会计入总成本的房屋。


// 这个算法的基本思路是：

// 首先检查是否只有一个房屋，如果是，则直接返回该房屋的成本。
// 然后，根据提供的道路信息，构建一个表示房屋之间连接关系的图。
// 使用Tarjan算法找出图中的所有强连通分量。
// 如果只有一个强连通分量，则选择成本最低的房屋作为中心，返回其他房屋的成本之和。
// 如果有多个强连通分量，则对于每个强连通分量，选择其中一个割点作为中心房屋（确保每个强连通分量只有一个中心），
// 并计算该中心房屋的成本。最后，对所有选择的中心房屋的成本进行排序，并选择除了最后一个中心房屋外的所有成本之和作为最终答案。
// 这是因为最后一个中心房屋将不需要额外的成本，因为它将包含所有剩余的房屋。

let cost = [1, 2, 3, 4, 5, 6], roads = [[0, 1], [0, 2], [1, 3], [2, 3], [1, 2], [2, 4], [2, 5]];

console.time("LCP 54. 夺回据点")

console.log(minimumCost(cost, roads));

console.timeEnd("LCP 54. 夺回据点")