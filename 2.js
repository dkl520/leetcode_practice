var addTwoNumbers = function(l1, l2) {
    var pre = new ListNode(0);
    var cur = pre;
    var carry = 0;
    while (l1 !== null || l2 !== null) {
        var x = l1 === null ? 0 : l1.val;
        var y = l2 === null ? 0 : l2.val;
        var sum = x + y + carry;

        carry = Math.floor(sum / 10);
        sum = sum % 10;
        cur.next = new ListNode(sum);

        cur = cur.next;
        if (l1 !== null)
            l1 = l1.next;
        if (l2 !== null)
            l2 = l2.next;
    }
    if (carry === 1) {
        cur.next = new ListNode(carry);
    }
    return pre.next;
};