# Pairing Heap Priority Queue

Implementation of a Priority Queue based on a Pairing Heap.

## Platform Support

Supports Node version (4.0.0) and the following browsers:

| Android | Firefox | Chrome | IE | Opera | Safari |
| ------- | ------- | ------ | -- | ----- | ------ |
| All     | 36      | 21     | 11 | All   | 5.1    |

## Usage

Install the package from NPM:

```bash
npm i -S phpq
```

Import the package and use it, see the [API](#api) for details.

```js
import { PriorityQueue } from 'phpq';

const queue = new PriorityQueue((a, b) => a - b);
queue.push(1);
queue.push(2);
queue.push(3);
```

## API

### `new PriorityQueue(comparator)`

Constructs a new `PriorityQueue` with the provided comparator function. The
comparator function is in the form `(a, b) => N`, where:

- `N < 0`: `a` is higher priority than `b`, `a` comes first.
- `N = 0`: `a` is equal priority to `b`.
- `N > 0`: `a` is lower priority than `b`, `b` comes first.

```js
const queue = new PriorityQueue((a, b) => a.priority - b.priority)
```

### `queue.push(it[, ..., itN])`

Pushes the elements `it` through `itN` to the `PriorityQueue` and returns the
updated length of the `PriorityQueue`.

```js
queue.push({ key: 'A', priority: 10 })
```

### `queue.pop()`

Returns and removes the highest priority element from the `PriorityQueue`.

```js
console.log(queue.pop().key); // 'A'
console.log(queue.pop()); // undefined
```

### `queue.peek()`

Returns the highest priority element from the `PriorityQueue` without removing
it.

```js
console.log(queue.peek().key); // 'A'
console.log(queue.peek().key); // 'A'
```

### `queue.length`

The `length` or number of items on the `PriorityQueue`.

```js
console.log(queue.length); // 0
queue.push({ key: 'A', priority: 10 });
console.log(queue.length); // 1
```

## Benchmarks

The implementation has been optimized for performance but does not perform as
well as binary heap implementations, this implementation should, in theory,
outperform binary heap implementations for inserts but the extra structural
complexity (i.e. a binary heap can be implemented as a single array, whereas
pairing heap is implemented as nested arrays) and resultant object allocations
handicaps overall performance.

The benchmarks compare operations against a fast implementation of a binary
heap [bhpq](https://www.npmjs.com/bhpq):

```
phpq push and pop number x 4,038 ops/sec ±1.92% (94 runs sampled)
phpq push and pop object x 2,791 ops/sec ±0.96% (92 runs sampled)
bhpq push and pop number x 13,979 ops/sec ±0.48% (96 runs sampled)
bhpq push and pop object x 3,448 ops/sec ±1.24% (92 runs sampled)
```
