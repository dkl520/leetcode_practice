// 回溯算法

function backtrack(arr, list, curArr) {
  if (curArr.length == 2) {
    list.push([...curArr]);
    return;
  }
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    curArr.push(element);
    let newArr = arr.slice(i + 1);
    backtrack(newArr, list, curArr);
    // arr.unshift(element);
    curArr.pop();
  }
}

let arr = [1, 2, 3, 4];
let list = [];
let result = backtrack(arr, list, []);
debugger;
