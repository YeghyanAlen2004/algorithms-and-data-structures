class DArray {
  #size = 0;
  #capacity = 0;
  #arr = null;
  #CAP_EXPONENT = 2;

  constructor(cap) {
    if (cap <= 0) return;
    this.#capacity = cap;
    this.#arr = new Uint32Array(cap);
  }
  resize(new_cap, fill = 0) {
    const tmp = new Uint32Array(new_cap);
    for (let i = 0; i < this.#size; ++i) {
      tmp[i] = this.#arr[i];
    }

    for (let i = this.#size; i < new_cap; ++i) {
      tmp[i] = fill;
    }
    this.#capacity = new_cap;

    this.#arr = tmp;
  }
  push_back(elem) {
    if (this.#size === this.#capacity) {
      this.resize(this.#capacity * this.#CAP_EXPONENT);
    }
    this.#arr[this.#size++] = elem;
  }
  pop_back() {
    --this.#size;
  }
  erase(index) {
    if (index < 0 && index >= this.#size) {
      throw new Error('Es inch es anum...');
    }
    for (let i = index; i < this.#size - 1; ++i) {
      this.#arr[i] = this.#arr[i + 1];
    }
    --this.#size;
  }
  at(index) {
    if (index < 0 || index >= this.#size) {
      throw new Error('Segmentation fault');
    }
    return this.#arr[index];
  }
  empty() {
    if (this.#size === 0) {
      return true;
    }
    return false;
  }
  clear() {
    this.#size = 0;
  }
  setValue(i, value) {
    if (i < 0 && i >= this.#size) {
      this.#arr[i] = value;
    }
  }
  front() {
    return this.#arr[0];
  }
  back() {
    return this.#arr[size - 1];
  }
  capacity() {
    return this.#capacity;
  }
  [Symbol.iterator]() {
    const collection = this.#arr;
    const collection_length = this.#size;
    let index = 0;
    return {
      next() {
        if (index < collection_length) {
          return {
            value: collection[index++],
            done: false,
          };
        }
        return { value: undefined, done: true };
      },
    };
  }
  reserve(n) {
    if (n > this.#capacity) {
      this.resize(n);
    }
  }
  shrinkToFit() {
    this.resize(this.#size);
  }
  toArray() {
    let res = [];
    for (let i = 0; i < this.#size; ++i) {
      res[i] = this.#arr[i];
    }
    return res;
  }
  insert(pos, value) {
    if (pos >= this.#capacity) {
      this.resize(pos + 1);
      this.#size = this.#capacity;
      this.#arr[pos] = value;
    } else {
      ++this.#size;
      for (let i = this.#size; i > pos; --i) {
        this.#arr[i] = this.#arr[i - 1];
      }
      this.#arr[pos] = value;
    }
  }
  swap(i, j) {
    if (i >= this.#size && i <= 0 && j >= this.#size && j <= 0) {
      throw new Error("index is not defined:");
    }
    this.#arr[i] ^= this.#arr[j];
    this.#arr[j] ^= this.#arr[i];
    this.#arr[i] ^= this.#arr[j];
  }
  values() {
    const val = this.#arr;
    const size = this.#arr.length;
    let index = 0;
    return {
      next() {
        if (index < size) {
          return {
            value: val[index++], done: false,
          }
        };
        return {
          value: undefined, done: true,
        };
      }
    }
  }
  keys() {

    const size = this.#size;
    let index = 0;
    return {
      next() {
        if (index < size) {
          return {
            value: index++, done: false,
          }
        }
        return {
          value: undefined, done: false,
        }
      }
    }
  }
  entries() {
    const collection = this.#arr;
    const size = this.#size;
    let index = 0;
    return {
      next() {
        if (index < size) {
          return {
            value: [index, collection[index++]], done: false,
          }
        }
        return {
          value: undefined, done: true,
        };
      }
    }
  }
  forEach(callback, thisArg) {
    if (typeof callback !== "function") {
      throw new TypeError(callback + " is not a function");
    }

    for (let i = 0; i < this.#size; i++) {
      callback.call(thisArg, this.#arr[i], i, this);
    }
  }
  map(callback, thisArg) {
    const result = new DArray(this.#size || 2);
    for (let i = 0; i < this.#size; i++) {
      result.push_back(callback.call(thisArg, this.#arr[i], i, this));
    }
    return result;
  }

  filter(callback, thisArg) {
    const result = new DArray(2);
    for (let i = 0; i < this.#size; i++) {
      if (callback.call(thisArg, this.#arr[i], i, this)) {
        result.push_back(this.#arr[i]);
      }
    }
    return result;
  }

  reduce(callback, initialValue) {
    if (this.#size === 0 && initialValue === undefined) {
      throw new TypeError("Reduce of empty array with no initial value");
    }
    let acc, start;
    if (initialValue !== undefined) {
      acc = initialValue;
      start = 0;
    } else {
      acc = this.#arr[0];
      start = 1;
    }
    for (let i = start; i < this.#size; i++) {
      acc = callback(acc, this.#arr[i], i, this);
    }
    return acc;
  }

  some(callback, thisArg) {
    for (let i = 0; i < this.#size; i++) {
      if (callback.call(thisArg, this.#arr[i], i, this)) return true;
    }
    return false;
  }

  every(callback, thisArg) {
    for (let i = 0; i < this.#size; i++) {
      if (!callback.call(thisArg, this.#arr[i], i, this)) return false;
    }
    return true;
  }

  find(callback, thisArg) {
    for (let i = 0; i < this.#size; i++) {
      if (callback.call(thisArg, this.#arr[i], i, this)) return this.#arr[i];
    }
    return undefined;
  }

  findIndex(callback, thisArg) {
    for (let i = 0; i < this.#size; i++) {
      if (callback.call(thisArg, this.#arr[i], i, this)) return i;
    }
    return -1;
  }

  includes(value) {
    for (let i = 0; i < this.#size; i++) {
      if (this.#arr[i] === value) return true;
    }
    return false;
  }
}

const da = new DArray(2);

da.push_back(10);
da.push_back(20);
da.push_back(30);

da.insert(1, 99); // [10, 99, 20, 30]
da.erase(2); // [10, 99, 30]

console.log([...da]); // [10, 99, 30]

const squares = da.map(x => x * x);
console.log(squares.toArray()); // [100, 9801, 900]

const sum = da.reduce((acc, x) => acc + x, 0);
console.log(sum); // 139
