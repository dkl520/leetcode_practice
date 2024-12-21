/**
 * @param {number[]} time
 * @param {number} totalTrips
 * @return {number}
 */
var minimumTime = function (time, totalTrips) {
    let result = Number.MAX_SAFE_INTEGER;
    if (totalTrips == 1) {
        return Math.min(...time);
    }
    let min = 1;
    let max = totalTrips * Math.max(...time);

    while (min <= max) {
        let middle = Math.floor((min + max) / 2);
        let finishedNum = time.map(v => Math.floor(middle / v)).reduce((acc, v) => {
            acc += v;
            return acc;
        }, 0)
        if (finishedNum < totalTrips) {
            min = middle + 1; // 注意这里是 middle + 1，避免死循环
        } else {
            max = middle - 1;
            result = Math.min(middle, result)
        }
    }
    return result
};


let time = [2, 2, 2], totalTrips = 4;
minimumTime(time, totalTrips);