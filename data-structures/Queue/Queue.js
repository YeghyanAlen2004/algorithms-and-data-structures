class Queue {
  #MAGIC_ZERO = 0;
  #MAGIC_ONE = 1;
  #INITIAL_CAPACITY = 16;

  #data;
  #head;
  #tail;
  #size;
  #capacity;

  constructor(initialCapacity = this.#INITIAL_CAPACITY) {
    if (!Number.isInteger(initialCapacity) || initialCapacity < this.#INITIAL_CAPACITY) {
      initialCapacity = this.#INITIAL_CAPACITY;
    }
    this.#capacity = initialCapacity;
    this.#data = new Array(this.#capacity);
    this.#head = this.#MAGIC_ZERO;
    this.#tail = this.#MAGIC_ZERO;
    this.#size = this.#MAGIC_ZERO;
  }

  enqueue(value) {
    if (this.#size >= this.#capacity) {
      this.#ensureCapacity();
    }
    this.#data[this.#tail] = value;
    this.#tail = (this.#tail + this.#MAGIC_ONE) % this.#capacity;
    ++this.#size;
  }

  dequeue() {
    if (this.#size === this.#MAGIC_ZERO) {
      throw new RangeError("Queue is empty");
    }
    const v = this.#data[this.#head];
    this.#head = (this.#head + this.#MAGIC_ONE) % this.#capacity;
    --this.#size;
    return v;
  }

  front() {
    return this.#size ? this.#data[this.#head] : undefined;
  }

  back() {
    if (!this.#size) return undefined;
    const idx = (this.#tail - this.#MAGIC_ONE + this.#capacity) % this.#capacity;
    return this.#data[idx];
  }

  size() {
    return this.#size;
  }

  isEmpty() {
    return this.#size === this.#MAGIC_ZERO;
  }

  clear() {
    this.#head = this.#MAGIC_ZERO;
    this.#tail = this.#MAGIC_ZERO;
    this.#size = this.#MAGIC_ZERO;
  }

  toArray() {
    const arr = new Array(this.#size);
    for (let k = 0; k < this.#size; k++) {
      const i = (this.#head + k) % this.#capacity;
      arr[k] = this.#data[i];
    }
    return arr;
  }

  [Symbol.iterator]() {
    const self = this;
    let k = 0;
    return {
      next() {
        if (k < self.#size) {
          const i = (self.#head + k) % self.#capacity;
          k++;
          return { value: self.#data[i], done: false };
        }
        return { value: undefined, done: true };
      }
    };
  }

  #ensureCapacity() {
    const newCap = this.#capacity * 2;
    const next = new Array(newCap);
    for (let k = 0; k < this.#size; k++) {
      next[k] = this.#data[(this.#head + k) % this.#capacity];
    }
    this.#data = next;
    this.#capacity = newCap;
    this.#head = this.#MAGIC_ZERO;
    this.#tail = this.#size;
  }
}

function testQueue() {
  const q = new Queue(4); // стартуем с маленькой ёмкости, чтобы проверить увеличение
  console.log("=== Queue Test Start ===");

  console.log("✅ Initial empty:", q.isEmpty(), "size:", q.size());

  // enqueue
  console.log("\n🟦 Enqueue elements...");
  q.enqueue(10);
  q.enqueue(20);
  q.enqueue(30);
  q.enqueue(40);
  console.log("Queue after enqueue:", q.toArray());
  console.log("Front:", q.front(), "Back:", q.back(), "Size:", q.size());

  // trigger capacity growth
  console.log("\n🟩 Add more to trigger ensureCapacity()");
  q.enqueue(50);
  q.enqueue(60);
  console.log("Queue after resize:", q.toArray());
  console.log("Capacity increased correctly ✅");

  // dequeue
  console.log("\n🟥 Dequeue 2 elements...");
  console.log("Dequeued:", q.dequeue());
  console.log("Dequeued:", q.dequeue());
  console.log("Queue now:", q.toArray());
  console.log("Front:", q.front(), "Back:", q.back(), "Size:", q.size());

  // iteration test
  console.log("\n🌀 Iterating through queue:");
  for (const elem of q) {
    process.stdout.write(elem + " ");
  }
  console.log("\nIteration works ✅");

  // clear test
  console.log("\n⚫ Clear queue:");
  q.clear();
  console.log("After clear:", q.toArray(), "Empty:", q.isEmpty());

  // error test
  console.log("\n🔴 Try to dequeue from empty queue:");
  try {
    q.dequeue();
  } catch (e) {
    console.log("Caught expected error:", e.message);
  }

  console.log("\n=== Queue Test End ===");
}

testQueue();

