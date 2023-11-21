# JavaString 语法

## 输出

在了解 JavaString 语法前，应该先了解下 JavaString 的输出方式，毕竟没有输出，就看不来到效果。

### console 对象

#### log

输出日志（这应该是用的最多的了）。

```js
console.log(message1, message2, ..., messageN)
```

#### info

输出通知信息（和 log 差不多，在某些浏览器可能样式会不一样）。

```js
console.log(message1, message2, ..., messageN)
```

#### warn

输出警告信息（信息文字颜色为黄色）。

```js
console.log(message1, message2, ..., messageN)
```

#### error

输出错误信息（信息文字颜色为红色）。

```js
console.log(message1, message2, ..., messageN)
```

#### dir

输出对象的结构（在输出元素时 dir 比 log 要好用些，dir 可看到元素对象的结构，而 log 看不到）。

```js
console.dir(object);
```










这个对象学过的应该很熟悉，但是又不太熟悉，为什么呢？因为除了 `console.log` 还有很多的方法，比如 `console.info`、`console.warn`、`console.error` 等，这些方法都是用来输出信息的，但是输出的格式不一样，这些方法用的不多，可能不太熟悉，但是 `console.log` 应该很熟悉，因为平时开发中，我们经常用它来输出信息。


<table class="stretch title-center">
	<thead>
		<tr>
			<th colspan="5">关键字</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>do</td>
			<td>while</td>
			<td>instanceof</td>
			<td>typeof</td>
			<td>break</td>
		</tr>
		<tr>
			<td>continue</td>
			<td>case</td>
			<td>new</td>
			<td>var</td>
			<td>catch</td>
		</tr>
		<tr>
			<td>finally</td>
			<td>return</td>
			<td>void</td>
			<td>for</td>
			<td>switch</td>
		</tr>
		<tr>
			<td>default</td>
			<td>if</td>
			<td>else</td>
			<td>throw</td>
			<td>delete</td>
		</tr>
		<tr>
			<td>in</td>
			<td>try</td>
			<td>function</td>
			<td>this</td>
			<td>with</td>
		</tr>
		<tr>
			<td>debugger</td>
			<td>false</td>
			<td>true</td>
			<td>null</td>
			<td>const (ES6)</td>
		</tr>
		<tr>
			<td>let (ES6)</td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
		</tr>
	</tbody>
</table>

<table class="stretch title-center">
	<thead>
		<tr>
			<th colspan="5">保留字符</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>class</td>
			<td>enum</td>
			<td>extends</td>
			<td>super</td>
			<td>const</td>
		</tr>
		<tr>
			<td>export</td>
			<td>import</td>
			<td>implements</td>
			<td>let</td>
			<td>private</td>
		</tr>
		<tr>
			<td>public</td>
			<td>yield</td>
			<td>interface</td>
			<td>package</td>
			<td>protected</td>
		</tr>
		<tr>
			<td>static</td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
		</tr>
	</tbody>
</table>


<table class="stretch title-center">
	<thead>
		<tr>
			<th colspan="5">其他不建议使用的标识符</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>abstract</td>
			<td>double</td>
			<td>goto</td>
			<td>native</td>
			<td>static</td>
		</tr>
		<tr>
			<td>boolean</td>
			<td>enum</td>
			<td>implements</td>
			<td>package</td>
			<td>super</td>
		</tr>
		<tr>
			<td>byte</td>
			<td>export</td>
			<td>import</td>
			<td>private</td>
			<td>synchronize</td>
		</tr>
		<tr>
			<td>char</td>
			<td>extends</td>
			<td>int</td>
			<td>protected</td>
			<td>throws</td>
		</tr>
		<tr>
			<td>class</td>
			<td>final</td>
			<td>interface</td>
			<td>public</td>
			<td>transient</td>
		</tr>
		<tr>
			<td>const</td>
			<td>float</td>
			<td>long</td>
			<td>short</td>
			<td>volatile</td>
		</tr>
		<tr>
			<td>arguments</td>
			<td>encodeURI</td>
			<td>Infinity</td>
			<td>Number</td>
			<td>RegExp</td>
		</tr>
		<tr>
			<td>undefined</td>
			<td>isFinite</td>
			<td>Object</td>
			<td>String</td>
			<td>Boolean</td>
		</tr>
		<tr>
			<td>Error</td>
			<td>RangeError</td>
			<td>parseFloat</td>
			<td>SyntaxError</td>
			<td>Date</td>
		</tr>
		<tr>
			<td>eval</td>
			<td>JSON</td>
			<td>TypeError</td>
			<td>decodeURI</td>
			<td>ReferenceError</td>
		</tr>
		<tr>
			<td>EvalError</td>
			<td>Math</td>
			<td>URIError</td>
			<td>Function</td>
			<td>decodeURIComponent</td>
		</tr>
		<tr>
			<td>NaN</td>
			<td>isNaN</td>
			<td>parselnt</td>
			<td>Array</td>
			<td>encodeURICOmponent</td>
		</tr>
	</tbody>
</table>




