javascript
class Solution { // 定义一个名为Solution的类  
    constructor() { // 类的构造函数  
        this.line = new Array(9).fill(0); // 创建一个长度为9的数组，所有元素初始化为0。这个数组用来记录每行每个数字的开关状态。  
        this.column = new Array(9).fill(0); // 创建一个长度为9的数组，所有元素初始化为0。这个数组用来记录每列每个数字的开关状态。  
        this.block = Array.from(Array(3), () => new Array(3).fill(0)); // 创建一个3x3的二维数组，所有元素初始化为0。这个数组用来记录每个3x3子网格中每个数字的开关状态。  
        this.valid = false; // 设置初始状态为无效，表示数独没有被正确填充。  
        this.spaces = []; // 创建一个数组用来存储空格的位置。  
    }  
  
    solveSudoku(board) { // 定义一个方法用来解决数独。参数是一个9x9的数独网格。  
        for (let i = 0; i < 9; i++) { // 遍历数独的行。  
            for (let j = 0; j < 9; j++) { // 遍历数独的列。  
                if (board[i][j] === ".") { // 如果当前位置是空格，  
                    this.spaces.push([i, j]); // 将空格的位置加入到空格数组中。  
                } else { // 如果当前位置不是空格，  
                    const digit = parseInt(board[i][j]) - 1; // 将当前位置的数字转为整数并减去1（因为数字是从1开始的，而数组索引是从0开始的）。  
                    this.flip(i, j, digit); // 将当前位置的数字加入到对应的行、列和3x3子网格中。  
                }  
            }  
        }  
  
        this.dfs(board, 0); // 从第一个空格开始进行深度优先搜索。  
        return board; // 返回解决后的数独网格。  
    }  
  
    dfs(board, pos) { // 定义一个方法进行深度优先搜索。参数是当前的数独网格和当前空格的位置。  
        if (pos === this.spaces.length) { // 如果已经遍历到最后一个空格，  
            this.valid = true; // 设置状态为有效，表示数独可以被解决。  
            return; // 结束方法。  
        }  
  
        const space = this.spaces[pos]; // 获取当前空格的位置。  
        const i = space[0]; // 获取当前空格的行索引。  
        const j = space[1]; // 获取当前空格的列索引。  
        let mask = ~(this.line[i] | this.column[j] | this.block[Math.floor(i / 3)][Math.floor(j / 3)]) & 0x1ff; // 创建一个掩码，用来排除已经确定的数字。  
  
        while (mask !== 0 && !this.valid) { // 当还有可能的选择并且数独还没有被解决时，  
            const digitMask = mask & -mask; // 找到mask中第一个置位的位，即对应的数字。  
            const digit = Math.log2(digitMask); // 将该数字转为对数并加1（因为数字是从1开始的）。  
            this.flip(i, j, digit); // 将该数字加入到对应的行、列和3x3子网格中。  
            board[i][j] = String.fromCharCode(digit + 49); // 在数独网格中将该数字填入当前空格。  
            this.dfs(board, pos + 1); // 对下一个空格进行深度优先搜索。  
            this.flip(i, j, digit); // 将该数字从对应的行、列和3x3子网格中移除，回溯到上一步。  
            mask &= mask - 1; // 将mask中已经确定的位清零，准备下一次循环。  
        }  
    }  
  
    flip(i, j, digit) {  // 定义一个名为 'flip' 的函数，接受三个参数：行索引 i、列索引 j 和数字 digit。  
        this.line[i] ^= 1 << digit;  // 将数字 digit 加入到行 i 的开关状态数组中。使用异或运算符 ^ 和位移运算符 << 来翻转和选择需要翻转的位。  
        this.column[j] ^= 1 << digit;  // 将数字 digit 加入到列 j 的开关状态数组中。同样的，使用异或运算符 ^ 和位移运算符 << 来翻转和选择需要翻转的位。  
        this.block[Math.floor(i / 3)][Math.floor(j / 3)] ^= 1 << digit;  // 将数字 digit 加入到 3x3 子网格中。首先计算所在的 3x3 子网格的索引，然后使用同样的方式将数字加入到开关状态数组中。  
    }  // 结束函数定义
}

// Example usage:
const solution = new Solution();

let board =
    [[".", ".", "9", "7", "4", "8", ".", ".", "."],
    ["7", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", "2", ".", "1", ".", "9", ".", ".", "."],
    [".", ".", "7", ".", ".", ".", "2", "4", "."],
    [".", "6", "4", ".", "1", ".", "5", "9", "."],
    [".", "9", "8", ".", ".", ".", "3", ".", "."],
    [".", ".", ".", "8", ".", "3", ".", "2", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", "6"],
    [".", ".", ".", "2", "7", "5", "9", ".", "."]];


console.time("数独计算");
solution.solveSudoku(board);

console.timeEnd("数独计算");