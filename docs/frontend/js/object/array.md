# Array

- ~~length~~
- at
- concat
- copyWithin
- entries
- every
- fill
- filter
- find
- findIndex
- findLast
- findLastIndex
- flat
- flatMap
- forEach
- includes
- ~~indexof~~
- join
- keys
- lastIndexof
- ~~map~~
- ~~pop~~
- ~~push~~
- reduce
- reduceRight
- ~~reverse~~
- shift
- slice
- some
- ~~sort~~
- ~~splice~~
- toLocalestring
- toReversed
- ~~toSorted~~
- toSpliced
- tostring
- ~~unshift~~
- values
- with

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

### toSorted

toSorted() 方法是 sort() 方法的复制方法版本。它返回一个新数组。具体参数可以看[sort](#sort-排序)方法

::: warning 注意
此方法可能在 nodejs 环境下不支持
:::

### indexOf

判断元素是否在数组内，在则返回它的下标，不在则返回 -1

```js
const arr = [1, 2, 3, 4, 5];
console.log(arr.indexOf(3)); // 2
console.log(arr.indexOf(7)); // -1
```

indexOf 方法的第二个参数为 number 类型，可以指定查找的起始索引

```js
const arr = [1, 2, 3, 4, 5];
const data = arr.indexOf(1, 2); // 从下标为 2 元素查找
console.log(data); // -1
```

### map 遍历

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

### forEach 方法（遍历）

-   forEach() 方法按顺序为数组中的每个元素调用一次函数。

-   使用后不影响原数组

-   forEach() 方法没有返回值

-   对空数组不执行

-   接受一个函数，函数有三个参数(item, index, arr)

    -   `item`：必须，当前循环元素的值。

    -   `index`：可选，当前循环元素的索引值。

    -   `arr`：可选，当前循环数组的本身

```js
const arr = [1, 2, 3, 4, 5];
arr.forEach(function (item, index, arr) {
	item - index; // 对数据的操作，不会影响原数组
	arr[index] = item * index; // 可在数据内操作原数组，以达到改变原数组的目的
});
console.log(arr); // 输出：[0, 2, 6, 12, 20]
```

### concat 方法（拼接数组）

拼接多个组数，参数是一个或多个数组，拼接完成返回一个新的数组

使用后不影响原数组

```js
const arr = [1, 2, 3, 4, 5];
const arr2 = [6, 7, 8, 9, 10];
const arr3 = [11, 12, 13, 14, 15];
const nweArr = arr.concat(arr2, arr3);
console.log(nweArr); // 输出：[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
```

​ 同一变量出现多次只会拼接一次

```js
const arr = [1, 2, 3, 4, 5];
const arr2 = [6, 7, 8, 9, 10];
const nweArr = arr.concat(arr2, arr2);
console.log(nweArr); // 输出：[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

### slice 方法（返回指定元素）

`slice()` 方法以新的数组对象，返回数组中被选中的元素。

`slice()` 方法选择从给定的 _start_ 参数开始的元素，并在给定的 _end_ 参数处结束，但不包括 _end_ 参数位置的元素

```js
const arr = [1, 2, 3, 4, 5];
const arr2 = arr.slice(1, 3);
console.log(arr2); // 输出：[2,3]
```

### join 方法（将数组以字符串返回）

-   `join()` 方法将数组以指定字符将数组每个元素分隔成字符串返回。
-   元素将由指定的分隔符分隔。默认分隔符是逗号 ","。
-   注意：join() 方法会对每个元素使用 toString() 方法，所以数组内的元素不能有对象，对象将会装换为"[object Object]"，如果元素为数组则会将数组内的元素提取出来进行拼接

```js
const arr = [1, 2, 3, 4, 5];
const arr2 = arr.join('|');
console.log(arr2); // 输出："1|2|3|4|5"
```

### some 方法（校验数组）

-   some() 方法用于检测数组中的元素是否有一个满足指定条件（函数提供）。
-   some() 方法会依次执行数组的每个元素：
    -   **如果有一个元素满足条件，则表达式返回*true* , 剩余的元素不会再执行检测。**
    -   **如果没有满足条件的元素，则返回 false。**
-   `some ()` 方法接受一个函数，函数有三个参数(item, index, arr)
    -   item：必须，当前循环元素的值。
    -   index：可选，当前循环元素的索引值。
    -   arr：可选，当前循环数组的本身
-   **注意：** some() 不会对空数组进行检测。

```js
const arr = [1, 2, 3, 4, 5];
const arr2 = arr.some(function (item, index, arr) {
	return item > 3;
});
console.log(arr2); // 输出：true
```

### every 方法（校验数组）

-   `every()` 方法用于检测数组所有元素**是否都符合指定条件**（通过函数提供）。
-   `every()` 方法使用指定函数检测数组中的所有元素：
    -   如果数组中检测到有一个元素不满足，则整个表达式返回 false ，且剩余的元素不会再进行检测。
    -   如果所有元素都满足条件，则返回 true。
-   用于组数的校验
-   `every()` 方法接受一个函数，函数有三个参数(item, index, arr)
    -   item：必须，当前循环元素的值。
    -   index：可选，当前循环元素的索引值。
    -   arr：可选，当前循环数组的本身
-   注意： every() 不会对空数组进行检测。

```js
const arr = [1, 2, 3, 4, 5];
const arr2 = arr.every(function (item, index, arr) {
	return item < 4;
});
const arr3 = arr.every(function (item, index, arr) {
	return typeof item === 'number';
});
console.log(arr2); // 输出：false
console.log(arr3); // 输出：true
```

### find 方法（查找元素）

-   find() 方法返回通过测试（函数内判断）的数组的**第一个元素的值**。
-   find() 方法为数组中的每个元素都调用一次函数执行：
    -   当数组中的元素在测试条件时返回 _true_ 时, find() 返回符合条件的元素，之后的值不会再调用执行函数。
    -   如果没有符合条件的元素返回 undefined
-   `find ()` 方法接受一个函数，函数有三个参数(item, index, arr)
    -   item：必须，当前循环元素的值。
    -   index：可选，当前循环元素的索引值。
    -   arr：可选，当前循环数组的本身
-   **注意:** find() 对于空数组，函数是不会执行的。

```js
const arr = [1, 2, 3, 4, 5];
const arr2 = arr.find(function (item, index, arr) {
	return item > 3;
});
console.log(arr2); // 输出：4
```

### filter 方法（过滤数组）

-   filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。如果没有符合条件的元素则返回空数组。
-   可以用于组数的过滤
-   `filter()` 方法接受一个函数，函数有三个参数(item, index, arr)
    -   item：必须，当前循环元素的值。
    -   index：可选，当前循环元素的索引值。
    -   arr：可选，当前循环数组的本身
-   注意： filter() 不会对空数组进行检测。

```js
const arr = [1, 2, 3, 4, 5];
const arr2 = arr.filter(function (item, index, arr) {
	return item < 4;
});
console.log(arr2); // 输出：[1, 2, 3]
```

### reduce 方法

-   参数：reduce() 方法接受两个参数，第一个是一个函数，第二个是参与每轮的计算 total 的初始值
    -   第一个参数：第一个参数为函数，函数接受四个参数：
        -   total：上一轮计算的返回值，默认是数组第一个值
        -   item：当前循环元素的值
        -   index：当前循环元素的索引值
        -   arr：当前循环数组的本身
        -   注意：函数必须有返回值，返回值将作为下一轮计算 total 的值
    -   第二个参数：用于指定 total 的初始值
-   返回值：reduce() 方法最终会返回最后一轮计算的 total 的值
-   常用于数据的累加，找出最大值等操作
-   注：对没有值的数组元素，不执行 reduce() 方法。

```js
const arr = [1, 2, 3, 4, 5];
const arr2 = arr.reduce(function (total, item, index, arr) {
	return (total += item);
}, 0);
console.log(arr2); // 输出：15
```

### toString 方法（转字符串）

-   `toString()` 方法返回包含所有数组值的字符串，以逗号分隔。

```js
const arr = [1, 2, 3, 4, 5];
const arr2 = arr.toString();
console.log(arr2); // 输出："1,2,3,4,5"
```

### at 方法（返回指定元素）

-   `at()` 方法传入一个数字，如果是 0 或正数，则根据数组的索引值返回相应的元素，负数则在数组内逆序查找，-1 就代表组数的最后一位元素

```js
const arr = [1, 2, 3, 4, 5];
const arr2 = arr.at(-1);
console.log(arr2); // 输出：5
```

### includes