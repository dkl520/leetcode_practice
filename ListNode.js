


function listNode(arr) {
    let root = {
        val: Number.NEGATIVE_INFINITY,
        next: null,
    };

    generateList(root, arr)
    function generateList(root, arr) {

        if (arr.length == 0) {
            return;
        }
        let val = arr.shift();
        root.next = {
            val,
            next:null
        }
        root = root.next;
        generateList(root, arr)
    }
    return root.next;
}


export default listNode;
