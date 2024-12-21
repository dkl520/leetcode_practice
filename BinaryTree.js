class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = this.right = null;
    }
   static  buildTreeFromArray(arr) {
        if (!arr.length) return null;
    
        const root = new TreeNode(arr[0]);
        const queue = [root];
        for (let i = 1; i < arr.length; i += 2) {
            const current = queue.shift();
    
            if (arr[i] !== null) {
                current.left = new TreeNode(arr[i]);
                queue.push(current.left);
            }
    
            if (i + 1 < arr.length && arr[i + 1] !== null) {
                current.right = new TreeNode(arr[i + 1]);
                queue.push(current.right);
            }
        }
    
        return root;
    }
}

function buildTreeFromArray(arr) {
    if (!arr.length) return null;

    const root = new TreeNode(arr[0]);
    const queue = [root];

    for (let i = 1; i < arr.length; i += 2) {
        const current = queue.shift();

        if (arr[i] !== null) {
            current.left = new TreeNode(arr[i]);
            queue.push(current.left);
        }

        if (i + 1 < arr.length && arr[i + 1] !== null) {
            current.right = new TreeNode(arr[i + 1]);
            queue.push(current.right);
        }
    }

    return root;
}

// 示例使用
// const array = [3, 5, 1, 6, 2, 0, 8, null, null, 7, 4];
// const root = buildTreeFromArray(array);

// console.log(root);


export default TreeNode;