class Solution { // 定义一个类名为Solution  
  constructor() { // 构造函数，当创建Solution类的实例时会被调用  
    this.dirs = [ // 定义一个数组，存储四个方向：上、下、左、右  
      [-1, 0], // 上  
      [1, 0],  // 下  
      [0, -1], // 左  
      [0, 1]   // 右  
    ];
    this.rows = 0; // 定义行数，初始化为0  
    this.columns = 0; // 定义列数，初始化为0  
  }

  longestIncreasingPath(matrix) { // 定义一个方法，计算一个矩阵中路径的长度，参数为矩阵  
    if (matrix === null || matrix.length === 0 || matrix[0].length === 0) { // 如果传入的矩阵为空，则返回0  
      return 0;
    }
    this.rows = matrix.length; // 获取矩阵的行数，并赋值给类的rows属性  
    this.columns = matrix[0].length; // 获取矩阵的列数，并赋值给类的columns属性  
    const memo = new Array(this.rows).fill(0).map(() => new Array(this.columns).fill(0)); // 创建一个二维数组memo，用于记忆每个位置是否已经计算过，初始化为0  
    // debugger; // 调试语句，可以在执行到这里时暂停程序，方便查看和修改代码  
    let ans = 0; // 定义一个变量ans，存储最大的路径长度，初始化为0  
    for (let i = 0; i < this.rows; ++i) { // 遍历矩阵的每一行  
      for (let j = 0; j < this.columns; ++j) { // 遍历矩阵的每一列  
        ans = Math.max(ans, this.dfs(matrix, i, j, memo)); // 用深度优先搜索方法计算从(i,j)开始的最长路径，并更新ans为最大值  
      }
    }
    return ans; // 返回最大的路径长度  
  }

  dfs(matrix, row, column, memo) { // 定义一个深度优先搜索的方法，参数为矩阵、当前位置的行和列、记忆数组  
    if (memo[row][column] !== 0) { // 如果该位置已经在记忆数组中计算过，则直接返回记忆数组中的值  
      return memo[row][column];
    }
    ++memo[row][column]; // 在记忆数组中将该位置的计数加一，表示已经计算过  
    for (let dir of this.dirs) { // 对上、下、左、右四个方向进行遍历  
      let newRow = row + dir[0]; // 计算新的行数  
      let newColumn = column + dir[1]; // 计算新的列数  
      if (newRow >= 0 && newRow < this.rows && newColumn >= 0 && newColumn < this.columns && matrix[newRow][newColumn] > matrix[row][column]) { // 如果新的位置在矩阵内且其值大于当前位置的值，则递归调用dfs方法计算新的位置的最长路径，并更新原位置的路径长度为最大值  
        memo[row][column] = Math.max(memo[row][column], this.dfs(matrix, newRow, newColumn, memo) + 1);
        // 注意这里加1是因为从新的位置到原位置又多了一条路径  
      }
    }
    return memo[row][column]; // 返回原位置的最长路径长度  
  }
}

const solution = new Solution();

let matrix = [
  [9, 9, 4],
  [6, 6, 8],
  [2, 1, 1],
];

console.time("11LCR 112. 矩阵中的最长递增路径");
console.log(solution.longestIncreasingPath(matrix));
console.timeEnd("11LCR 112. 矩阵中的最长递增路径");
