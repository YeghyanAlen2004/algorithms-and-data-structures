class PriorityQueue {
  #heap;
  #cmp;

  constructor(cmp = (a, b) => a - b) {
    this.#heap = [];
    this.#cmp = cmp;
  }


  //---helpers---

  _parent(index) {
    return Math.floor((index - 1) / 2);
  }

  _left(index) {
    return 2 * index + 1;
  }

  _right(index) {
    return 2 * index + 2;
  }

  _shiftUp(index) {
    while (index > 0) {
      const parent = this._parent(index);
      if (this.#cmp(this.#heap[index], this.#heap[parent]) < 0) {
        [this.#heap[index], this.#heap[parent]] = [this.#heap[parent], this.#heap[index]];
        index = parent;
      } else break;
    }
  }

  _shiftDown(index) {
    const length = this.#heap.length;
    while (true) {
      const left = this._left(index);
      const right = this._right(index);

      if (left >= length) break;

      let smallerChild = left;
      if (right < length && this.#cmp(this.#heap[right], this.#heap[left]) < 0)
        smallerChild = right;

      if (this.#cmp(this.#heap[index], this.#heap[smallerChild]) > 0) {
        [this.#heap[index], this.#heap[smallerChild]] = [this.#heap[smallerChild], this.#heap[index]];
        index = smallerChild;
      } else break;
    }
  }

  //---interfaces---

  size() {
    return this.#heap.length;
  }

  isEmpty() {
    return this.size() === 0;
  }

  clear() {
    this.#heap.length = 0;
  }

  peek() {
    if (this.isEmpty()) throw new Error('Priority Queue is empty');
    return this.#heap[0];
  }

  pop() {
    if (this.isEmpty()) throw new Error('Priority Queue is empty');
    const root = this.#heap[0];
    const end = this.#heap.pop();
    if (!this.isEmpty()) {
      this.#heap[0] = end;
      this._shiftDown(0);
    }
    return root;
  }

  push(value) {
    this.#heap.push(value);
    this._shiftUp(this.size() - 1);
  }

  print() {
    console.log("Heap:", this.#heap.join(", "));
  }

}

function testPQ(PQ) {
  const log = (...a) => console.log(...a);
  const cmp = (a, b) => a - b;
  const eq = (a, b) => a.length === b.length && a.every((x, i) => x === b[i]);
  const popAll = q => { const r = []; while (!q.isEmpty()) r.push(q.pop()); return r };

  function test(name, fn) {
    log("────────", name, "────────");
    try { fn(); log("✅", name); } catch (e) { log("❌", name, e.message); }
  }

  test("basic", () => {
    const q = new PQ();
    [5, 1, 2, 3, 4, 60].forEach(x => q.push(x));
    const out = popAll(q);
    if (!eq(out, [1, 2, 3, 4, 5, 60])) throw Error("wrong order");
  });

  test("negatives", () => {
    const q = new PQ();
    [0, -1, -5, 7, -3, 2, 0, -2].forEach(x => q.push(x));
    const out = popAll(q);
    const exp = [-5, -3, -2, -1, 0, 0, 2, 7];
    if (!eq(out, exp)) throw Error("neg fail");
  });

  test("duplicates", () => {
    const q = new PQ();
    [3, 3, 3, 2, 2, 1, 1].forEach(x => q.push(x));
    const out = popAll(q);
    if (!eq(out, [1, 1, 2, 2, 3, 3, 3])) throw Error("dup fail");
  });

  test("maxHeap", () => {
    const q = new PQ((a, b) => b - a);
    [5, 1, 2, 3, 4, 60].forEach(x => q.push(x));
    const out = popAll(q);
    if (!eq(out, [60, 5, 4, 3, 2, 1])) throw Error("max fail");
  });

  test("clear", () => {
    const q = new PQ();
    [9, 8, 7].forEach(x => q.push(x));
    q.clear();
    if (!q.isEmpty()) throw Error("not cleared");
    [1, 2, 3].forEach(x => q.push(x));
    const out = popAll(q);
    if (!eq(out, [1, 2, 3])) throw Error("reuse fail");
  });

  test("peek/pop", () => {
    const q = new PQ();
    let ok1 = false, ok2 = false;
    try { q.peek(); } catch { ok1 = true; }
    try { q.pop(); } catch { ok2 = true; }
    if (!ok1 || !ok2) throw Error("no throw");
    q.push(10);
    if (q.peek() !== 10 || q.pop() !== 10) throw Error("peek/pop fail");
  });

  log("✅ all tests passed");
}

testPQ(PriorityQueue);

