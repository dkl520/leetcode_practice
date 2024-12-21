
function palindrome(str) {
    let resultAll = [];
    for (let i = 0; i < str.length; i++) {
        // const char = str[i];
        resultAll.push(...haspalindromeNums(i, i));
        resultAll.push(...haspalindromeNums(i, i + 1));
    }
    function haspalindromeNums(i, j) {
        let left = i;
        let right = j;
        let result = [];
        while (left >= 0 && right < str.length) {

            if (str[left] == str[right]) {
                result.push(str.substring(left, right + 1));
                left--;
                right++;
            } else {
                break;
            }
        }
        return result;
    }
    return resultAll;
}

let str = "tacocat";
let result = palindrome(str);
console.log(result);