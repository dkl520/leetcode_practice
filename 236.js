

import buildTreeFromArray from "./BinaryTree.js";




var lowestCommonAncestor = function (root, p, q) {
    let pList = [];
    let qList = [];
    pList = dfs(root, p, [])
    qList = dfs(root, q, [])
    for (let i = pList.length - 1; i >= 0; i--) {
        const element = pList[i];
        if (qList.includes(element)) {
            return element;
        }
    }
};


function dfs(root, val, list) {
    if (root == null) {
        return [];
    }

    list.push(root);

    if (root == val) {
        return [...list];
    } else {

        if (root.left !== null && root.right == null) {
            return dfs(root.left, val, [...list])
        }

        if (root.right !== null && root.left == null) {
            return dfs(root.right, val, [...list])
        }
        if (root.left == null && root.right == null) {
            return [];
        }
        let leftSearch = dfs(root.left, val, [...list]);
        let rightSearch = dfs(root.right, val, [...list]);
        return [...leftSearch, ...rightSearch]
    }
}



console.time("236. 二叉树的最近公共祖先");

let root = [1,2], p = 1, q = 2;


let list = buildTreeFromArray(root);
console.log(lowestCommonAncestor(list, p, q));


console.timeEnd("236. 二叉树的最近公共祖先")




