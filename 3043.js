/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @return {number}
 */
import Trie from "./Tire.js"



var longestCommonPrefix = function (arr1, arr2) {
    let arr1Str = arr1.map((num) => String(num));
    let arr2Str = arr2.map((num) => String(num));
    let trie = new Trie();
    arr1Str = calcPrefix(arr1Str);
    arr2Str = calcPrefix(arr2Str);
    let count = 0;
    arr1Str.forEach(str => trie.insert(str));
    for (let i = 0; i < arr2Str.length; i++) {
        const element = arr2Str[i];
        if (trie.search(element)) {
            count = Math.max(count, element.length)
        }
    }
    return count;

};

function calcPrefix(arrStr) {

    let setStr = new Set();
    for (const str of arrStr) {
        for (let index = 1; index <= str.length; index++) {
            const prefixStr = str.substring(0, index);
            setStr.add(prefixStr);
        }

    }
    return Array.from(setStr);

}



let arr1 = [1, 10, 100], arr2 = [1000];
longestCommonPrefix(arr1, arr2);