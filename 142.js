function detectCycle(head) {
    if (!head || !head.next) {
        return null; // 链表为空或只有一个节点，无环
    }
    
    let slow = head; // 慢指针，每次前进一步
    let fast = head; // 快指针，每次前进两步
    
    // 判断链表是否有环
    while (fast && fast.next) {
        slow = slow.next; // 慢指针前进一步
        fast = fast.next.next; // 快指针前进两步
        if (slow === fast) {
            break; // 快慢指针相遇，链表有环
        }
    }
    
    if (slow !== fast) {
        return null; // 链表无环
    }
    
    // 找到环的入口节点
    slow = head; // 将慢指针重置为链表头部
    while (slow !== fast) {
        slow = slow.next; // 慢指针和快指针同时前进一步
        fast = fast.next;
    }
    
    return slow; // 返回环的入口节点
}

// 检查链表是否为空或只有一个节点，如果是，则链表无环，直接返回 null。
// 定义慢指针 slow 和快指针 fast，初始值都为链表的头节点 head。
// 使用快慢指针来判断链表是否有环。快指针每次前进两步，慢指针每次前进一步，如果链表有环，它们最终会相遇。
// 如果快慢指针没有相遇，即 slow !== fast，则链表无环，返回 null。
// 如果快慢指针相遇，说明链表有环。
// 将慢指针重置为链表头部，然后再次移动慢指针和快指针。这次它们都每次前进一步，
// 直到它们再次相遇。相遇的节点就是环的入口节点。
// 返回环的入口节点。