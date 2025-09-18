# Array

JavaScript 中用于存储多个值的内置对象。

## 构造函数 {#constructor}

创建数组实例。

```js
// 创建空数组
const arr1 = new Array();
const arr2 = new Array(5); // 创建长度为5的空数组
const arr3 = new Array(1, 2, 3); // 创建包含元素的数组

// 字面量语法（推荐）
const arr4 = [];
const arr5 = [1, 2, 3];
```

## 静态方法 {#static-methods}

### `Array.from(arrayLike[, mapFn[, thisArg]])` {#Array.from}

从类数组对象或可迭代对象创建新数组。

```js
Array.from('foo'); // ['f', 'o', 'o']
Array.from([1, 2, 3], x => x + 1); // [2, 3, 4]
Array.from({length: 3}, (v, i) => i); // [0, 1, 2]
```

### `Array.isArray(obj)` {#Array.isArray}

判断传递的值是否为数组。

```js
Array.isArray([1, 2, 3]); // true
Array.isArray({}); // false
Array.isArray('array'); // false
```

### `Array.of(element0[, element1[, ...[, elementN]]])` {#Array.of}

创建一个具有可变数量参数的新数组实例。

```js
Array.of(1); // [1]
Array.of(1, 2, 3); // [1, 2, 3]
Array.of(undefined); // [undefined]
```

## 实例属性 {#instance-properties}

### `Array.prototype.length` {#Array.prototype.length}

设置或返回数组元素个数。

```js
const arr = [1, 2, 3];
arr.length; // 3

arr.length = 2;
arr; // [1, 2]
```

## 实例方法 {#instance-methods}

### `Array.prototype.at(index)` {#Array.prototype.at}

根据索引获取数组元素，支持负数索引。

```js
const arr = [1, 2, 3];
arr.at(0); // 1
arr.at(-1); // 3
```

### `Array.prototype.concat(value1[, value2[, ...[, valueN]]])` {#Array.prototype.concat}

合并两个或多个数组。

```js
const arr1 = [1, 2];
const arr2 = [3, 4];
arr1.concat(arr2); // [1, 2, 3, 4]

[1, 2].concat([3, 4], [5, 6]); // [1, 2, 3, 4, 5, 6]
```

### `Array.prototype.copyWithin(target[, start[, end]])` {#Array.prototype.copyWithin}

浅复制数组的一部分到同一数组中的另一个位置。

```js
const arr = [1, 2, 3, 4, 5];
arr.copyWithin(0, 3, 4); // [4, 2, 3, 4, 5]
arr.copyWithin(1, 3); // [4, 4, 5, 4, 5]
```

### `Array.prototype.entries()` {#Array.prototype.entries}

返回一个新的数组迭代器对象，包含数组中每个索引的键值对。

```js
const arr = ['a', 'b', 'c'];
const iterator = arr.entries();
iterator.next().value; // [0, 'a']
iterator.next().value; // [1, 'b']
```

### `Array.prototype.every(callbackFn[, thisArg])` {#Array.prototype.every}

测试数组的所有元素是否都通过了指定函数的测试。

```js
const arr = [1, 2, 3, 4];
arr.every(x => x < 5); // true
arr.every(x => x % 2 === 0); // false
```

### `Array.prototype.fill(value[, start[, end]])` {#Array.prototype.fill}

用一个固定值填充一个数组中从起始索引到终止索引内的全部元素。

```js
const arr = [1, 2, 3];
arr.fill(4); // [4, 4, 4]
[1, 2, 3].fill(4, 1, 2); // [1, 4, 3]
```

### `Array.prototype.filter(callbackFn[, thisArg])` {#Array.prototype.filter}

创建一个新数组，包含通过所提供函数实现的测试的所有元素。

```js
const arr = [1, 2, 3, 4];
arr.filter(x => x > 2); // [3, 4]
arr.filter(x => x % 2 === 0); // [2, 4]
```

### `Array.prototype.find(callbackFn[, thisArg])` {#Array.prototype.find}

返回数组中满足提供的测试函数的第一个元素的值。

```js
const arr = [5, 12, 8, 130, 44];
arr.find(x => x > 10); // 12
arr.find(x => x > 200); // undefined
```

### `Array.prototype.findIndex(callbackFn[, thisArg])` {#Array.prototype.findIndex}

返回数组中满足提供的测试函数的第一个元素的索引。

```js
const arr = [5, 12, 8, 130, 44];
arr.findIndex(x => x > 10); // 1
arr.findIndex(x => x > 200); // -1
```

### `Array.prototype.findLast(callbackFn[, thisArg])` {#Array.prototype.findLast}

返回数组中满足提供的测试函数的最后一个元素的值。

```js
const arr = [5, 12, 8, 130, 44];
arr.findLast(x => x > 10); // 44
arr.findLast(x => x > 200); // undefined
```

### `Array.prototype.findLastIndex(callbackFn[, thisArg])` {#Array.prototype.findLastIndex}

返回数组中满足提供的测试函数的最后一个元素的索引。

```js
const arr = [5, 12, 8, 130, 44];
arr.findLastIndex(x => x > 10); // 4
arr.findLastIndex(x => x > 200); // -1
```

### `Array.prototype.flat([depth])` {#Array.prototype.flat}

按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。

```js
[1, [2, 3]].flat(); // [1, 2, 3]
[1, [2, [3, 4]]].flat(2); // [1, 2, 3, 4]
[1, [2, [3, [4]]]].flat(Infinity); // [1, 2, 3, 4]
```

### `Array.prototype.flatMap(callbackFn[, thisArg])` {#Array.prototype.flatMap}

先对数组每个元素进行 map 操作，再 flatten 结果数组。

```js
[1, 2, 3].flatMap(x => [x, x * 2]); // [1, 2, 2, 4, 3, 6]
[1, 2, 3].flatMap(x => [[x * 2]]); // [[2], [4], [6]]
```

### `Array.prototype.forEach(callbackFn[, thisArg])` {#Array.prototype.forEach}

对数组的每个元素执行一次给定的函数。

```js
const arr = [1, 2, 3];
arr.forEach(x => console.log(x)); // 依次输出 1, 2, 3
['a', 'b', 'c'].forEach((item, index) => console.log(`${index}: ${item}`));
```

### `Array.prototype.includes(valueToFind[, fromIndex])` {#Array.prototype.includes}

判断数组中是否存在指定元素。

```js
[1, 2, 3].includes(2); // true
[1, 2, 3].includes(4); // false
[1, 2, 3].includes(2, 2); // false
```

### `Array.prototype.indexOf(searchElement[, fromIndex])` {#Array.prototype.indexOf}

返回在数组中可以找到一个给定元素的第一个索引，如果不存在则返回-1。

```js
[1, 2, 3, 2].indexOf(2); // 1
[1, 2, 3, 2].indexOf(4); // -1
[1, 2, 3, 2].indexOf(2, 2); // 3
```

### `Array.prototype.join([separator])` {#Array.prototype.join}

将数组（或类数组对象）的所有元素连接到一个字符串中。

```js
['a', 'b', 'c'].join(); // "a,b,c"
['a', 'b', 'c'].join('-'); // "a-b-c"
['a', 'b', 'c'].join(''); // "abc"
```

### `Array.prototype.keys()` {#Array.prototype.keys}

返回一个包含数组中每个索引键的 Array Iterator 对象。

```js
const arr = ['a', 'b', 'c'];
const iterator = arr.keys();
iterator.next(); // { value: 0, done: false }
[...arr.keys()]; // [0, 1, 2]
```

### `Array.prototype.lastIndexOf(searchElement[, fromIndex])` {#Array.prototype.lastIndexOf}

返回指定元素在数组中的最后一个索引，如果不存在则返回 -1。

```js
[1, 2, 3, 2].lastIndexOf(2); // 3
[1, 2, 3, 2].lastIndexOf(4); // -1
[1, 2, 3, 2].lastIndexOf(2, 2); // 1
```

### `Array.prototype.map(callbackFn[, thisArg])` {#Array.prototype.map}

创建一个新数组，其结果是该数组中的每个元素都调用一次提供的函数后的返回值。

```js
[1, 2, 3].map(x => x * 2); // [2, 4, 6]
['1', '2', '3'].map(Number); // [1, 2, 3]
```

### `Array.prototype.pop()` {#Array.prototype.pop}

从数组中删除最后一个元素，并返回该元素的值。

```js
const arr = [1, 2, 3];
arr.pop(); // 3
arr; // [1, 2]
```

### `Array.prototype.push(element1[, ...[, elementN]])` {#Array.prototype.push}

将一个或多个元素添加到数组的末尾，并返回该数组的新长度。

```js
const arr = [1, 2];
arr.push(3); // 3
arr.push(4, 5); // 5
arr; // [1, 2, 3, 4, 5]
```

### `Array.prototype.reduce(callbackFn[, initialValue])` {#Array.prototype.reduce}

对数组中的每个元素执行一个由您提供的reducer函数(升序执行)，将其结果汇总为单个返回值。

```js
[1, 2, 3, 4].reduce((acc, cur) => acc + cur); // 10
[1, 2, 3, 4].reduce((acc, cur) => acc + cur, 10); // 20
[[0, 1], [2, 3], [4, 5]].reduce((acc, cur) => acc.concat(cur)); // [0, 1, 2, 3, 4, 5]
```

### `Array.prototype.reduceRight(callbackFn[, initialValue])` {#Array.prototype.reduceRight}

从右到左为数组中的每个元素执行一次提供的reducer函数，将其结果汇总为单个返回值。

```js
[['a', 'b'], ['c', 'd']].reduceRight((acc, cur) => acc.concat(cur)); // ['c', 'd', 'a', 'b']
[1, 2, 3, 4].reduceRight((acc, cur) => acc + cur); // 10
```

### `Array.prototype.reverse()` {#Array.prototype.reverse}

将数组中元素的位置颠倒，并返回该数组。

```js
const arr = [1, 2, 3];
arr.reverse(); // [3, 2, 1]
arr; // [3, 2, 1]
```

### `Array.prototype.shift()` {#Array.prototype.shift}

从数组中删除第一个元素，并返回该元素的值。

```js
const arr = [1, 2, 3];
arr.shift(); // 1
arr; // [2, 3]
```

### `Array.prototype.slice([begin[, end]])` {#Array.prototype.slice}

提取某个数组的一部分，并返回一个新的数组，且不会修改原数组。

```js
const arr = [1, 2, 3, 4];
arr.slice(1, 3); // [2, 3]
arr.slice(2); // [3, 4]
arr.slice(-2); // [3, 4]
```

### `Array.prototype.some(callbackFn[, thisArg])` {#Array.prototype.some}

测试数组中是不是至少有1个元素通过了被提供的函数测试。

```js
const arr = [1, 2, 3, 4];
arr.some(x => x > 3); // true
arr.some(x => x > 5); // false
```

### `Array.prototype.sort([compareFunction])` {#Array.prototype.sort}

对数组的元素进行排序，并返回数组。

```js
const arr = [3, 1, 4, 1, 5];
arr.sort(); // [1, 1, 3, 4, 5] (按字符串排序)

[3, 1, 4, 1, 5].sort((a, b) => a - b); // [1, 1, 3, 4, 5] (按数值排序)
[3, 1, 4, 1, 5].sort((a, b) => b - a); // [5, 4, 3, 1, 1] (降序)
```

### `Array.prototype.splice(start[, deleteCount[, item1[, item2[, ...]]]])` {#Array.prototype.splice}

通过删除或替换现有元素或者原地添加新的元素来修改数组，并以数组形式返回被修改的内容。

```js
const arr = [1, 2, 3, 4];
arr.splice(1, 2); // [2, 3] (删除)
arr; // [1, 4]

const arr2 = [1, 2, 3, 4];
arr2.splice(1, 2, 'a', 'b'); // [2, 3] (替换)
arr2; // [1, 'a', 'b', 4]
```

### `Array.prototype.toLocaleString([locales[, options]])` {#Array.prototype.toLocaleString}

返回一个字符串表示数组中的元素。数组中的元素将使用各自的 toLocaleString 方法转成字符串。

```js
const arr = [1, 'a', new Date('21 Dec 1997 14:12:00 UTC')];
arr.toLocaleString('en', {timeZone: 'UTC'}); 
// "1,a,12/21/1997, 2:12:00 PM"
```

### `Array.prototype.toReversed()` {#Array.prototype.toReversed}

返回一个新数组，其元素顺序与原数组相反。

```js
const arr = [1, 2, 3];
arr.toReversed(); // [3, 2, 1]
arr; // [1, 2, 3] (原数组不变)
```

### `Array.prototype.toSorted([compareFunction])` {#Array.prototype.toSorted}

返回一个新数组，其元素已根据提供的函数排序。

```js
const arr = [3, 1, 4, 1, 5];
arr.toSorted(); // [1, 1, 3, 4, 5]
arr; // [3, 1, 4, 1, 5] (原数组不变)
```

### `Array.prototype.toSpliced(start[, deleteCount[, item1[, item2[, ...]]]])` {#Array.prototype.toSpliced}

返回一个新数组，该数组是通过在此数组中删除或替换现有元素或添加新元素来创建的。

```js
const arr = [1, 2, 3, 4];
arr.toSpliced(1, 2); // [1, 4]
arr; // [1, 2, 3, 4] (原数组不变)
```

### `Array.prototype.toString()` {#Array.prototype.toString}

返回一个字符串，表示指定的数组及其元素。

```js
[1, 2, 3].toString(); // "1,2,3"
['a', 'b', 'c'].toString(); // "a,b,c"
```

### `Array.prototype.unshift(element1[, ...[, elementN]])` {#Array.prototype.unshift}

将一个或多个元素添加到数组的开头，并返回该数组的新长度。

```js
const arr = [1, 2];
arr.unshift(0); // 3
arr.unshift(-2, -1); // 5
arr; // [-2, -1, 0, 1, 2]
```

### `Array.prototype.values()` {#Array.prototype.values}

返回一个新的 Array Iterator 对象，该对象包含数组每个索引的值。

```js
const arr = ['a', 'b', 'c'];
const iterator = arr.values();
iterator.next(); // { value: 'a', done: false }
[...arr.values()]; // ['a', 'b', 'c']
```

### `Array.prototype.with(index, value)` {#Array.prototype.with}

返回一个新数组，该数组将指定索引处的元素替换为给定值。

```js
const arr = [1, 2, 3];
arr.with(1, 4); // [1, 4, 3]
arr; // [1, 2, 3] (原数组不变)
```
