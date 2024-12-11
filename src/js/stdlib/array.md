# Array 对象

::: details

-   ~~length~~
-   ~~at~~
-   ~~concat~~
-   ~~copyWithin~~
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

:::

## 构造函数

`Array` 是 JavaScript 的原生对象，同时也是一个构造函数，可以用它生成新的数组。

```js
var arr = new Array(2);
arr.length; // 2
arr; // [ empty x 2 ]
```

上面代码中，`Array()` 构造函数的参数 `2`，表示生成一个两个成员的数组，每个位置都是空值。

如果没有使用 `new` 关键字，运行结果也是一样的。

```js
var arr = Array(2);
// 等同于
var arr = new Array(2);
```

考虑到语义性，以及与其他构造函数用法保持一致，建议总是加上 `new`。

`Array()` 构造函数有一个很大的缺陷，不同的参数个数会导致不一致的行为。

```js
// 无参数时，返回一个空数组
new Array(); // []

// 单个正整数参数，表示返回的新数组的长度
new Array(1); // [ empty ]
new Array(2); // [ empty x 2 ]

// 非正整数的数值作为参数，会报错
new Array(3.2); // RangeError: Invalid array length
new Array(-3); // RangeError: Invalid array length

// 单个非数值（比如字符串、布尔值、对象等）作为参数，
// 则该参数是返回的新数组的成员
new Array('abc'); // ['abc']
new Array([1]); // [Array[1]]

// 多参数时，所有参数都是返回的新数组的成员
new Array(1, 2); // [1, 2]
new Array('a', 'b', 'c'); // ['a', 'b', 'c']
```

可以看到，`Array()` 作为构造函数，行为很不一致。因此，不建议使用它生成新数组，直接使用数组字面量是更好的做法。

```js
// bad
var arr = new Array(1, 2);

// good
var arr = [1, 2];
```

注意，如果参数是一个正整数，返回数组的成员都是空位。虽然读取的时候返回 `undefined`，但实际上该位置没有任何值。虽然这时可以读取到 `length` 属性，但是取不到键名。

```js
var a = new Array(3);
var b = [undefined, undefined, undefined];

a.length; // 3
b.length; // 3

a[0]; // undefined
b[0]; // undefined

0 in a; // false
0 in b; // true
```

上面代码中，`a` 是 `Array()`生成的一个长度为 3 的空数组，`b` 是一个三个成员都是 `undefined` 的数组，这两个数组是不一样的。读取键值的时候，`a` 和 `b`都返回 `undefined`，但是 `a` 的键名（成员的序号）都是空的，`b` 的键名是有值的。

## 静态方法

### Array.isArray()

`Array.isArray`方法返回一个布尔值，表示参数是否为数组。它可以弥补`typeof`运算符的不足。

```js
var arr = [1, 2, 3];

typeof arr; // "object"
Array.isArray(arr); // true
```

上面代码中，`typeof`运算符只能显示数组的类型是`Object`，而`Array.isArray`方法可以识别数组。

## 实例属性

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

## 实例方法

### valueOf()，toString()

`valueOf`方法是一个所有对象都拥有的方法，表示对该对象求值。不同对象的 `valueOf` 方法不尽一致，数组的 `valueOf` 方法返回数组本身。

```js
var arr = [1, 2, 3];
arr.valueOf(); // [1, 2, 3]
```

`toString` 方法也是对象的通用方法，数组的 `toString` 方法返回数组的字符串形式。

```js
var arr = [1, 2, 3];
arr.toString(); // "1,2,3"

var arr = [1, 2, 3, [4, 5, 6]];
arr.toString(); // "1,2,3,4,5,6"
```

### push()，pop()

`push`方法用于在数组的末端添加一个或多个元素，并返回添加新元素后的数组长度。

> 注意，该方法会改变原数组。

```js
var arr = [];

arr.push(1); // 1
arr.push('a'); // 2
arr.push(true, {}); // 4
arr; // [1, 'a', true, {}]
```

上面代码使用`push`方法，往数组中添加了四个成员。

`pop`方法用于删除数组的最后一个元素，并返回该元素。

> 注意，该方法会改变原数组。

```js
var arr = ['a', 'b', 'c'];

arr.pop(); // 'c'
arr; // ['a', 'b']
```

对空数组使用`pop`方法，不会报错，而是返回`undefined`。

```js
[].pop(); // undefined
```

`push`和`pop`结合使用，就构成了“后进先出”的栈结构（stack）。

```js
var arr = [];
arr.push(1, 2);
arr.push(3);
arr.pop();
arr; // [1, 2]
```

上面代码中，`3`是最后进入数组的，但是最早离开数组。

### shift()，unshift()

`shift()`方法用于删除数组的第一个元素，并返回该元素。

> 注意，该方法会改变原数组。

```js
var a = ['a', 'b', 'c'];

a.shift(); // 'a'
a; // ['b', 'c']
```

上面代码中，使用`shift()`方法以后，原数组就变了。

`shift()`方法可以遍历并清空一个数组。

```js
var list = [1, 2, 3, 4];
var item;

while ((item = list.shift())) {
	console.log(item);
}

list; // []
```

上面代码通过`list.shift()`方法每次取出一个元素，从而遍历数组。它的前提是数组元素不能是`0`或任何布尔值等于`false`的元素，因此这样的遍历不是很可靠。

`push()`和`shift()`结合使用，就构成了“先进先出”的队列结构（queue）。

`unshift()`方法用于在数组的第一个位置添加元素，并返回添加新元素后的数组长度。

> 注意，该方法会改变原数组。

```js
var a = ['a', 'b', 'c'];

a.unshift('x'); // 4
a; // ['x', 'a', 'b', 'c']
```

`unshift()`方法可以接受多个参数，这些参数都会添加到目标数组头部。

```js
var arr = ['c', 'd'];
arr.unshift('a', 'b'); // 4
arr; // [ 'a', 'b', 'c', 'd' ]
```

### join()

`join()`方法以指定参数作为分隔符，将所有数组成员连接为一个字符串返回。如果不提供参数，默认用逗号分隔。

```js
var a = [1, 2, 3, 4];

a.join(' '); // '1 2 3 4'
a.join(' | '); // "1 | 2 | 3 | 4"
a.join(); // "1,2,3,4"
```

如果数组成员是`undefined`或`null`或空位，会被转成空字符串。

```js
[undefined, null].join('#')
// '#'

['a',, 'b'].join('-')
// 'a--b'
```

通过`call`方法，这个方法也可以用于字符串或类似数组的对象。

```js
Array.prototype.join.call('hello', '-');
// "h-e-l-l-o"

var obj = { 0: 'a', 1: 'b', length: 2 };
Array.prototype.join.call(obj, '-');
// 'a-b'
```

### concat()

`concat`方法用于多个数组的合并。它将新数组的成员，添加到原数组成员的后部，然后返回一个新数组，原数组不变。

```js
['hello'].concat(['world'])
// ["hello", "world"]

['hello'].concat(['world'], ['!'])
// ["hello", "world", "!"]

[].concat({a: 1}, {b: 2})
// [{ a: 1 }, { b: 2 }]

[2].concat({a: 1})
// [2, {a: 1}]
```

除了数组作为参数，`concat`也接受其他类型的值作为参数，添加到目标数组尾部。

```js
[1, 2, 3].concat(4, 5, 6);
// [1, 2, 3, 4, 5, 6]
```

如果数组成员包括对象，`concat`方法返回当前数组的一个浅拷贝。所谓“浅拷贝”，指的是新数组拷贝的是对象的引用。

```js
var obj = { a: 1 };
var oldArray = [obj];

var newArray = oldArray.concat();

obj.a = 2;
newArray[0].a; // 2
```

上面代码中，原数组包含一个对象，`concat`方法生成的新数组包含这个对象的引用。所以，改变原对象以后，新数组跟着改变。

### reverse()

`reverse`方法用于颠倒排列数组元素，返回改变后的数组。

> 注意，该方法将改变原数组。

```js
var a = ['a', 'b', 'c'];

a.reverse(); // ["c", "b", "a"]
a; // ["c", "b", "a"]
```

### slice()

`slice()`方法用于提取目标数组的一部分，返回一个新数组，原数组不变。

```js
arr.slice(start, end);
```

它的第一个参数为起始位置（从 0 开始，会包括在返回的新数组之中），第二个参数为终止位置（但该位置的元素本身不包括在内）。如果省略第二个参数，则一直返回到原数组的最后一个成员。

```js
var a = ['a', 'b', 'c'];

a.slice(0); // ["a", "b", "c"]
a.slice(1); // ["b", "c"]
a.slice(1, 2); // ["b"]
a.slice(2, 6); // ["c"]
a.slice(); // ["a", "b", "c"]
```

上面代码中，最后一个例子`slice()`没有参数，实际上等于返回一个原数组的拷贝。

如果`slice()`方法的参数是负数，则表示倒数计算的位置。

```js
var a = ['a', 'b', 'c'];
a.slice(-2); // ["b", "c"]
a.slice(-2, -1); // ["b"]
```

上面代码中，`-2`表示倒数计算的第二个位置，`-1`表示倒数计算的第一个位置。

如果第一个参数大于等于数组长度，或者第二个参数小于第一个参数，则返回空数组。

```js
var a = ['a', 'b', 'c'];
a.slice(4); // []
a.slice(2, 1); // []
```

`slice()`方法的一个重要应用，是将类似数组的对象转为真正的数组。

```js
Array.prototype.slice.call({ 0: 'a', 1: 'b', length: 2 });
// ['a', 'b']

Array.prototype.slice.call(document.querySelectorAll('div'));
Array.prototype.slice.call(arguments);
```

上面代码的参数都不是数组，但是通过`call`方法，在它们上面调用`slice()`方法，就可以把它们转为真正的数组。

### splice()

`splice()`方法用于删除原数组的一部分成员，并可以在删除的位置添加新的数组成员，返回值是被删除的元素。

> 注意，该方法会改变原数组。

```js
arr.splice(start, count, addElement1, addElement2, ...);
```

`splice`的第一个参数是删除的起始位置（从 0 开始），第二个参数是被删除的元素个数。如果后面还有更多的参数，则表示这些就是要被插入数组的新元素。

```js
var a = ['a', 'b', 'c', 'd', 'e', 'f'];
a.splice(4, 2); // ["e", "f"]
a; // ["a", "b", "c", "d"]
```

上面代码从原数组 4 号位置，删除了两个数组成员。

```js
var a = ['a', 'b', 'c', 'd', 'e', 'f'];
a.splice(4, 2, 1, 2); // ["e", "f"]
a; // ["a", "b", "c", "d", 1, 2]
```

上面代码除了删除成员，还插入了两个新成员。

起始位置如果是负数，就表示从倒数位置开始删除。

```js
var a = ['a', 'b', 'c', 'd', 'e', 'f'];
a.splice(-4, 2); // ["c", "d"]
```

上面代码表示，从倒数第四个位置`c`开始删除两个成员。

如果只是单纯地插入元素，`splice`方法的第二个参数可以设为`0`。

```js
var a = [1, 1, 1];

a.splice(1, 0, 2); // []
a; // [1, 2, 1, 1]
```

如果只提供第一个参数，等同于将原数组在指定位置拆分成两个数组。

```js
var a = [1, 2, 3, 4];
a.splice(2); // [3, 4]
a; // [1, 2]
```

### sort()

`sort`方法对数组成员进行排序，默认是将元素转换为字符串，然后按照编码顺序（UTF-16 码元值）升序排序。排序后，返回排序后的数组，同时原数组也将被改变。

```js
['d', 'c', 'b', 'a'].sort();
// ['a', 'b', 'c', 'd']

[4, 3, 2, 1].sort();
// [1, 2, 3, 4]

[11, 101].sort();
// [101, 11]

[10111, 1101, 111].sort();
// [10111, 1101, 111]
```

上面代码的最后两个例子，需要特殊注意。`sort()`方法不是按照大小排序，而是按照编码顺序。也就是说，数值会被先转成字符串，再按照编码顺序进行比较，所以`101`排在`11`的前面。

如果想让`sort`方法按照自定义方式排序，可以传入一个函数作为参数。

```js
[10111, 1101, 111].sort(function (a, b) {
	return a - b;
});
// [111, 1101, 10111]
```

上面代码中，`sort`的参数函数本身接受两个参数，表示进行比较的两个数组成员。如果该函数的返回值大于`0`，表示第一个成员排在第二个成员后面；其他情况下，都是第一个元素排在第二个元素前面。

```js
[
	{ name: '张三', age: 30 },
	{ name: '李四', age: 24 },
	{ name: '王五', age: 28 },
].sort(function (o1, o2) {
	return o1.age - o2.age;
});
// [
//   { name: "李四", age: 24 },
//   { name: "王五", age: 28  },
//   { name: "张三", age: 30 }
// ]
```

注意，自定义的排序函数应该返回数值，否则不同的浏览器可能有不同的实现，不能保证结果都一致。

<!-- prettier-ignore -->
```js
// bad
[1, 4, 2, 6, 0, 6, 2, 6].sort((a, b) => a > b);

// good
[1, 4, 2, 6, 0, 6, 2, 6].sort((a, b) => a - b);
```

上面代码中，前一种排序算法返回的是布尔值，这是不推荐使用的。后一种是数值，才是更好的写法。

#### 随机排序

`sort`方法可以接受一个随机排序的函数作为参数，我们可以将函数的返回值随机化，就可以实现随机排序。

```js
function compare(a, b) {
	return Math.random() - 0.5;
}

[1, 2, 3, 4, 5].sort(compare); // [4, 1, 3, 5, 2]
```

#### 中文排序问题

```js
const names = ['叶良辰', '赵日天', '龙傲天', '福尔康'];

names.sort(); // [ '叶良辰', '福尔康', '赵日天', '龙傲天' ]
```

上面代码我们的预期是将`names`数组按照拼音升序排序，结果显然与我们的预期不一样，“福”反而排在了“叶”后面。

这是因为 `sort()` 方法默认是按照字符的编码顺序来排的。而我们需要的按照字典顺序来排序。

通过 `codePointAt` 可以拿到字符的编码，下面的代码就可以看出“叶”的编码比“福”小，所以排在了“福”前面。

```js
'叶'.codePointAt(); // 21494
'福'.codePointAt(); // 31119
```

可以通过 `localeCompare` 方法比较字典顺序。

```js
'叶'.localeCompare('福'); // 1
```

上面就是比较“叶”和“福”的字典顺序，返回正数，表示“叶”排在“福”后面，返回负数则相反，返回`0`表示两个字符在同一位置。

还是最开始的代码，我们通过 `localeCompare` 方法，将`names`数组按照字典顺序排序。

```js
const names = ['叶良辰', '赵日天', '龙傲天', '福尔康'];

names.sort((a, b) => a.localeCompare(b)); // [ '福尔康', '龙傲天', '叶良辰', '赵日天' ]
```

还可以交换 a 和 b 的位置，实现按照字典顺序降序排序。

```js
const names = ['叶良辰', '赵日天', '龙傲天', '福尔康'];

names.sort((a, b) => b.localeCompare(a)); // [ '赵日天', '叶良辰', '龙傲天', '福尔康' ]
```

### map()

`map()`方法将数组的所有成员依次传入参数函数，然后把每一次的执行结果组成一个新数组返回。

```js
var numbers = [1, 2, 3];

numbers.map(function (n) {
	return n + 1;
});
// [2, 3, 4]

numbers;
// [1, 2, 3]
```

上面代码中，`numbers`数组的所有成员依次执行参数函数，运行结果组成一个新数组返回，原数组没有变化。

`map()`方法接受一个函数作为参数。该函数调用时，`map()`方法向它传入三个参数：当前成员、当前位置和数组本身。

```js
[1, 2, 3].map(function (elem, index, arr) {
	return elem * index;
});
// [0, 2, 6]
```

上面代码中，`map()`方法的回调函数有三个参数，`elem`为当前成员的值，`index`为当前成员的位置，`arr`为原数组（`[1, 2, 3]`）。

`map()`方法还可以接受第二个参数，用来绑定回调函数内部的`this`变量（详见《this 变量》一章）。

```js
var arr = ['a', 'b', 'c'];

[1, 2].map(function (e) {
	return this[e];
}, arr);
// ['b', 'c']
```

上面代码通过`map()`方法的第二个参数，将回调函数内部的`this`对象，指向`arr`数组。

如果数组有空位，`map()`方法的回调函数在这个位置不会执行，会跳过数组的空位。

```js
var f = function (n) { return 'a' };

[1, undefined, 2].map(f) // ["a", "a", "a"]
[1, null, 2].map(f) // ["a", "a", "a"]
[1, , 2].map(f) // ["a", , "a"]
```

上面代码中，`map()`方法不会跳过`undefined`和`null`，但是会跳过空位。

### forEach()

`forEach()`方法与`map()`方法很相似，也是对数组的所有成员依次执行参数函数。但是，`forEach()`方法不返回值，只用来操作数据。这就是说，如果数组遍历的目的是为了得到返回值，那么使用`map()`方法，否则使用`forEach()`方法。

`forEach()`的用法与`map()`方法一致，参数是一个函数，该函数同样接受三个参数：当前值、当前位置、整个数组。

```js
function log(element, index, array) {
	console.log('[' + index + '] = ' + element);
}

[2, 5, 9].forEach(log);
// [0] = 2
// [1] = 5
// [2] = 9
```

上面代码中，`forEach()`遍历数组不是为了得到返回值，而是为了在屏幕输出内容，所以不必使用`map()`方法。

`forEach()`方法也可以接受第二个参数，绑定参数函数的`this`变量。

```js
var out = [];

[1, 2, 3].forEach(function (elem) {
	this.push(elem * elem);
}, out);

out; // [1, 4, 9]
```

上面代码中，空数组`out`是`forEach()`方法的第二个参数，结果，回调函数内部的`this`关键字就指向`out`。

注意，`forEach()`方法无法中断执行，总是会将所有成员遍历完。如果希望符合某种条件时，就中断遍历，要使用`for`循环。

```js
var arr = [1, 2, 3];

for (var i = 0; i < arr.length; i++) {
	if (arr[i] === 2) break;
	console.log(arr[i]);
}
// 1
```

上面代码中，执行到数组的第二个成员时，就会中断执行。`forEach()`方法做不到这一点。

`forEach()`方法也会跳过数组的空位。

```js
var log = function (n) {
  console.log(n + 1);
};

[1, undefined, 2].forEach(log)
// 2
// NaN
// 3

[1, null, 2].forEach(log)
// 2
// 1
// 3

[1, , 2].forEach(log)
// 2
// 3
```

上面代码中，`forEach()`方法不会跳过`undefined`和`null`，但会跳过空位。

### filter()

`filter()`方法用于过滤数组成员，满足条件的成员组成一个新数组返回。

它的参数是一个函数，所有数组成员依次执行该函数，返回结果为`true`的成员组成一个新数组返回。该方法不会改变原数组。

```js
[1, 2, 3, 4, 5].filter(function (elem) {
	return elem > 3;
});
// [4, 5]
```

上面代码将大于`3`的数组成员，作为一个新数组返回。

```js
var arr = [0, 1, 'a', false];

arr.filter(Boolean);
// [1, "a"]
```

上面代码中，`filter()`方法返回数组`arr`里面所有布尔值为`true`的成员。

`filter()`方法的参数函数可以接受三个参数：当前成员，当前位置和整个数组。

```js
[1, 2, 3, 4, 5].filter(function (elem, index, arr) {
	return index % 2 === 0;
});
// [1, 3, 5]
```

上面代码返回偶数位置的成员组成的新数组。

`filter()`方法还可以接受第二个参数，用来绑定参数函数内部的`this`变量。

```js
var obj = { MAX: 3 };
var myFilter = function (item) {
	if (item > this.MAX) return true;
};

var arr = [2, 8, 3, 4, 1, 3, 2, 9];
arr.filter(myFilter, obj); // [8, 4, 9]
```

上面代码中，过滤器`myFilter()`内部有`this`变量，它可以被`filter()`方法的第二个参数`obj`绑定，返回大于`3`的成员。

### some()，every()

这两个方法类似“断言”（assert），返回一个布尔值，表示判断数组成员是否符合某种条件。

它们接受一个函数作为参数，所有数组成员依次执行该函数。该函数接受三个参数：当前成员、当前位置和整个数组，然后返回一个布尔值。

`some`方法是只要一个成员的返回值是`true`，则整个`some`方法的返回值就是`true`，否则返回`false`。

```js
var arr = [1, 2, 3, 4, 5];
arr.some(function (elem, index, arr) {
	return elem >= 3;
});
// true
```

上面代码中，如果数组`arr`有一个成员大于等于 3，`some`方法就返回`true`。

`every`方法是所有成员的返回值都是`true`，整个`every`方法才返回`true`，否则返回`false`。

```js
var arr = [1, 2, 3, 4, 5];
arr.every(function (elem, index, arr) {
	return elem >= 3;
});
// false
```

上面代码中，数组`arr`并非所有成员大于等于`3`，所以返回`false`。

注意，对于空数组，`some`方法返回`false`，`every`方法返回`true`，回调函数都不会执行。

```js
function isEven(x) { return x % 2 === 0 }

[].some(isEven) // false
[].every(isEven) // true
```

`some`和`every`方法还可以接受第二个参数，用来绑定参数函数内部的`this`变量。

### reduce()，reduceRight()

`reduce()`方法和`reduceRight()`方法依次处理数组的每个成员，最终累计为一个值。它们的差别是，`reduce()`是从左到右处理（从第一个成员到最后一个成员），`reduceRight()`则是从右到左（从最后一个成员到第一个成员），其他完全一样。

```js
[1, 2, 3, 4, 5].reduce(function (a, b) {
	console.log(a, b);
	return a + b;
});
// 1 2
// 3 3
// 6 4
// 10 5
//最后结果：15
```

上面代码中，`reduce()`方法用来求出数组所有成员的和。`reduce()`的参数是一个函数，数组每个成员都会依次执行这个函数。如果数组有 n 个成员，这个参数函数就会执行 n - 1 次。

-   第一次执行：`a`是数组的第一个成员`1`，`b`是数组的第二个成员`2`。
-   第二次执行：`a`为上一轮的返回值`3`，`b`为第三个成员`3`。
-   第三次执行：`a`为上一轮的返回值`6`，`b`为第四个成员`4`。
-   第四次执行：`a`为上一轮返回值`10`，`b`为第五个成员`5`。至此所有成员遍历完成，整个方法的返回值就是最后一轮的返回值`15`。

`reduce()`方法和`reduceRight()`方法的第一个参数都是一个函数。该函数接受以下四个参数。

1. 累积变量。第一次执行时，默认为数组的第一个成员；以后每次执行时，都是上一轮的返回值。
2. 当前变量。第一次执行时，默认为数组的第二个成员；以后每次执行时，都是下一个成员。
3. 当前位置。一个整数，表示第二个参数（当前变量）的位置，默认为`1`。
4. 原数组。

这四个参数之中，只有前两个是必须的，后两个则是可选的。

<!-- prettier-ignore -->
```js
[1, 2, 3, 4, 5].reduce(function (
  a,   // 累积变量，必须
  b,   // 当前变量，必须
  i,   // 当前位置，可选
  arr  // 原数组，可选
) {
  // ... ...
```

如果要对累积变量指定初值，可以把它放在`reduce()`方法和`reduceRight()`方法的第二个参数。

```js
[1, 2, 3, 4, 5].reduce(function (a, b) {
	return a + b;
}, 10);
// 25
```

上面代码指定参数`a`的初值为 10，所以数组从 10 开始累加，最终结果为 25。注意，这时`b`是从数组的第一个成员开始遍历，参数函数会执行 5 次。

建议总是加上第二个参数，这样比较符合直觉，每个数组成员都会依次执行`reduce()`方法的参数函数。另外，第二个参数可以防止空数组报错。

```js
function add(prev, cur) {
  return prev + cur;
}

[].reduce(add)
// TypeError: Reduce of empty array with no initial value
[].reduce(add, 1)
// 1
```

上面代码中，由于空数组取不到累积变量的初始值，`reduce()`方法会报错。这时，加上第二个参数，就能保证总是会返回一个值。

下面是一个`reduceRight()`方法的例子。

<!-- prettier-ignore -->
```js
function subtract(prev, cur) {
  return prev - cur;
}

[3, 2, 1].reduce(subtract); // 0
[3, 2, 1].reduceRight(subtract); // -4
```

上面代码中，`reduce()`方法相当于`3`减去`2`再减去`1`，`reduceRight`方法相当于`1`减去`2`再减去`3`。

由于这两个方法会遍历数组，所以实际上可以用来做一些遍历相关的操作。比如，找出字符长度最长的数组成员。

```js
function findLongest(entries) {
	return entries.reduce(function (longest, entry) {
		return entry.length > longest.length ? entry : longest;
	}, '');
}

findLongest(['aaa', 'bb', 'c']); // "aaa"
```

上面代码中，`reduce()`的参数函数会将字符长度较长的那个数组成员，作为累积值。这导致遍历所有成员之后，累积值就是字符长度最长的那个成员。

### indexOf()，lastIndexOf()

`indexOf`方法返回给定元素在数组中第一次出现的位置，如果没有出现则返回`-1`。

```js
var a = ['a', 'b', 'c'];

a.indexOf('b'); // 1
a.indexOf('y'); // -1
```

`indexOf`方法还可以接受第二个参数，表示搜索的开始位置。

```js
['a', 'b', 'c'].indexOf('a', 1); // -1
```

上面代码从 1 号位置开始搜索字符`a`，结果为`-1`，表示没有搜索到。

`lastIndexOf`方法返回给定元素在数组中最后一次出现的位置，如果没有出现则返回`-1`。

```js
var a = [2, 5, 9, 2];
a.lastIndexOf(2); // 3
a.lastIndexOf(7); // -1
```

注意，这两个方法不能用来搜索`NaN`的位置，即它们无法确定数组成员是否包含`NaN`。

```js
[NaN]
	.indexOf(NaN) // -1
	[NaN].lastIndexOf(NaN); // -1
```

这是因为这两个方法内部，使用严格相等运算符（`===`）进行比较，而`NaN`是唯一一个不等于自身的值。

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

### includes 包含

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

### copyWithin 复制到自身

`copyWithin()` 方法浅复制数组的一部分到同一数组中的另一个位置，并返回它，不会改变原数组的长度。

语法：`array.copyWithin(target, start, end);`

-   `target`：要复制到的目标位置的索引。
-   `start`：要复制的元素的起始位置的索引。
-   `end` (可选)：要复制的元素的结束位置的索引。如果省略，则默认为数组末尾。

```js
let array = [1, 2, 3, 4, 5];

// 将索引为 0 的元素复制到索引为 3 的位置
array.copyWithin(3, 0);

console.log(array); // 输出 [1, 2, 3, 1, 2]
```

在这个例子中，`copyWithin` 将从索引为 0 的位置开始的元素 `[1, 2, 3]` 复制到索引为 3 的位置，覆盖了原来的 `[4, 5]`。这导致数组变为 `[1, 2, 3, 1, 2]`。

`copyWithin` 还可以处理负数的索引，它会将负数索引视为从数组末尾开始计算的索引。例如：

```js
let array = [1, 2, 3, 4, 5];

// 将索引为 -2 的元素复制到索引为 2 的位置
array.copyWithin(2, -2, -1);

console.log(array); // 输出 [1, 2, 4, 4, 5]
```

在这个例子中，`copyWithin` 将从索引为 -2 的位置开始的元素 `[4]` 复制到索引为 2 的位置，覆盖了原来的 `[3]`。这导致数组变为 `[1, 2, 4, 4, 5]`。

[参考](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin)

### toString

`toString()` 方法返回一个字符串，表示指定的数组及其元素。以逗号分隔。

```js
const arr = [1, 2, 'a', '1a'];

console.log(arr.toString()); // "1,2,a,1a"
```
