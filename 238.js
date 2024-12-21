// 238. 除自身以外数组的乘积


/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function (nums) {
    let allProduct = nums.reduce((acc, v) => {
        if (v !== 0) {
            acc *= v
        }
        return acc
    }, 1);
    let zeroArr = new Array();
    nums.forEach((v, i) => {
        if (v === 0) {
            zeroArr.push(i);
        }
    });
    let resultList = new Array(nums.length);
    for (let index = 0; index < nums.length; index++) {
        const element = nums[index];
        if (zeroArr.length === 0) {
            resultList[index] = allProduct / element;
        } else {
            if (zeroArr.length > 1) {
                for (let Z = 0; Z < zeroArr.length; Z++) {
                    // const zeroIndex = zeroArr[Z];
                    resultList[index] = 0;
                }
            } else {
                for (let Z = 0; Z < zeroArr.length; Z++) {
                    const zeroIndex = zeroArr[Z];
                    if (zeroIndex === index) {
                        resultList[index] = allProduct;
                    } else {
                        resultList[index] = 0;
                    }

                }
            }

        }
    }
    return resultList;
};









var productExceptSelf = function (nums) {
    let zeroArr = new Array();
    let allProduct = nums.reduce((acc, v, i) => {
        if (v !== 0) {
            acc *= v
        } else {
            zeroArr.push(i)
        }
        return acc
    }, 1);
    let resultList = new Array(nums.length);
    if (zeroArr.length > 1) {
        resultList.fill(0)
        return resultList;
    }
    if (zeroArr.length === 0) {

        for (let i = 0; i < nums.length; i++) {
            const element = nums[i];
            resultList[i] = allProduct / element;
        }
    }
    if (zeroArr.length === 1) {

        for (let i = 0; i < nums.length; i++) {
            const element = nums[i];
            if (i == zeroArr[0]) {
                resultList[i] = allProduct;

            } else {
                resultList[i] = 0

            }
        }
    }

    return resultList;
};



var productExceptSelf = function(nums) {
    const length = nums.length;
    const answer = new Array(length);
  
    // answer[i] 表示索引 i 左侧所有元素的乘积
    // 因为索引为 '0' 的元素左侧没有元素， 所以 answer[0] = 1
    answer[0] = 1;
    for (let i = 1; i < length; i++) {
      answer[i] = nums[i - 1] * answer[i - 1];
    }
  
    // R 为右侧所有元素的乘积
    // 刚开始右边没有元素，所以 R = 1
    let R = 1;
    for (let i = length - 1; i >= 0; i--) {
      // 对于索引 i，左边的乘积为 answer[i]，右边的乘积为 R
      answer[i] = answer[i] * R;
      // R 需要包含右边所有的乘积，所以计算下一个结果时需要将当前值乘到 R 上
      R *= nums[i];
    }
    return answer;
  };

let nums =
    [-1, 1, 0, -3, 3]

console.time("238. 除自身以外数组的乘积")
console.log(productExceptSelf(nums));
console.timeEnd("238. 除自身以外数组的乘积")
