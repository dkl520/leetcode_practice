let edges = [[5, 1], [2, 3], [3, 4], [4, 1], [1, 5]];
  
  edges.sort((a, b) => a[1] - b[1]);
  
  let indexArr = [];
  
  for (let i = 0; i < edges.length - 1; i++) {
    const el1 = edges[i];
    const el2 = edges[i + 1];
    if (el1[1] === el2[1]) {
      indexArr.push(i);
    }
  }
  
  edges = edges.map((v, i) => (indexArr.includes(i) ? null : v)).filter((v) => v !== null);
  
  console.log(edges);
  
  debugger