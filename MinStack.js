// 定义一个名为 MinStack 的类  

// 这个实现保持了一个“最小堆栈”，该堆栈存储了到当前为止插入的最小值。当我们插入一个新值时，
// \我们将新值与堆栈顶部的最小值进行比较。如果新值小于或等于堆栈顶部的最小值，那么我们将新值添加到堆栈中。
// 当我们弹出一个值时，如果弹出的值是当前的最小值，
// 那么我们也将最小堆栈的顶部元素弹出。这样，我们就可以在常数时间内获取栈中的最小值。
class MinStack {  
    // 构造函数，初始化一个空数组用于存储数据，称为 this.stack，和一个空数组用于存储最小值，称为 this.minStack  
    constructor() {  
        this.stack = new Array(); // 初始化 this.stack  
        this.minStack = new Array(); // 初始化 this.minStack  
    }  
    // push 方法，用于向 this.stack 中添加元素 val  
    push(val) {  
        // 将 val 添加到 this.stack 数组的末尾  
        this.stack.push(val);   
        // 如果 this.minStack 数组为空，或者 val 小于等于 this.minStack 数组的顶部元素，那么将 val 添加到 this.minStack 数组的末尾  
        if (this.minStack.length === 0 || val <= this.minStack[this.minStack.length - 1]) {  
            this.minStack.push(val);  
        }  
    }  
    // pop 方法，用于从 this.stack 中移除顶部元素并返回它  
    pop() {  
        // 如果 this.stack 的顶部元素等于 this.minStack 的顶部元素，那么也将 this.minStack 的顶部元素弹出  
        if (this.stack[this.stack.length - 1] === this.minStack[this.minStack.length - 1]) {  
            this.minStack.pop();  
        }  
        // 弹出 this.stack 的顶部元素  
        this.stack.pop();  
    }  
    // top 方法，用于返回 this.stack 的顶部元素，但不移除它  
    top() {  
        return this.stack[this.stack.length - 1]; // 返回 this.stack 的顶部元素  
    }  
    // getMin 方法，用于返回 this.minStack 的顶部元素，即当前栈中的最小值  
    getMin() {  
        return this.minStack[this.minStack.length - 1]; // 返回 this.minStack 的顶部元素  
    }  
}