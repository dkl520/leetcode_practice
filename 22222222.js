

function plusMult(A) {
    // Write your code here
    let reven = []
    let rodd = []

    for (let i = 0; i < A.length; i++) {
        if (i % 2 == 0) {
            reven.push(A[i]);
        } else {
            rodd.push(A[i]);
        }
    }
    let resultAeven = BigInt(reven[0]);
    let resultAodd = BigInt(rodd[0]);
    let swith = 1;

    for (let i = 1; i < rodd.length; i++) {
        const el = BigInt(rodd[i]);
        if (swith) {
            resultAodd *= el;
            swith = 0;
        } else {
            resultAodd += el;
            swith = 1;
        }
        resultAodd = resultAodd % 2n == 0n ? 2n : 1n;
    }
    swith = 1;
    for (let i = 1; i < reven.length; i++) {
        const el = BigInt(reven[i]);
        if (swith) {
            resultAeven *= el;
            swith = 0;
        } else {
            resultAeven += el;
            swith = 1;
        }
        resultAeven = resultAeven % 2n == 0n ? 2n : 1n;
    }
    resultAodd = resultAodd % 2n;
    resultAeven = resultAeven % 2n;
    if (resultAeven == resultAodd) {
        return "NEUTRAL"
    }

    if (resultAeven > resultAodd) {
        return "EVEN"
    } else {
        return "ODD"
    }
}

let arr = [1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10];


console.log(plusMult(arr))



// function calculateTikTokShoppingCost(vouchersCount, prices) {
//     // Write your code here
//     prices.sort((a, b) => a - b);
//     let step = vouchersCount;
//     while (step > 0) {
//         let num = prices.pop();
//         let coundedNum = parseInt(num / 2);
//         step--;
//         prices.push(coundedNum);
//         prices.sort((a, b) => a - b);

//     }
    
//     let result = 0;
//     result= prices.reduce((acc, v) => acc += v);
//     return result;


// }

// let vouchersCount = 3;
// let prices = [8, 2, 13];
// console.log(
//     calculateTikTokShoppingCost(vouchersCount, prices)
// )



