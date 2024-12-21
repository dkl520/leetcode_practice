/**
 * @param {string} s
 * @return {string[][]}
 */
function partition(s) {
    let result = [[s]];
    let minParts = 2; // Minimum number of parts
    let maxParts = s.length; // Maximum number of parts, i.e., each character as a separate part

    function backtrack(start, path) {
        // If we have at least minParts parts and at most maxParts parts and we reached the end of the string
        if (path.length >= minParts && path.length <= maxParts && start === s.length) {
            result.push([...path]);
            return;
        }
        // If the path exceeds maxParts parts, stop the recursion
        if (path.length > maxParts) {
            return;
        }
        // Try every possible split
        for (let end = start + 1; end <= s.length; end++) {
            path.push(s.substring(start, end));
            backtrack(end, path);
            path.pop();
        }
    }
    backtrack(0, []);
    result = result.filter((arr) => arr.every(s => iShuiwen(s)));
    return result;
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



