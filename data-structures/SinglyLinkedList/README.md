⚡ SinglyLinkedList — Modern JavaScript Implementation
--------------------------------------------------------------------------------------------

A minimal yet powerful singly linked list data structure written in pure JavaScript (TypeScript-friendly).
Inspired by std::forward_list from C++ and LinkedList from Java — built from scratch for learning and performance.

✨ Key Features
--------------------------------------------------------------------------------------------
> 💎 Clean, minimal, and modern ES2024+ design

> 🔒 Uses private fields (#size) for true encapsulation

> 🌀 Fully iterable (for...of, spread, Array.from)

> ⚙️ Stable merge sort built-in (O(n log n))

> 🔁 merge_list() — combine and sort two lists

> 💥 Zero dependencies — just pure JavaScript

> 🧠 Fully compatible with TypeScript

📘 Type Definition
--------------------------------------------------------------------------------------------
class SinglyLinkedList<T> {
  constructor(iterable?: Iterable<T>);
  size(): number;
  isEmpty(): boolean;
  clear(): void;

  front(): T | undefined;

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
  merge_list(other: SinglyLinkedList<T>, compareFn?: (a: T, b: T) => number): void;

  toArray(): T[];
  static fromArray<U>(arr: U[]): SinglyLinkedList<U>;

  [Symbol.iterator](): Iterator<T>;
}

🚀 Quick Example
--------------------------------------------------------------------------------------------
import { SinglyLinkedList } from './singlyLinkedList.js';

// Create and fill a list
const listA = new SinglyLinkedList([1, 3, 5]);
const listB = new SinglyLinkedList([2, 4, 6]);

// Merge and sort
listA.merge_list(listB);
console.log(listA.toArray()); // [1, 2, 3, 4, 5, 6]

// Reverse the order
listA.reverse();
console.log(listA.toArray()); // [6, 5, 4, 3, 2, 1]

🧪 Running Tests
--------------------------------------------------------------------------------------------
You can quickly validate functionality by running the built-in test suite:

.   node singlyLinkedList.js


You should see:

Running SinglyLinkedList tests...

✅ All tests passed successfully!

🧩 Algorithms Used
--------------------------------------------------------------------------------------------
|Algorithm  |	Purpose	          |  Complexity	      |      Stable.  |  
----------------------------------------------------------------------
|Merge Sort |	Sorting	          |  O(n log n)	      |      ✅ Yes   |
|Merge List |	Combining lists	  |  O(n log n)	      |      ✅ Yes   |
|Reverse	   | In-place reversal    |	 O(n)	          |      ✅ Yes   |
----------------------------------------------------------------------
⚙️ Design Notes
--------------------------------------------------------------------------------------------
1.   All operations are non-recursive except merge sort.

2.  Memory automatically managed by JavaScript GC.

3.  Ideal for algorithmic practice, interviews, or low-level data structure learning.

4.  Written in vanilla JS but TypeScript-ready.

🧠 Author
--------------------------------------------------------------------------------------------
Alen Yeghyan
💻 Student & Web Developer
📍 Yerevan, Armenia
⚡ Passionate about algorithms, data structures, and clean software design.

💬 Contribute
--------------------------------------------------------------------------------------------
Contributions, ideas, or improvements are always welcome.
Open an issue or submit a pull request 🤝

🪶 License
--------------------------------------------------------------------------------------------
MIT License © 2025 Alen Yeghyan

✨ Built with curiosity, patience, and a love for clean code.