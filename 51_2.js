/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function (n) {
    const a = new Array(14).fill(0);
    let sum = 0;
    let upperlim = (1 << n) - 1;
    let results = new Array()
    const ps = (a) => {
        switch (a) {
            case 1: return 1;
            case 2: return 2;
            case 4: return 3;
            case 8: return 4;
            case 16: return 5;
            case 32: return 6;
            case 64: return 7;
            case 128: return 8;
            case 256: return 9;
            case 512: return 10;
            case 1024: return 11;
            case 2048: return 12;
            case 4096: return 13;
            default: return 0;
        }
    };
    function getLine(position, n) {
        let line = new Array(n).fill('.');
        line[position - 1] = 'Q';
        return line.join('');
    }
    const test = (row, ld, rd, deep) => {
        let pos, p;

        // 如果当前行号不等于上限值，则继续递归  
        if (row !== upperlim) {
            // 计算当前可以放置的位置pos  
            pos = upperlim & ~(row | ld | rd);

            // console.log((~(row | ld | rd)).toString(2), (row | ld | rd).toString(2), "取反")
            // console.log(toBinaryString(pos, n), pos, 'pos');
            // 把它们三个并起来，得到该行所有的禁位，取反后就得到所有可以放的位置（
            // 遍历所有可能的位置  
            while (pos !== 0) {
                // 获取pos的最低位的1代表的数（即下一个可能的放置位置的第一个）  
                p = pos & -pos;
                // 更新pos，排除已经考虑过的位置  
                pos -= p;
                a[deep] = p;
                // 递归调用test函数，更新参数以考虑新的位置p  
                // 
                test(row + p, (ld + p) << 1, (rd + p) >> 1, deep + 1);
            }
        } else {
            //  如果达到上限值，则增加sum的计数  
            sum++;
            let resultOne = new Array();
            // 如果sum小于等于3，则将数组a中的元素（除了第一个元素）通过ps函数处理后写入文件  
            for (let i = 1; i <= n; i++) {
                let lineString = getLine(ps(a[i]), n);
                resultOne.push(lineString);
            }
            results.push(resultOne);
        }
    }
    test(0, 0, 0, 1);
    return results;                                 

 };

console.time("N皇后")
console.log(solveNQueens(4));
console.timeEnd("N皇后")