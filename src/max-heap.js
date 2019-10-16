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
    const detached = this.detachRoot();

    if (this.parentNodes.length) {
      this.restoreRootFromLastInsertedNode(detached);
      this.shiftNodeDown(this.root);
    }
    return detached.data;
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
    const isLastRight =
      lastInsertedParent && lastInsertedParent.right === lastInsertedNode;

    lastInsertedNode.remove();

    detached.left &&
      detached.left !== lastInsertedNode &&
      lastInsertedNode.appendChild(detached.left);

    detached.right &&
      detached.right !== lastInsertedNode &&
      lastInsertedNode.appendChild(detached.right);

    this.root = lastInsertedNode;

    if (isLastRight) {
      this.parentNodes.unshift(lastInsertedParent);
    }

    if (!this.root.right) {
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

  shiftNodeDown(node) {
    const comparator = (a, b) => (a.priority > b.priority ? a : b);

    const maxChild =
      node.left !== null
        ? node.right !== null
          ? comparator(node.left, node.right)
          : node.left
        : node.right !== null
        ? node.right
        : null;

    if (!maxChild || maxChild.priority < node.priority) {
      return;
    }

    const myIndex = this.parentNodes.indexOf(node);
    const childIndex = this.parentNodes.indexOf(maxChild);

    if (myIndex !== -1 && childIndex !== -1) {
      this.parentNodes.splice(myIndex, 1, maxChild);
      this.parentNodes.splice(childIndex, 1, node);
    } else if (myIndex === -1 && childIndex !== -1) {
      this.parentNodes.splice(childIndex, 1, node);
    }

    maxChild.swapWithParent();

    if (node === this.root) {
      this.root = maxChild;
    }

    this.shiftNodeDown(node);
  }
}

module.exports = MaxHeap;
