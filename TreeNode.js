// class TreeNode {
//     constructor(val) {
//         this.val = val;
//         this.left = null;
//         this.right = null;

//     }

// }


class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = this.right = null;
    }

    static buildTreeFromArray(arr) {
        if (arr.length === 0) return null;

        let root = new TreeNode(arr[0]);
        let queue = [];
        queue.push(root);

        for (let i = 1; i < arr.length; i += 2) {
            let current = queue.shift();

            if (arr[i] !== null) { // Assuming null is used to represent null
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
export default TreeNode;