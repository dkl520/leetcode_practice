// 红黑树节点类
class Node {
    constructor(value, color) {
        this.value = value;
        this.color = color;
        this.left = null;
        this.right = null;
        this.parent = null;
    }
}

// 红黑树类
class RedBlackTree {
    constructor() {
        this.root = null;
    }

    // 左旋操作  
    rotateLeft(node) {
        // 获取节点的右子节点  
        const rightChild = node.right;
        // 将节点的右子节点的左子节点设为当前节点的右子节点  
        node.right = rightChild.left;

        // 如果右子节点的左子节点存在，则将其父节点设为当前节点  
        if (rightChild.left !== null) {
            rightChild.left.parent = node;
        }

        // 将右子节点的父节点设为当前节点的父节点  
        rightChild.parent = node.parent;

        // 如果当前节点的父节点不存在，则将右子节点设为根节点  
        if (node.parent === null) {
            this.root = rightChild;
        }
        // 如果当前节点是其父节点的左子节点，则将右子节点设为其父节点的左子节点  
        else if (node === node.parent.left) {
            node.parent.left = rightChild;
        }
        // 如果当前节点是其父节点的右子节点，则将右子节点设为其父节点的右子节点  
        else {
            node.parent.right = rightChild;
        }

        // 将当前节点设为右子节点的左子节点  
        rightChild.left = node;
        // 将当前节点的父节点设为右子节点  
        node.parent = rightChild;
    }

    // 右旋操作  
    rotateRight(node) {
        // 获取节点的左子节点  
        const leftChild = node.left;
        // 将节点的左子节点的右子节点设为当前节点的左子节点  
        node.left = leftChild.right;

        // 如果左子节点的右子节点存在，则将其父节点设为当前节点  
        if (leftChild.right !== null) {
            leftChild.right.parent = node;
        }

        // 将左子节点的父节点设为当前节点的父节点  
        leftChild.parent = node.parent;

        // 如果当前节点的父节点不存在，则将左子节点设为根节点  
        if (node.parent === null) {
            this.root = leftChild;
        }
        // 如果当前节点是其父节点的右子节点，则将左子节点设为其父节点的右子节点  
        else if (node === node.parent.right) {
            node.parent.right = leftChild;
        }
        // 如果当前节点是其父节点的左子节点，则将左子节点设为其父节点的左子节点  
        else {
            node.parent.left = leftChild;
        }

        // 将当前节点设为左子节点的右子节点  
        leftChild.right = node;
        // 将当前节点的父节点设为左子节点  
        node.parent = leftChild;
    }

    // 插入节点  
insert(value) {  
    // 创建一个新的节点，包含要插入的值和颜色（初始为红色）  
    const newNode = new Node(value, 'red');  
  
    // 如果根节点为空，则将新节点设为根节点，并将其颜色设为黑色  
    if (this.root === null) {  
        this.root = newNode;  
        newNode.color = 'black';  
        return;  
    }  
  
    // 初始化当前节点为根节点  
    let current = this.root;  
    // 循环直到找到应该插入新节点的位置  
    while (true) {  
        // 如果插入值小于当前节点的值，则向当前节点的左子树寻找插入位置  
        if (value < current.value) {  
            // 如果当前节点的左子节点为空，则将新节点插入到左子节点位置，并设置当前节点为新节点的父节点  
            if (current.left === null) {  
                current.left = newNode;  
                newNode.parent = current;  
                break;  
            }  
            // 否则，继续在当前节点的左子树中查找合适的位置  
            current = current.left;  
        // 如果插入值大于或等于当前节点的值，则向当前节点的右子树寻找插入位置  
        } else {  
            // 如果当前节点的右子节点为空，则将新节点插入到右子节点位置，并设置当前节点为新节点的父节点  
            if (current.right === null) {  
                current.right = newNode;  
                newNode.parent = current;  
                break;  
            }  
            // 否则，继续在当前节点的右子树中查找合适的位置  
            current = current.right;  
        }  
    }  
  
    // 调用fixInsert函数来修复由于插入新节点可能引起的颜色问题  
    this.fixInsert(newNode);  
}
    // 插入修复函数，参数node为需要修复的节点  
    fixInsert(node) {
        // 循环条件：当前节点不是根节点，且当前节点的父节点是红色  
        while (
            node !== this.root &&
            node.parent.color === 'red'
        ) {
            // 如果当前节点的父节点在其父节点的左侧  
            if (node.parent === node.parent.parent.left) {
                // 定义叔叔节点，即当前节点的父节点的右侧节点  
                const uncle = node.parent.parent.right;

                // 如果叔叔节点存在且其颜色为红色  
                if (uncle !== null && uncle.color === 'red') {
                    // 情况1：叔叔节点为红色  
                    // 将当前节点的父节点颜色设为黑色  
                    node.parent.color = 'black';
                    // 将叔叔节点颜色设为黑色  
                    uncle.color = 'black';
                    // 将叔叔节点的父节点颜色设为红色  
                    node.parent.parent.color = 'red';
                    // 将当前节点设为其父节点的父节点，继续循环直到满足循环条件结束  
                    node = node.parent.parent;
                } else {
                    // 如果当前节点是其父节点的右侧子节点  
                    if (node === node.parent.right) {
                        // 情况2：叔叔节点为黑色，且当前节点为父节点的右子节点  
                        // 将当前节点设为其父节点，进行左旋操作  
                        node = node.parent;
                        this.rotateLeft(node);
                    }

                    // 情况3：叔叔节点为黑色，且当前节点为父节点的左子节点  
                    // 将当前节点的父节点颜色设为黑色  
                    node.parent.color = 'black';
                    // 将父节点的父节点颜色设为红色  
                    node.parent.parent.color = 'red';
                    // 对父节点的父节点进行右旋操作  
                    this.rotateRight(node.parent.parent);
                }
            } else {
                // 如果当前节点的父节点在其父节点的右侧  
                const uncle = node.parent.parent.left;

                // 如果叔叔节点存在且其颜色为红色  
                if (uncle !== null && uncle.color === 'red') {
                    // 情况1：叔叔节点为红色  
                    // 将当前节点的父节点颜色设为黑色  
                    node.parent.color = 'black';
                    // 将叔叔节点颜色设为黑色  
                    uncle.color = 'black';
                    // 将叔叔节点的父节点颜色设为红色  
                    node.parent.parent.color = 'red';
                    // 将当前节点设为其父节点的父节点，继续循环直到满足循环条件结束  
                    node = node.parent.parent;
                } else {
                    // 如果当前节点是其父节点的左侧子节点  
                    if (node === node.parent.left) {
                        // 情况2：叔叔节点为黑色，且当前节点为父节的左侧子节点  
                        // 将当前节点设为其父节点，进行右旋操作  
                        node = node.parent;
                        this.rotateRight(node);
                    }

                    // 情况3：叔叔节点为黑色，且当前节点为父节点的右子节点  
                    // 将当前节点的父节点颜色设为黑色  
                    node.parent.color = 'black';
                    // 将父节点的父节点颜色设为红色  
                    node.parent.parent.color = 'red';
                    // 对父节点的父节点进行左旋操作  
                    this.rotateLeft(node.parent.parent);
                }
            }
        }  // 结束循环，将根节点的颜色设为黑色，完成修复操作。  
        this.root.color = 'black';  // 修复完成，将根节点的颜色设为黑色。                  } // 结束函数定义。`   // 这是在代码结束处提供的一段注释，它提供了该代码的功能概述。在具体的注释中，我已经根据代码的逻辑和功能对每一行进行了详细的解释。如果你还有其他问题或需要进一步的解释，请随时告诉我。
    }

}

// 示例使用
const tree = new RedBlackTree();
tree.insert(10);
tree.insert(20);
tree.insert(30);
tree.insert(15);
tree.insert(25);


debugger