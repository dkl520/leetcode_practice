let a = [-1, 0, 1];



let jsa = JSON.stringify(a);



let b = {};
b[jsa] = 111;

console.log(jsa in b);



debugger