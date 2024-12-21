/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */

class ElementNum {
    constructor(i, j, value, weights, matrixIndex) {
        this.i = i;
        this.j = j;
        this.value = value;
        this.weights = weights;
        this.matrixIndex = matrixIndex;
        this.maybeList = [];
    }
}
class Sudoku {
    constructor() {
        this.board = []
        this.group = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
        this.pointMatrix = new Array();
        this.index = 0;
        this.matrixObj = new Array();
    }
    solveSudoku(board) {
        this.board = board;
        this.matrixObj = this.initMatrix(board);
        this.pointMatrix = this.matrixObj.filter(({ value }) => value == ".");
        let firstElement = this.pointMatrix[0];
        firstElement.maybeList = this.group.filter((v) => !firstElement.weights.includes(v));
        this.stetBackTracks(firstElement, board);
        return board;
    }
    stetBackTracks(initObj, board) {
        if (this.index === this.pointMatrix.length) {
            return true;
        }
        let { i, j, maybeList, matrixIndex } = initObj;
        for (let index = 0; index < maybeList.length; index++) {
            const element = maybeList[index];
            board[i][j] = element;
            this.index++;
            this.calcMatrixObj(i, j, element);
            this.calcNextMaybeList(i, j, matrixIndex, element);
            this.stetBackTracks(this.pointMatrix[this.index], board)
            if (this.index === this.pointMatrix.length) {
                return true
            }
            board[i][j] = ".";
            this.reverseMatrixObj(i, j, element);
            this.calcNextMaybeList(i, j, matrixIndex, element);
            this.index--;
        }
        return false;
    }
    calcNextMaybeList() {
        if (this.index >= this.pointMatrix.length) {
            return;
        }
        let { i, j, maybeList, matrixIndex, weights } = this.pointMatrix[this.index];
        weights = this.matrixObj.filter((v) => {
            if ((v.i === i || v.j === j || v.matrixIndex == matrixIndex) && v.value !== ".") {
                return v;
            }
        }).map(({ value }) => value);
        weights = [...new Set(weights)];
        this.pointMatrix[this.index].weights = weights;
        this.pointMatrix[this.index].maybeList = this.group.filter((v) => !weights.includes(v));
    }
    calcMatrixObj(row, col, element) {
        for (let index = 0; index < this.matrixObj.length; index++) {
            const { i, j } = this.matrixObj[index];
            if (row === i && j === col) {
                this.matrixObj[index].value = element;
            }
        }
    }
    reverseMatrixObj(row, col, element) {
        for (let index = 0; index < this.matrixObj.length; index++) {
            const { i, j } = this.matrixObj[index];
            if (row === i && j === col) {
                this.matrixObj[index].value = ".";
            }
        }
    }
    initMatrix(board) {
        const m = board.length;
        const n = board[0].length;
        let matrixObj = [];
        for (let i = 0; i < m; i++) {
            const row = board[i];
            for (let j = 0; j < n; j++) {
                const element = row[j];
                const matrixIndex = this.calcMatrix(i, j, m);
                let newElement = new ElementNum(i, j, element, [], matrixIndex);
                matrixObj.push(newElement);
            }
        }
        return matrixObj;
    }
    calcMatrix(i, j, length) {
        const col = Math.floor(j / 3);
        const wide = Math.floor(length / 3);
        const row = Math.floor(i / 3);
        const matrixIndex = col + row * wide;
        return matrixIndex;
    }
}





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
let result = new Sudoku().solveSudoku(board);

console.log(result);

console.timeEnd("数独计算");



// let obj= new Sudoku();
// solveSudoku = obj.solveSudoku.bind(obj)


// const time = Date.now();
// import fs from "fs";

// // 将数组转换为JSON字符串
// const jsonData = JSON.stringify(result);

// // 将JSON字符串写入文件
// fs.writeFile(`数独${time}.json`, jsonData, 'utf8', (err) => {
//     if (err) {
//         console.error('写入文件时发生错误:', err);
//         return;
//     }
//     console.log('JSON文件已成功生成！');
// });