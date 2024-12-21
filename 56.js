// 定义一个名为 merge 的函数，它接收一个二维数组 intervals，其中每个子数组有两个元素，表示一个区间  
var merge = function (intervals) {
    // 首先，按照每个区间的起始位置进行排序  
    intervals.sort((a, b) => a[0] - b[0]);
    // 调用 mergeIntervalsAll 函数来合并区间，并赋值给 mergeIntervals  
    // let mergeIntervals = mergeIntervalsAll(intervals);
    // // 调用 validNull 函数检查合并后的区间是否满足条件，并赋值给 bol  
    // let bol = validNull(mergeIntervals)
    let mergeIntervals = intervals, bol = false;
    // 如果不满足条件，则继续合并区间，直到满足条件为止  
    while (Boolean(bol) === Boolean(false)) {
        mergeIntervals = mergeIntervalsAll(mergeIntervals);
        bol = validNull(mergeIntervals);
    }
    // 返回最终合并后的区间  
    return mergeIntervals;
};

// 定义一个函数 validNull，用于检查合并后的区间是否满足条件  
function validNull(mergeIntervals) {
    // 遍历合并后的区间数组  
    for (let i = 0; i < mergeIntervals.length; i++) {
        const currentInterval = mergeIntervals[i]; // 当前区间  
        const nextInterval = mergeIntervals[i + 1]; // 下一个区间  
        // 如果已经到达数组的末尾，则满足条件，返回 true  
        if (i + 1 >= mergeIntervals.length) {
            return true;
        }
        // 如果当前区间的结束位置小于等于下一个区间的开始位置，并且当前区间的结束位置大于等于下一个区间的结束位置，则不满足条件，返回 false  
        if (currentInterval[1] <= nextInterval[1] && currentInterval[1] >= nextInterval[0]) {
            return false;
        }
        // 如果当前区间的结束位置大于下一个区间的结束位置，则不满足条件，返回 false  
        if (currentInterval[1] > nextInterval[1]) {
            return false;
        }
    }
    // 如果遍历完所有区间后都没有发现不满足条件的情况，则满足条件，返回 true  
    return true;
}

// 定义一个函数 mergeIntervalsAll，用于合并区间  
function mergeIntervalsAll(intervals) {
    // 定义一个新数组 newInterval，用于存放合并后的区间  
    let newInterval = new Array();
    // 定义一个数组 mergeIntervals，用于存放最终的合并结果  
    let mergeIntervals = new Array();
    // 遍历原始区间数组  
    for (let i = 0; i < intervals.length; i++) {
        let interval = intervals[i]; // 当前区间  
        // 如果已经到达数组的末尾，直接将当前区间添加到合并结果中，并返回合并结果  
        if (i + 1 >= intervals.length) {
            mergeIntervals.push(interval);
            return mergeIntervals;
        }
        let interNext = intervals[i + 1]; // 下一个区间  
        // 如果当前区间的结束位置小于等于下一个区间的开始位置，并且当前区间的结束位置大于等于下一个区间的结束位置，则将两个区间合并，并添加到合并结果中  
        if (interval[1] <= interNext[1] && interval[1] >= interNext[0]) {
            newInterval = new Array(interval[0], interNext[1]); // 新的合并后的区间为 [当前区间的开始位置, 下一个区间的结束位置]  
            mergeIntervals.push(newInterval); // 将新的合并后的区间添加到合并结果中  
            i++; // 因为已经合并了一个区间，所以索引加一，继续处理下一个区间  
        } else if (interval[1] > interNext[1]) { // 如果当前区间的结束位置大于下一个区间的结束位置，则直接将当前区间添加到合并结果中  
            newInterval = new Array(interval[0], interval[1]); // 新的区间添加到合并结果中

        } else { // 如果当前区间的结束位置小于等于下一个区间的结束位置，则直接将当前区间添加到合并结果中
            mergeIntervals.push(interval);
        }
    }
    // 返回最终的合并结果
    return mergeIntervals;
}


// 官方解法


// 定义一个名为 merge2 的函数，它接收一个二维数组 intervals，其中每个子数组有两个元素，表示一个区间  
function merge2(intervals) {
    // 如果区间数组为空，直接返回空数组  
    if (intervals.length === 0) {
        return [];
    }
    // 对区间数组按照每个区间的起始位置进行排序  
    intervals.sort((interval1, interval2) => interval1[0] - interval2[0]);
    // 定义一个数组 merged，用于存放合并后的区间  
    const merged = [];
    // 遍历区间数组  
    for (let i = 0; i < intervals.length; ++i) {
        // 当前区间  
        let [L, R] = intervals[i];
        // 如果 merged 数组为空，或者最后一个合并区间的结束位置小于当前区间的起始位置，则将当前区间添加到 merged 数组中  
        if (merged.length === 0 || merged[merged.length - 1][1] < L) {
            merged.push([L, R]);
        } else {
            // 否则，更新最后一个合并区间的结束位置为当前区间和最后一个合并区间的结束位置的最大值  
            merged[merged.length - 1][1] = Math.max(merged[merged.length - 1][1], R);
        }
    }
    // 返回合并后的区间数组  
    return merged;
}



intervals = [[1, 4], [0, 2], [3, 5]]
console.time("56合并区间")
console.log(merge2(intervals));
console.timeEnd("56合并区间")