/**
 * @param {number[]} strength
 * @return {number}
 */
var totalStrength1 = function (strength) {
    let resultArr = new Array();
    let listArr = new Array();
    for (let i = 0; i < strength.length; i++) {
        const el1 = strength[i];
        for (let j = 0; j < listArr.length; j++) {
            const el2 = listArr[j];
            el2.push(el1);
        }
        listArr.push([el1]);
        let copyArr = JSON.parse(JSON.stringify(listArr));
        resultArr.push(...copyArr);
    }

    let results = resultArr.reduce((accAll, v) => {
        accAll += (Math.min(...v)) * (v.reduce((acc, v) => acc + v))
        return accAll;
    }, 0);
    return results % (Math.pow(10, 9) + 7);
};



// let strength = [1, 3, 1, 2];

// console.time("2281. 巫师的总力量和")
// console.log(totalStrength(strength))
// console.timeEnd("2281. 巫师的总力量和")



var totalStrength = function (strength) {
    let listArr = new Array();
    let results = 0;
    for (let i = 0; i < strength.length; i++) {
        const el1 = strength[i];
        listArr = listArr.map(v => {
            let sum = v[0] + el1;
            let min = Math.min(v[1], el1);
            return [sum, min];
        })
        listArr.push([el1, el1]);
        results += listArr.reduce((acc, v) => acc + v[0] * v[1], 0);
    }
    return results % (Math.pow(10, 9) + 7);
};



let strength = [1, 2, 5, 3];
// let strength = [515716246, 870080294, 431335481, 926634238, 460913337, 651211175, 519374881, 940216981, 9588873, 998780625, 243271245, 469031226, 847056547, 515931459, 428862338, 972891012, 801029685, 599837130, 591294043, 742656093, 699007873, 268174322, 876242054, 527393867, 616624093, 138587673, 596105348, 894305001, 491858725, 841020178, 815216895, 788635687, 507623320, 5038099, 9138619, 304564325, 149325290, 294986460, 627957417, 36603341, 757384291, 72901495, 200287154, 256102898, 82507604, 955629237, 137472163, 975958004, 655332433, 725239498, 367861781, 556404663, 455395041, 46770046, 812548016, 112278518, 961246627, 938591169, 698742002, 581465063, 940074540, 424866292, 882319633];
console.time("2281. 巫师的总力量和")
console.log(totalStrength(strength))
console.timeEnd("2281. 巫师的总力量和")











