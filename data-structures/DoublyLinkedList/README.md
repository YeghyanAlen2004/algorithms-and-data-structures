# ⚡ DoublyLinkedList

> Modern and efficient implementation of a **Doubly Linked List** in pure JavaScript.  
> Includes bidirectional traversal, stable merge sort, and iterator support.

---

## 🧩 Overview

A **Doubly Linked List** is a linear data structure where each node points to both its previous and next neighbor.  
This implementation is written with modern **ES2024+** features like private fields (`#`), iterators, and class syntax.

---

## ⚙️ Node Structure

```js
class Node {
  constructor(data, next = null, prev = null) {
    this.data = data;
    this.next = next;
    this.prev = prev;
  }
}
🧠 Class Definition
js
Копировать код
class DoublyLinkedList {
  #head = null;
  #tail = null;
  #size = 0;

  constructor(iterables) {}
  size() {}
  isEmpty() {}
  clear() {}
  push_front(value) {}
  push_back(value) {}
  pop_front() {}
  pop_back() {}
  front() {}
  back() {}
  at(index) {}
  insert(index, value) {}
  erase(index) {}
  remove(value, equals = Object.is) {}
  reverse() {}
  sort(compareFn) {}
}
🚀 Features
Method	Description
constructor(iterables)	Initialize with iterable or single element.
size()	Returns the number of nodes.
isEmpty()	Checks if the list is empty.
clear()	Clears all nodes.
push_front(value)	Adds an element to the front.
push_back(value)	Adds an element to the back.
pop_front()	Removes the first element.
pop_back()	Removes the last element.
front()	Returns the first element’s value.
back()	Returns the last element’s value.
at(index)	Returns element at index.
insert(index, value)	Inserts value at index.
erase(index)	Removes value at index.
remove(value, equals)	Removes all matching elements.
reverse()	Reverses the list.
sort(compareFn)	Stable merge sort implementation.

🧪 Example Usage
js
Копировать код
const list = new DoublyLinkedList([1, 2, 3]);

list.push_front(0);
list.push_back(4);
console.log([...list]); // [0, 1, 2, 3, 4]

list.pop_front(); // removes 0
list.pop_back();  // removes 4
console.log([...list]); // [1, 2, 3]

list.insert(1, 99); // [1, 99, 2, 3]
list.erase(1);      // [1, 2, 3]
list.reverse();     // [3, 2, 1]
list.sort();        // [1, 2, 3]
🧠 Iteration Support
js
Копировать код
for (const value of list) {
  console.log(value);
}

// or
console.log([...list]);
📊 Performance
Operation	Complexity	Notes
push_front / push_back	O(1)	Constant-time insertions
pop_front / pop_back	O(1)	Constant-time removals
insert / erase / at	O(n)	Optimized with bidirectional traversal
reverse	O(n)	In-place
sort	O(n log n)	Stable merge sort

🧬 Example Test Output
less
Копировать код
🔍 Running DoublyLinkedList tests...

Initial: [1, 2, 3]
After push_front(0), push_back(4): [0, 1, 2, 3, 4]
pop_front(): 0
pop_back(): 4
After pops: [1, 2, 3]
After insert(1, 99): [1, 99, 2, 3]
erase(1): 99
After erase: [1, 2, 3]
front(): 1 | back(): 3 | at(0): 1

Before remove(5): [5, 1, 5, 2, 5, 3]
Removed count: 3
After remove(5): [1, 2, 3]

Before reverse: [1, 2, 3, 4]
After reverse: [4, 3, 2, 1]

Before sort: [9, 1, 5, 3, 2, 8]
After sort: [1, 2, 3, 5, 8, 9]

Iterating with for...of:
 → A
 → B
 → C

✅ All manual tests completed successfully!
💡 Design Notes
Fully encapsulated using #private fields

Safe memory management (no dangling references)

Compatible with modern Node.js and browsers

No external dependencies

Clean and readable API

👨‍💻 Author
Alen Yeghyan
📍 Yerevan, Armenia
💻 Developer • Algorithm Enthusiast • Minimalist in Code

⚖️ License
MIT License © 2025 Alen Yeghyan

“A good data structure is not only functional — it’s elegant.”
— Alen Yeghyan