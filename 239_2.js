var maxSlidingWindow = function (nums, k) {
  const maxArr = [];
  const deque = []; // 双端队列，保存元素索引

  for (let i = 0; i < nums.length; i++) {
    // 当窗口滑动时，移除超出窗口范围的元素
    if (deque.length > 0 && deque[0] === i - k) {
      deque.shift();
    }
    // 从队列右侧移除小于当前元素的索引
    let index = deque[deque.length - 1];
    while (deque.length > 0 && nums[index] < nums[i]) {
      deque.pop();
      debugger
      // console.log(deque);
    }

    // 将当前元素索引添加到队列
    deque.push(i);

    debugger
    // 当窗口大小达到 k 时，记录窗口的最大值
    if (i >= k - 1) {
      maxArr.push(nums[deque[0]]);
      console.log(maxArr);
      debugger
    }
  }
  return maxArr;
};

let nums = [1, 3, -1, -3, -2, 3, 6, 7], k = 3;
console.time("239. 滑动窗口最大值")
console.log(maxSlidingWindow(nums, k));
console.timeEnd("239. 滑动窗口最大值")