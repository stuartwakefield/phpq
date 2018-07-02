const { expect } = require('chai');
const { PriorityQueue } = require('../lib');

describe('new PriorityQueue(comparator)', () => {
  it('Creates a priority queue', () => {
    const queue = new PriorityQueue((a, b) => a - b);
    expect(queue.length).equal(0);
  });

  describe('#push(it[, ..., itN])', () => {
    it('Adds an item to the priority queue', () => {
      const queue = new PriorityQueue((a, b) => a - b);
      queue.push(1);
      expect(queue.length).equal(1);
    });

    it('Adds multiple items to the priority queue', () => {
      const queue = new PriorityQueue((a, b) => a - b);
      queue.push(1, 2, 3);
      expect(queue.length).equal(3);
    });
  });

  describe('#peek()', () => {
    it('Returns the highest priority item without removing it', () => {
      const queue = new PriorityQueue((a, b) => a - b);
      queue.push(3);
      queue.push(1);
      queue.push(2);
      expect(queue.peek()).equal(1);
      expect(queue.peek()).equal(1);
    });
  });

  describe('#pop()', () => {
    it('Removes items in priority order', () => {
      const queue = new PriorityQueue((a, b) => a - b);
      queue.push(3);
      queue.push(1);
      queue.push(2);
      expect(queue.pop()).equal(1);
      expect(queue.pop()).equal(2);
      expect(queue.pop()).equal(3);
      expect(queue.pop()).undefined;
    });
  });

  describe('#length', () => {
    it('Returns the number of items in the queue', () => {
      const queue = new PriorityQueue((a, b) => a - b);
      expect(queue.length).equal(0);
      queue.push(3);
      expect(queue.length).equal(1);
      queue.push(1);
      expect(queue.length).equal(2);
      queue.push(2);
      expect(queue.length).equal(3);
    });
  });

  it('Accepts a function determining priority', () => {
    const queue = new PriorityQueue((a, b) => a.priority - b.priority);
    queue.push({ key: 'A', priority: 3 });
    queue.push({ key: 'B', priority: 1 });
    queue.push({ key: 'C', priority: 2 });
    expect(queue.pop().key).equal('B');
    expect(queue.pop().key).equal('C');
    expect(queue.pop().key).equal('A');
  });

  it('Can use the function to reverse the priority order', () => {
    const queue = new PriorityQueue((a, b) => b.priority - a.priority);
    queue.push({ key: 'A', priority: 3 });
    queue.push({ key: 'B', priority: 1 });
    queue.push({ key: 'C', priority: 2 });
    expect(queue.pop().key).equal('A');
    expect(queue.pop().key).equal('C');
    expect(queue.pop().key).equal('B');
  });

  it('Can use multiple properties for priority', () => {
    const queue = new PriorityQueue((a, b) => a.y === b.y ? a.x - b.x : a.y - b.y);
    queue.push({ key: 'A', x: 3, y: 2 });
    queue.push({ key: 'B', x: 1, y: 2 });
    queue.push({ key: 'C', x: 2, y: 1 });
    expect(queue.pop().key).equal('C');
    expect(queue.pop().key).equal('B');
    expect(queue.pop().key).equal('A');
  });
});
