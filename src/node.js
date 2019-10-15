class Node {
  constructor(data, priority) {
    this.data = data;
    this.priority = priority;
    this.parent = null;
    this.left = null;
    this.right = null;
  }

  appendChild(node) {
    if (this.left && this.right) {
      return;
    } else if (this.left) {
      this.right = node;
      node.parent = this;
    } else {
      this.left = node;
      node.parent = this;
    }
  }

  removeChild(node) {
    if (node === this.left) {
      node.parent = null;
      this.left = null;
    } else if (node === this.right) {
      node.parent = null;
      this.right = null;
    } else {
      throw new Error("Node isn't child");
    }
  }

  remove() {
    if (!this.parent) {
      return;
    }
    this.parent.removeChild(this);
  }

  swapWithParent() {
    if (!this.parent) {
      return;
    }
    const myLeft = this.left;
    const myRight = this.right;
    const oldRoot = this.parent;
    const leftOfOldRoot = this.parent.left;
    const rightOfOldRoot = this.parent.right;
    const grand = this.parent.parent;

    myLeft && myLeft.remove();
    myRight && myRight.remove();
    leftOfOldRoot && leftOfOldRoot.remove();
    rightOfOldRoot && rightOfOldRoot.remove();
    oldRoot && oldRoot.remove();

    oldRoot && myLeft && oldRoot.appendChild(myLeft);
    oldRoot && myRight && oldRoot.appendChild(myRight);
    leftOfOldRoot &&
      this.appendChild(leftOfOldRoot === this ? oldRoot : leftOfOldRoot);
    rightOfOldRoot &&
      this.appendChild(rightOfOldRoot === this ? oldRoot : rightOfOldRoot);
    grand && grand.appendChild(this);
  }
}

module.exports = Node;
