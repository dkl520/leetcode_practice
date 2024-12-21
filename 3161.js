/**
 * @param {number[][]} queries
 * @return {boolean[]}
 */
class FenwickTree {
    constructor(n) {
        this.size = n;
        this.cnt = new Array(n + 1).fill(0);
    }
    lowBit(x) {
        return x & (-x);
    }
    query(rank) {
        if (rank == 0) {
            return 0;
        }
        let ans = 0;
        while (rank > 0) {
            ans += this.cnt[rank];
            rank -= this.lowBit(rank);
        }
        return ans;
    }
    update(rank, num) {
        while (rank <= this.size) {
            this.cnt[rank] += num;
            rank += this.lowBit(rank);
        }
    }
}




var getResults = function (queries) {
    let max = 0;

    for (let query of queries) {
        max = Math.max(max, query[1]);
    }

    let tree = new FenwickTree(max);
    let result = [];
    for (const query of queries) {
        if (query[0] == 1) {
            tree.update(query[1], 1);
        } else {
            let end = query[1];
            let length = query[2];
            let amount = -1;

            for (let right = length; right <= end; right++) {
                amount = tree.query(right - 1) - tree.query(right - length);
                if(amount==0){
                    break;
                }
            }
            if (amount == -1) {
                result.push(false)
            } else if (amount == 0) {
                result.push(true);
            } else {
                result.push(false);
            }
        }
    }


    return result;


};


let queries = [[1, 3], [2, 4, 2]];
console.log(
    getResults(queries)
);
