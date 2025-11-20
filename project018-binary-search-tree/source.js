let arr = [];
while(arr.length < 8){
    var r = Math.floor(Math.random() * 100) + 1;
    if(arr.indexOf(r) === -1) arr.push(r);
}

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BST {
  constructor(array) {
    array.sort((a, b) => a - b);
    array = [...new Set(array)];
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    if (array.length == 0) return null;
    let rootIndex = Math.floor(array.length / 2);
    let root = new Node(array[rootIndex]);
    root.left = this.buildTree(array.slice(0, rootIndex));
    root.right = this.buildTree(array.slice(rootIndex + 1));
    return root;
  }

  insert(value) {
    this.#insert(this.root, value);
  }

  #insert(root, value) {
    if (value < root.data) {
      if (!root.left) {
        root.left = new Node(value);
      } else {
        this.#insert(root.left, value);
      }
    } else if (value > root.data) {
      if (!root.right) {
        root.right = new Node(value);
      } else {
        this.#insert(root.right, value);
      }
    }
  }

  find(value) {
    return this.#find(this.root, value);
  }

  #find(root, value) {
    if (!root) return null;
    if (root.data == value) return root;
    return this.#find(root.left, value) ?? this.#find(root.right, value);
  }

  height(value) {
    let node = this.#find(this.root, value);
    if (!node) return null;

    return this.#getHeightOfNode(node);
  }

  #getHeightOfNode = (node, steps = -1) => {
    if (!node) return steps;
    return Math.max(
      this.#getHeightOfNode(node.left, steps + 1),
      this.#getHeightOfNode(node.right, steps + 1)
    );
  };

  isBalanced() {
    let checkBalanced = (node) => {
      if (!node) return true;
      let leftHeight = this.#getHeightOfNode(node.left);
      let rightHeight = this.#getHeightOfNode(node.right);
      if (Math.abs(leftHeight - rightHeight) > 1) return null;
      return checkBalanced(node.left) ?? checkBalanced(node.right);
    };

    return checkBalanced(this.root) == true ? true : false;
  }

  reBalance() {
    let array = [];
    this.inOrderForEach((node) => {
      array.push(node.data);
    })
    this.root = this.buildTree(array);
  }

  depth(value) {
    let traverse = (node, value, steps = 0) => {
      if (!node) return null;
      if (node.data == value) return steps;
      return (
        traverse(node.left, value, steps + 1) ??
        traverse(node.right, value, steps + 1)
      );
    };

    return traverse(this.root, value);
  }

  levelOrderForEach(callback) {
    if (!(callback instanceof Function))
      throw Error("levelOrderForEach requires a callback function.");
    let queue = [this.root];
    let pointer;

    while (queue.length > 0) {
      pointer = queue.pop();
      if (pointer.left) queue.unshift(pointer.left);
      if (pointer.right) queue.unshift(pointer.right);
      callback(pointer);
    }
  }

  inOrderForEach(callback) {
    if (!(callback instanceof Function))
      throw Error("inOrderForEach requires a callback function.");

    let traverse = (node, callback) => {
      if (node.left) traverse(node.left, callback);
      callback(node);
      if (node.right) traverse(node.right, callback);
    };

    traverse(this.root, callback);
  }

  preOrderForEach(callback) {
    if (!(callback instanceof Function))
      throw Error("preOrderForEach requires a callback function.");

    let traverse = (node, callback) => {
      callback(node);
      if (node.left) traverse(node.left, callback);
      if (node.right) traverse(node.right, callback);
    };

    traverse(this.root, callback);
  }

  postOrderForEach(callback) {
    if (!(callback instanceof Function))
      throw Error("postOrderForEach requires a callback function.");

    let traverse = (node, callback) => {
      if (node.left) traverse(node.left, callback);
      if (node.right) traverse(node.right, callback);
      callback(node);
    };

    traverse(this.root, callback);
  }

  printTree(node = this.root, prefix = "", isLeft = true) {
    if (!node) return;

    if (node.right) {
      this.printTree(node.right, prefix + (isLeft ? "│   " : "    "), false);
    }

    console.log(prefix + (isLeft ? "└── " : "┌── ") + node.data);

    if (node.left) {
      this.printTree(node.left, prefix + (isLeft ? "    " : "│   "), true);
    }
  }
}

let test = new BST(arr);
test.insert(100);
test.insert(200);
test.insert(300);
test.insert(400);
test.insert(40);
test.insert(-9);
test.printTree();
console.log(test.isBalanced());
test.reBalance();
test.printTree();

console.log(test.isBalanced());

