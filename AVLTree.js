// 二叉平衡树  
class AVLTree {
    constructor() {
        this.root = null; // 根节点  
    }

    // 获取节点的高度  
    getHeight(node) {
        if (node === null) {
            return 0;  // 如果节点为空，返回高度为0  
        }
        return node.height;  // 否则，返回节点的高度  
    }

    // 获取节点的平衡因子  
    getBalanceFactor(node) {
        if (node === null) {
            return 0;  // 如果节点为空，返回平衡因子为0  
        }
        return this.getHeight(node.left) - this.getHeight(node.right);  // 否则，计算并返回节点的平衡因子  
    }

    // 更新节点的高度  
    updateHeight(node) {
        if (node === null) {
            return;  // 如果节点为空，直接返回  
        }
        debugger
        node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;  // 否则，更新节点的高度为左右子树最大高度+1  
    }
    // 查找节点
    search(value) {
        return this.searchNode(this.root, value);
    }

    searchNode(node, value) {
        if (node === null) {
            return false;
        }

        if (value === node.value) {
            return true;
        } else if (value < node.value) {
            return this.searchNode(node.left, value);
        } else {
            return this.searchNode(node.right, value);
        }
    }
    // 左旋操作  
    rotateLeft(node) {
        const newRoot = node.right;  // 右子树作为新根节点  
        node.right = newRoot.left;  // 右子树的左子树成为原节点的右子树  
        newRoot.left = node;  // 原节点成为新根节点的左子树  
        debugger
        this.updateHeight(node);  // 更新原节点的高度  
        this.updateHeight(newRoot);  // 更新新根节点的高度  
        return newRoot;  // 返回新的根节点  
    }

    // 右旋操作  
    rotateRight(node) {
        const newRoot = node.left;  // 左子树作为新根节点  
        node.left = newRoot.right;  // 左子树的右子树成为原节点的左子树  
        newRoot.right = node;  // 原节点成为新根节点的右子树  
        this.updateHeight(node);  // 更新原节点的高度  
        this.updateHeight(newRoot);  // 更新新根节点的高度  
        return newRoot;  // 返回新的根节点  
    }



    delete(value) {


        this.root = deleteNode(this.root, value);
    }
    deleteNode(node, value) {

        // 如果需要插入的值小于当前节点的值，那么将这个值插入到左子树中。通过递归调用insertNode函数实现。  
        if (value < node.value) {
            node.left = this.deleteNode(node.left, value);
        }

        // 否则，将这个值插入到右子树中。同样是通过递归调用insertNode函数实现。  
        else {
            node.right = this.deleteNode(node.right, value);
        }
        if (value == node.value) {

        }

        // 在插入新节点后，更新当前节点的高度。节点的高度等于其左子树和右子树中较大的高度加1。  
        this.updateHeight(node);
        // 然后，返回平衡后的根节点。根据当前节点的平衡因子来判断是否需要进行旋转操作以保持树的平衡。如果平衡因子大于1，表示左子树过重，需要进行右旋操作；如果平衡因子小于-1，表示右子树过重，需要进行左旋操作；否则，当前节点已经处于平衡状态，直接返回即可。  
        return this.balance(node);

    }
    // 插入一个整数值到树中  
    insert(value) {
        this.root = this.insertNode(this.root, value);  // 使用insertNode方法插入新的整数值到树中，并更新根节点  

    }
    // 在树中插入一个新的值，并返回新的根节点
    // 定义一个名为insertNode的函数，它接受两个参数：当前节点和需要插入的值。函数的主要目的是在树中插入新的值，并返回新的根节点。  
    insertNode(node, value) {
        // 如果当前节点为空（即树为空），那么创建一个新的节点并返回。新节点的值为传入的值。  
        if (node === null) {
            return new Node(value);
        }
        if (node.left == value) {
            node.left = null;
        }
        // // 如果需要插入的值小于当前节点的值，那么将这个值插入到左子树中。通过递归调用insertNode函数实现。  
        // if (value < node.value) {
        //     node.left = this.insertNode(node.left, value);
        // }
        // // 否则，将这个值插入到右子树中。同样是通过递归调用insertNode函数实现。  
        // else {
        //     node.right = this.insertNode(node.right, value);
        // }
        // 在插入新节点后，更新当前节点的高度。节点的高度等于其左子树和右子树中较大的高度加1。  
        this.updateHeight(node);
        // 然后，返回平衡后的根节点。根据当前节点的平衡因子来判断是否需要进行旋转操作以保持树的平衡。如果平衡因子大于1，表示左子树过重，需要进行右旋操作；如果平衡因子小于-1，表示右子树过重，需要进行左旋操作；否则，当前节点已经处于平衡状态，直接返回即可。  
        return this.balance(node);
    }

    // 平衡树  
    balance(node) {
        // 获取当前节点的平衡因子，平衡因子是左子树高度与右子树高度的差值的绝对值  
        const balanceFactor = this.getBalanceFactor(node);

        // 如果平衡因子大于1，说明左子树高度小于右子树高度，需要进行右旋操作来平衡树  
        if (balanceFactor > 1) {
            // 首先检查左子树是否也是不平衡的（即左子树的平衡因子小于0）  
            if (this.getBalanceFactor(node.left) < 0) {
                // 如果左子树也是不平衡的，先对左子树进行左旋操作，使其平衡  
                node.left = this.rotateLeft(node.left);
            }
            // 然后对当前节点进行右旋操作，使其平衡，并返回新的根节点  
            return this.rotateRight(node);
        }

        // 如果平衡因子小于-1，说明右子树高度小于左子树高度，需要进行左旋操作来平衡树  
        if (balanceFactor < -1) {
            // 首先检查右子树是否也是不平衡的（即右子树的平衡因子大于0）  
            if (this.getBalanceFactor(node.right) > 0) {
                // 如果右子树也是不平衡的，先对右子树进行右旋操作，使其平衡  
                node.right = this.rotateRight(node.right);
            }
            // 然后对当前节点进行左旋操作，使其平衡，并返回新的根节点  
            return this.rotateLeft(node);
        }

        // 如果平衡因子在-1到1之间，说明当前节点是平衡的，直接返回当前节点即可  
        return node;
    }
}

class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.height = 1;
    }
}

// 示例用法
const avlTree = new AVLTree();
avlTree.insert(10);
avlTree.insert(8);
avlTree.insert(20);
avlTree.insert(15);
avlTree.insert(30);
// avlTree.insert(45);
console.log(avlTree);