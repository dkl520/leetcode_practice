/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
var canCompleteCircuit = function (gas, cost) {
    const n = gas.length;
    let distanceArr = new Array();

    for (let i = 0; i < n; i++) {
        distanceArr[i] = gas[i] - cost[i];
    }
    let filterArr = transformArray(distanceArr);

    let maxNum= Number.MIN_SAFE_INTEGER;
    let index= -1;
    for (let i = 0; i < filterArr.length; i++) {
        const el = filterArr[i];
            if (el) {
                
            }
    }


};


function transformArray(arr) {
    let result = new Array(arr.length).fill(0);
    let sumPositive = 0;
    let encounteredNegative = false;
    let lastNegativeIndex = -1;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] >= 0) {
            if (!encounteredNegative) {
                sumPositive += arr[i];
            } else {
                result[lastNegativeIndex + 1] += arr[i];
            }
        } else {
            if (!encounteredNegative) {
                result[0] = sumPositive;
                encounteredNegative = true;
            }
            result[i] = arr[i];
            lastNegativeIndex = i;
        }
    }

    if (!encounteredNegative) {
        result[0] = sumPositive;
    }

    return result;
}



let gas = [1, 2, 3, 4, 5];
let cost = [3, 4, 5, 1, 2];


canCompleteCircuit(gas, cost)