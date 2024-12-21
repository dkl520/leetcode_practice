/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
    let resultList = new Array();
    let dict = {};
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            const el1 = nums[i];
            const el2 = nums[j];
            const el3 = -(el1 + el2);
            let resultArr = [el1, el2, el3].sort((a, b) => a - b);
            let newStr = JSON.stringify(resultArr)
            if (newStr in dict) {
                continue;
            }
            let leftArr = nums.slice(j + 1);
            let numIndex = leftArr.indexOf(el3);
            if (numIndex >= 0) {
                dict[newStr] = el3;
                resultList.push([...resultArr]);
            }
        }
    }
    // resultList = resultList.map((arr) => JSON.stringify((arr.sort((a, b) => a - b))));
    // resultList = [...new Set(resultList)].map(v => JSON.parse(v));
    return resultList;
};

var threeSum = function (nums) {
    // 定义一个空数组，用于存储找到的满足条件的三元组  
    let resultList = [];
    // 对原数组进行排序，这样我们可以更方便地处理具有相同值的元素  
    nums.sort((a, b) => a - b); // 对数组进行排序  
    // 获取数组的长度  
    const n = nums.length;
    // 遍历数组中的每一个元素  
    for (let i = 0; i < n - 2; i++) {
        // 如果当前元素与前一个元素相同，则跳过，以避免处理重复的元素  
        if (i > 0 && nums[i] === nums[i - 1]) {
            continue;
        }
        // left指针从当前元素的下一个位置开始，因为我们已经检查过当前元素了  
        let left = i + 1;
        // right指针指向数组的最后一个元素，因为我们要找的是三个数之和为0的情况  
        let right = n - 1;

        // 当left小于right时，我们还有可能找到满足条件的三元组  
        while (left < right) {
            // 计算三个数的和  
            const sum = nums[i] + nums[left] + nums[right];
            // 如果和为0，则找到了一个满足条件的三元组  
            if (sum === 0) {
                // 将这个三元组添加到结果列表中  
                resultList.push([nums[i], nums[left], nums[right]]);
                // 跳过重复的元素，确保我们不会处理重复的三元组  
                while (left < right && nums[left] === nums[left + 1]) {
                    left++;
                }
                while (left < right && nums[right] === nums[right - 1]) {
                    right--;
                }
                // 由于我们处理了一个三元组，所以移动left和right指针，继续寻找新的三元组  
                left++;
                right--;
            } else if (sum < 0) {
                // 如果和小于0，则为了使和为0，我们需要增加left指针，因为三个数中已经有两个负数了  
                left++;
            } else {
                // 如果和大于0，则为了使和为0，我们需要减少right指针，因为三个数中已经有两个正数了  
                right--;
            }
        }
    }
    // 返回找到的所有满足条件的三元组  
    return resultList;
};

nums =
[-1,0,1,2,-1,-4];

// nums = nums.map((v)=>0);
console.time("15. 三数之和")
console.log(threeSum(nums))
console.timeEnd("15. 三数之和")
