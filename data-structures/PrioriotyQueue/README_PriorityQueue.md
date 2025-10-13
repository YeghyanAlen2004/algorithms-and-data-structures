# ⚡ PriorityQueue — Modern JavaScript Min/Max Heap

A **lightweight, high-performance priority queue** implemented in pure **modern ES2024 JavaScript**,  
inspired by `std::priority_queue` from C++ and Python’s `heapq`.  
Supports both **min-heap** (default) and **max-heap** via custom comparator.

---

## ✨ Key Features
🧱 **Binary heap** implementation (array-based)  
⚙️ **Custom comparator** for min/max behavior  
🚀 **O(log n)** insertion and removal  
🔒 **Private fields** for safe encapsulation  
🧹 **Zero dependencies** — clean and portable  
🧠 **Fully tested** — includes a robust test suite  

---

## 🧩 Internal Representation
| Component | Description |
|------------|-------------|
| **#heap** | Internal array representing the binary heap |
| **#cmp** | Comparator function (`(a,b)=>a-b` by default) |
| **_parent()** | Index of parent node |
| **_left() / _right()** | Indices of child nodes |
| **_shiftUp() / _shiftDown()** | Heapify operations |

---

## 📘 Class Definition
```js
class PriorityQueue {
  constructor(cmp = (a, b) => a - b);
  size();          // number of elements
  isEmpty();       // true if queue is empty
  clear();         // removes all elements
  peek();          // view smallest/largest element
  push(value);     // insert element
  pop();           // remove top element
  print();         // debug heap contents
}
```

---

## 🚀 Example Usage
```js
const pq = new PriorityQueue();

pq.push(5);
pq.push(1);
pq.push(3);

console.log(pq.peek()); // → 1
console.log(pq.pop());  // → 1
console.log(pq.pop());  // → 3
console.log(pq.pop());  // → 5
```

🔁 **Max Heap:**
```js
const maxPQ = new PriorityQueue((a, b) => b - a);
[5, 1, 2, 3, 4].forEach(x => maxPQ.push(x));
console.log([...Array(maxPQ.size())].map(() => maxPQ.pop()));
// → [5, 4, 3, 2, 1]
```

---

## ⚙️ Complexity
| Operation | Time Complexity | Description |
|------------|----------------|--------------|
| `push()` | **O(log n)** | Percolates element upward |
| `pop()` | **O(log n)** | Reheapifies downward |
| `peek()` | **O(1)** | Access top element |
| `clear()` | **O(1)** | Truncates array |

---

## 🧪 Testing
Run directly with Node.js:
```bash
node priorityQueue.js
```

Expected output:
```
──────── basic ────────
✅ basic
──────── negatives ────────
✅ negatives
──────── duplicates ────────
✅ duplicates
──────── maxHeap ────────
✅ maxHeap
──────── clear ────────
✅ clear
──────── peek/pop ────────
✅ peek/pop
✅ all tests passed
```

---

## 🧠 Design Highlights
1. Pure ES2024 — no libraries, no dependencies.  
2. Safe encapsulation with private fields (`#heap`, `#cmp`).  
3. Custom comparator enables any ordering logic.  
4. Consistent heap property after every mutation.  
5. Thoroughly tested for edge cases and duplicates.

---

## 🪶 Author
**Alen Yeghyan**  
💻 Student & Web Developer  
📍 Yerevan, Armenia  
⚡ Passionate about algorithms, data structures, and clean code.

---

## 📜 License
MIT License © 2025 Alen Yeghyan  
✨ Built with precision, testing, and minimalism.
