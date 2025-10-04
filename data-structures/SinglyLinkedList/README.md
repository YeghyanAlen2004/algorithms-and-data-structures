SinglyLinkedList (JavaScript / TypeScript Implementation)

A fully-featured generic Singly Linked List implementation written in JavaScript (compatible with TypeScript).
This data structure is designed to mimic modern container-style APIs similar to std::forward_list in C++ or LinkedList in Java, but implemented from scratch.

✨ Features

Fully encapsulated Node and private #size fields.

Iterable with for...of, Array.from(), or spread syntax.

Safe index-based operations (at, insert, erase).

High-performance, stable merge sort algorithm.

Merging of two lists via merge_list().

Fully generic and type-safe (TypeScript-compatible).

Zero external dependencies.

📦 API Overview (Type Definition)
class SinglyLinkedList<T> {
  constructor(iterable?: Iterable<T>);
  size(): number;
  isEmpty(): boolean;
  clear(): void;

  // front access
  front(): T | undefined;

  // push & pop
  push_front(value: T): void;
  push_back(value: T): void;
  pop_front(): T | undefined;
  pop_back(): T | undefined;

  // random-like operations (O(n))
  at(index: number): T | undefined;
  insert(index: number, value: T): void;
  erase(index: number): T | undefined;
  remove(value: T, equals?: (a: T, b: T) => boolean): number;

  // algorithms
  reverse(): void;
  sort(compareFn?: (a: T, b: T) => number): void;
  merge_list(other: SinglyLinkedList<T>, compareFn?: (a: T, b: T) => number): void;

  // utilities
  toArray(): T[];
  static fromArray<U>(arr: U[]): SinglyLinkedList<U>;

  // iteration
  [Symbol.iterator](): Iterator<T>;
}

🚀 Usage Example
const listA = new SinglyLinkedList([1, 3, 5]);
const listB = new SinglyLinkedList([2, 4, 6]);

listA.merge_list(listB);
console.log(listA.toArray()); // [1, 2, 3, 4, 5, 6]

listA.reverse();
console.log(listA.toArray()); // [6, 5, 4, 3, 2, 1]

🧪 Run Tests

All self-tests are included at the bottom of the file:

node singlyLinkedList.js


Expected output:

Running SinglyLinkedList tests...

✅ All tests passed successfully!

⚙️ Implementation Notes

Sorting uses stable merge sort with O(n log n) complexity.

merge_list() combines and sorts two lists (O(n log n)).

Index-based access methods (at, insert, erase) have O(n) time complexity.

Memory management handled automatically by JavaScript GC.

🧠 Author

Alen Yeghyan
Student & Web Developer — passionate about algorithms, data structures, and clean code.