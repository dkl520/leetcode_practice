// 定义一个memoize装饰器函数，用于缓存函数调用的结果  
function memoize(target, property, descriptor) {  
    // 获取被装饰函数的原始实现  
    const originalMethod = descriptor.value;  
    // 创建一个Map对象用于存储缓存结果，键是函数参数的序列化字符串，值是函数调用的结果  
    const cache = new Map();  
    // 修改被装饰函数的实现，添加缓存逻辑  
    descriptor.value = function (...args) {  
        // 将函数参数转换为字符串作为缓存的键  
        const key = JSON.stringify(args);  
        // 检查缓存中是否已存在该键对应的值  
        if (!cache.has(key)) {  
            // 如果不存在，则调用原始函数，并将结果存储到缓存中  
            const result = originalMethod.apply(this, args); 
            debugger
            cache.set(key, result);  
        }  
        // 返回缓存中的结果或原始函数的计算结果  
        return cache.get(key);  
    };  
    
    // 返回修改后的描述符对象  
    return descriptor;  
}  
  
// 定义一个Calculator类，包含一个计算斐波那契数列的函数  
class Calculator {  
    // 使用memoize装饰器来缓存fibonacci函数的计算结果  
    @memoize  
    fibonacci(n) {  
        // 斐波那契数列的递归实现  
        if (n <= 1) return n;  
        return this.fibonacci(n - 1) + this.fibonacci(n - 2);  
    }  
}  
  
// 创建一个Calculator实例  
const calculator = new Calculator();  
// 计算斐波那契数列的第40项，由于memoize装饰器的存在，计算会被缓存，从而提高后续相同参数调用的效率  
console.log("支持吗？？"+calculator.fibonacci(40)); // 快速计算，因为结果被缓存

// memoize装饰器：这是一个用于函数的高阶函数，它接受三个参数：目标对象target、属性名property和属性描述符descriptor。
// 装饰器修改descriptor.value（即被装饰的方法），加入缓存逻辑
// 当方法被调用时，它会先检查是否已缓存了相同参数的结果。如果已缓存，则直接返回缓存结果；否则，调用原始方法，将结果缓存后返回。
// Calculator类：定义了一个fibonacci方法，用于计算斐波那契数列。由于递归调用，直接计算较大的数会非常耗时。
// 通过@memoize装饰器，该方法的结果被缓存，从而避免了重复计算。
// 缓存机制：使用Map对象来存储缓存结果，其中键是函数参数的序列化字符串（通过JSON.stringify实现），值是函数调用的结果。
// 这种方式适用于参数为简单类型（如数字、字符串等）的情况。对于复杂对象或数组，可能需要更复杂的键生成策略来确保缓存的正确性。
// 性能提升：对于递归或计算量大的函数，缓存结果可以显著提高性能，特别是在多次调用相同参数的情况下。在斐波那契数列的计算中，
// 许多中间结果会被重复计算，通过缓存可以避免这种不必要的重复计算。