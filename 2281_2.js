// 定义一个函数 totalStrength，参数为一个数组 strength，代表数字的强度  
// 这段代码实现了一个计算“总强度”的函数。强度数组中的每个元素代表一个数字，这个函数计算了所有数字的强度之和
// 。强度定义为左侧严格小于当前数字的元素数量乘以当前数字，再减去右侧小于等于当前数字的元素数量乘以当前数字。
// 如果左侧或右侧没有元素，对应的数量就默认为0。最后，函数的返回值是所有数字的强度之和取模（mod）后的结果。

function totalStrength(strength) {
    // 定义一个常数 mod，用于取模操作，防止结果过大溢出  
    const mod = BigInt(1e9 + 7); // 注意这里使用了 BigInt 类型，因为数字可能非常大  

    // 获取数组 strength 的长度，即数字的数量  
    const n = strength.length;
    // 定义一个数组 left，用于存储每个数字左侧严格小于它的最近元素位置（-1 表示没有）  
    const left = new Array(n);  // left[i] 为左侧严格小于 strength[i] 的最近元素位置（不存在时为 -1）  
    // 定义一个数组 right，用于存储每个数字右侧小于等于它的最近元素位置（n 表示没有）  
    const right = new Array(n); // right[i] 为右侧小于等于 strength[i] 的最近元素位置（不存在时为 n）  
    // 初始化 right 数组，所有元素填充为 n  
    right.fill(n);
    // 定义一个哨兵数组 st，初始化为 [-1]  
    const st = [-1]; // 哨兵，用于快速找到右侧小于等于当前元素的最近位置  
    // 下面的循环用于预处理 left 和 right 数组  
    for (let i = 0; i < n; i++) {
        // 在 st 中找到第一个小于等于 strength[i] 的元素，然后将其从 st 中弹出，直到找到一个小于 strength[i] 的元素为止  
        while (st.length > 1 && strength[st[st.length - 1]] >= strength[i])
            right[st.pop()] = i;
        // st[st.length - 1] 是小于等于 strength[i] 的最近元素的位置  
        left[i] = st[st.length - 1];
        // 将当前位置 i 加入到哨兵数组中  
        st.push(i);
    }
    // 定义一个变量 s，用于计算前缀和  
    let s = BigInt(0); // 前缀和  
    // 定义一个前缀和数组 ss，用于存储前缀和的前缀和  
    const ss = new Array(n + 2).fill(BigInt(0)); // 前缀和的前缀和  
    // 下面的循环用于计算前缀和的前缀和  
    for (let i = 1; i <= n; ++i) {
        s += BigInt(strength[i - 1]); // 计算前缀和  
        ss[i + 1] = (ss[i] + s) % mod; // 注意取模后，下面计算两个 ss 相减，结果可能为负  
    }
    // 定义一个变量 ans，用于存储最终的结果  
    let ans = BigInt(0);
    // 下面的循环用于计算每个数字的强度并累加到结果中  
    for (let i = 0; i < n; ++i) {
        const l = left[i] + 1, r = right[i] - 1; // [l,r] 是以当前数字为右端点的区间左闭右开  
        // 根据前缀和数组计算强度并累加到结果中  
        let leftX = BigInt(i - l + 1) * (ss[r + 2] - ss[i + 1]);
        let rightX = BigInt(r - i + 1) * (ss[i + 1] - ss[l]);
        const tot = (leftX - rightX) % mod;
        console.log(tot, "ttttttt");
        ans = (ans + BigInt(strength[i]) * tot) % mod; // 累加贡献  
        console.log(BigInt(strength[i]) * tot, "aaaaaaaaa");
    }
    // 最后返回结果时加上 mod，防止算出负数后再取模导致结果错误（例如：(-1) % 1e9 + 7 = -8）  
    return (ans + mod) % mod; // 防止算出负数后取模错误，将结果限制在 [0,mod) 内  
}

let strength = [1, 2, 5, 3];

console.log(totalStrength(strength))