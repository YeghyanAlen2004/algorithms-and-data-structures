# ⚡ DoublyLinkedList — Modern JavaScript Implementation

A clean, efficient, and fully-featured **Doubly Linked List** built from scratch in pure JavaScript.  
Inspired by `std::list` in C++ and `LinkedList` in Java — rewritten with a modern **ES2024+** touch.  
Perfect for learning, algorithm practice, and building low-level systems in JS.

---

## ✨ Key Features

- 💎 Elegant and modern **ES2024+** class design  
- 🔒 True encapsulation using private fields (`#head`, `#tail`, `#size`)  
- 🧭 Bidirectional traversal — forward and backward navigation  
- ⚙️ Built-in stable **Merge Sort** (`O(n log n)`)  
- 🔁 In-place reversal in `O(n)`  
- 🧹 Safe memory cleanup — no dangling references  
- 💥 Zero dependencies — pure JavaScript  
- 🧠 Works seamlessly with TypeScript  

---

## 📘 Type Definition

```ts
class DoublyLinkedList<T> {
  constructor(iterables?: Iterable<T>);

  size(): number;
  isEmpty(): boolean;
  clear(): void;

  front(): T | undefined;
  back(): T | undefined;

  push_front(value: T): void;
  push_back(value: T): void;
  pop_front(): T | undefined;
  pop_back(): T | undefined;

  at(index: number): T | undefined;
  insert(index: number, value: T): void;
  erase(index: number): T | undefined;
  remove(value: T, equals?: (a: T, b: T) => boolean): number;

  reverse(): void;
  sort(compareFn?: (a: T, b: T) => number): void;

  [Symbol.iterator](): Iterator<T>;
}
```

---

## 🚀 Quick Example

```js
import { DoublyLinkedList } from './doublyLinkedList.js';

const list = new DoublyLinkedList([1, 2, 3]);

list.push_front(0);
list.push_back(4);
console.log([...list]); // [0, 1, 2, 3, 4]

list.pop_front(); // removes 0
list.pop_back();  // removes 4
console.log([...list]); // [1, 2, 3]

list.insert(1, 99);
list.erase(1);
list.reverse();
list.sort();

console.log([...list]); // [1, 2, 3]
```

---

## 🧪 Running Tests

To validate everything, simply run:

```bash
node doublyLinkedList.js
```

**Expected output:**

```
🔍 Running DoublyLinkedList tests...

✅ All manual tests completed successfully!
```

---

## 🧩 Algorithms Used

| Algorithm       | Purpose              | Complexity   | Stable |
|-----------------|----------------------|--------------|--------|
| **Merge Sort**  | Sorting              | O(n log n)   | ✅ Yes |
| **Reverse**     | In-place reversal    | O(n)         | ✅ Yes |
| **Insert / Erase** | Position-based ops | O(n)         | — |
| **Push / Pop**  | Ends operations      | O(1)         | ✅ Constant time |

---

## ⚙️ Design Notes

1. Optimized traversal (chooses shortest path from head or tail)  
2. True encapsulation with private fields (`#head`, `#tail`, `#size`)  
3. Fully iterable (`for...of`, `[...list]`, `Array.from`)  
4. Safe node unlinking to prevent memory leaks  
5. Merge sort implemented recursively for stability and clarity  

---

## 🧠 Author

**Alen Yeghyan**  
💻 Student & Web Developer  
📍 Yerevan, Armenia  
⚡ Passionate about algorithms, data structures, and elegant code design.

---

## 💬 Contribute

Contributions and ideas are always welcome!  
Feel free to open an issue or submit a pull request 🤝

---

## 🪶 License

**MIT License © 2025 Alen Yeghyan**

---

> ✨ *Built with patience, precision, and a deep love for data structures.*
