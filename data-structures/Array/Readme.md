# DynamicArray (JavaScript)

## 📌 Overview
`DynamicArray` is a JavaScript implementation of a dynamically resizable array, inspired by C++'s `std::vector`.  
It uses a `Uint32Array` as its internal buffer and supports both vector-like operations (`pushBack`, `insert`, `erase`) and modern JS methods (`map`, `filter`, `reduce`, iteration protocols).

---

## 🏗 Internal Representation
- **Buffer:** Backed by a `Uint32Array`.
- **Size:** Number of currently stored elements.
- **Capacity:** Number of allocated slots in the buffer.
- **Growth Policy:** When capacity is exceeded, a new buffer is allocated with *double* the capacity and elements are copied.
- **Type Restriction:** Only unsigned 32-bit integers (`0 ... 2^32−1`) are allowed.

---

## ✨ Core Functionality

### Construction
- `new DynamicArray()` → creates an empty array.
- `new DynamicArray(initialCapacity)` → pre-allocates a buffer with given capacity.
- `DynamicArray.from(iterable)` → creates a `DynamicArray` from an iterable.

### Capacity & Size
- `size()` → returns current number of elements.
- `capacity()` → returns buffer capacity.
- `empty()` → returns `true` if size is `0`.
- `reserve(n)` → grows buffer to at least `n`.
- `shrinkToFit()` → shrinks buffer to fit current size.
- `clear()` → removes all elements (size = 0).

### Element Access
- `at(i)` → returns value at index `i` (with bounds check).
- `set(i, value)` → sets value at index `i`.
- `front()` / `back()` → access first/last element.
- `toArray()` → exports data as a plain JS array.

### Modifiers
- `pushBack(value)` → append element.
- `popBack()` → remove last element.
- `insert(pos, value)` → insert at position (shift right).
- `erase(pos)` → remove at position (shift left).
- `resize(n, fill=0)` → adjust size, filling new slots if needed.
- `swap(i, j)` → swap two elements.

### Traversal & Iteration
- `[Symbol.iterator]()` → enables `for...of`.
- `values()` → iterator over values.
- `keys()` → iterator over indices.
- `entries()` → iterator over `[index, value]`.
- `forEach(fn)` → applies function to each element.

### Higher-Order Methods
Operate over **logical size**, not spare capacity:
- `map(fn)` → returns a new `DynamicArray`.
- `filter(fn)` → returns a new `DynamicArray` with matching elements.
- `reduce(fn, init?)` → reduces to a single value.
- `some(fn)` / `every(fn)` → boolean checks.
- `find(fn)` / `findIndex(fn)` → search.
- `includes(value)` → membership check.

---

## ⚡ Complexity
| Method              | Time Complexity |
|--------------------|----------------|
| `pushBack`         | Amortized **O(1)** |
| `popBack`          | **O(1)** |
| `insert` / `erase` | **O(n)** |
| `reserve` / `shrinkToFit` | **O(n)** (copy) |
| `map` / `filter` / `reduce` | **O(n)** |

---

## 🧪 Edge Cases to Handle
- Multiple resizes when pushing/inserting many elements.
- Insert/erase at front, middle, and back.
- Safe operations on empty array (pop, front, back).
- Type errors when inserting invalid numbers.
- Iteration must reflect only **size** elements, not unused capacity.

---

## 💻 Example Usage
```js
const da = new DynamicArray(2);

da.pushBack(10);
da.pushBack(20);
da.pushBack(30); // triggers resize

da.insert(1, 99); // [10, 99, 20, 30]
da.erase(2);      // [10, 99, 30]

console.log([...da]); // [10, 99, 30]

const squares = da.map(x => x * x);
console.log(squares.toArray()); // [100, 9801, 900]

const sum = da.reduce((acc, x) => acc + x, 0);
console.log(sum); // 139
