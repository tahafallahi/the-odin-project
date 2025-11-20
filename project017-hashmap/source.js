class HashMap {
  constructor(loadFactor = 0.8, initialCapacity = 16) {
    this.loadFactor = loadFactor;
    this.capacity = initialCapacity;
    this.buckets = this.createBuckets(this.capacity);
  }

  hash(key) {
    let hashCode = 0;

    const prime = 31;
    for (let char of key) {
      hashCode = (hashCode * prime + char.charCodeAt(0)) % this.capacity;
    }
    return hashCode % this.capacity;
  }

  createBuckets(size) {
    let newBuckets = [];
    for (let i = 0; i < size; i++) {
      newBuckets.push([]);
    }
    return newBuckets;
  }

  reassignBuckets() {
    let newBuckets = this.createBuckets(this.capacity);
    for (let bucket of this.buckets) {
      let pointer = bucket[0];
      while (pointer) {
        this.#set(pointer.key, pointer.value, newBuckets);
        pointer = pointer.next;
      }
    }
    this.buckets = newBuckets;
  }

  createNode(key, value) {
    let next = null;
    return { key, value, next };
  }

  set(key, value) {
    if (this.size() > this.loadFactor * this.capacity) {
      this.capacity *= 2;
      this.reassignBuckets();
    }
    if (this.keys().find((element) => element == key)) {
      this.remove(key);
    }
    this.#set(key, value, this.buckets);
  }

  #set(key, value, buckets) {
    let index = this.hash(key);
    if (index < 0 || index >= buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    if (buckets[index].length == 0) {
      buckets[index].push(this.createNode(key, value));
    } else {
      let pointer = buckets[index][0];
      while (pointer.next) {
        pointer = pointer.next;
      }
      pointer.next = this.createNode(key, value);
    }
  }

  get(key) {
    let result = this.entries().find((element) => element[0] == key);
    return result ? result[1] : null;
  }

  has(key) {
    let result = this.get(key);
    return result ? true : false;
  }

  remove(key) {
    for (let i = 0; i < this.capacity; i++) {
      let pointer = this.buckets[i][0];
      while (pointer) {
        if (key == pointer.key) {
          if (pointer.next && pointer.next.next) {
            pointer.next = pointer.next.next;
          } else {
            this.buckets[i] = [];
          }
          return true;
        }
        pointer = pointer.next;
      }
    }
    return false;
  }

  entries() {
    let result = [];
    for (let i = 0; i < this.capacity; i++) {
      let pointer = this.buckets[i][0];
      while (pointer) {
        result.push([pointer.key, pointer.value]);
        pointer = pointer.next;
      }
    }
    return result;
  }

  clear() {
    this.capacity = 16;
    this.buckets = this.createBuckets(this.capacity);
  }

  keys() {
    return this.entries().map((element) => element[0]);
  }

  values() {
    return this.entries().map((element) => element[1]);
  }

  size() {
    let size = 0;
    for (let i = 0; i < this.capacity; i++) {
      let pointer = this.buckets[i][0];
      while (pointer) {
        size++;
        pointer = pointer.next;
      }
    }
    return size;
  }
}

test = new HashMap();

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

test.set("ice cream", "whdfite");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("moon", "love");

console.log(test.keys());
console.log(test.capacity);
console.log(test.size());


// This is a very bad implementation, specially how set and find go trough the whole table instead of hashing the key and using it as index!
// But it's good enough for now.