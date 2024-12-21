// 定义二叉搜索树节点类
class Node {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

function BuildBinaryTreeAccordingArray(array) {
    const element = array.shift();
    let root = new Node(element);

    let nodeArr = [root];

    while (array.length > 0) {
        let node = nodeArr.shift();
        let el1 = array.shift();
        node.left = new Node(el1);
        nodeArr.push(node.left)
        if (array.length == 0) {
            break;
        }
        let el2 = array.shift();

        node.right = new Node(el2);
        nodeArr.push(node.right)
    }
    return root;
}

export default BuildBinaryTreeAccordingArray;