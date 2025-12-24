let a = { a: 1};
const map = new WeakMap();
map.set (a, 'test');

console.log(map);
console.log(map.get(a))