# Array

-   ~~length~~
-   ~~at~~
-   ~~concat~~
-   copyWithin
-   entries
-   ~~every~~
-   fill
-   ~~filter~~
-   ~~find~~
-   ~~findIndex~~
-   ~~findLast~~
-   ~~findLastIndex~~
-   flat
-   flatMap
-   ~~forEach~~
-   ~~includes~~
-   ~~indexof~~
-   ~~join~~
-   keys
-   ~~lastIndexof~~
-   ~~map~~
-   ~~pop~~
-   ~~push~~
-   ~~reduce~~
-   ~~reduceRight~~
-   ~~reverse~~
-   ~~shift~~
-   ~~slice~~
-   ~~some~~
-   ~~sort~~
-   ~~splice~~
-   toLocalestring
-   toReversed
-   ~~toSorted~~
-   toSpliced
-   ~~tostring~~
-   ~~unshift~~
-   values
-   with

## 静态方法

## 属性

### length

length 是 Array 的实例属性，表示该数组中元素的个数。该值是一个无符号 32 位整数，并且其数值总是大于数组最大索引。

```js
const clothing = ['shoes', 'shirts', 'socks', 'sweaters'];

console.log(clothing.length); // 4
```

`length` 一个小于 2<sup>32</sup> 的非负整数。

| `Array：length` 的属性特性 |     |
| :------------------------- | --- |
| 可写                       | 是  |
| 可枚举                     | 否  |
| 可配置                     | 否  |

```js
const listA = [1, 2, 3];
const listB = new Array(6);

console.log(listA.length);
// 3

console.log(listB.length);
// 6

// 不能设置大于2的32次方
listB.length = 2 ** 32; // 4294967296
// RangeError: Invalid array length

const listC = new Array(-100); // 负数是不允许的
// RangeError: Invalid array length
```

数组对象会观察 `length` 属性，并自动将 `length` 值与数组的内容同步。这意味着：

-   设置 `length` 小于当前长度的值将会截断数组——超过新 `length` 的元素将被删除。
-   设置超过当前 `length` 的任何数组索引（小于 2<sup>32</sup> 的非负整数）将会扩展数组——`length` 属性增加以反映新的最高索引。
-   将 `length` 设置为无效值（例如负数或非整数）会引发 `RangeError` 异常。

当 `length` 被设置为比当前长度更大的值时，数组通过添加[空槽](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Indexed_collections#稀疏数组)来扩展，而不是实际的 `undefined` 值。空槽与数组方法有一些特殊的交互作用；详见[数组方法和空槽](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array#数组方法和空槽)。

```js
const arr = [1, 2];
console.log(arr); // [ 1, 2 ]

arr.length = 5; // 将数组长度设置为 5，而当前为 2。
console.log(arr); // [ 1, 2, <3 empty items> ]

arr.forEach((element) => console.log(element));
// 1
// 2
```

## 方法

### push 添加元素

添加一个元素或多个元素到数组末尾，并返回数组新的长度

::: warning 注意
此方法会改变原数组
:::

```js
const arr = [1, 2, 3];
// 添加一个
arr.push(4);
console.log(arr); // [1, 2, 3, 4]

// 添加多个
arr.push(5, 6);
console.log(arr); // [1, 2, 3, 4, 5, 6]
```

### unshift 添加元素到首位

将一个或多个元素添加到数组 arr 的开头，并返回数组新的长度

::: warning 注意
此方法会改变原数组
:::

```js
const arr = [1, 2, 3];
// 添加一个
arr.unshift(4);
console.log(arr); // [4, 1, 2, 3]

// 添加多个
arr.unshift(5, 6);
console.log(arr); // [5, 6, 4, 1, 2, 3]
```

### splice 删除添加元素

删除数组指定元素 或 删除数组指定元素并在删除元素的索引值开始添加一个或多个元素，不影响删除元素后面的元素，并返回一个数组里面是删除的元素

::: warning 注意
此方法会改变原数组
:::

#### 删除指定元素

```js
const arr = [1, 2, 3, 4, 5];
const delarr = arr.splice(3, 1); // 从数组 arr 的下标 3，删除一个元素
console.log(arr); // [1, 2, 3, 5]
console.log(delarr); // [3]
```

#### 删除元素并在删除索引位置添加一个或多个元素

```js
const arr = [1, 2, 3, 4, 5];
const delarr = arr.splice(3, 1, 101, 102); //从数组 arr 的下标 3，删除一个元素，并添加两个元素
console.log(arr); // [1, 2, 3, 101, 102, 5]
console.log(delarr); // [4]
```

#### 在指定位置添加元素

```js
const arr = [1, 2, 3, 4, 5];
const delarr = arr.splice(3, 0, 101, 102); //从数组 arr 的下标 3，并添加两个元素
console.log(arr); // [1, 2, 3, 101, 102, 4, 5]
console.log(delarr); // []
```

### pop 删除末尾元素

删除数组最后一个元素，并返回删除的元素

::: warning 注意
此方法会改变原数组
:::

```js
const arr = [1, 2, 3, 4, 5];
const delarr = arr.pop();
console.log(arr); // [1, 2, 3, 4]
console.log(delarr); // 5
```

### shift 删除开头元素

删除数组第一个元素，并返回删除的元素

::: warning 注意
此方法会改变原数组
:::

```js
const arr = [1, 2, 3, 4, 5];
const delarr = arr.shift();
console.log(arr); // [2, 3, 4, 5]
console.log(delarr); // 1
```

### reverse 倒序

颠倒数组中元素的顺序，没有参数

::: warning 注意
此方法会改变原数组
:::

```js
const arr2 = [1, 2, 3];
arr2.reverse();
console.log(arr2); // [3, 2, 1]
```

### sort 排序

​ 数组排列，根据每个字符的 Unicode 码位值进行排序

::: warning 注意
此方法会改变原数组
:::

```js
const arr3 = ['string', 'boolean', 'array', 'date'];
arr3.sort();
console.log(arr3); // 输出 ['array','boolean','date','string']
```

#### 数字排序

​ 由于 sort() 方法是先根据首个元素，再根据第二个元素来排序，如果数字按照字符串来排序，则 `"25"` 大于 `"100"`，因为 `"2"` 大于 `"1"`。因此 `sort()` 方法在对数值排序时会产生不正确的结果。我们通过一个比值函数来修正此问题：`arr3.sort((a, b) => a - b)`;

```js
const arr = [1, 4, 3, 2];
arr.sort();
console.log(arr); // [1, 2, 3, 4]

const arr2 = ['10', '4', '30', '2', '100'];
arr2.sort(); // 直接排序
console.log(arr2); // ['10', '100', '2', '30', '4']

const arr3 = ['10', '4', '30', '2', '100'];
arr3.sort((a, b) => a - b); // 使用比值函数
console.log(arr3); // ['2', '4', '10', '30', '100']
```

#### 随机排序

```js
const arr = [1, 4, 3, 2];
arr.sort(() => 0.5 - Math.random());
console.log(arr); // [2, 1, 3, 4]
```

#### 降序排序

返回 a - b 就是升序，反之 b - a 就是降序

```js
const arr = [1, 4, 3, 2];
arr.sort((a, b) => b - a);
console.log(arr); // [4, 3, 2, 1]
```

#### 对象数组排序

对象数组只需在 a 和 b 后面加上对应的属性就好了

```js
const arr = [
	{ name: '张三', age: 36 },
	{ name: '李四', age: 45 },
	{ name: '王五', age: 34 },
];
arr.sort((a, b) => b.age - a.age);
console.log(arr);
/* 结果
	[
		{ name: '李四', age: 45 },
		{ name: '张三', age: 36 },
		{ name: '王五', age: 34 }
	]
*/
```

### toSorted 排序

toSorted() 方法是 sort() 方法的复制方法版本。它返回一个新数组。具体参数可以看[sort](#sort-排序)方法

::: warning 注意
此方法可能在 nodejs 环境下不支持
:::

### at 方法（返回指定元素）

`at()` 方法接收一个整数值并返回该索引对应的元素，允许正数和负数。负整数从数组中的最后一个元素开始倒数。

语法：`at(index)`

-   `index`: 要返回的数组元素的索引，会被转换为整数。负数索引从数组末尾开始计数。如果 `index < 0`，则会返回 `index + array.length` 位置的元素。

```js
const arr = [5, 12, 8, 130, 44];

console.log(arr.at(2)); // 8

console.log(arr.at(-2)); // 130
```

### indexOf 查找索引

判断元素是否在数组内，在则返回它的下标，不在则返回 -1

语法：`indexOf(searchElement[, fromIndex])`

-   `searchElement`: 需要查找的元素
-   `fromIndex`: 开始查找的位置，默认值是 0，可以省略
    -   负索引从数组末尾开始计数——如果 `frommindex < 0`，使用 `frommindex + array.length`。注意，在这种情况下，仍然从前到后搜索数组。
    -   如果 `fromIndex < -array.length` 或者省略了 `fromIndex` ，将使用 `0`，搜索整个数组。
    -   如果 `fromIndex >= array.length`，数组不会继续搜索并返回 -1。

```js
const beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];

console.log(beasts.indexOf('bison')); // 1

console.log(beasts.indexOf('bison', 2)); //  4

console.log(beasts.indexOf('giraffe')); // -1
```

### lastIndexOf 反向查找索引

`lastIndexOf()` 方法返回数组中给定元素最后一次出现的索引，如果不存在则返回 -1。该方法从 fromIndex 开始向前搜索数组。

用法参数参考：[indexOf](#indexof-查找索引)

### find 查找

`find()` 方法返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined。

语法：`find(callbackFn[, thisArg])`

-   `callbackFn`: 为数组中的每个元素执行的函数。它应该返回一个真值来表示已经找到了匹配的元素。该函数被调用时将传入以下参数：
    -   `element`: 数组中正在处理的当前元素。
    -   `index`: 数组中正在处理的当前元素的索引。
    -   `array`: 调用 `find()` 的数组。
-   `thisArg`: 可选，当执行回调函数 `callbackFn` 时，用作 `this` 的值。

数组中第一个满足所提供测试函数的元素的值，否则返回 `undefined`。如果 `callbackFn` 返回一个**真值**，`find()` 返回该元素并停止迭代数组。

```js
const array = [5, 12, 8, 130, 44];

const found = array.find((element) => element > 10);

console.log(found); // 12
```

### findIndex 查找索引

`findIndex()` 方法返回数组中满足提供的测试函数的第一个元素的索引。若没有找到对应元素则返回 `-1`。

用法参数参考：[`find()`](#find-查找)

### findLast 反向查找

`findLast()` 方法**反向**迭代数组，并返回满足提供的测试函数的第一个元素的值。如果没有找到对应元素，则返回 `undefined`。

用法参数参考：[`find()`](#find-查找)

```js
const arr = [5, 12, 50, 130, 44];

const found1 = arr.findLast((element) => element > 45);

console.log(found1); // 130

// 使用 find
const found2 = arr.find((element) => element > 45);

console.log(found2); // 50
```

### findLastIndex 反向查找索引

`findLastIndex()` 方法**反向**迭代数组，并返回满足所提供的测试函数的第一个元素的索引。若没有找到对应元素，则返回 `-1`。

用法参数参考：[`find()`](#find-查找)

### includes

`includes()` 方法用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 `true`，否则返回 `false`。

语法：`includes(searchElement[, fromIndex])`

-   `searchElement`: 需要查找的元素值。
-   `fromIndex`: 可选，开始搜索的索引，会转换为整数。
    -   负索引从数组末尾开始计数——如果 `fromIndex < 0`，那么实际使用的是 `fromIndex + array.length`。然而在这种情况下，数组仍然从前往后进行搜索。
    -   如果 `fromIndex < -array.length` 或者省略 `fromIndex`，则使用 `0`，这将导致整个数组被搜索。
    -   如果 `fromIndex >= array.length`，则不会搜索数组并返回 `false`。

```js
const array1 = [1, 2, 3];

console.log(array1.includes(2)); // true

const pets = ['cat', 'dog', 'bat'];

console.log(pets.includes('cat')); // true

console.log(pets.includes('at')); // false
```

`includes()` 方法使用[零值相等](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Equality_comparisons_and_sameness#%E9%9B%B6%E5%80%BC%E7%9B%B8%E7%AD%89)算法将 `searchElement` 与数组中的元素进行比较。`0` 值都被认为是相等的，不管符号是什么。（即 `-0` 等于 `0`），但 `false` 不被认为与 `0` 相同。`NaN` 可以被正确搜索到。

### map 创建新数组

`map()` 方法创建一个新数组，这个新的数组由原数组中的每个元素都调用一次提供的函数后的返回值组成。

语法：`map(callbackFn [, thisArg])`

-   `callbackFn`：为数组中的每个元素执行的函数。它的返回值作为一个元素被添加为新数组中。该函数被调用时将传入以下参数
    -   `item`：数组中当前正在处理的元素。
    -   `index`：正在处理的元素在数组中的索引。。
    -   `arr`：调用了 map() 的数组本身。
-   `thisArg`：可选的。当执行 `callbackFn` 时，用作 this 的值。

```js
const arr = [1, 4, 9, 16];

// 对数组的每个值乘2
// 没有返回值 map 方法将返回一个全是 undefined 的组数
const map1 = arr.map((item) => item * 2);

console.log(map1); // [ 2, 8, 18, 32 ]
```

### forEach 遍历

forEach() 方法对数组的每个元素执行一次给定的函数。

语法：`forEach(callbackFn [, thisArg])`

-   `callbackFn`：为数组中每个元素执行的函数，该函数接收三个参数
    -   `item`：数组中正在处理的当前元素。
    -   `index`：数组中正在处理的当前元素的索引。
    -   `arr`：调用 forEach() 的数组。
-   `thisArg`：可选的。执行回调函数时用作 this 的值。

```js
const arr = ['a', 'b', 'c'];

arr.forEach((item) => console.log(item));
// 输出
// a
// b
// c
```

### concat 合并

concat() 方法用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。

语法：`concat(array1, array2, ..., arrayN)`

-   `arrayN`：数组或值，`arrayN` 如果是数组会对数组做一个浅拷贝，将被合并到一个新的数组中。如果没有参数，则 `concat` 会返回调用此方法的现存数组的一个浅拷贝。

```js
const arr1 = ['a', 'b', 'c'];
const arr2 = ['d', 'e', 'f'];
// 参数可以是数组或值
const arr3 = arr1.concat(arr2, 'h', { i: 'i' }, () => 'j');

console.log(arr3); // ['a', 'b', 'c', 'd', 'e', 'f', 'h', {…}, ƒ]
```

### copyWithin 复制到自身

`copyWithin()` 方法浅复制数组的一部分到同一数组中的另一个位置，并返回它，不会改变原数组的长度。

### slice 截取

`slice()` 方法返回一个新的数组对象，这一对象是一个由 `start` 和 `end` 决定的原数组的浅拷贝（包括 `start`，不包括 `end`），其中 `start` 和 `end` 代表了数组元素的索引。原始数组不会被改变。

语法：`slice(start[, end])`

-   `start`: 提取起始处的索引，会转换为整数。
    -   如果索引是负数，则从数组末尾开始计算——如果 `start < 0`，则使用 `start + array.length`。
    -   如果 `start < -array.length` 或者省略了 `start`，则使用 `0`。
    -   如果 `start >= array.length`，则不提取任何元素。
-   `end`: 提取终止处的索引，会转换为整数。`slice()` 会提取到但不包括 `end` 的位置。
    -   如果索引是负数，则从数组末尾开始计算——如果 `end < 0`，则使用 `end + array.length`。
    -   如果 `end < -array.length`，则使用 `0`。
    -   如果 `end >= array.length` 或者省略了 `end，则使用` `array.length`，提取所有元素直到末尾。
    -   如果 `end` 在规范化后小于或等于 `start`，则不提取任何元素。

```js
const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

// 从索引 2 开始截取之后的全部元素
console.log(animals.slice(2)); // ["camel", "duck", "elephant"]

// 截取从索引 2 开始到索引 4 的元素（不包括索引 4 的元素）
console.log(animals.slice(2, 4)); // ["camel", "duck"]

console.log(animals.slice(1, 5)); // ["bison", "camel", "duck", "elephant"]

// 从倒数第二个元素开始截取
console.log(animals.slice(-2)); // ["duck", "elephant"]

// 从第二个元素开始截取
console.log(animals.slice(2, -1)); // ["camel", "duck"]

// 截取整个数组
console.log(animals.slice()); // ["ant", "bison", "camel", "duck", "elephant"]
```

### join 拼接为字符串

join() 方法将一个数组（或一个类数组对象）的所有元素连接成一个字符串并返回这个字符串，用逗号（默认）或指定的分隔符字符串分隔。如果数组只有一个元素，那么将返回该元素而不使用分隔符。

语法：`join([separator])`

-   `separator`：指定一个字符串来分隔数组的每个元素。如果需要，将分隔符转换为字符串。如果省略，数组元素用逗号（,）分隔。如果 separator 是空字符串（""），则所有元素之间都没有任何字符。

返回一个所有数组元素连接的字符串。如果 `arr.length` 为 `0`，则返回空字符串。

所有数组元素被转**换成字符串**并连接到一个字符串中。如果一个元素是 `undefined` 或 `null`，它将被转换为空字符串，而不是字符串 `"undefined"` 或 `"null"`。

```js
const elements = ['Fire', 'Air', 'Water'];

console.log(elements.join()); // "Fire,Air,Water"

console.log(elements.join('')); // "FireAirWater"

console.log(elements.join('-')); // "Fire-Air-Water"
```

### some 校验

`some()` 方法测试数组中是否至少有一个元素通过了由提供的函数实现的测试。如果在数组中找到一个元素使得提供的函数返回 `true`，则返回 `true`；否则返回 `false`。它不会修改数组。

语法：`some(callbackFn[, thisArg])`

-   `callbackFn`：为数组中的每个元素执行的函数。它应该返回一个真值以指示元素通过测试，否则返回一个假值。该函数被调用时将传入以下参数：
    -   `element`：数组中正在处理的当前元素。
    -   `index`：数组中正在处理的当前元素的索引。
    -   `array`：调用 some() 的数组。
-   `thisArg`：可选，当执行回调函数 `callbackFn` 时，用作 `this` 的值。

如果回调函数对数组中至少一个元素返回一个真值，则返回 `true`。否则返回 `false`。

对于一个空数组，任何条件下它都返回 `false`。

`callbackFn` 函数一旦返回真值 `some()` 方法将会立即返回 `true` 并停止遍历数组

```js
const array = [1, 2, 3, 4, 5];

console.log(array.some((item) => item % 2 === 0)); // true

console.log(array.some((item) => item > 6)); // false
```

### every 校验

`every()` 方法测试一个数组内的所有元素是否都能通过指定函数的测试。它返回一个布尔值。

语法：`every(callbackFn[, thisArg])`

-   `callbackFn`: 为数组中的每个元素执行的函数。它应该返回一个**真值**以指示元素通过测试，否则返回一个**假值**。该函数被调用时将传入以下参数：
    -   `element`: 数组中正在处理的当前元素。
    -   `index`: 数组中正在处理的当前元素的索引。
    -   `array`: 调用 `every()` 的数组。
-   `thisArg`: 可选，当执行回调函数 `callbackFn` 时，用作 `this` 的值。

如果 `callbackFn` 校验每个数组元素都返回**真值**，则为 true。否则为 false。如果 `callbackFn` 返回一个假值 `every()` 方法将会立即返回 `false` 并停止遍历数组。

```js
const array = [1, 30, 39, 29, 10, 13];

console.log(array.every((v) => v < 40)); // true

console.log(array.every((v) => v > 20)); // false
```

### filter 过滤

`filter()` 方法创建给定数组一部分的浅拷贝，其包含通过所提供函数实现的测试的所有元素。

语法：`filter(callbackFn[, thisArg])`

-   `callbackFn`: 为数组中的每个元素执行的函数。它应该返回一个真值以将元素保留在结果数组中，否则返回一个假值。该函数被调用时将传入以下参数：
    -   `element`: 数组中正在处理的当前元素。
    -   `index`: 数组中正在处理的当前元素的索引。
    -   `array`: 调用 `filter()` 的数组。
-   `thisArg`: 可选，当执行回调函数 `callbackFn` 时，用作 `this` 的值。

以浅拷贝的方式，返回通过过滤函数 `callbackFn` 测试的所有数组元素的新数组。如果没有元素通过测试，则返回一个空数组。

```js
const words = ['spray', 'elite', 'exuberant', 'destruction', 'present'];

const result = words.filter((word) => word.length > 6);

console.log(result); // ["exuberant", "destruction", "present"]
```

### reduce

`reduce()` 方法对数组中的每个元素按序执行一个提供的 `reducer` 函数，每一次运行 `reducer` 会将先前元素的计算结果作为参数传入，最后将其结果汇总为单个返回值。

语法：`reduce(callbackFn[, initialValue])`

-   `callbackFn`: 为数组中每个元素执行的函数。其返回值将作为下一次调用 callbackFn 时的 accumulator 参数。对于最后一次调用，返回值将作为 reduce() 的返回值。该函数被调用时将传入以下参数：
    -   `accumulator`: 上一次调用 `callbackFn` 的结果。在第一次调用时，如果指定了 `initialValue` 则为指定的值，否则为 `array[0]` 的值。
    -   `currentValue`: 当前元素的值。在第一次调用时，如果指定了 `initialValue`，则为 `array[0]` 的值，否则为 `array[1]`。
    -   `currentIndex`：`currentValue` 在数组中的索引位置。在第一次调用时，如果指定了 `initialValue` 则为 `0`，否则为 `1`。
    -   `array`: 调用 `reduce()` 的数组。
-   `initialValue`: 作为第一次调用 `callbackFn` 时的第一个参数的值。如果没有提供初始值，则将使用数组中的第一个元素作为初始值，并从数组的第二个元素开始执行。如果在没有设置初始值的情况下在空数组上调用，则会抛出错误。

### reduceRight

`reduceRight()` 方法对数组的每个值（按反向的顺序）应用一个函数，最后汇总为单个值。

`reduceRight()` 和 `reduce()` 之间的唯一区别是 `reduceRight()` 从数组的末尾开始执行回调。

参数参考：[reduce](#reduce)

```js
const arr = [
	[0, 1],
	[2, 3],
	[4, 5],
];

const result = arr.reduceRight((accumulator, currentValue) => accumulator.concat(currentValue));

console.log(result); // [4, 5, 2, 3, 0, 1]
```

```js
const arr = [1, 2, 3, 4];

// 0 + 1 + 2 + 3 + 4
const initialValue = 0;
const sumWithInitial = arr.reduce((accumulator, currentValue) => accumulator + currentValue, initialValue);

console.log(sumWithInitial); // 10

// 没有初始值，将第一个元素作为初始值，并从第二个元素开始执行
arr.reduce((accumulator, currentValue) => {
	console.log(accumulator, currentValue);

	return accumulator + currentValue;
});
// 1 2
// 3 3
// 6 4

// 设置初始值
arr.reduce((accumulator, currentValue) => {
	console.log(accumulator, currentValue);

	return accumulator + currentValue;
}, initialValue);
// 0 1
// 1 2
// 3 3
// 6 4
```

### toString

`toString()` 方法返回一个字符串，表示指定的数组及其元素。以逗号分隔。

```js
const arr = [1, 2, 'a', '1a'];

console.log(arr.toString()); // "1,2,a,1a"
```
