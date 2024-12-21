function solveSudoku(board) {
  // 三个布尔数组 表明 行, 列, 还有 3*3 的方格的数字是否被使用过
  const rowUsed = Array.from({ length: 9 }, () => Array(10).fill(false));
  const colUsed = Array.from({ length: 9 }, () => Array(10).fill(false));
  const boxUsed = Array.from({ length: 3 }, () =>
    Array.from({ length: 3 }, () => Array(10).fill(false))
  );
  // 初始化
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[0].length; col++) {
      const num = Number(board[row][col]);
      if (1 <= num && num <= 9) {
        rowUsed[row][num] = true;
        colUsed[col][num] = true;
        boxUsed[Math.floor(row / 3)][Math.floor(col / 3)][num] = true;
      }
    }
  }
  // 递归尝试填充数组
  return recursiveSolveSudoku(board, rowUsed, colUsed, boxUsed, 0, 0);
}
function recursiveSolveSudoku(board, rowUsed, colUsed, boxUsed, row, col) {
  // 边界校验, 如果已经填充完成, 返回true, 表示一切结束
  if (col === board[0].length) {
    col = 0;
    row++;
    if (row === board.length) {
      return true;
    }
  }
  // 是空则尝试填充, 否则跳过继续尝试填充下一个位置
  if (board[row][col] === ".") {
    // 尝试填充1~9
    for (let num = 1; num <= 9; num++) {
      // 检查当前数字是否可以使用
      const canUsed = !rowUsed[row][num] && !colUsed[col][num] && !boxUsed[Math.floor(row / 3)][Math.floor(col / 3)][num];
      if (canUsed) {
        // 标记当前数字已使用
        rowUsed[row][num] = true;
        colUsed[col][num] = true;
        boxUsed[Math.floor(row / 3)][Math.floor(col / 3)][num] = true;
        // 将当前位置填充为数字num
        board[row][col] = String(num);
        // 递归尝试填充下一个位置
        if (recursiveSolveSudoku(board, rowUsed, colUsed, boxUsed, row, col + 1)) {
          return true;
        }
        // 如果递归未成功解决数独，则回溯
        board[row][col] = ".";
        rowUsed[row][num] = false;
        colUsed[col][num] = false;
        boxUsed[Math.floor(row / 3)][Math.floor(col / 3)][num] = false;
      }
    }
  } else {
    // 当前位置已经有数字，跳过继续尝试填充下一个位置
    return recursiveSolveSudoku(board, rowUsed, colUsed, boxUsed, row, col + 1);
  }
  return false;
}
