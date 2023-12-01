# React（未整理）

## 第 1 章 React 简介

-   用于构建用户界面的 js 库（只关注页面），将数据渲染为 HTML 视图；
-   由 Facebook 开发且开源。
-   [中文官网](https://react.docschina.org/)
-   [英文官网](https://reactjs.org/)

React 可以克服原生 JS 的以下缺点：

1. 原生 JS 操作 DOM 繁琐且效率低，因为用 DOM-API 操作 UI；
2. JS 直接操作 DOM 会使浏览器进行大量的重绘重排；
3. 原生 JS 没有组件化编码方案，代码复用率低

**react 开发者工具**：Chrome 插件 React Developer Tool（注意安装来源为 facebook 的）

### 1.1 React 的特点

1. 采用组件化模式，声明式编码，提高开发效率及组件复用率;
2. 在 React Native 中可以使用 React 语法进行*移动端开发*；
3. 使用虚拟 DOM+优秀的 Diffing 算法，尽量减少与真实 DOM 的交互。
   ![](/images/frontend/react/4191aa5e6f634f88ae28e6d95d96ee96.png)
   对比两次生成的虚拟 DOM，如果重复，直接用页面之前有的 DOM，而不是全部重绘真实 DOM

### 1.2 引入文件

-   react.js （核心库）：核心库要在 react-dom 之前引入
-   react-dom.js ：提供操作 DOM 的 react 扩展库
-   babel.min.js：解析 JSX 语法代码转为 JS 代码的库，即 `ES6 -> ES5`;`JSX -> JS`

### 1.3 JSX

全称: js XML，是 react 定义的一种类似于 XML 的 JS 扩展语法，本质是`React.createElement(component, props, ...children)`方法的语法糖。JXS 最终产生的虚拟 DOM 就是一个 JS 对象。

#### 1.3.1 为什么要用 JSX

-   更加简单地创建虚拟 DOM
    （1）使用 JSX 创建虚拟 DOM
    ![](/images/frontend/react/a753bcdddefb4cb484d83877a3d7676e.png)
    （2）使用 JS 创建虚拟 DOM（用原生 JS，不用 babel，开发中不使用）
    ![](/images/frontend/react/9efa15b757c2409a83609479546a1725.png)
-   JSX 创建虚拟 DOM 的方法是 JS 方法的语法糖

#### 1.3.2 JSX 语法规则

-   定义虚拟 DOM 时不用写引号
-   标签中混入 JS 表达式时要用`{}`

```jsx
const VDOM = (
	<div>
		<h1>前端js框架列表</h1>
		<ul>
			{data.map((item, index) => {
				return <li key={index}>{item}</li>;
			})}
		</ul>
	</div>
);
```

遇到以 `{` 开头的代码，以 JS 语法解析，且标签中的 js 表达式必须用`{}`包含，比如`<ul>`中的`{}`中的`{index}`和`{item}`

**注：**`key={index}`：在进行组件遍历的时候必须要加一个 key 来区分每个组件

-   CSS 类名指定不用`class`，用`className`
-   内联样式 `style=\{\{key：value\}\}`，如`style=\{\{color：‘white’，fontSize：20px\}\}`
-   虚拟 DOM 必须只有一个根标签
-   标签必须闭合，如 `<input type="test" />`
-   标签首字母
    （1）若小写字母开头，则转为 html5 中的同名元素，如无则报错
    （2）若大写字母开头，react 就去渲染对应的组件，若组件没有定义，则报错

**辨析【js 表达式】和【js 语句 (代码)】**

-   表达式：一个表达式可以产生一个值，可以放在任何需要值的地方，如
    （1）`a`
    （2）`a+b`
    （3）`demo(1)`
    （4）`arr.map()`
    （5）`function test () {}`
-   语句（代码）：如
    （1）`if () {}`
    （2）`for () {}`
    （3）`switch () {case:xxxx}`

### 1.4 虚拟 DOM

1. 本质是 Object，即一般对象（不是数组对象和函数对象）
2. 虚拟 DOM 比较“轻”，真实 DOM 比较“重”，因为虚拟 DOM 是 react 内部在用，无需真实 DOM 中那么多属性
3. 虚拟 DOM 最终会被 react 转换为真实 DOM 呈现在页面上

### 1.5 模块与组件

#### 1.5.1 模块

-   向外界提供特定功能的 js 程序。随着业务逻辑增加，代码越来越多且复杂，此时 js 一般会拆成多个 js 文件来编写，一般一个 js 文件就是一个模块
-   作用：复用 js，简化 js 的编写，提高 js 的运行效率
-   模块化：当应用的 js 都以模块来编写的, 这个应用就是一个模块化的应用

#### 1.5.2 组件

-   用来实现局部功能效果的代码和资源的集合(html/css/js/image 等等)。比如一个功能齐全的 Header 栏就是一个组件。
-   复用编码, 简化项目编码, 提高运行效率
-   组件化：当应用是以多组件的方式实现, 这个应用就是一个组件化的应用

## 第 2 章 React 面向组件编程

### 2.1 创建组件

#### 2.1.1 函数式组件

适用于简单组件（无`state`）

```html
<script type="text/babel">
	// 创建函数组件
	function MyComponent() {
		return <h2>我是用函数定义的组件(适用于【简单组件】的定义)</h2>;
	}
	//2.渲染组件到页面
	ReactDOM.render(<MyComponent />, document.getElementById('test'));
</script>
```

**注意事项：**

-   函数中的`this`指向`undefined`，因为 babel 编译后开启了严格模式

本例中，执行了`ReactDOM.render(<MyComponent/>.......）`之后，发生了什么？

1. React 解析组件标签，找到了 MyComponent 组件。
2. 发现组件是使用函数定义的，随后调用该函数，将返回的虚拟 DOM 转为真实 DOM，随后呈现在页面中。

#### 2.1.2 类式组件

适用于复杂组件（有`state`）

```html
<script type="text/babel">
	//1.创建类式组件
	class MyComponent extends React.Component {
		render() {
			return <h2>我是用类定义的组件(适用于【复杂组件】的定义)</h2>;
		}
	}
	//2.渲染组件到页面
	ReactDOM.render(<MyComponent />, document.getElementById('test'));
</script>
```

**注意事项：**

-   类式组件必须要继承 react 的内值类`React.Component`
-   一定要写`render`函数，且要有返回值
-   `render`是放在类的原型对象上，供实例使用。
-   `render`中的 this 指向类的实例对象（原因见下方） <=> 类式组件的实例对象。

本例中，执行了`ReactDOM.render(<MyComponent/>.......）`之后，发生了什么？

1. React 解析组件标签，找到了 MyComponent 组件。
2. 发现组件是使用类定义的，随后`new`出来该类的实例，并通过该实例调用到原型上的`render`方法。
3. 将`render`返回的虚拟 DOM 转为真实 DOM，随后呈现在页面中。

### 2.2 组件实例的三大属性

针对于类式组件，hooks 可以让函数式组件也有三大属性

#### 2.2.1 state 属性

-   `state`是组件对象最重要的属性, 值是对象(可以包含多个 key-value 的组合)
-   组件被称为"状态机", 通过更新组件的`state`来**更新**对应的页面显示(重新渲染组件)

**代码实例：** 点击切换天气状态

**标准写法**

```html
<script type="text/babel">
	//1.创建组件
	class Weather extends React.Component {
		//构造器调用几次？ ———— 1次，只写了一个weather标签
		constructor(props) {
			//为了操作state
			console.log('constructor');
			super(props);
			//初始化状态
			this.state = { isHot: false, wind: '微风' };
			//解决changeWeather中this指向问题
			this.changeWeather = this.changeWeather.bind(this);
		}

		//render调用几次？ ———— 1+n次 1是初始化的那次 n是状态更新的次数
		render() {
			console.log('render');
			//读取状态
			const { isHot, wind } = this.state; //这种写法的依据?
			//复杂方法
			// const isHot = this.state.isHot;
			// const wind = this.state.wind;
			return (
				<h1 onClick={this.changeWeather}>
					今天天气很{isHot ? '炎热' : '凉爽'}，{wind}
				</h1>
			);
		}
		//、这里onclick是赋值语句，不能调用
		//changeWeather调用几次？ ———— 点几次调几次
		changeWeather() {
			//changeWeather放在哪里？ ———— Weather的原型对象上，供实例使用
			//由于changeWeather是作为onClick的回调，所以不是通过实例调用的，是直接调用
			//类中的方法默认开启了局部的严格模式，所以changeWeather中的this为undefined

			console.log('changeWeather');
			//获取原来的(isHot值
			const isHot = this.state.isHot;
			//严重注意：状态必须通过setState进行更新,且更新是一种合并，不是替换（wind还在）。
			this.setState({ isHot: !isHot });
			console.log(this);

			//严重注意：状态(state)不可直接更改，下面这行就是直接更改！！！
			//this.state.isHot = !isHot //这是错误的写法
		}
	}
	//2.渲染组件到页面
	ReactDOM.render(<Weather />, document.getElementById('test'));
</script>
```

注意事项：

-   在构造器`constructor`中初始化`state`，且要用对象形式初始化`state`
-   在`render`函数中创建虚拟 DOM 时，直接在标签中绑定事件，且事件写法不同于原生 JS，如原生 JS 中的`onclick`事件，在 react 中要写成`onClick`，其他同理。
-   `onClick={this.changeWeather}`是将`this.changeWeather`函数赋值给`onClick`，函数后面不能加括号，否则就是将函数返回值赋值
-   事件的回调函数要写在类中，此时它放在类的实例对象的原型链上，供实例使用。在本例中，由于`changeWeather`是作为`onClick`的回调，所以不是通过实例调用的，是直接调用，且类中的方法默认开启了局部的严格模式，所以其中`this`的指向不是实例对象，而是`undefined`。`render`函数也是放在对象的原型链上，但是它是由类的实例对象调用的，所以`this`指向实例对象
-   自定义的事件回调函数的`this`可以在构造器中用`bind`更改指向，生成的新函数直接在类中，所以`this`指向实例对象
-   **注意：** 状态必须通过 setState 以对象的形式进行更新,且更新是一种合并，不是替换
-   `const {isHot,wind} = this.state`是 ES6 中的对象解构，获取多个对象属性的方法

**简写方法**

```js
<script type="text/babel">
		//1.创建组件
		class Weather extends React.Component{
			//初始化状态 类里可以直接写赋值语句，相当于追加属性（值写死）
			state = {isHot:false,wind:'微风'}

			render(){
				const {isHot,wind} = this.state
				return <h1 onClick={this.changeWeather}>今天天气很{isHot ? '炎热' : '凉爽'}，{wind}</h1>
			}

			//自定义方法————要用赋值语句的形式+箭头函数
			// changeWeather从原型上移到实例对象自身，外层函数的this就是箭头函数的this
			changeWeather = ()=>{
				const isHot = this.state.isHot
				this.setState({isHot:!isHot})
			}
		}
		//2.渲染组件到页面
		ReactDOM.render(<Weather/>,document.getElementById('test'))

```

注意事项：

-   类里可以直接写赋值语句，相当于追加属性（值写死），所以 state 可以直接在类里通过赋值的形式初始化，而不是在构造函数中
-   自定义回调函数的指向可以通过将箭头函数赋值的方式，从原型上转移到实例对象自身，箭头函数中`this`指向外层函数中的`this`，这里即为实例对象

强烈注意：

1. 组件中`render`方法中的`this`为组件实例对象
2. 组件自定义的方法中`this`为`undefined`，如何解决？
   a) 强制绑定`this`: 通过函数对象的`bind()`
   （可在`constructor`中用`bind`，也可在绑定事件函数时用 bind，即`onClick={this.changeWeather。bind(this)`）
   b) 箭头函数
3. 状态数据，不能直接修改或更新

#### 2.2.2 props 属性

-   作用：通过标签属性（创建虚拟 DOM 时直接添加的数据）从组件外向组件内传递变化的数据
-   传递`props`，即传递标签属性，`props`批量传递标签属性
-   每个组件对象都会有`props`(properties 的简写)属性
-   组件标签的所有属性都保存在`props`中
-   **注意:** 组件内部不要修改`props`数据

**代码实例：** 自定义用来显示一个人员信息的组件

**基本使用**

```html
<script type="text/babel">
	//创建组件
	class Person extends React.Component {
		render() {
			// console.log(this);
			const { name, age, sex } = this.props;
			return (
				<ul>
					<li>姓名：{name}</li>
					<li>性别：{sex}</li>
					<li>年龄：{age + 1}</li>
				</ul>
			);
		}
	}
	//渲染组件到页面
	ReactDOM.render(<Person name='jerry' age={19} sex='男' speak={speak} />, document.getElementById('test1'));
	ReactDOM.render(<Person name='tom' age={18} sex='女' />, document.getElementById('test2'));

	const p = { name: '老刘', age: 18, sex: '女' };
	ReactDOM.render(<Person {...p} />, document.getElementById('test3'));

	function speak() {
		console.log('我说话了');
	}
</script>
```

注意事项：

-   写入数据有两种方式：
    a）在虚拟 DOM 标签中直接写入数据，如`<Person name="18" age={18} sex="女"/>`（{18}代表是数值型，“18”代表是字符串）。`props`是对象，里面存储着键值对形式，`name="18"` 中，`name`是键，`"18"`是值
    b）在虚拟 DOM 标签中用扩展运算符展开对象，如`<Person {...p}/>`。这里…不是三点（拓展/展开运算符），因为对象不能使用拓展运算符（数组和可遍历的伪数组可以）。而`{...obj}`是 ES6 语法，是一个复制对象。但是在这里，`{...p}`并不是复制对象，因为这里的`{}`表示括号里面要写 js 表达式了，所以真正写的还是`...p`，这里 react+babel 就允许用展开运算符展开对象，不能随便使用（不能用`console.log()`查看）,仅仅适用于标签传递数据时。
-   数据会存入到类式组件`props`属性中，在`render`中可以通过`this.props`获取数据
-   内部读取某个属性值用`this.props.属性名`
-   组件类的构造函数`constructor`可省。

> 在 react 组件挂载之前，会调用它的构造函数。在为 `React.Component` 子类实现构造函数时，应在其他语句之前调用`super(props)`。否则，this.props 在构造函数中可能会出现未定义的 bug。

> 通常，在 react 中，构造函数仅用于以下两种情况： a）通过给 `this.state` 赋值对象来初始化内部 `state`。
> b）为事件处理函数绑定实例

**对 props 进行限制**

首先要引入 prop-types 库，用于对组件标签属性进行限制

限制`props`有两种方法：
a）限制内容写在类外面

```js
Person.propTypes = {
	name: PropTypes.string.isRequired, //限制name必传，且为字符串
	sex: PropTypes.string, //限制sex为字符串
	age: PropTypes.number, //限制age为数值
	speak: PropTypes.func, //限制speak为函数
};
//指定默认标签属性值
Person.defaultProps = {
	sex: '男', //sex默认值为男
	age: 18, //age默认值为18
};
```

b）限制内容写在类里面

```js
static propTypes = {
				name:PropTypes.string.isRequired, //限制name必传，且为字符串
				sex:PropTypes.string,//限制sex为字符串
				age:PropTypes.number,//限制age为数值
			}

			//指定默认标签属性值
static defaultProps = {
	sex:'男',//sex默认值为男
	age:18 //age默认值为18
}
```

注意事项：

-   首字母小写的`propTypes`是类里的属性规则
-   首字母大写的`PropTypes`是 prop-types 库里的内置对象
-   React v15.5 开始已弃用的写法`name: React.PropTypes.string.isRequired`

**函数组件使用 props**

三大属性中，只有`props`可以用于函数组件，因为函数可以接收参数，`state`和`refs`都不能用于函数组件。

```js
<script type="text/babel">
		//创建组件
		function Person (props){
			const {name,age,sex} = props
			return (
					<ul>
						<li>姓名：{name}</li>
						<li>性别：{sex}</li>
						<li>年龄：{age}</li>
					</ul>
				)
		}
		Person.propTypes = {
			name:PropTypes.string.isRequired, //限制name必传，且为字符串
			sex:PropTypes.string,//限制sex为字符串
			age:PropTypes.number,//限制age为数值
		}

		//指定默认标签属性值
		Person.defaultProps = {
			sex:'男',//sex默认值为男
			age:18 //age默认值为18
		}
		//渲染组件到页面
		ReactDOM.render(<Person name="jerry"/>,document.getElementById('test1'))
	</script>
```

注意事项：

-   限制`props`只能使用第一种方法

#### 2.2.3 refs 属性

组件内的标签可以定义`ref`属性来标识自己。

`this.refs`拿到真实 DOM
**字符串形式的 ref**

```js
class Demo extends React.Component {
	//展示左侧输入框的数据
	showData = () => {
		console.log(this);
		const { input1 } = this.refs;
		alert(input1.value);
	};
	//展示右侧输入框的数据
	showData2 = () => {
		console.log(this);
		const { input2 } = this.refs;
		alert(input2.value);
	};
	render() {
		return (
			<div>
				<input ref='input1' type='text' placeholder='点击按钮提示数据' />
				&nbsp;
				<button onClick={this.showData}>点我提示左侧的数据</button>&nbsp;
				<input ref='input2' onBlur={this.showData2} type='text' placeholder='失去焦点提示数据' />
			</div>
		);
	}
}
//渲染组件到页面
ReactDOM.render(<Demo a='1' b='2' />, document.getElementById('test'));
```

不被官方推荐，因为效率不高

**回调 ref**

**1.** 内联函数（推荐）

```js
<input ref={(currentNode) => (this.input1 = currentNode)} type='text' placeholder='点击按钮提示数据' /> & nbsp;
{
	/*这里的this是指向实例对象，因为箭头函数没有指向，查找外侧的this指向*/
}
```

注意：

-   函数中的参数`currentNode`是`ref`所在的节点
-   此时`input1`是类的属性，即**直接绑定到类里**，而不是像字符串 ref 一样添加到`refs`对象里

回调函数：有定义、没有执行（函数名（））、最终执行（别人调用）

**2.** 类绑定函数

```js
saveInput = (c) => {
	this.input1 = c;
	console.log('@', c);
};
<input ref={this.saveInput} type='text' />;
```

**3.** 回调 ref 中回调执行次数
内联函数更新时会执行两次，一次清空，一次执行函数，类绑定函数不会。

_交互和更改状态的区别：取决于是否修改`render`函数中节点的内容_

**createRef（react 最推荐）**

```js
<script type="text/babel">
		class Demo extends React.Component{
			myRef = React.createRef()
			myRef2 = React.createRef()
			showData = ()=>{
				alert(this.myRef.current.value);
			}
			showData2 = ()=>{
				alert(this.myRef2.current.value);
			}
			render(){
				return(
					<div>
						<input ref={this.myRef} type="text" placeholder="点击按钮提示数据"/>&nbsp;
						<button onClick={this.showData}>点我提示左侧的数据</button>&nbsp;
						<input onBlur={this.showData2} ref={this.myRef2} type="text" placeholder="失去焦点提示数据"/>&nbsp;
					</div>
				)
			}
		}
		ReactDOM.render(<Demo a="1" b="2"/>,document.getElementById('test'))
	</script>
```

-   `React.createRef`调用后可以返回一个容器，该容器可以存储被`ref`所标识的节点,该容器是“专人专用”的，有多少个节点表示`ref`，就要调用多少次 `React.createRef`

#### 2.2.4 事件处理

1. 通过`onXxx`属性指定事件处理函数(注意大小写)
   a）React 使用的是自定义(合成)事件, 而不是使用的原生 DOM 事件——为了更好的兼容性
   b）React 中的事件是通过事件委托方式处理的(委托给组件最外层的元素)———为了高效
2. 通过`event.target`得到发生事件的 DOM 元素对象。发生事件的元素就是操作的元素则可以省略 ref。
3. **不要过度使用`ref`。**

### 2.3 受控组件和非受控组件

以表单提交案例为例

#### 2.3.1 非受控组件

用`ref`实现

页面中所有的输入类 DOM 现用现取，即通过`ref`标识 DOM，进而获取数据

```js
<script type="text/babel">
		//创建组件
		class Login extends React.Component{
			handleSubmit = (event)=>{
				event.preventDefault() //阻止表单提交
				const {username,password} = this
				alert(`你输入的用户名是：${username.value},你输入的密码是：${password.value}`)
			}
			render(){
				return(
					<form onSubmit={this.handleSubmit}>
						用户名：<input ref={c => this.username = c} type="text" name="username"/>
						密码：<input ref={c => this.password = c} type="password" name="password"/>
						<button>登录</button>
					</form>
				)
			}
		}
		//渲染组件
		ReactDOM.render(<Login/>,document.getElementById('test'))
	</script>
```

知识点：

1. 表单`<form>`中都有`onSubmit`属性来控制提交之后的状态
2. 输入 DOM（如`<input>`）得有`name`属性才能通过 GET 请求获取到 query 参数（用？携带）
3. 删掉`action`无法阻止表单页面刷新以及地址栏更新，得要禁止默认事件`event.preventDefault()`
4. `<button>`的默认`type`属性值就是`submit`

#### 2.3.2 受控组件

用`onChange`+`state`实现
页面中所有的输入类 DOM 将数据存在`state`中

更推荐用受控组件，减少`ref`的使用

```js
<script type="text/babel">
		//创建组件
		class Login extends React.Component{

			//初始化状态
			state = {
				username:'', //用户名
				password:'' //密码
			}

			//保存用户名到状态中
			saveUsername = (event)=>{
				this.setState({username:event.target.value})
			}

			//保存密码到状态中
			savePassword = (event)=>{
				this.setState({password:event.target.value})
			}

			//表单提交的回调
			handleSubmit = (event)=>{
				event.preventDefault() //阻止表单提交
				const {username,password} = this.state
				alert(`你输入的用户名是：${username},你输入的密码是：${password}`)
			}

			render(){
				return(
					<form onSubmit={this.handleSubmit}>
						用户名：<input onChange={this.saveUsername} type="text" name="username"/>
						密码：<input onChange={this.savePassword} type="password" name="password"/>
						<button>登录</button>
					</form>
				)
			}
		}
		//渲染组件
		ReactDOM.render(<Login/>,document.getElementById('test'))
	</script>
```

#### 2.4.1 高阶函数

如果一个函数符合下面 2 个规范中的任何一个，那该函数就是高阶函数。

1. 若 A 函数，接收的参数是一个函数，那么 A 就可以称之为高阶函数。
2. 若 A 函数，调用的返回值依然是一个函数，那么 A 就可以称之为高阶函数。
   常见的高阶函数有：`Promise`、`setTimeout`、`arr.map()`等等

函数的柯里化：通过函数调用继续返回函数的方式，实现多次接收参数最后统一处理的函数编码形式。

```js
function sum(a) {
	return (b) => {
		return (c) => {
			return a + b + c;
		};
	};
}
```

**用函数的柯里化实现受控组件**
为了不重复编写相似的代码，如`saveUsername`和`savePassword`

```js
<script type="text/babel">
		//创建组件
		class Login extends React.Component{
			//初始化状态
			state = {
				username:'', //用户名
				password:'' //密码
			}

			//保存表单数据到状态中（函数的柯里化）
			saveFormData = (dataType)=>{
				return (event)=>{
					this.setState({[dataType]:event.target.value})
				}
			}

			//表单提交的回调
			handleSubmit = (event)=>{
				event.preventDefault() //阻止表单提交
				const {username,password} = this.state
				alert(`你输入的用户名是：${username},你输入的密码是：${password}`)
			}
			render(){
				return(
					<form onSubmit={this.handleSubmit}>
						用户名：<input onChange={this.saveFormData('username')} type="text" name="username"/>
						密码：<input onChange={this.saveFormData('password')} type="password" name="password"/>
						<button>登录</button>
					</form>
				)
			}
		}
		//渲染组件
		ReactDOM.render(<Login/>,document.getElementById('test'))
	</script>
```

-   `this.saveFormData('username')`，有了小括号，立即调用，但是返回的还是一个函数，符合回调函数的要求
-   `[dataType]`：调用变量形式的对象属性名
-   `event`形参不需要实参，可以直接调用，所以 event 不能写进`this.saveFormData('username')`的参数中，得用柯里化形式来体现
    **不用函数柯里化的实现方式**
    只需改两处：

```js
saveFormData = (dataType,event)=>{
				this.setState({[dataType]:event.target.value})
			}
用户名：<input onChange={event => this.saveFormData('username',event) } type="text" name="username"/>
```

**_两种方法都常用_**

### 2.5 生命周期

#### 2.5.1 引入

1. 组件从创建到死亡它会经历一些特定的阶段。
2. React 组件中包含一系列钩子函数(生命周期回调函数), 会在特定的时刻调用。
3. 我们在定义组件时，会在特定的生命周期回调函数中，做特定的工作。
4. 生命周期回调函数<=> 生命周期钩子函数<=>生命周期函数<=>生命周期钩子
5. 挂载 mount： 组件第一次被渲染到 DOM 中的时候，就为其设置一个计时器，叫挂载 `ReactDOM.render(<Life/>, document.querySelector('test'))`
6. 卸载 unmount：组件被删除时，应该清除计时器，在 react 中被称为卸载 `ReactDOM.unmountComponentAtNode(document.querySelector('test'))`

知识点：

-   行内样式写法：`style=\{\{opacity:opacity\}\}`；
-   对象中属性名和属性值相同时触发简写：`{opacity：opacity}`简写为`{opacity}`
-   `render`执行次数：1+n（初始化渲染+更新状态）

#### 2.5.2 react 生命周期（旧）

![](/images/frontend/react/7f0cb63171ec4bec981099ab2699fba1.png)
三条线：

1. 父组件`render`–>`componentWillReceiveProps`–>`shouldComponentUpdate`–>`componentWillUpdate`–>`render`–>`componentDidUpdate`–>`componentWillUnmount`
2. `setState()`–>`shouldComponentUpdate`–>`componentWillUpdate`–>`render`–>`componentDidUpdate`–>`componentWillUnmount`
3. `forceUpdate()`–>`componentWillUpdate`–>`render`–>`componentDidUpdate`–>`componentWillUnmount`

**知识点：**

-   `shouldComponentUpdate`返回值必须为`true`或`false`，若不写，默认为`true`
-   `forceUpdate()`：强制更新。不更改任何状态中的数据，强制更新一下
-   `componentWillReceiveProps`：第一次调用不算。

**生命周期的三个阶段（旧）**

1. 初始化阶段: 由`ReactDOM.render()`触发—初次渲染
   1）`constructor()`
   2）`componentWillMount()`
   3）`render()`： **常用**，一定得调用
   4）`componentDidMount()`： **常用**，一般在这个钩子中做一些初始化的事，如开启定时器、发送网络请求、订阅消息
2. 更新阶段: 由组件内部`this.setSate()`或父组件重新`render`触发
   1）`shouldComponentUpdate()`
   2）`componentWillUpdate()`
   3）`render()`
   4）`componentDidUpdate()`
3. 卸载组件: 由`ReactDOM.unmountComponentAtNode()`触发
   1）`componentWillUnmount()` ：**常用**，一般在这个钩子中做一些收尾的事，如关闭定时器、取消订阅消息

#### 2.5.3 react 生命周期（新）

![](/images/frontend/react/2ac83916ade249abb385d3337ba0b192.png)

-   17 及以上版本`componentWillMount`、`componentWillUpdate`、`componentWillReceiveProps`三个钩子使用前要加 UNSAFE\_前缀才能使用，以后可能会被彻底废弃，不建议使用。
-   新的生命周期和旧的生命周期相比，除了即将废弃三个钩子，还添加了两个新的钩子`getDerivedStateFromProps`和`getSnapshotBeforeUpdate`
-   `static getDerivedStateFromProps`：适用于罕见用例（**几乎不用**），返回`null`或 state 对象，state 的值在任何时候都取决于`props`
-   `getSnapshotBeforeUpdate(prevProps,prevState,)`：在更新之前获取快照，返回值传递给`componentDidUpdate(prevProps,prevState,snapshotValue)`

### 2.6 虚拟 DOM 与 DOM Diffing 算法

DOM Diffing 算法对比的最小粒度是标签，且逐层对比
![](/images/frontend/react/61006241c0e84c988425222834cc1436.png)

#### 2.6.1 key 的作用

经典面试题：

1. react/vue 中的 key 有什么作用？（key 的内部原理是什么？）
2. 为什么遍历列表时，key 最好不要用 index?

**解释：**

-   虚拟 DOM 中 key 的作用：

1. 简单地说: key 是虚拟 DOM 对象的标识, 在更新显示时 key 起着极其重要的作用。
2. 详细地说: 当状态中的数据发生变化时，react 会根据【新数据】生成【新的虚拟 DOM】, 随后 React 进行【新虚拟 DOM】与【旧虚拟 DOM】的 diff 比较，比较规则如下：
   a. 旧虚拟 DOM 中找到了与新虚拟 DOM 相同的 key：
   (1) 若虚拟 DOM 中内容没变, 直接使用之前的真实 DOM
   (2) 若虚拟 DOM 中内容变了, 则生成新的真实 DOM，随后替换掉页面中之前的真实 DOM
   b. 旧虚拟 DOM 中未找到与新虚拟 DOM 相同的 key：
   根据数据创建新的真实 DOM，随后渲染到到页面

-   用 index 作为 key 可能会引发的问题：

1. 若对数据进行：**逆序**添加、**逆序**删除等破坏顺序操作:
   会产生没有必要的真实 DOM 更新 ==> 界面效果没问题, 但效率低。
2. 如果结构中还包含输入类的 DOM（如 input，虚拟 DOM 中标签属性少，input 没有 value 属性）：
   会产生错误 DOM 更新 ==> 界面有问题。
3. **注意！** 如果不存在对数据的逆序添加、逆序删除等破坏顺序操作，仅用于渲染列表用于展示，使用 index 作为 key 是没有问题的。

-   开发中如何选择 key?

1. 最好使用每条数据的唯一标识作为 key, 比如 id、手机号、身份证号、学号等唯一值。
2. 如果确定只是简单的展示数据，用 index 也是可以的。

## 第 3 章 react 应用（基于 react 脚手架）

使用脚手架开发的项目：模块化、组件化、工程化

### 3.1 前期准备

#### 3.1.1 安装 node.js 及 npm

[安装教程](https://blog.csdn.net/ZHANGYANG_1109/article/details/121229581)

1. 下载.msi 安装包 [node 官网](http://nodejs.cn/download/)
2. 安装路径： D:\nodejs\
3. 查看是否安装成功：win+r 输入 cmd，输入命令 node；查看 npm 版本 npm -v。node.js 安装时会自动安装 npm
4. 改变 npm 下载的模块包的默认存储地址：
   npm config set prefix “D:\nodejs\node_global”
   更改默认缓存位置：npm config set cache “D:\nodejs\node_cache”
   测试：npm list -global 或者 npm config get prefix 或者 npm config get cache
5. 更改环境变量
   控制面板–系统–高级系统设置–高级–环境变量
   1） 用户变量 path 中把 C:\Users\Administrator\AppData\Roaming\npm;—改为----D:\nodejs\node_global
   2）在系统变量中 新增变量 NODE_PATH----- D:\nodejs\node_global\node_modules

**安装 cnpm：** npm install -g cnpm --registry=https://registry.npm.taobao.org
**安装 yarn：** 不推荐用 npm i -g yarn 安装（但我是这样装的）
react 扩展程序： **React Developer Tools**（facebook）

_问题：_

1. 安装了 cnpm 之后，才成功安装了 cnpm i -g create-react-app
2. cmd 必须得以管理员模式运行才能使用 npm 命令。解决方式是将 vscode 以管理员模式运行，并用 vscode 运行 npm 命令

**全局安装 react 脚手架：** npm i -g create-react-app （不成功），得用 cnpm i -g create-react-app
**创建项目：** 切换到想创建项目的文件夹，使用命令 create-react-app app_name

_换源：_ 在这里建议把 npm 换源，使用国内镜像创建项目。因为使用脚手架配置项目的时候，需要下载的依赖实在太多，不换源的话很可能中途卡住就失败了。（没换）
_换源方式：_ npm config set registry https://registry.npm.taobao.org
验证是否换源成功：npm config get registry
显示出上述地址的话就是换源成功了
[npm cnpm npx nvm 区别](https://zhuanlan.zhihu.com/p/54998362)

**知识点：**

-   vscode 安装时勾选 open with code
-   react 是 SPA 应用
-   index.html 文件中，%PUBLIC_URL% 代表 public 文件夹的路径
-   robots.txt 爬虫规则文件
-   export name 分别暴露；export default name 默认暴露
-   import React，{Component} from ‘react’ :{Component}在 react 文件里分别暴露了

#### 3.1.2 react 脚手架项目结构

-   **public ---- 静态资源文件夹**
    favicon.icon ------ 网站页签图标
    index.html -------- 主页面
    logo192.png ------- logo 图
    logo512.png ------- logo 图
    manifest.json ----- 应用加壳的配置文件
    robots.txt -------- 爬虫协议文件
-   **src ---- 源码文件夹**
    App.css -------- App 组件的样式，App.js 里引用
    App.js --------- App 组件，子组件可以都写在 components 文件夹里，子组件文件夹首字母大写。路由组件写在 pages 文件夹中
    App.test.js ---- 用于给 App 做测试
    index.css ------ 样式，通用样式，入口文件里引用
    index.js ------- 入口文件
    logo.svg ------- logo 图
    reportWebVitals.js-------页面性能分析文件(需要 web-vitals 库的支持)
    setupTests.js-------组件单元测试的文件(需要 jest-dom 库的支持)

**注意：**
组件 js 文件除了**首字母大写**，还可以将后缀改为**jsx**，来和普通 js 文件进行区分

#### 3.1.3 样式模块化

```js
import name from './name.module.css'
className={name.title}
```

基本上不用，而是用[less](https://less.bootcss.com/)嵌套

**遇到的问题：**

-   **删除引入网站页签图标的代码后，页签还是在？？？**
    因为浏览器缓存了之前的图标，清空浏览器缓存之后，就正常了（并不是）
-   **win10 系统下在 cmd 中 输入 npm start 后，项目能正常跑起来，但是整个 cmd 窗口就不能再输入任何东西**
    ctrl+c 可以停掉
-   安装插件 **ES7+ React/Redux/React-Native snippets**

#### 3.1.4 功能界面的组件化编码流程（通用）

1. 拆分组件: 拆分界面,抽取组件
2. 实现静态组件: 使用组件实现静态页面效果
3. 实现动态组件
   3.1 动态显示初始化数据
   3.1.1 数据类型
   3.1.2 数据名称
   3.1.3 保存在哪个组件?
   3.2 交互(从绑定事件监听开始)

### 3.2 案例：组件的组合使用——TodoList

#### 3.2.1 注意事项

-   APP 给 list 用 props 传递参数：`<List todos={todos}/>`，这里是以键值对的形式传递数组，键是第一个`todos`，数组是第二个`todos`。其中第二个`todos`（数组）为`const {todos}=this.state`，`todos`是从`state`中解构出来的由对象组成的数组。
-   List 给 Item 用 props 传递参数：

```js
todos.map((todo) => {
	return <Item key={todo.id} {...todo} />;
});
```

其中 `{todos}=this.props` ，是 `todos`解构对象成数组，即 `todos=[{},{}]`,`todo` 代表 `todos` 数组中的每个元素（对象）。

`{...todo}`是在展开对象。原生 js 中，对象不能使用拓展运算符（数组和可遍历的伪数组可以）。而`{...obj}`是 ES6 语法，是一个复制对象。但是在这里，`{...todo}`并不是复制对象，因为这里的`{}`表示括号里面要写 js 表达式了，所以真正写的还是`...todo`，这里 react+babel 就允许用展开运算符展开对象，不能随便使用（不能用`console.log()`查看）,仅仅适用于标签传递数据时。

-   父组件向子组件传数据：直接在子组件标签中添加键值对形式的数据（`props`）
-   **子组件向父组件传递数据**：父组件通过 props 给子组件传递一个函数，子组件在想要传递数据给父组件时，调用该函数
-   生成时间戳:`Date.now()`
-   UUID：生成唯一时间戳的库
    npm i uuid （库比较大）
    **npm i nanoid**（库小，很快安装）/ yarn add nanoid
    用法：

```js
import { nanoid } from 'nanoid';
//调用
nanoid();
```

-   `str.trim()` 去除字符串的头尾空格
-   `onMouseLeave={this.handleMouse(false)}`：小括号调用了函数，定义函数时要柯里化
-   状态在哪里，操作状态的方法就在哪里
-   `window.confirm("确定删除吗")`：返回 true 或 false
-   在 react 中，`<input type="checkbox"/>`若加了`checked`属性，则必须加`onChange`事件，不然无法改变勾选状态。`defaultChecked`只在第一次起效果。

#### 3.2.2 todoList 案例相关知识点

1. 拆分组件、实现静态组件，注意：`className`、`style`的写法
2. 动态初始化列表，如何确定将数据放在哪个组件的`state`中？
   1）某个组件使用：放在其自身的`state`中
   2）某些组件使用：放在他们共同的父组件`state`中（官方称此操作为：状态提升）
3. 关于父子之间通信：
   1）【父组件】给【子组件】传递数据：通过 props 传递
   2）【子组件】给【父组件】传递数据：通过 props 传递，要求父提前给子传递一个函数
4. 注意`defaultChecked` 和 `checked`的区别，类似的还有：`defaultValue` 和 `value`
5. 状态在哪里，操作状态的方法就在哪里

## 第 4 章 React ajax

### 4.1 理解

1. React 本身只关注于界面, 并不包含发送 ajax 请求的代码
2. 前端应用需要通过 ajax 请求与后台进行交互(json 数据)
3. react 应用中需要集成第三方 ajax 库(或自己封装，但是基本不会自己封装)

### 4.2 实现

1. jQuery: 要操作 DOM，并且比较重, 如果需要另外引入不建议使用
2. axios: 轻量级, 建议使用
   1）封装 XmlHttpRequest 对象的 ajax
   2）promise 风格
   3）可以用在浏览器端和 node 服务器端

### 4.3 配置代理

#### react 脚手架配置代理总结

**方法一**

> 在 package.json 中追加如下配置

```json
"proxy":"http://localhost:5000"
```

说明：

1. 优点：配置简单，前端请求资源时可以不加任何前缀。
2. 缺点：不能配置多个代理。
3. 工作方式：上述方式配置代理，当请求了 3000 不存在的资源时，那么该请求会转发给 5000 （优先匹配前端资源）

**方法二**

1. 第一步：创建代理配置文件

    ```
    在src下创建配置文件：src/setupProxy.js(不允许改名)
    ```

2. 编写 setupProxy.js 配置具体代理规则：

    ```js
    const proxy = require('http-proxy-middleware');

    module.exports = function (app) {
    	app.use(
    		proxy('/api1', {
    			//api1是需要转发的请求(所有带有/api1前缀的请求都会转发给5000)
    			target: 'http://localhost:5000', //配置转发目标地址(能返回数据的服务器地址)
    			changeOrigin: true, //控制服务器接收到的请求头中host字段的值
    			/*
          	changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000
          	changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:3000
          	changeOrigin默认值为false，但我们一般将changeOrigin值设为true
          */
    			pathRewrite: { '^/api1': '' }, //去除请求前缀/api1，保证交给后台服务器的是正常请求地址(必须配置)
    		}),
    		proxy('/api2', {
    			target: 'http://localhost:5001',
    			changeOrigin: true,
    			pathRewrite: { '^/api2': '' },
    		})
    	);
    };
    ```

说明：

1. 优点：可以配置多个代理，可以灵活的控制请求是否走代理。
2. 缺点：配置繁琐，前端请求资源时必须加前缀。

#### 学习原生 AJAX 时，解决跨域问题是在 server.js 代码中加入以下代码（即在后端解决）

```js
//设置响应头  设置允许跨域
response.setHeader('Access-Control-Allow-Origin', '*');
//响应头
response.setHeader('Access-Control-Allow-Headers', '*');
```

为 CORS 解决方案

**注意**：127.0.0.1 和 localhost 的区别

1. 127.0.0.1 为保留地址，直白地说 127.0.0.1 就是一个 ip 地址，不同于其它 ip 地址的是它是一个指向本机的 ip 地址，也称为环回地址，该 ip 地址不能使用在公网 ip 上，对任何一台电脑来说,不管是否连接到 INTERNET 上，127.0.0.1 都是指向自己。
   事实上整个 127._ 网段都是环回地址，127._ ip 段都为保留地址，只是规则制定者将其中的 127.0.0.1 规定为指向本机自己。
2. 在电脑网络中，localhost 为“本地主机”，是给回路网络接口（loopback）的一个标准主机名，IPv4 相对应的地址为 127.0.0.1，IPv6 相对应的地址为 [::1]，这个名称也是一个保留域名。
   说白了就是 localhost 就是一个**本地域名**，不是地址。该本地域名指向的 ip 地址就是 127.0.0.1 ，也就是指向本机，localhost 更方便记忆与输入，因 hosts 文件 定义了 localhost = 127.0.0.1 ，所以你只需要记住 localhost 就可以代表本机了。
3. 对机器来说，它需要通过 hosts 文件来定义 localhost = 127.0.0.1（多一次解析 ip 的步骤） ，才能知道 localhost 代表的是本机，机器只知道 127.0.0.1 代表本机，因此当你向 localhost 发消息的时候，机器会自动翻译后给 127.0.0.1 发消息。
4. 在实际工作中，localhost 是不经过网卡传输的，所以它不受网络防火墙和与网卡相关的种种限制，而 127.0.0.1 则要通过网卡传输数据，是必须依赖网卡的。这一点也是 localhost 和 127.0.0.1 的最大的区别，这就是为什么有时候用 localhost 可以访问，但用 127.0.0.1 就不可以的情况。

### 4.4 案例—github 用户搜索

#### 4.4.1 axios 发送请求

1. 连续解构赋值：

```js
const {
	keyWordElement: { value },
} = this;
```

相当于 `this.keyWordElement.value`，此时`keyWordElement`并没有被解构，只是写的过程，即

```js
console.log(keyWordElement); // undefined
const {
	keyWordElement: { value: keyWord },
} = this;
```

连续解构赋值+重命名

1. **状态中的数据驱动着页面的展示**
2. 连续写三元表达式

```js
isFirst ? <h2>欢迎使用，输入关键字，随后点击搜索</h2> :
isLoading ? <h2>Loading......</h2> :
err ? <h2 style={{color:'red'}}>{err}</h2>
```

如果第一个判断为正确，就不会执行后面的代码了，所以**顺序很重要**

#### 4.4.2 消息订阅-发布机制（pubsub-js）

**使用：**

1. 工具库: PubSubJS
2. 下载: npm install pubsub-js --save
3. 使用:
    1. import PubSub from ‘pubsub-js’ //引入
    2. PubSub.subscribe(‘delete’, function(data){ }); //订阅
    3. PubSub.publish(‘delete’, data) //发布消息

**注意：**

4. 适用于任意组件之前的消息沟通
5. 谁用谁接，谁传谁发

#### 4.4.3 扩展：使用 Fetch 发送网络请求（用得不多）

-   **发送 AJAX 请求的方法：**

1. 原生 AJAX：xhr
2. jQuery：对 xhr 的封装
3. axios：对 xhr 的封装
4. fetch：不是库，是 windows 内置，且是 Promise 风格。**和 xhr 并列**

-   fetch 的特点关注分离
-   fetch 兼容性不高

#### 4.4 案例总结

1. 设计状态时要考虑全面，例如带有网络请求的组件，要考虑请求失败怎么办。
2. ES6 小知识点：解构赋值+重命名
   let obj = {a:{b:1}}
   const {a} = obj; //传统解构赋值
   const {a:{b}} = obj; //连续解构赋值
   const {a:{b:value}} = obj; //连续解构赋值+重命名
3. 消息订阅与发布机制 1.先订阅，再发布（理解：有一种隔空对话的感觉） 2.适用于任意组件间通信 3.要在组件的 componentWillUnmount 中取消订阅
4. fetch 发送请求（关注分离的设计思想）

```js
try {
	const response = await fetch(`/api1/search/users2?q=${keyWord}`);
	const data = await response.json();
	console.log(data);
} catch (error) {
	console.log('请求出错', error);
}
```

## 第 5 章 react 路由（v5）

### 5.1. 相关理解

#### 5.1.1. SPA 的理解

1. 单页 Web 应用（single page web application，SPA）。
2. 整个应用只有**一个**完整的页面。
3. 点击页面中的链接**不会刷新**页面，只会做页面的**局部更新**。
4. 数据都需要通过**ajax**请求获取, 并在前端异步展现。
5. 单页面、多组件

#### 5.1.2. 路由的理解

-   什么是路由?

1. 一个路由就是一个映射关系(key:value)
2. key 为路径, value 可能是 function 或 component

-   路由分类

1. 后端路由：

    1. 理解： value 是 function, 用来处理客户端提交的请求。
    2. 注册路由： router.get(path, function(req, res))
    3. 工作过程：当 node 接收到一个请求时, 根据请求路径找到匹配的路由, 调用路由中的函数来处理请求, 返回响应数据

2. 前端路由：

    1. 浏览器端路由，value 是 component，用于展示页面内容。
    2. 注册路由: `<Route path="/test" component={Test}>`
    3. 工作过程：当浏览器的 path 变为/test 时, 当前路由组件就会变为 Test 组件

    4）前端路由也要靠 BOM 上的 history

#### 5.1.3. react-router-dom 的理解

1. react 的一个**插件库**。
2. 专门用来实现一个 SPA 应用。
3. 基于 react 的项目基本都会用到此库。

**注意：**react-router 总共有三种形式的库，适用于三种场景：

-   web，对应的库名叫 react-router-dom
-   native
-   anywhere（哪里都可以用）

### 5.2 路由的基本使用

1. 明确好界面中的导航区、展示区

2. 导航区的 a 标签改为 Link 标签
   Demo

3. 展示区写 Route 标签进行路径的匹配（在呈现路由组件内容的位置注册路由）
   以前的版本

    ```js
    <Route path="/about" component={About}/>
    <Route path="/home" component={Home}/>
    ```

    现在的版本 6.x.x

    ```js
    <Routes>
    	<Route path='/about' element={<About />} />
    	<Route path='/home' element={<Home />} />
    </Routes>
    ```

4. `<App/>`的最外侧包裹了一个`<BrowserRouter>`或`<HashRouter>`

注意：

-   `import {Link,Route} from 'react-router-dom'` 分别暴露，用哪个组件取哪个组件 -
-   用`<HashRouter>`地址栏中#后面的内容不会作为资源发给服务器

### 5.3 路由组件与一般组件

1. 写法不同：
   一般组件：`<Demo/>`
   路由组件：`<Route path="/demo" component={Demo}/>`
2. 存放位置不同：
   一般组件：components
   路由组件：pages
3. 接收到的 props 不同：
   一般组件：写组件标签时传递了什么，就能收到什么
   路由组件：接收到三个固定的属性

```js
history:
			go: ƒ go(n)
			goBack: ƒ goBack()
			goForward: ƒ goForward()
			push: ƒ push(path, state)
			replace: ƒ replace(path, state)
location:
			pathname: "/about"
			search: ""
			state: undefined
match:
			params: {}
			path: "/about"
			url: "/about"
```

### 5.4 NavLink 及其封装

1. NavLink 可以实现路由链接的高亮，通过**activeClassName**指定样式名
2. 标签体内容是一个特殊的标签属性，可以通过 this.props.children 获取。因此以下两段代码是等价的。

```js
<NavLink activeClassName="atguigu" className="list-group-item" children="About" />
<NavLink activeClassName="atguigu" className="list-group-item" to="/about">About</NavLink>
```

### 5.5 Switch

1. 注册路由时用 Switch 包裹所有路由
2. 通常情况下，path 和 component 是一一对应的关系。
3. Switch 可以提高路由匹配效率(**单一匹配**)。

### 5.6 解决样式丢失问题

1. 什么时候样式丢失？
   路由路径多级，且刷新的时候

2. 解决办法
   1）public/index.html 中 引入样式时不写 ./ 而是写 / （**常用**）。因为./是相对路径，去掉之后就是绝对路径，直接去 localhost:3000 下调文件

    ```js
    <link rel="stylesheet" href="/css/bootstrap.css">
    ```

    2）public/index.html 中 引入样式时不写 ./ 写 %PUBLIC_URL% （**常用**）。因为%PUBLIC_URL%代表 public 的绝对路径

    ```js
    <link rel="stylesheet" href="%PUBLIC_URL%/css/bootstrap.css">
    ```

    3）将`<BrowserRouter>`改为`<HashRouter>`

### 5.7 路由的模糊匹配与严格匹配

1. 默认使用的是模糊匹配（简单记：【输入的路径】必须包含要【匹配的路径】，且顺序要一致）

    ```js
    <MyNavLink to="/about/a/b">Home</MyNavLink>  //模糊匹配
    <Route path="/about" component={About}/>
    ```

2. 开启严格匹配：

```js
<Route exact={true} path='/about' component={About} />
// exact={true}可以简写为exact
```

1. **严格匹配不要随便开启**，需要再开，有些时候开启会导致无法继续匹配二级路由

### 5.8 Redirect 重定向

1. 一般写在所有路由注册的最下方，当所有路由都无法匹配时，跳转到 Redirect 指定的路由
2. 具体编码：

```js
<Switch>
	<Route path='/about' component={About} />
	<Route path='/home' component={Home} />
	<Redirect to='/about' />
</Switch>
```

### 5.8 嵌套路由（多级路由）

1. 注册子路由时要**写上父路由**的 path 值

```js
{
	/* 注册路由 */
}
<Switch>
	<Route path='/home/news' component={News} />
	<Route path='/home/message' component={Message} />
	<Redirect to='/home/news' />
</Switch>;
```

1. 路由的匹配是按照**注册路由的顺序**进行的

### 5.9 向路由组件传递参数

#### 5.9.1 params 参数（最多）

1. 路由链接(携带参数)：

```js
<Link to='/demo/test/tom/18'}>详情</Link>
```

1. 注册路由(声明接收)：

```js
<Route path='/demo/test/:name/:age' component={Test} />
```

1. 接收参数：`this.props.match.params`

#### 5.9.2 search 参数

1. 路由链接(携带参数)：

```js
<Link to='/demo/test/?name=tom&age=18'}>详情</Link>
//？前面加不加/
```

1. 注册路由(无需声明，正常注册即可)：

```js
<Route path='/demo/test' component={Test} />
```

1. 接收参数：this.props.location.search
   备注：获取到的 search 是**urlencoded 编码**（即，`name=tom&age=18`）字符串，需要借助 querystring 解析（`querystring.stringify(obj)`, `querystring.parse(str)`）。去掉问号用`qs.parse(str.slice(1)`

#### 5.9.3 state 参数（不同于普通组件的 state 属性）

1. 路由链接(携带参数)：

```js
<Link to={{ pathname: '/demo/test', state: { name: 'tom', age: 18 } }}>详情</Link>
```

1. 注册路由(无需声明，正常注册即可)：

```js
<Route path='/demo/test' component={Test} />
```

1. 接收参数：`this.props.location.state`
   备注：**刷新也可以保留住参数**，但回退不行，无法回退到上一个·同级路由**？？？？**（老师演示的时候可以回退，自己跑代码回退不了）

### 5.10 push 和 replace（难）

1. 路由是对浏览器历史记录的操作，总共有两种操作，push（压栈）和 replace（替代栈顶元素）。
2. 默认是 push 模式，要想开启 replace 模式，则在路由连接`<Link>`标签中加入`replace={true}`或`replace`

### 5.11 编程式路由导航

借助 this.prosp.history 对象上的 API 对操作路由跳转、前进、后退，而不用路由的`<Link>`和`<NavLink>`，但还是要注册路由

-   this.prosp.history.push()
-   this.prosp.history.replace()
-   this.prosp.history.goBack()
-   this.prosp.history.goForward()
-   this.prosp.history.go()

### 5.12 withRouter 的使用

1. `withRouter`可以加工一般组件，让一般组件具备路由组件所特有的 API

2. `withRouter`的返回值是一个新组件。

3. 在一般组件中要用到路由组件的 props 属性时引入。

    ```js
    import { withRouter } from 'react-router-dom';
    ```

    需要暴露

    ```js
    export default withRouter(Header);
    ```

### 5.12 BrowserRouter 与 HashRouter 的区别

1. 底层原理不一样：
   BrowserRouter 使用的是 H5 的 history API，**不兼容 IE9 及以下版本。**
   HashRouter 使用的是 URL 的哈希值。
2. path 表现形式不一样
   BrowserRouter 的路径中没有#,例如：localhost:3000/demo/test
   HashRouter 的路径包含#,例如：localhost:3000/#/demo/test
3. 刷新后对路由 state 参数的影响
   1）BrowserRouter 没有任何影响，因为 state 保存在 history 对象中。
   2）HashRouter 刷新后**会导致路由 state 参数的丢失**！！！
4. **备注：** HashRouter 可以用于解决一些路径错误相关的问题。

## 第 6 章 React UI 组件库

### 6.1 简介

**material-ui(国外)**

1. [官网](http://www.material-ui.com/#/): http://www.material-ui.com/#/
2. [github](https://github.com/callemall/material-ui): https://github.com/callemall/material-ui

**ant-design(国内蚂蚁金服)**

1. [官网](https://ant.design/index-cn): https://ant.design/index-cn
2. [Github](https://github.com/ant-design/ant-design/): https://github.com/ant-design/ant-design/
3. 不是所有场景都使用，最适用于**后台管理系统**

### 6.2 使用

安装依赖:`npm install antd`
引入样式（不太合理，引入了全部组件的样式，应该**按需引入**）

```js
import '../node_modules/antd/dist/antd.css';
```

引入库：

```js
import { Button, DatePicker } from 'antd';
import { WechatOutlined, WeiboOutlined, SearchOutlined } from '@ant-design/icons';
```

学会查看官网文档
其他 UI 组件库：element ui、vant 等

### 6.3 按需引入和自定义主题

**重点：** 学会查看[文档](https://ant.design/docs/react/use-with-create-react-app-cn)（3.x 文档更清楚，且适用于 4.x）

1. 安装依赖：`yarn add react-app-rewired customize-cra babel-plugin-import less less-loader`
2. 修改 package.json

```js
"scripts": {
	"start": "react-app-rewired start",
	"build": "react-app-rewired build",
	"test": "react-app-rewired test",
	"eject": "react-scripts eject"
},
```

1. 根目录下创建 config-overrides.js

```js
//配置具体的修改规则
const { override, fixBabelImports, addLessLoader } = require('customize-cra');
module.exports = override(
	fixBabelImports('import', {
		libraryName: 'antd',
		libraryDirectory: 'es',
		style: true,
	}),
	addLessLoader({
		lessOptions: {
			jsEnabled: true,
			modifyVars: { '@primary-color': 'green' },
		},
	})
);
```

1. 备注：不用在组件里亲自引入样式了，即：`import 'antd/dist/antd.css'`应该删掉

## 第 7 章 redux

### 7.1 redux 理解

#### 7.1.1 学习文档

1. [英文文档](https://redux.js.org/): https://redux.js.org/
2. [中文文档](http://www.redux.org.cn/): http://www.redux.org.cn/
3. [Github](https://github.com/reactjs/redux): https://github.com/reactjs/redux

#### 7.1.2 redux 简介

1. redux 是一个专门用于做**状态管理**的 JS 库(**不是 react 插件库**)。
2. 它可以用在 react, angular, vue 等项目中, 但基本与 react 配合使用。
3. 作用: **集中式管理**react 应用中**多个组件共享**的状态。

#### 7.1.3 什么情况下需要使用 redux

1. 某个组件的状态，需要让其他组件可以随时拿到（**共享**）。
2. 一个组件需要改变另一个组件的状态（**通信**）。
3. 总体原则：能不用就不用, 如果不用比较吃力才考虑使用。

#### 7.1.4 redux 工作流程

![](/images/frontend/react/78faeb43ec024fb1b3465d0ea1f8591d.png)

-   `dispatch(action)`是一个函数，`action`是一个对象
-   Action Creators（服务员）
    Store（老板）
    Reducers（厨师）

### 7.2 redux 的三个核心概念

#### 7.2.1. action

1. 动作的**对象**
2. 包含 2 个属性
   `type`：标识属性, 值为字符串, 唯一, 必要属性
   `data`：数据属性, 值类型任意, 可选属性
3. 例子：`{ type: 'ADD_STUDENT',data:{name: 'tom',age:18} }`

#### 7.2.2. reducer

1. 用于**初始化**状态、**加工**状态。
2. 加工时，根据旧的 state 和 action， 产生新的 state 的`纯函数`。
3. 有几个组件就有几个 reducer？

#### 7.2.3. store

1. 将 state、action、reducer 联系在一起的**对象**
2. 如何得到此对象?
    1. `import {createStore} from 'redux'`
    2. `import reducer from './reducers'`
    3. `const store = createStore(reducer)`
3. 此对象的功能?
    1. `getState()`: 得到 state
    2. `dispatch(action)`: 分发 action, 触发 reducer 调用, 产生新的 state
    3. `subscribe(listener)`: 注册监听, 当产生了新的 state 时, 自动调用

### 7.3. redux 的核心 API

#### 7.3.1. createstore()

作用：创建包含指定 reducer 的 store 对象

#### 7.3.2. store 对象

1. 作用: redux 库最核心的管理对象

2. 它内部维护着:

    1. state
    2. reducer

3. 核心方法:

    1. `getState()`
    2. `dispatch(action)`
    3. `subscribe(listener)` ：store 监测 redux 里的状态变化，发生变化则会被调用

4. 具体编码:

    1. `store.getState()`
    2. `store.dispatch({type:'INCREMENT', number})`
    3. 放在入口文件 index.js 中

    ```js
    store.subscribe(() => {
    	ReactDOM.render(<App />, document.getElementById('root'));
    });
    ```

#### 7.3.3. applyMiddleware()

作用：应用上基于 redux 的中间件(插件库)

##### 7.3.4. combineReducers()

作用：合并多个 reducer 函数

### 7.4 求和案例

#### 7.4.1 求和案例\_redux 精简版

1. 去除 Count 组件自身的状态

2. src 下建立:

    ```js
    //文件
    -redux - store.js - count_reducer.js;
    ```

3. store.js：
   1）引入 redux 中的`createStore`函数，创建一个 store
   2）`createStore`调用时要传入一个为其服务的 reducer
   3）记得暴露**store 对象**（store.js 默认暴露一个函数调用，函数返回一个对象，其他文件引入的时候将此对象命名为 store）

4. count_reducer.js：
   1）reducer 的本质是一个函数，接收：preState,action，返回加工后的状态
   2）reducer 有两个作用：初始化状态，加工状态
   3）reducer 被第一次调用时，是 store 自动触发的。传递的`preState`是`undefined`，传递的`action`是:`{type:'@@REDUX/INIT_a.2.b.4}`

5. 在 index.js 中监测 store 中状态的改变，一旦发生改变重新渲染

**备注**：redux 只负责管理状态，至于状态的改变驱动着页面的展示，要靠我们自己写。

#### 7.4.2 求和案例\_redux 完整版

**新增文件**：

1. count_action.js 专门用于创建`action`对象
   注意：箭头函数返回一个对象时，要用`（）`包裹，不然会被识别为函数体的`{}`

```js
createIncrementAction = (data) => ({ type: INCREMENT, data });
```

1. constant.js 放置容易写错的`type`值，目的只有一个：便于管理的同时防止程序员单词写错（要暴露）

#### 7.4.3 求和案例\_redux 异步 action 版（非必须）

1. 同步`action`：`action`的值是对象
   异步`action`：`action`的值是函数。异步`action`一般会调用同步`action`
2. 明确：延迟的动作（异步操作）不想交给组件自身，想交给`action`
3. 何时需要异步`action`：想要对状态进行操作，但是具体的数据靠异步任务返回。
4. 具体编码：
   1）**yarn add redux-thunk**，并配置在 store 中
   2）创建`action`的函数不再返回一般对象，而是一个函数，该函数中写异步任务。
   3）异步任务有结果后，分发一个同步的`action`去真正操作数据。
5. 备注：**异步`action`不是必须要写的**，完全可以自己等待异步任务的结果了再去分发同步`action`。

#### 7.4.4 求和案例\_react-redux 基本使用

![](/images/frontend/react/ad0fdee8536045feae6ed88996cce5b1.png)

1. 明确两个概念：
   1）UI 组件:不能使用任何 redux 的 api，只负责页面的呈现、交互等。
   2）容器组件：负责和 redux 通信，将结果交给 UI 组件。

2. 如何创建一个容器组件—靠 react-redux 的`connect`函数：

    ```js
    connect(mapStateToProps, mapDispatchToProps)(UI组件);
    ```

    1）`mapStateToProps`:映射状态，返回值是一个对象。返回的对象中的 key 就作为传递给 UI 组件 props 的 key,value 就作为传递给 UI 组件 props 的 value
    2）`mapDispatchToProps`:映射操作状态的方法，返回值是一个对象。返回的对象中的 key 就作为传递给 UI 组件 props 的 key,value 就作为传递给 UI 组件 props 的 value

3. **备注**：容器组件中的 store 是靠`props`传进去的，而不是在容器组件中直接引入

#### 7.4.5 求和案例\_react-redux 优化

1. 容器组件和 UI 组件整合一个文件

2. 若有多个容器组件，无需自己给每个容器组件传递 store，给包裹一个`<Provider store={store}>`即可。

3. 使用了 react-redux 后也**不用再自己检测 redux 中状态的改变**了，容器组件可以自动完成这个工作。

4. **`mapDispatchToProps`也可以简单的写成一个对象**，因为 react-redux 可以自动`dispatch`

5. 一个组件要和 react-redux“打交道”要经过哪几步？
   1）定义好 UI 组件—不暴露
   2）引入`connect`生成一个容器组件，并暴露，写法如下：

    ```js
    connect(
    	(state) => ({ key: value }), //映射状态
    	{ key: xxxxxAction } //映射操作状态的方法
    )(UI组件);
    ```

    3）在 UI 组件中通过`this.props.xxxxxxx`读取和操作状态

#### 7.4.6 求和案例\_react-redux 数据共享版

1. 定义一个 Person 组件，和 Count 组件通过 redux 共享数据。
2. 为 Person 组件编写：reducer、action，配置 constant 常量。
3. 重点：Person 的 reducer 和 Count 的 Reducer 要使用`combineReducers`进行合并。合并后的总状态是一个**对象**！！！
4. 交给 store 的是总 reducer，最后注意在组件中取出状态的时候，记得“取到位”。
5. reducers 进行浅比较，数组、对象只比较地址，所以地址不变就不会重新渲染

#### 7.4.7 求和案例\_react-redux 开发者工具的使用

Redux DevTools
![](/images/frontend/react/015e8868316f4197a9a4897d5961ffe2.png)

1. 引入库

```js
yarn add redux-devtools-extension
```

1. 在 store.js 中进行配置

```js
import { composeWithDevTools } from 'redux-devtools-extension';
export default createStore(allReducer, composeWithDevTools(applyMiddleware(thunk)));
```

#### 7.4.8 求和案例\_react-redux 最终版

1. 所有变量名字要规范，尽量触发对象的简写形式。
2. reducers 文件夹中，编写 index.js 专门用于汇总并暴露所有的 reducer

### 7.5 纯函数和高阶函数

#### 7.5.1. 纯函数

1. 一类特别的函数: 只要是**同样的输入**(实参)，必定得到**同样的输出**(返回)
2. 必须遵守以下一些约束
    1. **不得改写参数数据**
    2. 不会产生任何副作用，例如网络请求，输入和输出设备
    3. 不能调用 Date.now()或者 Math.random()等不纯的方法
3. redux 的 reducer 函数必须是一个纯函数

#### 7.8.2. 高阶函数

1. 理解: 一类特别的函数
    1. 情况 1: 参数是函数
    2. 情况 2: 返回是函数
2. 常见的高阶函数:
    1. 定时器设置函数
    2. 数组的 forEach()/map()/filter()/reduce()/find()/bind()
    3. promise
    4. react-redux 中的 connect 函数
3. 作用: 能实现更加动态, 更加可扩展的功能

### 7.9 项目打包

1. 打包

    ```js
    npm run build
    ```

    生成 build 文件夹

2. 部署在服务器上
   1）阿里云线上服务器
   2）express（Node 中快速搭建服务器的框架）搭建服务器
   3）借助第三方库库快速搭建：以指定的文件夹作为根目录快速开启一台服务器。如 serve

    ```js
    npm i serve -g  //全局安装
    serve build   // 打开生成的build文件夹
    ```

## 第 8 章 扩展

### 8.1 setState

**setState 更新状态的 2 种写法**

1. `setState(stateChange, [callback])`------对象式的 setState
   1）`stateChange`为状态改变对象(该对象可以体现出状态的更改)
   2）`callback`是可选的回调函数, 它在**状态更新完毕**、**界面也更新后**(`render`调用后)才被调用
2. `setState(updater, [callback])`------函数式的 setState
   1）`updater`为返回`stateChange`对象的函数。
   2）`updater`可以接收到`state`和`props`。
   3）`callback`是可选的回调函数, 它在状态更新、界面也更新后(`render`调用后)才被调用。

**总结:**

1. 对象式的`setState`是函数式的`setState`的简写方式(语法糖)
2. 使用原则：
   1）如果新状态不依赖于原状态 ===> 使用对象方
   2）如果新状态依赖于原状态 ===> 使用函数方式
   3）如果需要在`setState()`执行后获取最新的状态数据,
   要在第二个`callback`函数中读取

### 8.2 lazyLoad

#### 路由组件的 lazyLoad

1. 通过 React 的 lazy 函数配合 import()函数动态加载路由组件 ===> 路由组件代码会被分开打包
2. 通过指定在加载得到路由打包文件前显示一个自定义 loading 界面

```js
	//1.通过React的lazy函数配合import()函数动态加载路由组件 ===> 路由组件代码会被分开打包
	const Login = lazy(()=>import('@/pages/Login')) //函数体不能加花括号

	//2.通过<Suspense>指定在加载得到路由打包文件前显示一个自定义loading界面
	<Suspense fallback={<h1>loading.....</h1>}>
        <Switch>
            <Route path="/xxx" component={Xxxx}/>
            <Redirect to="/login"/>
        </Switch>
    </Suspense>
```

---

### 8.3 Hooks

#### 8.3.1 React Hook/Hooks 是什么?

1. Hook 是 React 16.8.0 版本增加的新特性/新语法
2. 可以让你在函数组件中使用 state 以及其他的 React 特性

#### 8.3.2 三个常用的 Hook

1. State Hook: `React.useState()`
2. Effect Hook: `React.useEffect()`
3. Ref Hook: `React.useRef()`

#### 8.3.3 State Hook

1. State Hook 让函数组件也可以有 state 状态, 并进行状态数据的读写操作
2. 语法:

```js
const [xxx, setXxx] = React.useState(initValue);
```

1. `useState()`说明:
   参数: 第一次初始化指定的值在内部作缓存
   返回值: 包含 2 个元素的数组, 第 1 个为内部当前状态值, 第 2 个为更新状态值的函数
2. `setXxx()`的 2 种写法:
   `setXxx(newValue)`: 参数为非函数值, 直接指定新的状态值, 内部用其覆盖原来的状态值
   `setXxx(value => newValue)`: 参数为函数, 接收原本的状态值, 返回新的状态值, 内部用其覆盖原来的状态值

#### 8.3.4 Effect Hook

1. Effect Hook 可以让你在函数组件中执行副作用操作(**用于模拟类组件中的生命周期钩子**)
2. React 中的副作用操作:
   发 ajax 请求数据获取
   设置订阅 / 启动定时器
   手动更改真实 DOM（尽量避免）
3. 语法和说明:

```js
useEffect(() => {
	// 在此可以执行任何带副作用操作
	return () => {
		// 在组件卸载前执行
		// 在此做一些收尾工作, 比如清除定时器/取消订阅等
	};
}, [stateValue]); // 如果指定的是[], 回调函数只会在第一次render()后执行
```

1. 可以把 useEffect Hook 看做如下三个函数的组合
   `componentDidMount()`
   `componentDidUpdate()`
   `componentWillUnmount()`

#### 8.3.5 Ref Hook

1. Ref Hook 可以在函数组件中存储/查找组件内的标签或任意其它数据
2. 语法：

```js
const refContainer = useRef(); //声明
refContainer.current.xxx; //调用
```

1. 作用： 保存标签对象，功能与`React.createRef()`一样

### 8.4 Fragment

**使用**

```js
import {Fragment } from 'react'
//类似于一个<div>
<Fragment></Fragment>    //可以添加一个属性 'key'，用于遍历
<></>  //不能添加任何属性
```

**作用**：可以不用必须有一个真实的 DOM 根标签了

### 8.5 Context

#### 8.5.1 理解

一种组件间通信方式, 常用于【祖组件】与【后代组件】间通信

#### 8.5.2 使用

1. 创建 Context 容器对象：

    ```js
    const XxxContext = React.createContext();
    //const {Provider,Consumer} = XxxContext 也可以结构赋值
    ```

2. 渲染子组时，外面包裹`xxxContext.Provider`, 通过`value`属性给后代组件传递数据：

    ```js
    <xxxContext.Provider value={数据}>子组件</xxxContext.Provider>
    ```

3. 后代组件读取数据：
   1） 第一种方式:仅适用于类组件

    ```js
      static contextType = xxxContext  // 声明接收context
    	  this.context // 读取context中的value数据
    ```

    2）第二种方式: 函数组件与类组件都可以

    ```js
    <xxxContext.Consumer>
    	//组件中的函数
    	{(
    		value // value就是context中的value数据
    	) => 要显示的内容}
    </xxxContext.Consumer>
    ```

**注意:** 在应用开发中**一般不用 context**, 一般都用它的封装 react 插件（如，react-redux）

### 8.6 组件优化

**Component 的 2 个问题**

1. 只要执行`setState()`，即使不改变状态数据, 组件也会重新 render() ==> **效率低**
2. 只当前组件重新`render()`, 就会自动重新 render 子组件，纵使子组件没有用到父组件的任何数据 ==> **效率低**

**效率高的做法**

只有当组件的`state`或`props`数据发生改变时才重新`render()`

**原因**

Component 中的`shouldComponentUpdate()`总是返回 true

**解决**

1. **办法 1**: 重写`shouldComponentUpdate()`方法
   比较新旧 state 或 props 数据, 如果有变化才返回 true, 如果没有返回 false

    ```js
    shouldComponentUpdate(nextProps,nextState){
    		// console.log(this.props,this.state); //目前的props和state
    		// console.log(nextProps,nextState); //接下要变化的目标props，目标state
    		return !this.state.carName === nextState.carName
    	}
    ```

2. **办法 2**: 使用`PureComponent`
   `PureComponent`重写了`shouldComponentUpdate()`, 只有 state 或 props 数据有变化才返回 true

    ```js
    import React, { PureComponent } from 'react';
    //之前是import React, { Component } from 'react'
    ```

**注意:**

1. `PureComponent`，只是进行 state 和 props 数据的浅比较, 如果只是数据对象内部数据变了, 返回 false
2. 不要直接修改 state 数据, 而是要产生新数据（新对象）。所以不能用`unshift`
3. 项目中一般使用`PureComponent`来优化

---

### 8.7 render props

#### 8.7.1 如何向组件内部动态传入带内容的结构(标签)?

1. Vue 中:
   使用 slot（插槽）技术, 也就是通过组件标签体传入结构

    ```js
    <A>
    	<B />
    </A>
    ```

2. React 中：
   使用**children props**：通过组件标签体传入结构
   使用**render props**： 通过组件标签属性传入结构,而且可以携带数据，一般用 render 函数属性

#### 8.7.2 children props

```js
<A>
 </B>
</A>
	{this.props.children}
```

**问题**: 如果 B 组件需要 A 组件内的数据, ==> 做不到

#### 8.7.3 render props

```js
<A render={(data) => <C data={data} />} />
//相当于<A render={(data) => <C data={data}></C>}></A>
```

A 组件: `{this.props.render(内部state数据)}`
C 组件: 读取 A 组件传入的数据显示 `{this.props.data}`
**注意：** 只要组件不带内容，单标签和双标签实现效果相同（即`<A></A>`==`<A/>`）

### 8.8 错误边界

#### 8.8.1 理解

错误边界(Error boundary)：用来捕获**后代组件**错误，渲染出备用页面

#### 8.8.2 特点

1. 只能捕获**后代组件生命周期**产生的错误，不能捕获自己组件产生的错误和其他组件在合成事件、定时器中产生的错误
2. 只适用于生产环境（build 打包），而不是开发环境

#### 8.8.3 使用方式

```
getDerivedStateFromError`配合`componentDidCatch
// 生命周期函数，一旦后台组件报错，就会触发
static getDerivedStateFromError(error) {
    console.log(error);
    // 在render之前触发
    // 返回新的state
    return {
        hasError: true,
    };
}

componentDidCatch(error, info) {
    // 统计页面的错误。发送请求发送到后台去
    console.log(error, info);
}
```

### 8.9 组件通信方式总结

#### 8.9.1 组件间的关系：

-   父子组件
-   兄弟组件（非嵌套组件）
-   祖孙组件（跨级组件）

#### 8.9.2 几种通信方式：

1. props：
   1）children props
   2）render props
2. 消息订阅-发布：
   pubs-sub、event 等等
3. 集中式管理：
   redux、dva 等等
4. conText:
   生产者-消费者模式

#### 8.9.2 比较好的搭配方式：

-   父子组件：props
-   兄弟组件：消息订阅-发布、集中式管理
-   祖孙组件(跨级组件)：消息订阅-发布、集中式管理、conText(开发用的少，封装插件用的多)

## 第 9 章 React Router 6 快速上手

### 9.1 概述

1. React Router 以三个不同的包发布到 npm 上，它们分别为：

    1）react-router: 路由的核心库，提供了很多的：组件、钩子。
    2） **\*\*react-router-dom:\*\*** **包含 react-router 所有内容，并添加一些专门用于 DOM 的组件，例如 `<BrowserRouter>`等** 。
    3） react-router-native: 包括 react-router 所有内容，并添加一些专门用于 ReactNative 的 API，例如:`<NativeRouter>`等。

2. 与 React Router 5.x 版本相比，改变了什么？

    1） 内置组件的变化：移除`<Switch/>` ，新增 `<Routes/>`等。

    2） 语法的变化：`component={About}` 变为 `element={<About/>}`等。

    3）.新增多个 hook：`useParams`、`useNavigate`、`useMatch`等。

    4） **官方明确推荐函数式组件了！！！**

### 9.2 Component

**1. `<BrowserRouter>`**

1. 说明：`<BrowserRouter> `用于包裹整个应用。

2. 示例代码：

    ```js
    import React from 'react';
    import ReactDOM from 'react-dom';
    import { BrowserRouter } from 'react-router-dom';

    ReactDOM.render(<BrowserRouter>{/* 整体结构（通常为App组件） */}</BrowserRouter>, root);
    ```

**2. `<HashRouter>`**

1. 说明：作用与`<BrowserRouter>`一样，但`<HashRouter>`修改的是地址栏的 hash 值。
2. 备注：6.x 版本中`<HashRouter>`、`<BrowserRouter> `的用法与 5.x 相同。

**3. `<Routes/> 与 <Route/>`**

1. v6 版本中移出了先前的`<Switch>`，引入了新的替代者：`<Routes>`。

2. `<Routes>` 和 `<Route>`要配合使用，且必须要用`<Routes>`包裹`<Route>`。

3. `<Route>` 相当于一个 if 语句，如果其路径与当前 URL 匹配，则呈现其对应的组件。

4. `<Route caseSensitive>` 属性用于指定：匹配时是否区分大小写（默认为 false）。

5. 当 URL 发生变化时，`<Routes> `都会查看其所有子` <Route>` 元素以找到最佳匹配并呈现组件 。

6. `<Route>` 也可以嵌套使用，且可配合`useRoutes()`配置 “路由表” ，但需要通过 `<Outlet>` 组件来渲染其子路由。

7. 示例代码：

    ```js
    <Routes>
    	/*path属性用于定义路径，element属性用于定义当前路径所对应的组件*/
    	<Route path='/login' element={<Login />}></Route>
    	/*用于定义嵌套路由，home是一级路由，对应的路径/home*/
    	<Route path='home' element={<Home />}>
    		/*test1 和 test2 是二级路由,对应的路径是/home/test1 或 /home/test2*/
    		<Route path='test1' element={<Test />}></Route>
    		<Route path='test2' element={<Test2 />}></Route>
    	</Route>
    	//Route也可以不写element属性, 这时就是用于展示嵌套的路由 .所对应的路径是/users/xxx
    	<Route path='users'>
    		<Route path='xxx' element={<Demo />} />
    	</Route>
    </Routes>
    ```

**4. `<Link>`**

1. 作用: 修改 URL，且不发送网络请求（路由链接）。

2. 注意: 外侧需要用`<BrowserRouter>`或`<HashRouter>`包裹。

3. 示例代码：

    ```js
    import { Link } from 'react-router-dom';

    function Test() {
    	return (
    		<div>
    			<Link to='/路径'>按钮</Link>
    		</div>
    	);
    }
    ```

**5. `<NavLink>`**

1. 作用: 与`<Link>`组件类似，且可实现导航的“高亮”效果。

2. 示例代码：

    ```js
    // 注意: NavLink默认类名是active，下面是指定自定义的className

    //自定义样式
    <NavLink
        to="login"
        className={({ isActive }) => {
            console.log('home', isActive)
            return isActive ? 'base one' : 'base'
        }}
    >login</NavLink>

    /*
    	默认情况下，当Home的子组件匹配成功，Home的导航也会高亮，
    	当NavLink上添加了end属性后，若Home的子组件匹配成功，则Home的导航没有高亮效果。
    */
    <NavLink to="home" end >home</NavLink>
    ```

    **注意：** 默认情况下，当 Home 的子组件匹配成功，Home 的导航也会高亮，当 NavLink 上添加了 end 属性后，若 Home 的子组件匹配成功，则 Home 的导航没有高亮效果。

**6. `<Navigate>`**

1. 作用：只要`<Navigate>`组件被渲染，就会修改路径，切换视图。

2. `replace`属性用于控制跳转模式（push 或 replace，默认是 push）。

3. 示例代码：

    ```js
    import React, { useState } from 'react';
    import { Navigate } from 'react-router-dom';

    export default function Home() {
    	const [sum, setSum] = useState(1);
    	return (
    		<div>
    			<h3>我是Home的内容</h3>
    			{/* 根据sum的值决定是否切换视图 */}
    			{sum === 1 ? <h4>sum的值为{sum}</h4> : <Navigate to='/about' replace={true} />}
    			<button onClick={() => setSum(2)}>点我将sum变为2</button>
    		</div>
    	);
    }
    ```

**7. `<Outlet>`**

1. 当`<Route>`产生嵌套时，渲染其对应的后续子路由。

2. 示例代码：

    ```js
    //根据路由表生成对应的路由规则
    const element = useRoutes([
    	{
    		path: '/about',
    		element: <About />,
    	},
    	{
    		path: '/home',
    		element: <Home />,
    		children: [
    			{
    				path: 'news',
    				element: <News />,
    			},
    			{
    				path: 'message',
    				element: <Message />,
    			},
    		],
    	},
    ]);

    //Home.js
    import React from 'react';
    import { NavLink, Outlet } from 'react-router-dom';

    export default function Home() {
    	return (
    		<div>
    			<h2>Home组件内容</h2>
    			<div>
    				<ul className='nav nav-tabs'>
    					<li>
    						<NavLink className='list-group-item' to='news'>
    							News
    						</NavLink>
    					</li>
    					<li>
    						<NavLink className='list-group-item' to='message'>
    							Message
    						</NavLink>
    					</li>
    				</ul>
    				{/* 指定路由组件呈现的位置 */}
    				<Outlet />
    			</div>
    		</div>
    	);
    }
    ```

### 9.3 Hooks

**1-6 常用**

**1. `useRoutes()`**

1. 作用：根据**路由表**，动态创建`<Routes>`和`<Route>`。

2. 示例代码：

    ```js
    //路由表配置：src/routes/index.js
    import About from '../pages/About'
    import Home from '../pages/Home'
    import {Navigate} from 'react-router-dom'

    export default [
    	{
    		path:'/about',
    		element:<About/>
    		children：[    //子路由
        		{
        		path:'news',
        		element:<News/>
        		}
    		]
    	},
    	{
    		path:'/home',
    		element:<Home/>
    	},
    	{
    		path:'/',
    		element:<Navigate to="/about"/>
    	}
    ]

    //App.jsx
    import React from 'react'
    import {NavLink,useRoutes} from 'react-router-dom'
    import routes from './routes'

    export default function App() {
    	//根据路由表生成对应的路由规则
    	const element = useRoutes(routes)  //一级路由用useRoutes()和element定位，子路由用<outlet />定位
    	return (
    		<div>
    			......
          {/* 注册路由 */}
          {element}
    		  ......
    		</div>
    	)
    }
    ```

    **注意：** 一级路由（App.js 中）用 useRoutes()和 element 定位，子路由用`<outlet />`定位

**2. `useNavigate()`**

1. 作用：返回一个函数用来实现编程式导航。

2. 示例代码：

    ```js
    import React from 'react';
    import { useNavigate } from 'react-router-dom';

    export default function Demo() {
    	const navigate = useNavigate();
    	const handle = () => {
    		//第一种使用方式：指定具体的路径
    		navigate('/login', {
    			replace: false,
    			state: { a: 1, b: 2 },
    		});
    		//第二种使用方式：传入数值进行前进或后退，类似于5.x中的 history.go()方法
    		navigate(-1);
    	};

    	return (
    		<div>
    			<button onClick={handle}>按钮</button>
    		</div>
    	);
    }
    ```

**3. `useParams()`**

1. 作用：回当前匹配路由的`params`参数，类似于 5.x 中的`match.params`。

2. 示例代码：

    ```js
    import React from 'react';
    import { Routes, Route, useParams } from 'react-router-dom';
    import User from './pages/User.jsx';

    function ProfilePage() {
    	// 获取URL中携带过来的params参数
    	let { id } = useParams();
    }

    function App() {
    	return (
    		<Routes>
    			<Route path='users/:id' element={<User />} />
    		</Routes>
    	);
    }
    ```

**4. `useSearchParams(search，setSearch)`**

1. 作用：用于读取和修改当前位置的 URL 中的查询字符串。

2. 返回一个包含两个值的数组，内容分别为：当前的 seaech 参数、更新 search 的函数。

3. 示例代码：

    ```js
    import React from 'react';
    import { useSearchParams } from 'react-router-dom';

    export default function Detail() {
    	const [search, setSearch] = useSearchParams();
    	const id = search.get('id');
    	const title = search.get('title');
    	const content = search.get('content');
    	return (
    		<ul>
    			<li>
    				<button onClick={() => setSearch('id=008&title=哈哈&content=嘻嘻')}>
    					点我更新一下收到的search参数
    				</button>
    			</li>
    			<li>消息编号：{id}</li>
    			<li>消息标题：{title}</li>
    			<li>消息内容：{content}</li>
    		</ul>
    	);
    }
    ```

**5. `useLocation()`**

1. 作用：获取当前 location 信息，对标 5.x 中的路由组件的`location`属性。可以传递 state 参数

2. 示例代码：

    ```js
    import React from 'react';
    import { useLocation } from 'react-router-dom';

    export default function Detail() {
    	const {
    		state: { id, title, content },
    	} = useLocation();
    	//const x = useLocation()
    	//console.log('@',x)
    	// x就是location对象:
    	/*
    		{
          hash: "",
          key: "ah9nv6sz",
          pathname: "/login",
          search: "?name=zs&age=18",
          state: {a: 1, b: 2}
        }
    	*/
    	return (
    		<ul>
    			<li>消息编号：{id}</li>
    			<li>消息标题：{title}</li>
    			<li>消息内容：{content}</li>
    		</ul>
    	);
    }
    ```

**6. `useMatch()`**

1. 作用：返回当前匹配信息，对标 5.x 中的路由组件的`match`属性。

2. 示例代码：

    ```js
    <Route path="/login/:page/:pageSize" element={<Login />}/>
    <NavLink to="/login/1/10">登录</NavLink>

    export default function Login() {
      const match = useMatch('/login/:x/:y')
      console.log(match) //输出match对象
      //match对象内容如下：
      /*
      	{
          params: {x: '1', y: '10'}
          pathname: "/LoGin/1/10"
          pathnameBase: "/LoGin/1/10"
          pattern: {
          	path: '/login/:x/:y',
          	caseSensitive: false,
          	end: false
          }
        }
      */
      return (
      	<div>
          <h1>Login</h1>
        </div>
      )
    }
    ```

**7. `useInRouterContext()`**

作用：如果组件在 `<Router>` 的上下文中呈现，则 `useInRouterContext` 钩子返回 true，否则返回 false。

**8. `useNavigationType()`**

1. 作用：返回当前的导航类型（用户是如何来到当前页面的）。
2. 返回值：`POP`、`PUSH`、`REPLACE`。
3. 备注：`POP`是指在浏览器中直接打开了这个路由组件（刷新页面）。

**9. `useOutlet()`**

1. 作用：用来呈现当前组件中渲染的嵌套路由。

2. 示例代码：

    ```js
    const result = useOutlet();
    console.log(result);
    // 如果嵌套路由没有挂载,则result为null
    // 如果嵌套路由已经挂载,则展示嵌套的路由对象
    ```

**10.`useResolvedPath()`**

1. 作用：给定一个 URL 值，解析其中的：path、search、hash 值。
