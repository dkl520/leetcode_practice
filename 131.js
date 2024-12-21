/**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function (s) {
    let result = new Array();
    if (s.length == 1) {
        return [[s]]
    }
    trackBack(result, s, 1)
    debugger

    return result;
};

function trackBack(result, s, end) {
    if (end > s.length) {
        return;
    }

    let list = [];
    for (let i = 0; i < s.length; i++) {

        const el = s.slice(i, i + end);
        if (iShuiwen(el)) {
            list.push(el);
        }
        // i = i + end - 1;
    }
    end++;

    result.push(list)
    return trackBack(result, s, end)
}

function iShuiwen(s) {
    if (s.length == 1) {
        return true;
    }
    if (s.length % 2 == 0) {
        let left = (s.length) / 2 - 1;
        let right = (s.length) / 2;
        while (left >= 0 && right < s.length) {
            if (s[left] !== s[right]) {
                return false;
            }
            left--;
            right++;
        }
        return true;
    } else {
        let mid = (s.length - 1) / 2
        let left = mid - 1;
        let right = mid + 1;
        while (left >= 0 && right < s.length) {
            if (s[left] !== s[right]) {
                return false;
            }
            left--;
            right++;
        }
        return true;
    }
}



console.time("131. 分割回文串")
let s = "aab";
console.log(partition(s))

console.timeEnd("131. 分割回文串")



