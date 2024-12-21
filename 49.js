// /**
//  * @param {string[]} strs
//  * @return {string[][]}
//  */
// var groupAnagrams = function (strs) {
//   let n = strs.length;
//   let charArr = [];
//   for (let i = 0; i < n; i++) {
//     const el = strs[i];
//     let asciiValues = new Array(el.length);
//     for (let j = 0; j < el.length; j++) {
//       const charStr = el.charCodeAt(j);
//       asciiValues[j] = charStr;
//     }
//     asciiValues.sort((a, b) => a - b);
//     charArr.push(asciiValues);
//   }

//   charArr = charArr.map((v) => String(v));
//   let dict = {};
//   for (let i = 0; i < charArr.length; i++) {
//     const sortstr = charArr[i];
//     if (dict[sortstr]) {
//       dict[sortstr].push(strs[i]);
//     } else {
//       dict[sortstr] = [strs[i]];
//     }
//   }
//   return Object.values(dict);
// };

// chatGpt 优化版
// 不再使用二维数组 charArr 来存储每个字符串的字符的 ASCII 码值，而是直接将字符串排序后作为键值存储在 dict 对象中。
// 使用 split("") 方法将字符串拆分为字符数组，然后使用 sort() 方法对字符数组进行排序，最后使用 join("") 方法将排序后的字符数组拼接回字符串形式。这样可以得到一个按字符排序后的字符串作为键值。
// 使用 dict 对象来存储分组后的字符串数组，键为排序后的字符串，值为属于同一组的原始字符串数组。
// 最后，使用 Object.values(dict) 将 dict 对象中的值以数组的形式返回。
// 以上改进后的代码实现了对给定字符串数组的分组，将由相同字符构成的字符串归类到同一组中。

var groupAnagrams = function (strs) {
  let dict = {};
  for (let i = 0; i < strs.length; i++) {
    const str = strs[i];
    const sortedStr = str.split("").sort().join("");
    if (dict[sortedStr]) {
      dict[sortedStr].push(str);
    } else {
      dict[sortedStr] = [str];
    }
  }
  return Object.values(dict);
};
// let strs = ["eat", "tea", "tan", "ate", "nat", "bat"];
let strs = new Array();
for (let i = 0; i < 1000000; i++) {
  let str = String();
  for (let j = 0; j < 3; j++) {
    const element = generateRandomLetter();
    str += element;
  }
  strs.push(str);
}
function generateRandomLetter() {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const randomIndex = Math.floor(Math.random() * alphabet.length);
  const randomLetter = alphabet[randomIndex];
  return randomLetter;
}
console.time("字母异位词分组！");
console.log(groupAnagrams(strs));
console.timeEnd("字母异位词分组！");
