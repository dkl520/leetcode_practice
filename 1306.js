/**  
 * @param {number[]} arr  
 * @param {number} start  
 * @return {boolean}  
 */  
var canReach = function (arr, start) {  
    // 创建一个布尔数组，dp[i] 表示从位置 i 是否可以到达数组的末尾  
    let dp = new Array(arr.length).fill(false);  
      
    // 找出数组中所有值为 0 的位置，并将这些位置和 dp[i] 设置为 true  
    let arrZero = arr.reduce((acc, v, i) => {  
        if (v === 0) {  
            acc.push(i);  
            dp[i] = true;  
        }  
        return acc;  
    }, new Array());  
      
    // 创建两个对象，用于存储可以到达的位置和从哪个位置可以到达  
    let dict = new Object();  
    let dictReverse = new Object();  
      
    // 遍历数组，构建两个对象  
    for (let i = 0; i < arr.length; i++) {  
        const element = arr[i];  
          
        // 如果当前元素和位置的关系存在于 dict 中，则将当前位置添加到对应的关系中  
        if (i - element >= 0 && (i - element) in dict) {  
            dict[i - element].push(i);  
        } else {  
            // 否则，创建一个新的数组，并将当前位置添加到其中  
            dict[i - element] = [i];  
        }  
          
        // 如果当前位置存在于 dictReverse 中，则将对应的关系添加到当前位置的数组中  
        if (i in dictReverse) {  
            dictReverse[i].push(i - element);  
        } else {  
            // 否则，创建一个新的数组，并将其添加到 dictReverse 中  
            dictReverse[i] = [i - element];  
        }  
          
        // 如果当前元素和位置的关系存在于 dict 中，则将当前位置添加到对应的关系中  
        if (i + element < arr.length && (i + element) in dict) {  
            dict[i + element].push(i);  
        } else {  
            // 否则，创建一个新的数组，并将当前位置添加到其中  
            dict[i + element] = [i];  
        }  
          
        // 如果当前位置存在于 dictReverse 中，则将对应的关系添加到当前位置的数组中  
        if (i in dictReverse) {  
            dictReverse[i].push(i + element);  
        } else {  
            // 否则，创建一个新的数组，并将其添加到 dictReverse 中  
            dictReverse[i] = [i + element];  
        }  
    }  
      
    // 调用 calcLine 函数来计算从哪些位置可以到达目标位置，并递归调用自身  
    calcLine(arrZero, dp, dict);  
      
    // 返回 dp[start]，即从起始位置是否可以到达数组的末尾  
    return dp[start]  
};  
  
/**  
 * @param {number[]} arrZero  
 * @param {boolean[]} dp  
 * @param {Object} dict  
 */  
function calcLine(arrZero, dp, dict) {  
    // 遍历 arrZero 中的每个位置  
    for (let i = 0; i < arrZero.length; i++) {  
        const element = arrZero[i];  
          
        // 如果元素存在于 dict 中，则过滤出不能到达的位置，并将这些位置的 dp 值设为 true  
        if (element in dict) {  
            let arrCanReach = dict[element].filter((v, i) => !dp[v]);  
            arrCanReach.map((v) => dp[v] = true);  
              
            // 如果存在可以到达的位置，则递归调用 calcLine 函数  
            if (arrCanReach.length !== 0) {  
                calcLine(arrCanReach, dp, dict);  
            }  
        }  
    }  
}


let arr = [0, 3, 0, 6, 3, 3, 4], start = 6;
console.time("1306. 跳跃游戏 III");  // 开始计时  
console.log(canReach(arr, start));  // 输出最少跳跃次数  
console.timeEnd("1306. 跳跃游戏 III");  // 结束计时