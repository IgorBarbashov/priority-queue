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

  pop() {
    if (this.isEmpty()) {
      return;
    }
    const oldRoot = this.root;
    const detached = detachRoot();
    restoreRootFromLastInsertedNode(detached);
    shiftNodeDown(this.root);
    return oldRoot.data;
  }

  detachRoot() {
    const root = this.root;
    this.root = null;
    if (root.left) {
      root.left.parent = null;
    }
    if (root.right) {
      root.right.parent = null;
    }

    return root.right ? root : this.parentNodes.shift();
  }

  restoreRootFromLastInsertedNode(detached) {
    const lastInsertedNode = this.parentNodes.pop();
    const lastInsertedParent = lastInsertedNode.parent;
    const isLastRight = lastInsertedParent.right === lastInsertedNode;
    lastInsertedNode.remove();

    // lastInsertedNode.left = detached.left;
    // lastInsertedNode.right = detached.right;
    // detached.left.parent = lastInsertedNode;
    // detached.right.parent = lastInsertedNode;
    detached.left && lastInsertedNode.appendChild(detached.left);
    detached.right && lastInsertedNode.appendChild(detached.right);

    this.root = lastInsertedNode;

    if (isLastRight) {
      this.parentNodes.unshift(lastInsertedParent);
    }

    if (this.root.left || this.root.right) {
      this.parentNodes.unshift(this.root);
    }
  }

  size() {
    let count = 0;
    const counter = node => {
      count += 1;
      node.left && counter(node.left);
      node.right && counter(node.right);
    };
    this.root && counter(this.root);
    return count;
  }

  isEmpty() {
    return !this.root;
  }

  clear() {
    this.root = null;
    this.parentNodes = [];
  }

  insertNode(node) {
    if (this.isEmpty()) {
      this.root = node;
      this.parentNodes.push(node);
    } else {
      this.parentNodes[0].appendChild(node);
      this.parentNodes.push(node);
    }
    if (this.parentNodes[0].left && this.parentNodes[0].right) {
      this.parentNodes.shift();
    }
  }

  shiftNodeUp(node) {
    if (node.parent) {
      const myIndex = this.parentNodes.indexOf(node);
      const myParentIndex = this.parentNodes.indexOf(node.parent);
      const myParent = node.parent;
      if (node.priority > myParent.priority) {
        if (myIndex !== -1 && myParentIndex !== -1) {
          this.parentNodes[myIndex] = myParent;
          this.parentNodes[myParentIndex] = node;
        } else if (myIndex !== -1) {
          this.parentNodes[myIndex] = myParent;
        }
        node.swapWithParent();
        this.shiftNodeUp(node);
      }
    } else {
      this.root = node;
    }
  }

  shiftNodeDown(node) {}
}

h = new MaxHeap();
h.push(42, 15); // left
h.push(14, 32); // root
h.push(0, 0); // right

const lastInsertedNode = h.root.right;
console.log("lastInsertedNode:", lastInsertedNode.priority);

const left = h.root.left;
console.log("left:", left.priority);

console.log("!!!!!!!!!!!!!!111 h before detached", h);
const detached = h.detachRoot();
console.log("root:", detached.priority);
console.log("!!!!!!!!!!!!!!111 h after detached", h);

h.restoreRootFromLastInsertedNode(detached);

console.log("-----> new heap", h);

module.exports = MaxHeap;
