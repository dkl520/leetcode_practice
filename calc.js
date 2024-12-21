

function calc(){
    for (let i = 1000; i < 10000; i++) {
        let reverseNum = Number( i.toString().split('').reverse().join(''));
        if (i * 4 == reverseNum){
            return i;
        }
    }
}
console.time("calc")
console.log(
    calc()
)
console.timeEnd("calc")


