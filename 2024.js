/**
 * @param {string} answerKey
 * @param {number} k
 * @return {number}
 */
var maxConsecutiveAnswers = function (answerKey, k) {
    const n = answerKey.length;
    let count = 1;
    let statics = new Array();
    let max = 0;
    for (let i = 0; i < n - 1; i++) {
        const element = answerKey.charAt(i);
        const elNext = answerKey.charAt(i + 1);
        if (element == elNext) {
            count++;
        } else {
            max = max < count ? count : max;
            statics.push(count);
            count = 1;
        }
    }

    statics.push(count);
    let index = statics.indexOf(max);
    let leftSum = 0, rightSum = 0;
    let leftIndex = 0, righIndex = statics.length - 1;

    while (leftIndex < index || righIndex > index) {
        if (leftIndex < index) {
            leftSum += statics[leftIndex]
            leftIndex++
        }
        if (righIndex > index) {
            rightSum += statics[righIndex];
            righIndex--;
        }
    }

    const edgeMax = Math.max(leftSum, rightSum);
    return max + Math.min(edgeMax, k);
};


let answerKey = "TTFTTFTT", k = 1;
maxConsecutiveAnswers(answerKey, k);