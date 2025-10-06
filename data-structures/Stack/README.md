# Stack (Array-Backed) ⚡️

A minimal, fast **LIFO** stack implemented in modern JavaScript (ES2022) with private fields.  
Amortized **O(1)** `push` / `pop`, clean iteration, and predictable growth.

---

## ✨ Highlights

- **O(1) amortized** `push` / `pop`
- **Top → bottom** order for both iteration **and** `toArray()`
- **Auto-resizing** buffer (`#ensureCapacity()` doubles capacity)
- **ES2022 private fields** (`#data`, `#size`, `#capacity`)
- **Zero deps**

---

## 🚀 Usage

```js
import { Stack } from "./Stack.js";

const s = new Stack(16); // optional initial capacity (>=16), defaults to 16
s.push(10);
s.push(20);
s.push(30);

console.log(s.peek());   // 30
console.log(s.size());   // 3
console.log([...s]);     // [30, 20, 10]  (iterator: top → bottom)
console.log(s.toArray()); // [30, 20, 10]  (toArray: top → bottom)

console.log(s.pop());    // 30
console.log(s.pop());    // 20
console.log(s.pop());    // 10
console.log(s.isEmpty()); // true
```

> **Runtime:** Node 16+ or any modern browser with class fields support.

---

## 🧾 API

| Method | Returns | Description |
|---|---|---|
| `new Stack(initialCapacity?)` | `Stack` | Creates a new stack. If `initialCapacity` is not an integer or `< 16`, it defaults to `16`. |
| `push(value)` | `void` | Pushes a value onto the stack (**top**). Amortized O(1). |
| `pop()` | `any` | Removes and returns the **top** value. **Throws** `RangeError("Stack is empty:")` when empty. |
| `peek()` | `any \| undefined` | Returns the **top** value without removing it; `undefined` if empty. |
| `size()` | `number` | Number of stored elements. |
| `isEmpty()` | `boolean` | `true` iff the stack has no elements. |
| `clear()` | `void` | Resets the stack to empty (capacity retained). |
| `toArray()` | `any[]` | Snapshot array, **top → bottom**. |
| `[Symbol.iterator]()` | `Iterator` | Iterates **top → bottom** (LIFO traversal). |

---

## 🧠 Design Notes

- Internal index `#size` stores the **top position**, starting from `-1` (empty).  
  - After `push`, `#size` increments, and the value is written at `#data[#size]`.  
  - After `pop`, the value at `#data[#size]` is returned and `#size` decrements.
- `#ensureCapacity()` doubles `#capacity` and copies `[0..#size]` into the new buffer.

---

## ⏱️ Complexity

| Operation | Time (Amortized) | Space |
|---|---|---|
| `push`, `pop` | O(1) | O(n) total |
| `peek`, `size`, `isEmpty` | O(1) | — |
| `toArray()`, iteration | O(n) | O(n) |

---

## 🔍 Edge Cases & Errors

- `pop()` on an empty stack → **throws** `RangeError("Stack is empty:")`.
- `peek()` on an empty stack → returns `undefined`.
- `clear()` resets to empty and **keeps capacity** for reuse.

---

## 🧪 Quick Smoke Test

```js
const s = new Stack(2);
console.log("isEmpty:", s.isEmpty(), "→ true");
s.push(10);
s.push(20);
s.push(30); // triggers ensureCapacity if needed
console.log("size:", s.size(), "→ 3");
console.log("peek:", s.peek(), "→ 30");
console.log("iter:", [...s], "→ [30, 20, 10]");
console.log("toArray:", s.toArray(), "→ [30, 20, 10]");

console.log("pop:", s.pop(), "→ 30");
console.log("pop:", s.pop(), "→ 20");
console.log("pop:", s.pop(), "→ 10");
try { s.pop(); } catch (e) { console.log("pop empty:", e.message, "→ 'Stack is empty:'"); }
```
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

Happy stacking! 📚
