const Node = require("./node");

class MaxHeap {
  constructor() {
    this.root = null;
    this.parentNodes = [];
  }

  push(data, priority) {
    const newNode = new Node(data, priority);
    this.insertNode(newNode);
    this.shiftNodeUp(newNode);
  }

  pop() {}

  detachRoot() {}

  restoreRootFromLastInsertedNode(detached) {}

  size() {}

  isEmpty() {}

  clear() {}

  insertNode(node) {
    if (!this.root) {
      this.root = node;
    } else if (!this.root.left) {
      this.root.left = node;
    } else if (!this.root.right) {
      this.root.right = node;
    }
  }

  shiftNodeUp(node) {}

  shiftNodeDown(node) {}
}

module.exports = MaxHeap;
