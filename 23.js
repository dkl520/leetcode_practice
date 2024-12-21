/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */

import listNode from "./ListNode.js";
var mergeKLists = function (lists) {

    let formatList = lists.filter(node => node !== null)
    let root = {
        val: Number.NEGATIVE_INFINITY,
        next: null
    };
    if (formatList.length == 0) {
        return null;
    }
    generateList(root, formatList);

    return root.next;
};

function generateList(root, lists) {
    if (lists.length == 0) {
        return;
    }
    let currentIndex = 0;
    for (let i = 1; i < lists.length; i++) {
        const element = lists[i];
        if (lists[currentIndex].val > element.val) {
            currentIndex = i;
        }
    }
    root.next = {
        val: lists[currentIndex].val,
        next: null
    }
    if (lists[currentIndex].next) {
        lists[currentIndex] = lists[currentIndex].next;
    } else {
        lists.splice(currentIndex, 1);
    }

    return generateList(root.next, lists)
}



let rootlists = [[0, 2, 5]]

function formatList(rootlists) {
    let List = new Array();
    for (let i = 0; i < rootlists.length; i++) {
        const arr = rootlists[i];
        let node = listNode(arr)
        List.push(node)
    }
    return List;
}

let lists = formatList(rootlists)

console.time("23. 合并 K 个升序链表")

let result = mergeKLists(lists)
console.log(result);

console.timeEnd("23. 合并 K 个升序链表")