class PatternTrie {
  constructor() {
    this.tree = {};
  }
  insert(chars, points) {
    let subTree = this.tree;
    for (const char of chars) {
      if (!subTree[char]) {
        subTree[char] = {};
      }
      subTree = subTree[char];
    }
    subTree[null] = points;
  }
  *getPoints(chars) {
    let subTree = this.tree;
    for (let char of chars) {
      subTree = subTree[char];
      if (subTree) {
        if (subTree[null]) {
          yield subTree[null];
        }
      } else {
        break;
      }
    }
  }
}

export default PatternTrie;
