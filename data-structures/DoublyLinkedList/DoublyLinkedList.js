class Node {
  constructor(data, next = null, prev = null) {
    this.data = data;
    this.prev = prev;
    this.next = next;
  }
}

class DoublyLinkedList {
  #head = null;
  #tail = null;
  #MAGIC_ZERO = 0;
  #MAGIC_ONE = 1;
  #MAGIC_TWO = 2;
  #size = this.#MAGIC_ZERO;

  constructor(iterables) {
    if (iterables == null) {
        return;
    }

    const isIterable = (obj) => {
        return obj != null && typeof obj[Symbol.iterator] === "function";
    }
    const treatAsSingle = typeof iterables === "string" || !isIterable(iterables);

    if (treatAsSingle) {
      this.push_back(iterables);
    } else {
      for (const elem of iterables) {
        this.push_back(elem);
      }
    }
  }

  size() {
    return this.#size;
  }

  isEmpty() {
    return this.#size === this.#MAGIC_ZERO;
  }

  clear() {
    this.#head = this.#tail = null;
    this.#size = this.#MAGIC_ZERO;
  }

  push_back(elem) {
    const node = new Node(elem);
    if (!this.#size) {
      this.#head = this.#tail = node;
    } else {
      node.prev = this.#tail;
      this.#tail.next = node;
      this.#tail = node;
    }
    ++this.#size;
  }

  push_front(elem) {
    const node = new Node(elem);
    if (!this.#size) {
      this.#head = this.#tail = node;
    } else {
      node.next = this.#head;
      this.#head.prev = node;
      this.#head = node;
    }
    ++this.#size;
  }

  pop_back() {
    if (!this.#size) {
      return undefined;
    }

    const oldTail = this.#tail;
    const value = oldTail.data;

    if (this.#size > this.#MAGIC_ONE) {
      this.#tail = oldTail.prev;
      this.#tail.next = null;

      oldTail.prev = null;
      oldTail.next = null;
    } else {
      this.#head = this.#tail = null;
    }

    --this.#size;
    return value;
  }

  pop_front() {
    if (!this.#size) {
      return undefined;
    }

    const oldHead = this.#head;
    const value = oldHead.data;

    if (this.#size > this.#MAGIC_ONE) {
      this.#head = oldHead.next;
      this.#head.prev = null;

      oldHead.next = null;
      oldHead.prev = null;
    } else {
      this.#head = this.#tail = null;
    }

    --this.#size;
    return value;
  }

  front() {
    return this.#head ? this.#head.data: null;
  }

  back() {
    return this.#tail ? this.#tail.data : null;
  }

  at(index) {
    if (!Number.isInteger(index) || index < 0 || index >= this.#size) {
        throw new RangeError('Index out of range');
    }

    if (index <= (this.#size >> 1)) {
        let curr = this.#head;
        for (let i = 0; i < index; ++i) {
            curr = curr.next;
        }
        return curr.data;
    }

    let curr = this.#tail;
    for (let i = this.#size - 1; i > index; --i) {
        curr = curr.prev;
    }
    return curr.data;
  }

  insert(index, value) {
    if (!Number.isInteger(index) || index < 0 || index > this.#size) {
        throw new RangeError('Index out of range');
    }
    if (index === this.#size) {
        this.push_back(value);
        return;
    }
    if (index === this.#MAGIC_ZERO) {
        this.push_front(value);
        return;
    }

    let indexNode;
        if (index <= (this.#size >> 1)) {
        indexNode = this.#head;
        for (let i = 0; i < index; ++i) {
            indexNode = indexNode.next;
        }
    } else {
        indexNode = this.#tail;
        for (let i = this.#size - 1; i > index; --i) {
            indexNode = indexNode.prev;
        }
    }

    const node = new Node(value);
    node.next = indexNode;
    node.prev = indexNode.prev;
    indexNode.prev.next = node;
    indexNode.prev = node;

    ++this.#size;
  } 

  erase(index) {
    if (!Number.isInteger(index) || index < 0 || index >= this.#size) {
      throw new RangeError('Index out of range');
    }

    if (index === this.#MAGIC_ZERO) {
      return this.pop_front();
    }
    if (index === this.#size - this.#MAGIC_ONE) {
      return this.pop_back();
    }

    let curr = null;
    if (index <= (this.#size >> 1)) {
      curr = this.#head;
      for (let i = 0; i < index; ++i) { 
        curr = curr.next;
      }
    } else {
      curr = this.#tail;
      for (let i = this.#size - 1; i > index; --i) {
        curr = curr.prev;
      }
    }

    const value = curr.data;
    const prev = curr.prev;
    const next = curr.next;

    prev.next = next;
    next.prev = prev;

  
    curr.prev = null;
    curr.next = null;

    --this.#size;
    return value;
  }

  reverse() {
    if (this.#size < this.#MAGIC_TWO) {
      return;
    }

    let current = this.#head;
    while (current) {
      const next = current.next;
      current.next= current.prev;
      current.prev = next;
      current = next;
    }

    const tmp = this.#head;
    this.#head = this.#tail;
    this.#tail = tmp;
  }

  remove(value, equals) {
    const eq = typeof equals === "function" ? equals : Object.is;

    let removed = 0;
    let curr = this.#head;

    while (curr) {
      const next = curr.next;

      if (eq(curr.data, value)) {
        const prev = curr.prev;

        if (prev) {
          prev.next = next; 
        } else {
          this.#head = next;
        }
        if (next) {
          next.prev = prev;
        } else {
          this.#tail = prev;
        }

        curr.prev = null;
        curr.next = null;

        --this.#size;
        ++removed;
      }

      curr = next;
    }

    return removed;
  }

  sort(compareFn) {
    const cmp = typeof compareFn === "function" ? compareFn : (a, b) => a - b;

    const split = (head) => {
      let slow = head;
      let fast = head;
      while (fast.next && fast.next.next) {
        slow = slow.next;
        fast = fast.next.next;
      }
      const middle = slow.next;
      slow.next = null;
      if (middle) {
        middle.prev = null;
      }
      return middle;
    };

    const merge = (left, right) => {
      const dummy = new Node(null);
      let curr = dummy;
      while (left && right) {
        if (cmp(left.data, right.data) <= 0) {
          curr.next = left;
          left.prev = curr;
          left = left.next;
        } else {
          curr.next = right;
          right.prev = curr;
          right = right.next;
        }
        curr = curr.next;
      }
      curr.next = left || right;
      if (curr.next) {
        curr.next.prev = curr;
      }
      const head = dummy.next;
      if (head) {
        head.prev = null;
      }
      return head;
    };

    const mergeSort = (head) => {
      if (!head || !head.next) return head;
      const middle = split(head);
      const left = mergeSort(head);
      const right = mergeSort(middle);
      return merge(left, right);
    };

    this.#head = mergeSort(this.#head);

    let tail = this.#head;
    while (tail && tail.next) {
      tail = tail.next;
    }
    this.#tail = tail;
  }

  [Symbol.iterator]() {
    let current = this.#head;
    return {
      next() {
        if (current) {
          const value = current.data;
          current = current.next;
          return { value, done: false };
        }
        return { value: undefined, done: true };
      },
      [Symbol.iterator]() {
        return this;
      }
    };
  }
}

// ======== TEST SECTION ========
function testDoublyLinkedList() {
  console.log("🔍 Running DoublyLinkedList tests...\n");

  const list = new DoublyLinkedList([1, 2, 3]);
  console.log("Initial:", [...list]);

  // push_front / push_back
  list.push_front(0);
  list.push_back(4);
  console.log("After push_front(0), push_back(4):", [...list]);

  // pop_front / pop_back
  console.log("pop_front():", list.pop_front());
  console.log("pop_back():", list.pop_back());
  console.log("After pops:", [...list]);

  // insert
  list.insert(1, 99);
  console.log("After insert(1, 99):", [...list]);

  // erase
  console.log("erase(1):", list.erase(1));
  console.log("After erase:", [...list]);

  // at / front / back
  console.log("front():", list.front(), "| back():", list.back(), "| at(0):", list.at(0));

  // remove
  const removeList = new DoublyLinkedList([5, 1, 5, 2, 5, 3]);
  console.log("\nBefore remove(5):", [...removeList]);
  console.log("Removed count:", removeList.remove(5));
  console.log("After remove(5):", [...removeList]);

  // reverse
  const rev = new DoublyLinkedList([1, 2, 3, 4]);
  console.log("\nBefore reverse:", [...rev]);
  rev.reverse();
  console.log("After reverse:", [...rev]);

  // sort
  const unsorted = new DoublyLinkedList([9, 1, 5, 3, 2, 8]);
  console.log("\nBefore sort:", [...unsorted]);
  unsorted.sort();
  console.log("After sort:", [...unsorted]);

  // iteration
  const iter = new DoublyLinkedList(["A", "B", "C"]);
  console.log("\nIterating with for...of:");
  for (const item of iter) {
    console.log(" →", item);
  }

  console.log("\n✅ All manual tests completed successfully!");
}

testDoublyLinkedList();
