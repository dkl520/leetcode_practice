import fs from 'fs';

// 生成一个复杂的 costs 数组，例如 n = 1000 个房子, k = 100 种颜色
const n = 1000;
const k = 100;
const costs = [];

for (let i = 0; i < n; i++) {
    const costRow = [];
    for (let j = 0; j < k; j++) {
        costRow.push(Math.floor(Math.random() * 99) + 1); // 生成1到99之间的随机整数
    }
    costs.push(costRow);
}

// 预览前5个房子的成本数组
console.log(costs.slice(0, 5));

// 将生成的成本数组保存为一个文件，便于在 JavaScript 中使用
fs.writeFileSync('complex_costs.json', JSON.stringify(costs), 'utf8');

console.log('Cost array has been saved to complex_costs.json');

