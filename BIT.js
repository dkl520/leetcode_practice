class BIT {
    constructor(size) {
        this.size = size;
        this.tree = new Array(size + 1).fill(0);
    }

    update(index, delta) {
        while (index <= this.size) {
            this.tree[index] += delta;
            index += index & -index;
        }
    }
    query(index) {
        let sum = 0;
        while (index >= 0) {
            sum += this.tree[index];
            index -= index & -index;
        }
    }
}