// // function checkMagazine(magazine, note) {
// //     // Write your code here
// //     let magazineArr = magazine.split(" ");
// //     let noteArr = note.split(" ");
// //     let indexFrom = 0;
// //     for (let i = 0; i < noteArr.length; i++) {
// //         let word = noteArr[i];
// //         let index = magazineArr.indexOf(word, indexFrom);
// //         if (index == -1) {
// //             return "No";
// //         } else {
// //             indexFrom = index + 1;
// //         }
// //     }
// //     return "Yes"

// // }

// // for (const key in object) {
// //     if (Object.prototype.hasOwnProperty.call(object, key)) {
// //         const element = object[key];

// //     }
// // }





// // let magazine = "attack at dawn", note = "attack at dawn";

// // console.log(checkMagazine( magazine,note));


// function makeAnagram(a, b) {
//     // Write your code here
//     let aDict = {};
//     let bDict = {};
//     for (let c of a) {
//         aDict[c] = (aDict[c] || 0) + 1;
//     }
//     for (let c of b) {
//         bDict[c] = (bDict[c] || 0) + 1;
//     }
//     let result = 0;
//     for (const key in aDict) {
//         if (Object.prototype.hasOwnProperty.call(aDict, key)) {
//             const frequencyA = aDict[key];
//             const frequencyB = (bDict[key] || 0);
//             result += Math.abs(frequencyA - frequencyB);
//             aDict[key] = Math.min(frequencyA, frequencyB);
//             bDict[key] = aDict[key];

//         }
//     }
//     for (const key in bDict) {
//         if (Object.prototype.hasOwnProperty.call(bDict, key)) {
//             const frequencyB = bDict[key];
//             const frequencyA = (aDict[key] || 0);
//             result += Math.abs(frequencyA - frequencyB);
//             aDict[key] = Math.min(frequencyA, frequencyB);
//             bDict[key] = aDict[key];   
//         }

//     }
//     return result;
// }

// console.log(
//     makeAnagram("fcrxzwscanmligyxyvym", "jxwtrhvujlmrpdoqbisbwhmgpmeoke"));






function substrCount(n, s) {
    let allBol = true;
    let first = s.charAt(0);
    for (const char of s) {
        if (char != first) {
            allBol = false;
        }
    }
    if (allBol) {
        return (1 + n) * n / 2;
    }
    let result = [];
    let count = 0;
    for (let i = 0; i < n; i++) {
        // result.push(s.charAt(i));
        count++;
        let left = i - 1;
        let right = i + 1;
        let char
        if (left >= 0) {
            char = s.charAt(left);
        }
        while (left >= 0 && right < n) {

            if (s.charAt(left) == s.charAt(right) && char == s.charAt(right)) {
                // result.push(s.substring(left, right + 1))
                count++;
            } else {
                break;
            }
            left--;
            right++
        }
    }

    return result.length;
}


let s = "aaaa", n = 4;

console.log(substrCount(n, s));


