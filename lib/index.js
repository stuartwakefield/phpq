(function (global) {
  'use strict';

  /**
   * Implements the merge pairs algorithm for paring heap. Takes the
   * root heap and subheaps, merges the subheaps pairwise and returns
   * the root most subheap.
   * @param heaps the heaps to merge
   * @param comparator the function that compares two elements to give the priority order
   * @returns the merged heap
   */
  function mergePairs(heap, comparator) {
    if (heap.length === 2) {
      return heap[1];
    }
    var results = [], last, l = heap.length;
    for (var i = 1; i < l; i += 2) {
      const current = heap[i];
      results[i >> 1] = (i < l - 1) ? mergePair(current, heap[i + 1], comparator) : current;
    }
    for (var i = results.length - 1; i > -1; --i) {
      if (!last) {
        last = results[i];
      } else {
        last = mergePair(last, results[i], comparator);
      }
    }
    return last;
  }

  /**
   * Implements the merge pair algorithm for pairing heap. Ensures that
   * the root-most heap is the highest priority.
   * @param a one of the heaps to merge
   * @param b the other heap to merge
   * @param comparator the function that compares two elements to give the priority order
   * @returns the merged heap
   */
  function mergePair(a, b, comparator) {
    if (comparator(a[0], b[0]) > 0) {
      b[b.length] = a;
      return b;
    } else {
      a[a.length] = b;
      return a;
    }
  }

  /**
   * A pairing heap is a specialized type of heap whose root / peek is O(1), delete
   * root is O(log n), insert is O(1) and merge is O(1).
   * @param comparator the function that compares two elements to give the priority order
   */
  function PairingHeap(comparator) {
    this._heap = null;
    this._comparator = comparator;
    this.length = 0;
  }

  /**
   * Pushes the passed elements onto the heap.
   * @param it the element to add
   * @returns the updated heap
   */
  PairingHeap.prototype.push = function(it) {
    if (!this._heap) {
      this._heap = [it];
    } else {
      this._heap = mergePair(this._heap, [it], this._comparator);
    }
    var l = arguments.length;
    for (var i = 1; i < l; ++i) {
      this._heap = mergePair(this._heap, [arguments[i]], this._comparator);
    }
    this.length += l;
    return this.length;
  };

  /**
   * Return the root element of the heap without updating the heap.
   * @returns the root element
   */
  PairingHeap.prototype.peek = function() {
    if (this._heap) {
      return this._heap[0];
    }
  };

  /**
   * Removes and returns the root element from the heap.
   * @returns the root element
   */
  PairingHeap.prototype.pop = function() {
    if (this._heap) {
      const element = this._heap[0];
      this._heap = mergePairs(this._heap, this._comparator);
      --this.length;
      return element;
    }
  };

  /**
   * Convenience factory function to create a new PriorityQueue
   * @param comparator the function that compares two elements to give the priority order
   * @returns the priority queue
   */
  function phpq(comparator) {
    return new PairingHeap(comparator);
  }

  phpq.PriorityQueue = PairingHeap;

  if (module && module.exports) {
    module.exports = phpq;
  } else {
    global.phpq = phpq;
  }
}) (this);
