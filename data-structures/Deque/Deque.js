class BucketedDeque {
    #MAGIC_ONE = 1; // all magic 1
    #MAGIC_ZERO = 0; // all magic 0
    #MAGIC_TWO = 2; // all magic 2
    #BUCKETS_LENGTH_INIT = 8; // every bucket length initalization default 8
    #BUCKET_INIT = 4; // buckets size initialization 4

    #everyBucketsLength;
    #bucketSize;
    #buckets;
    #frontBucket;
    #backBucket;
    #frontIndex;
    #backIndex;
    #size;

    constructor(everyBucketsLength) {
        if (Number.isInteger(everyBucketsLength) && everyBucketsLength > this.#BUCKETS_LENGTH_INIT) {
            this.#everyBucketsLength = everyBucketsLength;
        } else {
            this.#everyBucketsLength = this.#BUCKETS_LENGTH_INIT;
        }

        this.#bucketSize = this.#BUCKET_INIT;
        this.#size = this.#MAGIC_ZERO;
        this.#buckets = new Array(this.#bucketSize);
        for (let i = this.#MAGIC_ZERO; i < this.#bucketSize; ++i) {
            this.#buckets[i] = new Array(this.#everyBucketsLength).fill(null);
        }

        let mid = Math.floor(this.#bucketSize / this.#MAGIC_TWO);
        this.#backBucket = mid;
        this.#frontBucket = mid -this.#MAGIC_ONE;

        this.#frontIndex = this.#everyBucketsLength - 1;
        this.#backIndex = this.#MAGIC_ZERO;
        
    }
    // === Core operations ===
    push_front(value) {
        if (this.#frontIndex < this.#MAGIC_ZERO) {
            this.#frontIndex = this.#everyBucketsLength - this.#MAGIC_ONE;
            --this.#frontBucket;
            if (this.#frontBucket < this.#MAGIC_ZERO) {
                this._ensureBucket(true);
            }
        }
        this.#buckets[this.#frontBucket][this.#frontIndex--] = value;
        ++this.#size;
    }

    push_back(value) {
        if (this.#backIndex >= this.#everyBucketsLength) {
            this.#backIndex = this.#MAGIC_ZERO;
            ++this.#backBucket;
            if (this.#backBucket >= this.#bucketSize) {
            this._ensureBucket(false);
            }
        }
        this.#buckets[this.#backBucket][this.#backIndex++] = value;
        ++this.#size;
    }

    pop_front() {
        if (this.#size === this.#MAGIC_ZERO) {
            throw new RangeError("Deque is Empty:");
        }

        ++this.#frontIndex;
        if (this.#frontIndex >= this.#everyBucketsLength) {
            this.#frontIndex = this.#MAGIC_ZERO;
            ++this.#frontBucket;
        }

        const res = this.#buckets[this.#frontBucket][this.#frontIndex];
        --this.#size;
        return res;
    }

    pop_back() {
        if (this.#size === this.#MAGIC_ZERO) {
            throw new RangeError("Deque is Empty:");
        }
        --this.#backIndex;
        if (this.#backIndex < this.#MAGIC_ZERO) {
            this.#backIndex = this.#everyBucketsLength - this.#MAGIC_ONE;
            --this.#backBucket;
        }
        let res = this.#buckets[this.#backBucket][this.#backIndex];
        --this.#size;
        return res;
    }

    // === Access ===
    front() {
        return this.#size ? this.at(0) : undefined;
    }

    back() {
        return this.#size ? this.at(this.#size - 1) : undefined;
    }

    // === Utilities ===
    clear() {
        this.#buckets = new Array(this.#BUCKET_INIT);
        for (let i = 0 ; i < this.#BUCKET_INIT; ++i) {
            this.#buckets[i] = new Array(this.#BUCKETS_LENGTH_INIT).fill(null);
        }
        this.#bucketSize = this.#BUCKET_INIT;
        this.#everyBucketsLength = this.#BUCKETS_LENGTH_INIT;
        this.#size = this.#MAGIC_ZERO;

        let mid = Math.floor(this.#bucketSize / this.#MAGIC_TWO);

        this.#backBucket = mid;
        this.#frontBucket = mid - 1;

        this.#backIndex = this.#MAGIC_ZERO;
        this.#frontIndex = this.#everyBucketsLength - this.#MAGIC_ONE;
    }

    size() {
        return this.#size;
    }

    isEmpty() {
        return this.#size === 0;
    }

    toArray() {
        let arr = [];
        for (let i = 0; i < this.#size; ++i) {
            arr.push(this.at(i));
        }
        return arr;
    }

    at(globalIndex) {
        let {localIdx, buckIdx} = this._bucketIndex(globalIndex);
        return this.#buckets[buckIdx][localIdx];
    }
    // === Iterator ===
    [Symbol.iterator]() {
        let index = 0;
        return {
            next: () => {
                if (index < this.#size) {
                return { value: this.at(index++), done: false };
                }
                return { value: undefined, done: true};
            },
        };
    }

    // === Internal methods (optional) ===
    
    _ensureBucket(front = false) {
        const newSize = this.#bucketSize * 2;
        const newBuckets = new Array(newSize);

        if (front) {

            for (let i = 0; i < this.#bucketSize; ++i) {
                newBuckets[i + this.#bucketSize] = this.#buckets[i];
            }
            for (let i = 0; i < this.#bucketSize; ++i) {
                newBuckets[i] = new Array(this.#everyBucketsLength).fill(null);
            }
            this.#frontBucket += this.#bucketSize;
            this.#backBucket += this.#bucketSize;
        } else {

            for (let i = 0; i < this.#bucketSize; ++i) {
                newBuckets[i] = this.#buckets[i];
            }
            for (let i = this.#bucketSize; i < newSize; ++i) {
                newBuckets[i] = new Array(this.#everyBucketsLength).fill(null);
            }
        }

        this.#buckets = newBuckets;
        this.#bucketSize = newSize;
    }



    _bucketIndex(globalIndex) {
        if (!Number.isInteger(globalIndex) || globalIndex < 0 || globalIndex >= this.#size) {
            return undefined;
        }
        let absoluteIndex = (this.#frontIndex + this.#MAGIC_ONE) + globalIndex;
        let localIdx = absoluteIndex % this.#everyBucketsLength;
        let buckIdx = this.#frontBucket + Math.floor(absoluteIndex / this.#everyBucketsLength);

        return {localIdx, buckIdx};
    }
}

function testBucketedDequeStress() {
    const dq = new BucketedDeque(4); // small per-bucket length to trigger growth quickly
    console.log("🧪 === STRESS TEST: Worst-case operations ===");

    // --- 1. Attempt to pop from empty deque ---
    console.log("\n⚠️ [1] pop_front() / pop_back() on empty deque");
    try { dq.pop_front(); }
    catch (e) { console.log("Expected → RangeError('Deque is Empty:') | Got →", e.message); }
    try { dq.pop_back(); }
    catch (e) { console.log("Expected → RangeError('Deque is Empty:') | Got →", e.message); }

    // --- 2. Overflow via push_back (to force _ensureBucket) ---
    console.log("\n🚀 [2] push_back() massive fill to force _ensureBucket()");
    for (let i = 0; i < 50; ++i) dq.push_back(i);
    console.log("Expected → size > 32 | Got →", dq.size());
    console.log("Expected → front=0 | Got →", dq.front());
    console.log("Expected → back=49 | Got →", dq.back());

    // --- 3. Overflow via push_front (to force _ensureBucket(true)) ---
    console.log("\n🚀 [3] push_front() massive fill to force _ensureBucket(true)");
    for (let i = 1; i <= 40; ++i) dq.push_front(-i);
    console.log("Expected → size ≈ 90 | Got →", dq.size());
    console.log("Expected → front≈ -40 | Got →", dq.front());
    console.log("Expected → back=49 | Got →", dq.back());

    // --- 4. Drain completely ---
    console.log("\n💣 [4] Pop all elements until empty");
    let count = 0;
    while (!dq.isEmpty()) {
        dq.pop_back();
        ++count;
    }
    console.log("Expected → size=0 | Got →", dq.size());
    console.log("Expected → isEmpty=true | Got →", dq.isEmpty());

    // --- 5. clear() on already empty deque ---
    console.log("\n🧹 [5] Clear() on already empty deque");
    dq.clear();
    console.log("Expected → size=0 | Got →", dq.size());
    console.log("Expected → front=undefined, back=undefined | Got →", dq.front(), dq.back());

    // --- 6. Operations after clear() ---
    console.log("\n🔁 [6] Push operations after clear()");
    dq.push_back(100);
    dq.push_front(50);
    dq.push_back(200);
    const arr = dq.toArray ? dq.toArray() : "(implement toArray)";
    console.log("Expected → [50,100,200] | Got →", arr);
    console.log("Expected → front=50 | Got →", dq.front());
    console.log("Expected → back=200 | Got →", dq.back());
    console.log("Expected → size=3 | Got →", dq.size());

    // --- 7. Iterator on empty deque ---
    dq.clear();
    console.log("\n🔁 [7] Iterate empty deque");
    console.log("Expected → no output below");
    for (const x of dq) console.log("Got unexpected:", x);

    // --- 8. Mixed push_front / push_back alternating ---
    console.log("\n⚔️ [8] Mixed push_front/push_back alternating");
    for (let i = 0; i < 20; ++i) {
        if (i % 2 === 0) dq.push_front(i);
        else dq.push_back(i);
    }
    const mixArr = dq.toArray ? dq.toArray() : "(implement toArray)";
    console.log("Expected → mixed sequence (front≈18, back≈19) | Got → front:", dq.front(), "back:", dq.back());
    console.log("Expected → ~20 elements total | Got →", dq.size());
    console.log("Expected → visible sequence | Got →", mixArr);

    // --- 9. Boundary check for at() ---
    console.log("\n🧮 [9] Boundary check for at()");
    try {
        console.log("Expected → at(0) == front:", dq.front(), "| Got →", dq.at(0));
        console.log("Expected → at(size-1) == back:", dq.back(), "| Got →", dq.at(dq.size() - 1));
        console.log("Expected → at(size) should throw RangeError");
        dq.at(dq.size()); // should throw
    } catch (e) {
        console.log("Got expected error →", e.message);
    }

    console.log("\n✅ STRESS TEST FINISHED — compare Expected and Got above.");
}

testBucketedDequeStress();
