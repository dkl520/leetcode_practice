class MaxStack {
    constructor() {
      this.stack = [];
      this.maxStack = [];
    }
  
    push(val) {
      this.stack.push(val);
  
      if (this.maxStack.length === 0 || val >= this.maxStack[this.maxStack.length - 1]) {
        this.maxStack.push(val);
      }
    }
  
    pop() {
      if (this.stack.length === 0) {
        return null;
      }
  
      const val = this.stack.pop();
  
      if (val === this.maxStack[this.maxStack.length - 1]) {
        this.maxStack.pop();
      }
  
      return val;
    }
  
    top() {
      if (this.stack.length === 0) {
        return null;
      }
  
      return this.stack[this.stack.length - 1];
    }
  
    getMax() {
      if (this.maxStack.length === 0) {
        return null;
      }
  
      return this.maxStack[this.maxStack.length - 1];
    }
  
    isEmpty() {
      return this.stack.length === 0;
    }
  
    size() {
      return this.stack.length;
    }
  }