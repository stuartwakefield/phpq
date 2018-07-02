const Benchmark = require('benchmark');
const phpq = require('../lib');
const bhpq = require('bhpq');

const ITEM_COUNT = 1e3;
const MAX_NUMBER = 1e6;

const numbers = [];
for (let i = 0; i < ITEM_COUNT; ++i) {
  numbers.push(Math.floor(Math.random() * MAX_NUMBER));
}

const objects = numbers.map(priority => ({ priority }));

const bhpqNumberQueue = new bhpq();
const bhpqObjectQueue = new bhpq({ getPriority: (it) => it.priority });

const phpqNumberQueue = new phpq.PriorityQueue((a, b) => a - b);
const phpqObjectQueue = new phpq.PriorityQueue((a, b) => a.priority - b.priority);

new Benchmark.Suite()
  .add('phpq push and pop number', () => {
    numbers.forEach(number => phpqNumberQueue.push(number));
    while(phpqNumberQueue.length) {
      phpqNumberQueue.pop();
    }
  })
  .add('phpq push and pop object', () => {
    objects.forEach(object => phpqObjectQueue.push(object));
    while(phpqObjectQueue.length) {
      phpqObjectQueue.pop();
    }
  })
  .add('bhpq push and pop number', () => {
    numbers.forEach(number => bhpqNumberQueue.push(number));
    while(bhpqNumberQueue.length) {
      bhpqNumberQueue.pop();
    }
  })
  .add('bhpq push and pop object', () => {
    objects.forEach(object => bhpqObjectQueue.push(object));
    while(bhpqObjectQueue.length) {
      bhpqObjectQueue.pop();
    }
  })
  .on('cycle', function(e) {
    console.log(e.target.toString());
  })
  .run();
