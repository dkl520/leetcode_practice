/**
 * @param {number[][]} queries
 * @return {boolean[]}
 */

class Solution {
    getResults(queries) {
        const inf = Number.POSITIVE_INFINITY; // 定义正无穷大
        // 初始化队列，包含0和正无穷大，并将所有类型为1的查询按值排序后插入队列
        const queue = [0, ...queries.filter(q => q[0] === 1).map(q => q[1]).sort((a, b) => a - b), inf];

        const unionLen = queue.length - 1; // 联合数组的长度
        // 初始化联合数组，计算相邻元素的差值
        const union = Array.from({ length: unionLen }, (_, i) => queue[i + 1] - queue[i]);
        // 初始化链接数组，每个元素指向自己
        const link = Array.from({ length: unionLen }, (_, i) => i);
        // 初始化头部字典，记录每个值在队列中的索引
        const head = Object.fromEntries(queue.map((val, i) => [val, i]));

        // 查找根节点的函数
        const find = (root) => {
            if (link[root] === root) return root;
            link[root] = find(link[root]);
            return link[root];
        };

        const tree = [0]; // 初始化树数组
        let maxTmp = -1; // 临时最大值
        for (const num of union) {
            if (num > maxTmp) maxTmp = num;
            tree.push(maxTmp); // 更新树数组
        }

        const ans = []; // 初始化答案数组
        for (let i = queries.length - 1; i >= 0; i--) {
            const [type, x, sz] = queries[i];
            if (type === 1) {
                const rightKey = head[x]; // 获取右键
                const leftKey = find(rightKey - 1); // 获取左键
                link[rightKey] = leftKey; // 合并

                const right = union[rightKey]; // 获取右值
                const left = union[leftKey]; // 获取左值
                const newVal = left + right; // 新值为左右值之和
                union[leftKey] = newVal; // 更新联合数组

                let leftIdx = 0, rightIdx = unionLen;
                while (leftIdx < rightIdx) {
                    const mid = (leftIdx + rightIdx) >> 1;
                    if (queue[find(mid)] >= x) rightIdx = mid;
                    else leftIdx = mid + 1;
                }

                let index = rightIdx;
                while (index < unionLen && tree[index] < newVal) {
                    tree[index] = newVal; // 更新树数组
                    index += index & -index;
                }
            } else {
                let leftIdx = 0, rightIdx = unionLen;
                while (leftIdx < rightIdx) {
                    const mid = (leftIdx + rightIdx) >> 1;
                    if (queue[find(mid)] >= x) rightIdx = mid;
                    else leftIdx = mid + 1;
                }
                const index = find(rightIdx - 1);
                if (x - queue[index] >= sz) {
                    ans.push(true);
                    continue;
                }
                let length = 0;
                let idx = index;
                while (idx) {
                    length = Math.max(length, tree[idx]);
                    idx ^= idx & -idx;
                }
                ans.push(length >= sz);
            }
        }

        return ans.reverse(); // 返回答案数组
    }
}

let s = new Solution();
var getResults = s.getResults;



// Solution类中的getResults方法处理一系列查询并返回一个布尔值数组。该方法首先定义一个常数inf来表示正无穷。然后初始化一个队列，该队列包括0、所有按升序排序的type 1查询值和正无穷大。这个队列有助于有效地管理值的范围。

// 接下来，该方法计算联合数组的长度，该长度比队列的长度小1。初始化联合数组以存储队列中连续元素之间的差异。链接数组也被初始化，其中每个元素都指向自己，表示一个不相交集的数据结构。此外，还创建了一个头字典，将队列中的每个值映射到它的索引。

// 定义find函数来定位链接数组中给定元素的根，实现路径压缩以优化未来的查询。初始化树数组以存储到目前为止遇到的最大值，初始值为0。然后，该方法遍历联合数组，用最大值填充树数组。

// 该方法以相反的顺序处理查询。对于类型1查询，它通过更新链接和联合数组来合并间隔，并调整树数组以反映新的最大值。对于类型2查询，它通过检查树数组和联合数组来检查给定范围是否可以容纳指定的大小。

// 最后，该方法以相反的顺序返回结果数组，因为查询是以相反的顺序处理的。然后将getResults函数赋值给一个变量以供外部使用。