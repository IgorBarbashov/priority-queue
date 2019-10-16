const MaxHeap = require("./max-heap.js");

class PriorityQueue {
  constructor(maxSize = 30) {
    this.maxSize = maxSize;
    this.heap = new MaxHeap();
  }

  push(data, priority) {
    if (this.size() === this.maxSize) {
      throw new Error("Queue already has max size.");
    }
    this.heap.push(data, priority);
  }

  shift() {
    if (this.isEmpty()) {
      throw new Error("Queue is empty.");
    }
    return this.heap.pop();
  }

  size() {
    return this.heap.size();
  }

  isEmpty() {
    return this.heap.isEmpty();
  }
}

module.exports = PriorityQueue;
