class Node {
  constructor(elem, next = null) {
    this.elem = elem;
    this.next = next;
  }
}

class SinglyLinkedList {
    #MAGIC_ZERO = 0;
    #size = this.#MAGIC_ZERO;

    constructor(iterables) {
      this.head = null;

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
    this.head = null;
    this.#size = this.#MAGIC_ZERO;
  }

  front() {
    return this.head ? this.head.elem : undefined;
  }

  push_back(elem) {
    if (!this.head) {
      this.head = new Node(elem);
      ++this.#size;
      return;
    }
    let current = this.head;
    while (current.next) current = current.next;
    current.next = new Node(elem);
    ++this.#size;
  }

  pop_back() {
    if (!this.head) {
        return undefined;
    }

    if (!this.head.next) {
      const val = this.head.elem;
      this.head = null;
      --this.#size;
      return val;
    }

    let curr = this.head;
    while (curr.next.next) curr = curr.next;

    const val = curr.next.elem;
    curr.next = null;
    --this.#size;
    return val;
  }

  push_front(elem) {
    this.head = new Node(elem, this.head);
    ++this.#size;
  }

  pop_front() {
    if (!this.head) {
         return undefined;
    }
    const val = this.head.elem;
    this.head = this.head.next;
    --this.#size;
    return val;
  }

  at(index) {
    if (index < this.#MAGIC_ZERO || index >= this.#size) {
        throw new RangeError('Index is not defined:');
    }
    let current = this.head;
    for (let i = 0; i < index; ++i) {
        current = current.next;
    }
    return current.elem;
  }

  insert(index, elem) {
    if (!Number.isInteger(index) || index < 0 || index > this.#size) {
      throw new RangeError("Index out of range");
    }

    if (index === this.#MAGIC_ZERO) {
      this.push_front(elem);
      return;
    }
    if (index === this.#size) {
      this.push_back(elem);
      return;
    }

    let current = this.head;
    for (let i = 0; i < index - 1; ++i) {
        current = current.next;
    }

    current.next = new Node(elem, current.next);
    ++this.#size;
  }

  erase(index) {
    if (!Number.isInteger(index) || index < 0 || index >= this.#size) {
      throw new RangeError("Index out of range");
    }

    if (index === this.#MAGIC_ZERO) {
        return this.pop_front();
    }
    if (index === this.#size - 1) {
        return this.pop_back();
    }

    let current = this.head;
    for (let i = 0; i < index - 1; ++i) {
        current = current.next;
    }

    const removed = current.next;
    current.next = removed.next;
    --this.#size;
    return removed.elem;
  }

  reverse() {
    let prev = null;
    let curr = this.head;
    while (curr) {
      const next = curr.next;
      curr.next = prev;
      prev = curr;
      curr = next;
    }
    this.head = prev;
  }

  toArray() {
    const arr = [];
    for (let curr = this.head; curr; curr = curr.next) {
        arr.push(curr.elem);
    }
    return arr;
  }

  static fromArray(iterable) {
        const list = new SinglyLinkedList();
        if (iterable == null) return list;

        const isIterable = typeof iterable?.[Symbol.iterator] === "function";
        const treatAsSingle = typeof iterable === "string" || !isIterable;

        if (treatAsSingle) {
            list.push_back(iterable);
        } else {
            for (const elem of iterable) list.push_back(elem);
        }
        return list;
  }

  [Symbol.iterator]() {
    let curr = this.head;
    return {
      next() {
        if (curr) {
          const value = curr.elem;
          curr = curr.next;
          return { value, done: false };
        }
        return { value: undefined, done: true };
      },
        [Symbol.iterator]() {
         return this; 
        }
    };
  }

  remove(value, equals) {
    const eq = typeof equals === 'function' ? equals : Object.is;

    let removed = this.#MAGIC_ZERO;

    while (this.head && eq(this.head.elem, value)) {
        const old = this.head;
        this.head = this.head.next;
        old.next = null; 
        --this.#size;
        ++removed;
    }

    if (!this.head) {
      return removed;
    }

    let curr = this.head;
    while (curr.next) {
        if (eq(curr.next.elem, value)) {
        const del = curr.next;
        curr.next = del.next; 
        del.next = null;         
        --this.#size;
        ++removed;
    } else {
      curr = curr.next;
    }
  }

    return removed;
  }

  sort(cmp) {
    cmp = typeof cmp === 'function' ? cmp : (a, b) => a - b;

    const merge = (left, right, cmp) => {
      const dummy = new Node(null);

      let current = dummy;

      while (left && right) {
        if (cmp(left.elem, right.elem) <= 0) {
          current.next = left;
          left = left.next;
        } else {
          current.next = right;
          right = right.next;
        }
        current = current.next;
      }

      current.next = left || right;

      return dummy.next;
    }
    const merge_sort = (head ,cmp) => {
      if (!head || !head.next) {
        return head;
      }

      let slow = head;
      let fast = head.next;

      while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
      }

      const mid = slow.next;
      slow.next = null;

      const left = merge_sort(head, cmp);
      const right = merge_sort(mid, cmp);

      return merge(left, right, cmp); 
    }
    this.head = merge_sort(this.head, cmp);
  }
  
  merge_list(other, cmp) {
    if (!(other instanceof SinglyLinkedList)) {
      throw new TypeError("Argument must be a SinglyLinkedList");
    }

    cmp = typeof cmp === "function" ? cmp : (a, b) => a - b;

    if (!this.head) {
      this.head = other.head;
    } else {
      let curr = this.head;
      while (curr.next) {
        curr = curr.next;
      }
      curr.next = other.head;
    }

    this.#size += other.#size;


    this.sort(cmp);
  }

}

let s = new SinglyLinkedList([5, 6, 7, 4, 1 , 2]);
let s1 = new SinglyLinkedList([1, 3, 5, 6, 8, 11]);
console.log([...s]);

s.sort();
s.merge(s1);
console.log([...s]);
