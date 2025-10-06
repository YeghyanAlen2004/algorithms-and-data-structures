# BucketedDeque 🚀  
*A cache-friendly, resizable, double-ended queue for modern JavaScript*

> High-performance deque implemented as a **grid of fixed-size buckets**.  
> Amortized **O(1)** pushes/pops on both ends, predictable memory layout, and clean iteration.

---

## ✨ Highlights

- **O(1) amortized** `push_*` / `pop_*` at both ends  
- **Bucketed layout** → better cache locality vs. monolithic arrays  
- **Front & back growth** via `_ensureBucket(true|false)` (no full reallocation of items)  
- **Iterable**: `for...of` works out of the box  
- **Zero deps**: pure ES2022 with private fields (`#foo`)  

---

## 📦 Installation & Usage

> This repository ships a single class file (e.g., `BucketedDeque.js`). Use it directly.

### ES Modules
```js
// BucketedDeque.js
export class BucketedDeque { /* … class code … */ }

// app.mjs
import { BucketedDeque } from './BucketedDeque.js';

const dq = new BucketedDeque(10); // per-bucket capacity (must be > 8 to take effect)
dq.push_back(5);
dq.push_back(10);
dq.push_front(1);

console.log(dq.front()); // 1
console.log(dq.back());  // 10
console.log([...dq]);    // [1, 5, 10]
```

### CommonJS (Node)
```js
// BucketedDeque.cjs
class BucketedDeque { /* … class code … */ }
module.exports = { BucketedDeque };

// app.cjs
const { BucketedDeque } = require('./BucketedDeque.cjs');
```

> ✅ **Runtime**: Node 16+ or any modern browser with class fields support.

---

## 🧠 Design Overview

`BucketedDeque` stores data in a **2D matrix**:
- `buckets`: an array of arrays → **`bucketSize × everyBucketsLength`**
- Two “gaps” delimit the deque:
  - `frontIndex` points to the cell **before** the logical front
  - `backIndex` points to the cell **after** the logical back
- When a side runs out of space, we **double** the number of buckets and extend **on that side** (front/back), *without copying existing rows of data*.

```
[ ... ][ ... ][ FRONT ][ BACK ][ ... ][ ... ]
          ^gap         gap^
          push_front→   ←push_back
```

This keeps pushes/pops **amortized O(1)** and avoids large contiguous copies.

---

## 🧪 Quick Demo

```js
const dq = new BucketedDeque(6);
dq.push_back(10);
dq.push_back(20);
dq.push_front(5);
dq.push_front(1);

console.log(dq.toArray()); // [1, 5, 10, 20]
console.log(dq.size());    // 4
console.log(dq.isEmpty()); // false

console.log(dq.pop_front()); // 1
console.log(dq.pop_back());  // 20
console.log([...dq]);        // [5, 10]
```

---

## 🧾 API

### Constructor

| Signature | Description |
|---|---|
| `new BucketedDeque(everyBucketsLength?)` | Creates a new deque. If `everyBucketsLength` is a valid integer **greater than 8**, it will be used; otherwise the per-bucket capacity defaults to **8**. |

> ℹ️ **Note**: `clear()` resets geometry back to defaults (bucket count and per-bucket length revert to initial constants).

---

### Core Operations

| Method | Returns | Description |
|---|---|---|
| `push_front(value)` | `void` | Push value to the **front** (amortized O(1)). |
| `push_back(value)`  | `void` | Push value to the **back** (amortized O(1)). |
| `pop_front()` | `any` | Pop and return the **front** value. **Throws** if empty (`RangeError("Deque is Empty:")`). |
| `pop_back()`  | `any` | Pop and return the **back** value. **Throws** if empty (`RangeError("Deque is Empty:")`). |

---

### Accessors & Introspection

| Method | Returns | Notes |
|---|---|---|
| `front()` | `any \| undefined` | First element or `undefined` if empty. |
| `back()`  | `any \| undefined` | Last element or `undefined` if empty. |
| `at(index)` | `any` | Element at logical index `[0…size)`. *Out-of-range triggers an error (RangeError recommended).* |
| `toArray()` | `any[]` | Snapshot array (front → back). |
| `size()` | `number` | Current item count. |
| `isEmpty()` | `boolean` | `true` when `size() === 0`. |
| `[Symbol.iterator]()` | `Iterator` | Enables `for...of` traversal from front to back. |

---

## ⚙️ Constants & Defaults

| Constant | Meaning | Default |
|---|---|---|
| `#BUCKETS_LENGTH_INIT` | Per-bucket capacity when input is invalid or ≤ 8 | `8` |
| `#BUCKET_INIT` | Initial number of buckets | `4` |
| `#MAGIC_ZERO/ONE/TWO` | Small integral helpers | `0/1/2` |

> 📌 **Constructor rule**: `new BucketedDeque(x)` uses `x` **only if `x > 8`**; otherwise bucket length = 8.

---

## ⏱️ Complexity

| Operation | Time (Amortized) | Space |
|---|---|---|
| `push_front`, `push_back` | O(1) | O(n) total |
| `pop_front`, `pop_back`   | O(1) | O(n) total |
| `front`, `back`, `size`, `isEmpty` | O(1) | — |
| `at(i)` | O(1) | — |
| `toArray()` | O(n) | O(n) |

---

## 🧩 Edge Cases & Error Behavior

- `pop_front()` / `pop_back()` on an empty deque → **throws** `RangeError("Deque is Empty:")`.
- `at(index)` with `index < 0` or `index ≥ size()` → **throws** (out-of-range).
- `clear()` resets the structure to **initial geometry** (defaults), discarding any custom per-bucket length you passed to the constructor.

---

## 🏗️ Growth Strategy

- Front saturation → `_ensureBucket(true)` **doubles** the number of buckets and **prepends** empty rows, *shifting references* (not items) to the right.  
- Back saturation  → `_ensureBucket(false)` **doubles** and **appends** empty rows at the end.  
- This avoids relocating all elements and keeps pushes/pops cheap.

---

## 🔬 Testing

A ready-to-run stress test is included (`testBucketedDequeStress()` in your file).  
Run with Node:

```bash
node your-file.js
```

Expected console output lines are annotated like:

```
Expected → size > 32 | Got → 50
Expected → front=0 | Got → 0
Expected → back=49 | Got → 49
…
```

---

## 📈 Benchmark Hints (DIY)

> Micro-benchmarks vary by engine; measure in your environment.

```js
const N = 1e6;
console.time("push_back N");
const dq = new BucketedDeque(16);
for (let i = 0; i < N; i++) dq.push_back(i);
console.timeEnd("push_back N");
```

Tips:
- Use **larger per-bucket length** if you expect long contiguous sequences (e.g., 32/64).
- Prefer **balanced front/back usage** to minimize growths on one side.
- Avoid calling `toArray()` in hot paths; iterate with `for...of`.

---

## 🗺️ Roadmap

- [ ] TypeScript `.d.ts` typings  
- [ ] Optional `shrink()` to release unused leading/trailing buckets  
- [ ] Configurable error messages / error types for `at()`  
- [ ] Benchmarks & charts for common workloads  
- [ ] Optional `from(iterable)` ctor

## 🧠 Author

---

**Alen Yeghyan**  
💻 Student & Web Developer  
📍 Yerevan, Armenia  
⚡ Passionate about algorithms, data structures, and elegant code design.


---

## 🪶 License

MIT © 2025 ALEN YEGHYAN

---

## ❓ FAQ

**Q: Why use buckets instead of a circular dynamic array?**  
A: Buckets let us grow **asymmetrically** on either side with **O(1)** amortized cost and avoid large memmoves; they also improve locality on sequential scans.

**Q: What happens if I pass `new BucketedDeque(4)`?**  
A: Per-bucket capacity falls back to **8** (only values **greater than 8** take effect).

**Q: Does `clear()` keep my custom per-bucket length?**  
A: No — it resets to the default geometry (per-bucket length = 8, initial buckets = 4).

**Q: Is it safe to iterate while mutating?**  
A: Like most deques, iterating while mutating may skip/duplicate elements. Snapshot with `toArray()` or re-iterate after writes.

---

Happy deque-ing! 🎯
