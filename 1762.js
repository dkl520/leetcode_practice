// 能看到海景的建筑物
function findBuildings(arr) {
  let leftMax = Number.NEGATIVE_INFINITY;
  const n = arr.length;
  let resultList = new Array();
  for (let i = n - 1; i >= 0; i--) {
    const el = arr[i];
    if (resultList.length == 0) {
      resultList.push(i);
    } else {
      if (el > leftMax) {
        resultList.push(i);
      }
    }
    leftMax = Math.max(el, leftMax);
  }
  return resultList.reverse();
}
let heights = [2, 2, 2, 2];
console.time("leetcode1782 能看到海景的建筑物");
console.log(findBuildings(heights));
console.timeEnd("leetcode1782 能看到海景的建筑物");
