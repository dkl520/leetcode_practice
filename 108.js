/**  
 * Definition for a binary tree node.  
 * function TreeNode(val, left, right) {  
 *     this.val = (val===undefined ? 0 : val)  
 *     this.left = (left===undefined ? null : left)  
 *     this.right = (right===undefined ? null : right)  
 * }  
 */
// 定义了一个二叉树节点，每个节点有一个值（val），以及左右子节点的引用（left 和 right）。如果 val 是 undefined，那么 val 的值会被设为 0；如果 left 或 right 是 undefined，那么它们会被设为 null。  

/**  
 * @param {number[]} nums  
 * @return {TreeNode}  
 */
// 定义了一个函数 sortedArrayToBST，它接受一个有序数组 nums 作为参数，返回一个 TreeNode 类型的对象，即一个二叉搜索树的根节点。  

var sortedArrayToBST = function (nums) {
    // 使用 binarysearch 函数对 nums 进行中序遍历，得到一个由中间元素构成的数组 resultArr。  
    let resultArr = binarysearch(nums).flat(Infinity);
    // 从 resultArr 中取出一个元素作为根节点的值，并新建一个 TreeNode 节点。  
    let val = resultArr.shift();
    let root = new TreeNode(val);
    // 当 resultArr 中还有元素时，进行循环：从 resultArr 中取出一个元素作为子节点的值，然后在根节点下新建一个子节点。  
    while (resultArr.length > 0) {
        let val = resultArr.shift();
        constructBinaryTree(val, root);
    }
    // 返回根节点。  
    return root;
};

function constructBinaryTree(val, root) {
    // 如果当前节点的值大于要插入的值，并且当前节点的左子节点为空，那么就在左子节点位置新建一个节点。  
    if (root.val > val && root.left === null) {
        root.left = new TreeNode(val);
        return;
    }
    // 如果当前节点的值小于要插入的值，并且当前节点的右子节点为空，那么就在右子节点位置新建一个节点。  
    if (root.val < val && root.right === null) {
        root.right = new TreeNode(val);
        return;
    }
    // 如果当前节点的值大于要插入的值，并且当前节点的左子节点不为空，那么就在左子树中递归查找合适的位置来新建节点。  
    if (root.val > val && root.left !== null) {
        constructBinaryTree(val, root.left);
        return;
    }
    // 如果当前节点的值小于要插入的值，并且当前节点的右子节点不为空，那么就在右子树中递归查找合适的位置来新建节点。  
    if (root.val < val && root.right !== null) {
        constructBinaryTree(val, root.right);
    }
}

function binarysearch(nums) {
    // 使用队列实现二分搜索的迭代形式，对 nums 进行中序遍历。每次迭代中，找到 nums 的中间元素，将其放入结果数组 resultArr 中，然后分别对左半部分和右半部分的数组进行递归处理。  
    let queue = new Array();
    queue.push(nums);  // 将 nums 放入队列中  
    let resultArr = new Array();  // 定义结果数组  
    while (queue.length > 0) {  // 当队列不为空时，进行循环处理  
        let nums = queue.shift();  // 取出队列中的元素（也是一个数组）作为当前处理的数组  
        let mid = Math.floor(nums.length / 2);  // 找到当前数组的中间位置  
        resultArr.push(nums.slice(mid, mid + 1));  // 将中间元素放入结果数组中（因为只取一个中间元素，所以用 slice 方法取出一个元素）  
        let leftArr = nums.slice(0, mid);  // 找到当前数组的左半部分  
        let rightArr = nums.slice(mid + 1, nums.length);  // 找到当前数组的右半部分（注意：因为只取一个中间元素，所以从 mid + 1 到数组末尾的部分是右半部分）  
        if (leftArr.length != 0) {
            queue.push(leftArr); // 如果左半部分不为空，将其放入队列中
        }

        if (rightArr.length != 0) {
            queue.push(rightArr); // 如果右半部分不为空，将其放入队列中
        }
    }
    // 返回结果数组
    return resultArr;
}
let nums = [-10, -3, 0, 5, 9];
// 定义一个有序数组 nums

console.time("108. 将有序数组转换为二叉搜索树")
// 开始计时，用于评估算法的执行时间

sortedArrayToBST(nums)
// 调用 sortedArrayToBST 函数，将 nums 转换为二叉搜索树

console.timeEnd("108. 将有序数组转换为二叉搜索树")
// 结束计时，显示算法的执行时间，以评估性能