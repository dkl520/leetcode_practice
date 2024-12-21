/**
 * @param {number[]} citations
 * @return {number}
 */
var hIndex = function (citations) {

    citations.sort((a, b) => a - b);
    let count = 0;
    for (let i = 0; i < citations.length; i++) {
        const element = citations[i];
        if (element > 1) {
            count = Math.max(count, Math.min(element, citations.length - i))
        }
    }
    return count;

};