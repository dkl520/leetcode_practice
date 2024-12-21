/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function (s, wordDict) {
    let map = new Map();
    for (let i = 0; i < wordDict.length; i++) {
        const element = wordDict[i];
        if (map.has(element.charAt(0))) {
            let list = map.get(element.charAt(0));
            list.push(element)
        } else {
            map.set(element.charAt(0), [element]);
        }
    }
    for (const [key, list] of map) {
        list.sort((a, b) => {
            return b.length - a.length
        })
    }
    return trackBack(s, map, 0);
};

function trackBack(s, map, i) {
    if (s.length <= i) {
        return true;
    }
    let list
    if (!map.has(s[i])) {
        return false
    } else {
        list = map.get(s[i]);
        for (let j = 0; j < list.length; j++) {
            const el = list[j];
            const str = s.substring(i, i + el.length);
            if (el === str) {
                i += el.length;
                let bol = trackBack(s, map, i);
                if (bol) {
                    return true;
                }
                i -= el.length;
            }
        }
        return false;
    }
}


console.time("139. 单词拆分")
const s = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab",
    
    wordDict =
        ["a", "aa", "aaa", "aaaa", "aaaaa", "aaaaaa", "aaaaaaa", "aaaaaaaa", "aaaaaaaaa", "aaaaaaaaaa"];

console.log(wordBreak(s, wordDict));

console.timeEnd("139. 单词拆分")