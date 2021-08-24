`Vue3 系统入门与项目实战 全方位知识点+高匹配度项目，轻松入门，深度掌握`

# 第1章 Vue 语法初探

本章中，将会通过编写实际例子，带你对Vue的语法有个粗浅的认知，让大家结合例子，有一些自己的疑问，从而带着问题继续学习，以便于更好的理解和掌握后面的知识点。

## 课前须知，这里有你需要了解的一切

![image-20210812143257606](https://gitee.com/sheep101/typora-img-save/raw/master/img/image-20210812143257606.png)

![image-20210611123435174](https://gitee.com/sheep101/typora-img-save/raw/master/img/image-20210611123435174.png)

![image-20210812143401878](https://gitee.com/sheep101/typora-img-save/raw/master/img/image-20210812143401878.png)

![image-20210812143411318](https://gitee.com/sheep101/typora-img-save/raw/master/img/image-20210812143411318.png)

![image-20210611123505295](https://gitee.com/sheep101/typora-img-save/raw/master/img/image-20210611123505295.png)

## 初学编写 HelloWorld 和 Counter

```js
 Vue.createApp({
        data() {
            return {
                count: 1
            }
        },
        mounted() {
            setInterval(() => {
                this.count++
                // 相当于 this.$data.count
            }, 1000)
        },
        template: '<div>hi</div>' +
            '<div> {{count}} </div>'
}).mount('#root')
```

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>hello world </title>
    <!-- 引入vue库 -->
    <script src="https://unpkg.com/vue@next"></script>
</head>

<body>
    <div id="root">
    </div>

</body>
<script>
    // createApp 创建一个vue实例 
    // data 函数
    // template 模板 展示的内容
    // mounted 加载完自动执行
    // mount 挂载在 root上
    Vue.createApp({
        data() {
            return {
                count: 1
            }
        },
        mounted() {
            setInterval(() => {
                this.count++
                // 相当于 this.$data.count
            }, 1000)
        },
        template: '<div>hi</div>' +
            '<div> {{count}} </div>'
    }).mount('#root')
</script>

</html>
```

## 编写字符串反转和内容隐藏小功能

### 反转

```js
this.content = this.content.split('').reverse().join('');
```

```js
 Vue.createApp({
    data() {
        return {
            content: 'hello world'
        }
    },
    methods: {
        handleBtnClick() {
            // 打散 在反转
            this.content = this.content.split('').reverse().join('');
        }
    },
    template: `
      <div>
        {{content}}
        <button v-on:click="handleBtnClick">反转</button>
      </div>
    `
}).mount('#root');
```

### 显示隐藏

```js
    Vue.createApp({
        data() {
            return { show: true }
        },
        methods: {
            handleBtnClick() {
                this.show = !this.show;
            }
        },
        template: `
          <div>
          <span v-if="show">hello world</span>
          <button v-on:click="handleBtnClick">显示/隐藏</button>
          </div>
        `
    }).mount('#root');
```

## 编写TodoList 小功能，了解循环和双向绑定

### 循环

```js
<ul>
  <li v-for="(item, index) of list">{{ item }}{{ index }}</li>
</ul>
```

### todolist

```js
 handleAddItem() {
        this.list.push(this.inputValue);
        this.inputValue = '';
}
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>lesson 3</title>
  <script src="https://unpkg.com/vue@next"></script>
</head>
<body>
  <div id="root"></div>
</body>
<script>
  Vue.createApp({
    data() {
      return {
        inputValue: '',
        list: []
      }
    },
    methods: {
      handleAddItem() {
        this.list.push(this.inputValue);
        this.inputValue = '';
      }
    },
    template: `
      <div>
        <input v-model="inputValue" />
        <button v-on:click="handleAddItem">增加</button>
        <ul>
          <li v-for="(item, index) of list">{{item}}</li>
        </ul>
      </div>
    `
  }).mount('#root');
</script>
</html>
```

## 组件概念初探，对 TodoList 进行组件代码拆分

### tips v-bind:

```js
        <ul>
          <todo-item
            v-for="(item, index) of list"
            v-bind:content="item"
            v-bind:index="index"
          />
        </ul>
```

### 组件注册组件

```js
  app.component('todo-item', {
    props: ['content', 'index'],
    template: '<li>{{index}} -- {{content}}</li>'
  });
```

### 组件化

```js
//注册vue实例
const app = Vue.CreateApp({})
// 生成组件
app.component('todo-list',{})
// 挂载
app.mount('root')
```

### 完整组件拆分

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>lesson 4</title>
  <script src="https://unpkg.com/vue@next"></script>
</head>
<body>
  <div id="root"></div>
</body>
<script>
  // mvvm , vue 实例，vue 组件
  const app = Vue.createApp({
    data() {
      return {
        inputValue: '',
        list: []
      }
    },
    methods: {
      handleAddItem() {
        this.list.push(this.inputValue);
        this.inputValue = '';
      }
    },
    template: `
      <div>
        <input v-model="inputValue" />
        <button
          v-on:click="handleAddItem"
          v-bind:title="inputValue"
        >
          增加
        </button>
        <ul>
          <todo-item
            v-for="(item, index) of list"
            v-bind:content="item"
            v-bind:index="index"
          />
        </ul>
      </div>
    `
  });

  app.component('todo-item', {
    props: ['content', 'index'],
    template: '<li>{{index}} -- {{content}}</li>'
  });

  app.mount('#root');

</script>
</html>
```

# 第2章 Vue 基础语法

本章中，将会讲解生命周期函数，指令，模版，数据，侦听器，事件，循环渲染等基础语法知识点，帮助大家理解第一章重写过的代码，同时理解数据驱动的编程思想。

## Vue 中应用和组件的基础概念

- createApp 表示创建一个 Vue 应用, 存储到 app 变量中
- 传入的参数表示，这个应用最外层的组件，应该如何展示
- MVVM 设计模式，M -> Model 数据， V -> View 视图， VM -> ViewModel 视图数据连接层
- vm 代表的就是 Vue 应用的根组件
- 获取根数据 用类似 `vm.$data.message`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>lesson 5</title>
    <script src="https://unpkg.com/vue@next"></script>
</head>

<body>
<div id="root"></div>
</body>
<script>
    // createApp 表示创建一个 Vue 应用, 存储到 app 变量中
    // 传入的参数表示，这个应用最外层的组件，应该如何展示
    // MVVM 设计模式，M -> Model 数据， V -> View 视图， VM -> ViewModel 视图数据连接层
    const app = Vue.createApp({
        data() {
            return {
                message: 'hello world'
            }
        },
        template: "<div>{{message}}</div>"
    });
    // vm 代表的就是 Vue 应用的根组件
    const vm = app.mount('#root');
</script>

</html>
```

## 理解 Vue 中的生命周期函数

> - `destroyed` 生命周期选项被重命名为 `unmounted`
> - `beforeDestroy` 生命周期选项被重命名为 `beforeUnmount`

![实例的生命周期](https://gitee.com/sheep101/typora-img-save/raw/master/img/lifecycle.svg)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>生命周期</title>
    <script src="https://unpkg.com/vue@next"></script>
</head>
<body>
<div id='root'></div>
</body>
<script>
    // 生命周期函数：在某一时刻会自动执行的函数
    const app = Vue.createApp({
        data() {
            return {
                message: 'hello'
            }
        },
        //  在实例生成前会自动执行的函数
        beforeCreate() {
            console.log('beforeCreate')
        },
        // 在实例生成后会自动执行的函数
        created() {
            console.log('create')
        },
        // 在组件内容渲染到页面之前自动执行的函数
        beforeMount() {
            console.log('beforeMount')
        },
        //   在组件内容渲染到页面之后自动执行的函数
        mounted() {
            console.log('mounted')
        },
        //  在 数据发生变化时会立即执行的函数
        beforeUpdate() {
            console.log('beforeUpdate')
        },
        //  在 数据发生变化，页面重新渲染后，会自动执行的函数
        updated() {
            console.log('updated')
        },
        // 当 Vue 应用失效时，自动执行的函数
        beforeUnmount() {
            console.log('beforeUnmount')
        },
        // 当vue应用失效，且 dom 完全销毁后，自动执行的函数
        Unmount() {
            console.log('Unmount')
        },
        template: "<div>{{message}}<div>"
    })
    app.mount('#root')
</script>
</html>
```

## 常用模版语法讲解

### 插值表达式 {{}}

{{messgae}}

### 一些指令

- v-html
- v-bind(:)
- v-on(@),
- 动态参数
	- `:[name]='message'`
	- `@[event]='handleClick'`
- 修饰符
	- `@click.prevent`
- v-if
- v-once 变量只使用一次

![image-20210812154214229](https://gitee.com/sheep101/typora-img-save/raw/master/img/image-20210812154214229.png)

## 数据，方法，计算属性和侦听器

- data & methods & computed & watcher
- computed 和 method 都能实现的一个功能，建议使用 `computed`，因为有`缓存`
- computed 和 watcher 都能实现的功能，建议使用 `computed` 因为更加简洁

### method:{}

- 有用this的话， 不使用箭头函数
- handleClick（）{console.log} //当前vue实例
- handleClick:()=>{console.log(this)} // undifined

### 监听

> 可以异步操作 比如说setTimeout

```js
    watch: {
    // price 发生变化时，函数会执行
    price(current, prev)
    {
        this.newTotal = current * this.count;
    }
}
,

```

### 计算属性

> 不能异步操作

```js
    computed: {
    // 当计算属性依赖的内容发生变更时，才会重新执行计算
    total()
    {
        return Date.now() + this.count;
        // return this.count * this.price
    }
}
,
```

## 样式绑定语法

### 字符串

![image-20210812162037073](https://gitee.com/sheep101/typora-img-save/raw/master/img/image-20210812162037073.png)

### 对象

![image-20210812162159589](https://gitee.com/sheep101/typora-img-save/raw/master/img/image-20210812162159589.png)

### 数组

![image-20210812162256444](https://gitee.com/sheep101/typora-img-save/raw/master/img/image-20210812162256444.png)

### 子组件获取父组件上的颜色

- 单一元素的话 子组件不用做啥，父组件有class 就行
- 多个元素的话，父组件不知道将class 给谁

```js
//父
<demo class='green'/>

//子 
< div
:

class

= "$attrs.class" > one < /div>
    < div
:

class

= "$attrs.class" > two < /div>
```

### 行内样式

```js
        styleString: 'color: yellow;background: orange',
    styleObject
:
{
    color: 'orange',
        background
:
    'yellow'
}
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>lesson 9</title>
    <style>
        .red {
            color: red;
        }

        .green {
            color: green;
        }
    </style>
    <script src="https://unpkg.com/vue@next"></script>
</head>
<body>
<div id="root"></div>
</body>
<script>
    const app = Vue.createApp({
        data() {
            return {
                classString: 'red',
                classObject: {red: false, green: true},
                classArray: ['red', 'green', {brown: false}],
                styleString: 'color: yellow;background: orange',
                styleObject: {
                    color: 'orange',
                    background: 'yellow'
                }
            }
        },
        template: `
      <div :style="styleObject">
        Hello World
      </div>
    `
    });

    app.component('demo', {
        template: `
      <div :class="$attrs.class">one</div>
      <div :class="$attrs.class">two</div>
    `
    })

    const vm = app.mount('#root');
</script>
</html>

```

## 条件渲染

- v-if 直接控制DOM
	- v-if
	- v-else-if
	- v-else
- v-show display：none 频繁展示消失就用 v-show

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>lesson 10</title>
    <script src="https://unpkg.com/vue@next"></script>
</head>
<body>
<div id="root"></div>
</body>
<script>
    const app = Vue.createApp({
        data() {
            return {
                show: false,
                conditionOne: false,
                conditionTwo: true
            }
        },
        template: `
      <div v-if="show">Hello World</div>

      <div v-if="conditionOne">if</div>
      <div v-else-if="conditionTwo">elseif</div>
      <div v-else>else</div>

      <div v-show="show">Bye World</div>
    `
    });

    const vm = app.mount('#root');
</script>
</html>

```

## 列表循环渲染

### 数组 v-for =“（item,index）in Array”

![image-20210812163630197](https://gitee.com/sheep101/typora-img-save/raw/master/img/image-20210812163630197.png)

### 对象 v-for =“（value,key,index）in Obj”

![image-20210812163609565](https://gitee.com/sheep101/typora-img-save/raw/master/img/image-20210812163609565.png)

### 使用数组的变更函数 push, pop, shift, unshift, splice, sort, reverse

```js
const app = Vue.createApp({
    data() {
        return {listArray: ['dell', 'lee', 'teacher'], listObject: {firstName: 'dell', lastName: 'lee', job: 'teacher'}}
    }, methods: {handleAddBtnClick() {        // 1. 使用数组的变更函数 push, pop, shift, unshift, splice, sort, reverse        this.listArray.push('hello');        this.listArray.pop();        this.listArray.shift();        this.listArray.unshift('hello');        this.listArray.reverse();      }    },    template: `	<div>      <div v-for="(item,index) in listArray " :key='index'>       {{item}}----{{index}}      </div>	  <button @click="handleAddBtnClick"	</div>    `  });  const vm = app.mount('#root');
```

### 直接替换数组

```js
const app = Vue.createApp({
    data() {
        return {listArray: ['dell', 'lee', 'teacher'], listObject: {firstName: 'dell', lastName: 'lee', job: 'teacher'}}
    }, methods: {handleAddBtnClick() {        // 2. 直接替换数组        this.listArray = ['bye', 'world']        this.listArray = ['bye', 'wolrd'].filter(item => item === 'bye');      }    },    template: `	<div>      <div v-for="(item,index) in listArray " :key='index'>       {{item}}----{{index}}      </div>	  <button @click="handleAddBtnClick"	</div>    `  });  const vm = app.mount('#root');
```

### 直接更新数组的内容

```js
const app = Vue.createApp({
    data() {
        return {listArray: ['dell', 'lee', 'teacher'], listObject: {firstName: 'dell', lastName: 'lee', job: 'teacher'}}
    }, methods: {handleAddBtnClick() {        // 3. 直接更新数组的内容        this.listArray[1] = 'hello'      }    },    template: `	<div>      <div v-for="(item,index) in listArray " :key='index'>       {{item}}----{{index}}      </div>	  <button @click="handleAddBtnClick"	</div>    `  });  const vm = app.mount('#root');
```

### 直接添加对象的内容，也可以自动的展示出来

```js
        this.listObject.age = 100;
this.listObject.sex = 'male';
```

### 可以直接循环数字

```html

<div v-for='item in 10'> {{item}}</div>// 1 2 3 4 5 6 7 8 9 10
```

### 切记 v-for 和 v-if 不能写在同层 v-for优先级更高

```html

<div v-for='item in 10' v-if='false'> {{item}}
</div>---------------------------------------------------------------------
<div v-for='item in 10'>
    <div v-if='false'> {{item}}</div>
</div>-------------------------------------------------------------------//这里我们不渲染的时候还会有个div 空标签 优化下用template 相当于占位符
<template v-for='item in 10'>
    <div v-if='false'> {{item}}</div>
</template>
```

## 事件绑定

event, $event

事件修饰符：stop, prevent, capture, self, once, passive

按键修饰符：enter, tab, delete, esc, up, down, left, right

鼠标修饰符：left, right, middle

精确修饰符：exact

### 原生对象获取

![image-20210812165641469](https://gitee.com/sheep101/typora-img-save/raw/master/img/image-20210812165641469.png)

```html

<button @clcik="handleBtnClick()">点击按钮</button>
```

```html

<button @clcik="handleBtnClick(2,$event)">点击按钮</button>
```

### 一个按钮绑定多个函数

```html

<button @clcik="handleBtnClick(),handleBtnClick1()">点击按钮</button>
```

### 事件修饰符

- stop
	- 阻止冒泡
- prevent
	- 阻止默认行为
- capture
	- 捕获 ---- 从外到内
- self
	- 点击自己才实现
- once
	- 只执行一次
- passive
	- 

### 按键修饰符

- enter
- tab
- delete
- esc
- up
- down
- left
- right

```html
<input @keydown.enter="handleKeyDown"/>method:{handleKeyDown(){console.log('keydown')}}
```

### 鼠标修饰符

left, right, middle

```html
<input @click.left="handleKeyDown"/>
```

### 精确修饰符

exact

```html

<div @click.ctrl.exact="handleClick">123</div>
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>lesson 12</title>
    <script src="https://unpkg.com/vue@next"></script>
</head>
<body>
<div id="root"></div>
</body>
<script>  // event, $event  // 事件修饰符：stop, prevent, capture, self, once, passive  // 按键修饰符：enter, tab, delete, esc, up, down, left, right  // 鼠标修饰符：left, right, middle  // 精确修饰符：exact  const app = Vue.createApp({    methods: {      handleClick() {        console.log('click')      },    },    template: `      <div>        <div @click.ctrl.exact="handleClick">123</div>      </div>    `  });  const vm = app.mount('#root');</script>
</html>
```

## 表单中双向绑定指令的使用

### input

```html
<input v-model="message"/>
```

### textarea

```html
<textarea v-model="message"/>
```

### checkbox

```html
<input type="checkbox" v-model="message"/>message 只能是 true false
```

> 高级使用 message:[] 在CheckBox里有value

![image-20210812171603878](https://gitee.com/sheep101/typora-img-save/raw/master/img/image-20210812171603878.png)

### radio

```html
<input type="radio" v-model="message" value='jack'/>// radio 只能是一个 所以 message:""
```

### select

```html
//单选// message:""<select v-model="message">
    <option disabled value=''>请选择内容</option>
    <option value='A'>A</option>
    <option value='B'>B</option>
    <option value='C'>C</option>
</select>
```

```html
//多选// message:[]<select v-model="message" multiple>
    <option disabled value=''>请选择内容</option>
    <option value='A'>A</option>
    <option value='B'>B</option>
    <option value='C'>C</option>
</select>
```

### 修饰符-lazy

![image-20210812172640662](https://gitee.com/sheep101/typora-img-save/raw/master/img/image-20210812172640662.png)

### 修饰符-number

```html
<input v-model.number="message" type='number'/>//类型装换为number  不然本来输入的是string
```

### 修饰符- trim

```html
<input v-model.trim="message"/>//去除前后空格
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>lesson 13</title>
    <script src="https://unpkg.com/vue@next"></script>
</head>
<body>
<div id="root"></div>
</body>
<script>  // input, textarea, checkbox, radio, select  // 修饰符 lazy, number, trim  const app = Vue.createApp({    data() {      return {        message: 'hello',      }    },    template: `      <div>        {{message}}        <input v-model.trim="message"  />      </div>    `  });  const vm = app.mount('#root');</script>
</html>
```

# 第3章 探索组件的理念

本章中，将会通过对组件概念，以及组件之间代码组织，数据传递的内容讲解，帮助大家完整理解组件的设计理念，让大家能够合理的拆分管理组件，写出易于维护的 Vue 代码。

## 组件的定义及复用性，局部组件和全局组件

![image-20210812190136810](https://gitee.com/sheep101/typora-img-save/raw/master/img/image-20210812190136810.png)

组件的定义

组件具备复用性

全局组件，只要定义了，处处可以使用，性能不高，但是使用起来简单，名字建议 小写字母单词，中间用横线间隔

局部组件，定义了，要注册之后才能使用，性能比较高，使用起来有些麻烦，建议大些字母开头，驼峰命名

局部组件使用时，要做一个名字和组件间的映射对象，你不写映射，Vue 底层也会自动尝试帮你做映射

### 组件可以复用但组件内的数据是独立的

```js
  const app = Vue.createApp({
    template: `<div>
      <counter />
      <counter />
      <counter />
      </div>
      `
})
```

```js
  app.component('counter', {
    data() {
        return {
            count: 1
        }
    },
    template: `<div @click="count += 1">{{count}}</div>`
})
```

### 全局组件 app.component()

全局组件，只要定义了，处处可以使用，性能不高，但是使用起来简单，名字建议 小写字母单词，中间用横线间隔

```js
  const app = Vue.createApp({
    template: `
      <div>
        <counter-parent />
      </div>
    `
});

app.component('counter-parent', {
    template: `<counter />`
})

app.component('counter', {
    data() {
        return {
            count: 1
        }
    },
    template: `<div @click="count += 1">{{count}}</div>`
})
```

### 局部组件

局部组件，定义了，要注册之后才能使用，性能比较高，使用起来有些麻烦，建议大些字母开头，驼峰命名

局部组件使用时，要做一个名字和组件间的映射对象，你不写映射，Vue 底层也会自动尝试帮你做映射

```js
  const Counter = {
    data() {
        return {
            count: 1
        }
    },
    template: `<div @click="count += 1">{{count}}</div>`
}

```

```js
  const HelloWorld = {
    template: `<div>hello world</div>`
}
```

```js
//注意下大小写 建议定义的时候大写开头 比如局部组件HelloWorld，全局小写
// 映射关系 'hello-world': HelloWorld
const app = Vue.createApp({
    components: {
        // counter: Counter,
        // 'hello-world': HelloWorld,
        Counter, HelloWorld,
    },
    template: `
      <div>
        <hello-world />
        <counter />
      </div>
    `
});
```

## 组件间传值及传值校验

```js
  const app = Vue.createApp({
    template: `
      <div><test content="HelloWorld" /></div>
    `
});
app.component('test', {
    props: ['content'],
    template: `<div>{{content}}</div>`
})
```

![image-20210812191853222](https://gitee.com/sheep101/typora-img-save/raw/master/img/image-20210812191853222.png)

### 动态传参 :content=“num”

```js
  const app = Vue.createApp({
    data() {
        return {num: 1234}
    },
    template: `
      <div><test :content="num" /></div>
    `
});
app.component('test', {
    props: ['content'],
    template: `<div>{{typeof content}}</div>`
})
```

> number

### 子组件接收属性校验

function

```js
  const app = Vue.createApp({
    data() {
        return {
            num: () => {
                alert(123)
            }
        }
    }, template: `      <div><test :content="num" /></div>    `
});
```

```js
  app.component('test', {
    props: {content: Function}, methods: {
        handleClick() {
            alert(456)
            this.content()
        }
    }, template: `<div @click='this.handleClick'>{{typeof content}}</div>`
})
```

> type:String, Boolean, Array, Object, Function, Symbol
>
> required 必填
>
> default 默认值

```js
  app.component('test', {
    props: {
        content: {
            type: Number, validator: function (value) {
                return value < 1000;
            },          //default:456        default: function() {          return 456;        }      }    },    template: `<div>{{content}}</div>`  });
```

## 单向数据流的理解

### 向子组件传递多个对象时

```js
  v - bind = "params"
:
content = "params.content"
:
a = "params.a"
:
b = "params.b"
:
c = "params.c"
```

```js
  const app = Vue.createApp({
    data() {
        return {params: {content: 1234, a: 123, b: 456, c: 789}}
    },
    template: `      <div>       <test :content='params.content' :a='params.a' :b='params.b' :c='params.c'/>      </div>    `
});
app.component('test', {props: ['content', 'a', 'b', 'c'], template: `<div>{{content}}-{{a}}-{{b}}-{{c}}</div>`})
```

### 驼峰变种接收

属性传的时候，使用 content-abc 这种命名，接的时候，使用 contentAbc 命名

父组件 用 `-`

```js
  const app = Vue.createApp({
    data() {
        return {num: 1}
    }, template: `      <div>        <counter :count-abc="num" />      </div>    `
});
```

子组件 用`驼峰`

```js
  app.component('counter', {props: ['countAbc'], template: `<div @click="count += 1">{{countAbc}}</div>`});
```

### 单向数据流

> 单项数据流的概念: 子组件可以使用父组件传递过来的数据，但是绝对不能修改传递过来的数据

```js
  const app = Vue.createApp({
    data() {
        return {num: 1}
    }, template: `      <div>        <counter :count="num" />      </div>    `
});
app.component('counter', {props: ['count'], template: `<div @click="count += 1">{{count}}</div>`});//会报错
```

避免数据的耦合以及混乱

如果不是单向数据流

```js
<
counter :count = "num" / > < counter
:
count = "num" / > < counter
:
count = "num" / >
```

子组件更改了count之后 父组件的三个<counter>都会发生错误

## Non-Props 属性是什么

```js
  // Non-prop 属性  const app = Vue.createApp({    template: `      <div>        <counter msg="hello"  />      </div>    `  });  app.component('counter', {    props: ['msg'],//写了没用    template: `<div>Message</div>`  });
```

![image-20210812194804487](https://gitee.com/sheep101/typora-img-save/raw/master/img/image-20210812194804487.png)

### 解决方式` inheritAttrs: false`

```js
  // Non-prop 属性    const app = Vue.createApp({    template: `      <div>        <counter msg="hello"  />      </div>    `  });  app.component('counter', {    //不继承父节点传过来的属性    inheritAttrs: false,    template: `<div>Message</div>`  });
```

![image-20210812194950966](https://gitee.com/sheep101/typora-img-save/raw/master/img/image-20210812194950966.png)

### $attrs

未使用props

取其中一个信息 `$attrs.msg`

取所有信息 `v-bind="$attrs"`

```js
  const app = Vue.createApp({template: `      <div>        <counter msg="hello" msg1="hello1" />      </div>    `});
```

```js
  app.component('counter', {    // inheritAttrs: false,    mounted() {      console.log(this.$attrs.msg);    },    template: `      <div :msg="$attrs.msg">Counter</div>      <div v-bind="$attrs">Counter</div>      <div :msg1="$attrs.msg1">Counter</div>    `  });
```

![image-20210812195456994](https://gitee.com/sheep101/typora-img-save/raw/master/img/image-20210812195456994.png)

## 父子组件间如何通过事件进行通

父-------props--------->子

子 -------$emit()------>父

```js
  const app = Vue.createApp({
    data() {
        return {count: 1}
    }, methods: {
        handleAddOne() {
            this.count += 1
        }
    }    template: `      <counter :count="count" @add-one='handleAddOne' />    `
});
```

```js
app.component('counter', {
    props: ['count'], methods: {
        addOne() {
            this.$emit('addOne')
        }
    }, template: `	<div @click='addOne'>{{count}}</div>`
})
```

换一种方式

```js
  const app = Vue.createApp({
    data() {
        return {count: 1}
    }, template: `      <counter v-model="count" />    `
});
```

```js
  app.component('counter', {
    props: ['modelValue'], methods: {
        handleClick() {
            this.$emit('update:modelValue', this.modelValue + 3);
        }
    }, template: `      <div @click="handleClick">{{modelValue}}</div>    `
});
```

### v-model

![image-20210817094923083](https://gitee.com/sheep101/typora-img-save/raw/master/img/image-20210817094923083.png)

![image-20210817094951850](https://gitee.com/sheep101/typora-img-save/raw/master/img/image-20210817094951850.png)

## 组件间双向绑定高级内容

### 多个v-model

```
v-model:count='count' v-model:count1='count1'
```

```js
  const app = Vue.createApp({
    data() {
        return {count: 1, count1: 2}
    }, template: `      <counter v-model:count="count" v-model:count1="count1" />    `
});
app.component('counter', {
    props: ['count', 'count1'], methods: {
        handleClick() {
            this.$emit('update:count', this.count + 1)
        }, handleClick1() {
            this.$emit('update:count1', this.count1 + 1)
        },
    }, template: `      <div @click="handleClick">{{count}}</div>      <div @click="handleClick1">{{count1}}</div>    `
});
```

### v-model修饰符

自定义修饰符 `uppercase`

```js
      <counter v-model.uppercase='count'/>          
```

```js
    props: {
    'modelValue'
:
    String, 'modelModifiers'
:
    {        //传递过来的修饰符 注意这两个是固定写法        default: () => ({})      }    },
```

```js
      handleClick()
{
    let newValue = this.modelValue + 'b';
    if (this.modelModifiers.uppercase) {          // 有传过来的话 结合修饰符进行处理          newValue = newValue.toUpperCase();        }        this.$emit('update:modelValue', newValue);      },
```

```js
  const app = Vue.createApp({
    data() {
        return {count: 'a',}
    }, template: `      <counter v-model.uppercase='count' />    `
});
app.component('counter', {props: {'modelValue': String, 'modelModifiers': {        //传递过来的修饰符 注意这两个是固定写法        default: () => ({})      }    },    methods: {      handleClick() {        let newValue = this.modelValue + 'b';        if (this.modelModifiers.uppercase) {          // 有传过来的话 结合修饰符进行处理 比如全部转成大写          newValue = newValue.toUpperCase();        }        this.$emit('update:modelValue', newValue);      },    },    template: `      <div @click="handleClick">{{modelValue}}</div>    `  });
```

## 使用插槽和具名插槽解决组件内容传递问题

### slot 插槽

![image-20210817110611656](C:\Users\kelo\AppData\Roaming\Typora\typora-user-images\image-20210817110611656.png)

> slot标签不能直接绑定事件 <slot @click='xxx'/> 错误的
>
> 应该 <span @click='xxx'> <slot /> </span>

```js
  // slot 插槽  // slot标签不能直接绑定事件 <slot @click='xxx'/> 错误的  // 应该 <span @click='xxx'> <slot /> </span>  const app = Vue.createApp({    template: `      <myform><div>提交</div></myform>      <myform><button>提交</button></myform>    `  });  app.component('myform', {    methods: {      handleClick() {        alert(123)      }    },    template: `      <div>       <input/>       <slot></slot>      </div>    `  });
```

### slot 中使用的数据，作用域的问题

> 父模版里调用的数据属性，使用的都是父模版里的数据

> 子模版里调用的数据属性，使用的都是子模版里的数据

 ```js
  const app = Vue.createApp({
    data() {
        return {text: '提交'}
    }, template: `      <myform><div>{{text}}</div></myform>      <myform><button>{{text}}</button></myform>    `
});
 ```

### slot 默认值使用

```js
<slot>default value</slot>
```

![image-20210817111413633](https://gitee.com/sheep101/typora-img-save/raw/master/img/image-20210817111413633.png)

```js
  const app = Vue.createApp({template: `      <myform><div>提交</div></myform>      <myform><button>提交</button></myform>      <myform></myform>    `});
```

```js {10}
  app.component('myform', {
    methods: {
        handleClick() {
            alert(123)
        }
    }, template: `      <div>       <input/>      <slot>default value</slot>      </div>    `
});
```

### 具名插槽

父 `<template v-slot:'header' />` 或者 ` <template #header />`

子 `<slot name='header'/>`

```js
  const app = Vue.createApp({template: `      <layout>        <template v-slot:header>          <div>header</div>        </template>        <template v-slot:footer>          <div>footer</div>        </template>      </layout>    `});
```

```js
  app.component('layout', {template: `      <div>        <slot name="header"></slot>        <div>content</div>        <slot name="footer"></slot>      </div>    `});
```

## 作用域插槽

解决 子组件展示方式由父组件决定的方式

在vue插件中经常使用

![image-20210817112847923](https://gitee.com/sheep101/typora-img-save/raw/master/img/image-20210817112847923.png)

> 这边只用到了item 一个属性
>
> 故 `v-slot=‘slotProps’ `也可以写成`解构`的方式
>
> `v-slot={item}`

```js
  const app = Vue.createApp({template: `      <list v-slot="slotProps">        <div>{{slotProps.item}}</div>      </list>    `});
```

```js
  const app = Vue.createApp({template: `      <list v-slot="{item}">        <div>{{item}}</div>      </list>    `});
```

```js
  app.component('list', {
    data() {
        return {list: [1, 2, 3]}
    }, template: `      <div>        <slot v-for="item in list" :item="item" />      </div>    `
});
```

## 动态组件和异步组件

### 动态组件

> 动态组件: 根据数据的变化，结合 compoent 这个标签，来随时动态切换组件的现实
>
> 搭配 keep-alive使用更香
>
> 不然切换的过程会数据会丢失

``` vue
<component :is='currentItem'/>
```

```js
  const app = Vue.createApp({
    data() {
        return {cuttentItem: 'input-item'}
    },
    methods: {
        handleClick() {
            this.cuttentItem = this.cuttentItem === 'input-item' ? 'common-item' : 'input-item'
        }
    },
    template: `      <div>        <component :is='cuttentItem'/>        <button @click='handleClick'>切换</button>      </div>    `
});
app.component('common-item', {template: `<div>hello world</div>`});
app.component('input-item', {template: `<input />`});
```

### 异步组件

> 异步组件: 是异步执行某些组件的逻辑，这叫做异步组件

`Vue.defineAsyncComponent`

大的项目拆分成小的块

需要用的时候再去调用

```js
  app.component('async-common-item', Vue.defineAsyncComponent(() => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({template: `<div>this is an async component</div>`})
        }, 4000)
    })
}))
```

## 基础语法知识点查缺补漏

### v-once

让某个元素标签`只渲染`一次

即便数据有变化 但是就只渲染一次

![image-20210817114559941](https://gitee.com/sheep101/typora-img-save/raw/master/img/image-20210817114559941.png)

```js
  const app = Vue.createApp({
    data() {
        return {count: 1}
    }, template: `      <div @click="count += 1" v-once>        {{count}}      </div>    `
});
```

### ref

> 实际上是获取 Dom `节点 / 组件`引用 的一个语法
>
> 也可以获取组件的引用

```js
  const app = Vue.createApp({
    data() {
        return {count: 1}
    }, mounted() {
        console.log(this.$refs.count)
    }, template: `      <div ref='count' >        {{count}}      </div>    `
});
```

![image-20210817132415625](https://gitee.com/sheep101/typora-img-save/raw/master/img/image-20210817132415625.png)

### provide / inject

> 多级组件传值

传 provide

```js {5-9}
  const app = Vue.createApp({
    data() {
        return {count: 1}
    }, provide: {count: 1}    template: `      <div>        <child :count="count" />      </div>    `
});
```

接 注入 inject

```js {6}
  app.component('child', {template: `<child-child />`});
app.component('child-child', {inject: ['count'], template: `<div>{{count}}</div>`});
```

> provide 提供给孙子的是一次性的 不是双向绑定的
>
> vue3 响应式可以解决

![image-20210817133129923](https://gitee.com/sheep101/typora-img-save/raw/master/img/image-20210817133129923.png)

provide获取data中的数据

```js
provide()
{
    return {count: this.count,}
}
,        //原本是        provide：{count：1}
```

> 更改了data中的count
>
> provide中的count并不会随之变化 因为这种提供是一次性的

```js
 <button @click="count += 1">Add</button>
```

```js
  const app = Vue.createApp({
    data() {
        return {count: 1}
    },
    provide() {
        return {count: this.count,}
    },
    template: `      <div>        <child :count="count" />        <button @click="count += 1">Add</button>      </div>    `
});
app.component('child', {template: `<child-child />`});
app.component('child-child', {inject: ['count'], template: `<div>{{count}}</div>`});
```

# 第4章 Vue 中的动画

本章中，将会通过讲解单元素单组件的动画，与多元素的切换动画，以及状态动画等，帮助大家了解在 Vue 中，如何借助一定的封装，实现 CSS 和 JS 动画，让大家能够快速实现酷炫的动态效果。

## 4-1 使用 Vue 实现基础的 CSS 过渡与动画效果

### 过渡

一个状态到另一个状态

比如说颜色变换

通过class进行绑定

```css
    /* 过渡 */
/* ease 缓慢增速 */
.transition {
    transition: 3s background-color ease;
}

.blue {
    background: blue;
}

.green {
    background: green;
}
```

```js
    data()
{
    return {
        styleObj: {
            background: 'blue'
        },
        animate: {
            animation: false
        },
        translate: {
            translation: true,
            blue: true,
            green: false,
        }
    }
}
,
```

```html

<div :class="translate">hello world</div>
```

通过style 进行绑定

```html

<div class="transition" :style="styleObj">hello world</div>
```

### 动画

运动情况

比如说位置移动

```css
    @keyframes leftToRight {
        0% {
            transform: translateX(-100px);
        }

        50% {
            transform: translateX(-50px);
        }

        0% {
            transform: translateX(0px);
        }
    }

.animation {
    animation: leftToRight 3s;
}
```

```html

<div :class="animate">hello</div>
```

```js
    data()
{
    return {
        animate: {
            animation: false
        }
    }
}
,
```

## 使用 transition 标签实现单元素组件的过渡和动画效果

### 过渡效果----单元素，单组件的入场出场

```css
    /* 入场动画 搭配 translate标签使用 */
.v-enter-from {
    /* 开始 透明度为o */
    opacity: 0;
}

.v-enter-active {
    /* 入场的行为 这边设个缓慢 */
    transition: opacity 3s ease-out;
}

.v-enter-to {
    /* 结束 透明度为1*/
    opacity: 1;
}
```

```css
    /* 出场动画 搭配 translate标签使用 */
.v-leave-from {
    opacity: 1;
}

.v-leave-active {
    transition: opacity 3s ease-in;
}

.v-leave-to {
    opacity: 0;
}
```

```js
  const app = Vue.createApp({
    data() {
        return {show: false}
    },
    methods: {
        handleClick() {
            this.show = !this.show;
        }
    },
    template: `      <div>        <transition >          <div v-if="show">hello world</div>        </transition>        <button @click="handleClick">切换</button>      </div>    `
});
```

### 动画效果

`v-leave-active`搭配`transition`

```css
    @keyframes shake {
        0% {
            transform: translateX(-100px)
        }
        50% {
            transform: translateX(-50px)
        }
        100% {
            transform: translateX(50px)
        }
    }

.v-leave-active {
    animation: shake 3s;
}

.v-enter-active {
    animation: shake 3s;
}
```

```js
  const app = Vue.createApp({
    data() {
        return {show: false}
    },
    methods: {
        handleClick() {
            this.show = !this.show;
        }
    },
    template: `      <div>        <transition>          <div v-if="show">hello world</div>        </transition>        <button @click="handleClick">切换</button>      </div>    `
});
```

### 重命名transition

```css
    .hello-leave-active {
    animation: shake 3s;
}

.hello-enter-active {
    animation: shake 3s;
}
```

```html

<transition name='hello'>
    <div v-if="show">hello world</div>
</transition>
```

### 自定义 transition 样式名称

- enter-from-class
- enter-to-class
- enter-active-class
- leave-from-class
- leave-to-class
- leave-active-class

```html

<transition enter-active-class='hello' leave-active-class='bye'>
    <div v-show="show">hello world</div>
</transition>
```

```css
    .bye {
    animation: shake 3s;
}

.hello {
    animation: shake 3s;
}

@keyframes shake {
    0% {
        transform: translateX(-100px)
    }
    50% {
        transform: translateX(-50px)
    }
    100% {
        transform: translateX(50px)
    }
}
```

### 自定义transition与外部样式相结合

[animate样式库](https://animate.style/)

引入

```html

<head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
</head>
```

使用

```html
<h1 class="animate__animated animate__bounce">An animated element</h1>
```

vue中使用

```html

<transition enter-active-class='animate__animated animate__bounce'
            leave-active-class='animate__animated animate__bounce'>
    <div v-show="show">hello world</div>
</transition>
```

### 过渡和动画都有的情况

#### 以过渡为准`type = 'transition'`

```html

<transition type='transition'>
    <div v-show="show">hello world</div>
</transition>
```

```css
    .v-enter-active {
    animation: shake 10s;
    transition: all 3s ease-out;
}
```

#### 以动画为准`type = 'animation'`

```html

<transition type='animation'>
    <div v-show="show">hello world</div>
</transition>
```

```css
    .v-enter-active {
    animation: shake 3s;
    transition: all 10s ease-out;
}
```

#### 以`duration`为准

```html

<transition :duration='1000'>
    <div v-show="show">hello world</div>
</transition>
```

```html
//对象 入场1s 出场3s
<transition :duration='{enter:1000,leave:3000}'>
    <div v-show="show">hello world</div>
</transition>
```

### 不使用css 使用js钩子

不使用css `:css='false'`

```html

<div>
    <transition :css="false" @before-enter="handleBeforeEnter" @enter="handleEnterActive" @after-enter="handleEnterEnd">
        <div v-show="show">hello world</div>
    </transition>
    <button @click="handleClick">切换</button>
</div>
```

```js
    methods: {
    handleClick()
    {
        this.show = !this.show;
    }
,
    handleBeforeEnter(el)
    {
        el.style.color = "red";
    }
,
    handleEnterActive(el, done)
    {
        const animation = setInterval(() => {
            const color = el.style.color;
            if (color === 'red') {
                el.style.color = 'green';
            } else {
                el.style.color = 'red';
            }
        }, 1000)
        setTimeout(() => {
            clearInterval(animation);
            done();
        }, 3000)
    }
,
    handleEnterEnd(el)
    {
        alert(123);
    }
}
,
```

## 组件和元素切换动画的实现

![change](https://gitee.com/sheep101/typora-img-save/raw/master/img/change.gif)

### `mode='out-in'`先隐藏再展示

> 什么都不写就会变成一起展示

```css
    .v-leave-to {
    opacity: 0;
}

.v-enter-from {
    opacity: 0;
}

.v-enter-active, .v-leave-active {
    transition: opacity 1s ease-in;
}

.v-leave-from, .v-enter-to {
    opacity: 1;
}
```

```html

<div>
    <transition mode='out-in'>
        <div v-if="show">hello world</div>
        <div v-else="show">bye world</div>
    </transition>
    <button @click="handleClick">切换</button>
</div>
```

### appear 初次刷新也要带效果

```html

<div>
    <transition mode='out-in' appear>
        <div v-if="show">hello world</div>
        <div v-else="show">bye world</div>
    </transition>
    <button @click="handleClick">切换</button>
</div>
```

第一次进入 hello world 也会有动画效果

### 多个单组件之间的切换

```html

<div>
    <transition mode='out-in' appear>
        <component-a v-if="show"/>
        <component-b v-else="show"/>
    </transition>
    <button @click="handleClick">切换</button>
</div>
```

## 列表动画

![grouplist](https://gitee.com/sheep101/typora-img-save/raw/master/img/grouplist.gif)

` <transition-group>` 列表使用group

```css
    .v-enter-from {
    opacity: 0;
    transform: translateY(30px);
}

.v-enter-active {
    transition: all .5s ease-in;
}

.v-enter-to {
    opacity: 1;
    transform: translateY(0);
}

/*所有动画都缓慢移动 */
.v-move {
    transition: all .5s ease-in;
}

.list-item {
    display: inline-block; /* 动画记得加inline-block 否则不显示 */
    margin-right: 10px;
}
```

```js
  // 列表动画的实现  const app = Vue.createApp({    data() {      return { list: [1, 2, 3] }    },    methods: {      handleClick() {        this.list.unshift(this.list.length + 1);      },    },    template: `      <div>        <transition-group>          <span class="list-item" v-for="item in list" :key="item">{{item}}</span>        </transition-group>        <button @click="handleClick">增加</button>      </div>    `  });
```

## 状态动画

![123](https://gitee.com/sheep101/typora-img-save/raw/master/img/123.gif)

> 通过数据来改变动画

```js
    data()
{
    return {number: 1, animateNumber: 1}
}
,
```

```js
    methods: {
    handleClick()
    {
        this.number = 10;
        if (this.animateNumber < this.number) {
            const animation = setInterval(() => {
                this.animateNumber += 1;
                if (this.animateNumber === 10) {
                    clearInterval(animation);
                }
            }, 100);
        }
    }
,
}
,
```

```js
      template: `      <div>        <div>{{animateNumber}}</div>        <button @click="handleClick">增加</button>      </div>    `
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>lesson 27</title>
    <script src="https://unpkg.com/vue@next"></script>
</head>
<body>
<div id="root"></div>
</body>
<script>  // 状态动画  const app = Vue.createApp({    data() {      return {        number: 1,        animateNumber: 1      }    },    methods: {      handleClick() {        this.number = 10;        if(this.animateNumber < this.number) {          const animation = setInterval(() => {            this.animateNumber += 1;            if(this.animateNumber === 10) {              clearInterval(animation);            }          }, 100);        }      },    },    template: `      <div>        <div>{{animateNumber}}</div>        <button @click="handleClick">增加</button>      </div>    `  });  const vm = app.mount('#root');</script>
</html>
```

# 第5章 Vue 中的高级语法

本章中，将会着重介绍 Vue 中混入，插件，自定义指令等扩展语法，以及 render 函数，Teleport 传送门等高级语法，帮助大家更加深入的了解 Vue 原理以及扩展性原则，让大家能够具备一定的高级封装能力。

## Mixin 混入的基础语法

mixin 混入

> `组件 data, methods` 优先级高于 mixin data, methods 优先级

> 生命周期函数，`先执行 mixin 里面的`，`再执行组件里面的`

> `自定义的属性`，组件中的属性优先级高于 mixin 属性的优先级

```js
//自定义属性
const myMixin = {
    number: 1
}

const app = Vue.createApp({
    mixins: [myMixin],
    number: 2,
    template: `
      <div>
        <div>{{this.$options.number}}</div>
      </div>
    `
});
//自定义属性修改优先级
app.config.optionMergeStrategies.number = (mixinVal, appValue) => {
    //优先显示mixinval 优先级被修改
    return mixinVal || appValue;
}

const vm = app.mount('#root');
```

`this.$options.number`

自定义属性修改优先级

```js
  app.config.optionMergeStrategies.number = (mixinVal, appValue) => {
    //优先显示mixinval 优先级被修改
    return mixinVal || appValue;
}
```

vue3中已经不推荐mixin 而是直接用api

## 开发实现 Vue 中的自定义指令

### 全局自定义指令

`v-focus` `app.directive('',{})`

```js
  const app = Vue.createApp({

    template: `
      <div>
        <div >
          <input v-focus />
        </div>
      </div>
    `
});
// 全局自定义指令
app.directive('focus', {
    mounted(el) {
        el.focus()
    },
})
```

### 局部自定义指令

`const directives ={}`

`directives:directives` ==> `directives`

```js
  const directives = {
    focus: {
        mounted(el) {
            el.focus()
        },
    }
}

const app = Vue.createApp({
    directives: directives,
    template: `
  <div>
    <div >
      <input v-focus />
    </div>
  </div>
`
});
```

### pos 指令例子

```js
  const app = Vue.createApp({
    data() {
        return {
            top: 110
        }
    },
    template: `
      <div>
        <div v-pos="top" class="header">
          <input />
        </div>
      </div>
    `
});

app.directive('pos', (el, binding) => {
    el.style.top = (binding.value + 'px');
})
```

```js
  app.directive('pos', (el, binding) => {
    el.style.top = (binding.value + 'px');
})
// 等價於
// 前提是 mounted 与updated 执行的内容相同
app.directives('pos', {
    mounted(el, bindding) {
        el.style.top = (bindding.value + 'px')
    },
    updated(el, bindding) {
        el.style.top = (bindding.value + 'px')
    },
})
```

### 指令修饰符

- el
- binding
- binding.value
- binding.arg

```js
  const app = Vue.createApp({
    data() {
        return {
            distance: 110
        }
    },
    template: `
      <div>
        <div v-pos:right="distance" class="header">
          <input />
        </div>
      </div>
    `
});

app.directive('pos', (el, binding) => {
    el.style[binding.arg] = (binding.value + 'px');
})
```

## Teleport 传送门功能[vue3.0]

### 基本用法

Teleport 提供了一种干净的方法，允许我们控制在 DOM 中哪个父节点下渲染了 HTML，而不必求助于全局状态或将其拆分为两个组件。

让我们修改 `msak`以使用 `<teleport>`，并告诉 Vue “**Teleport** 这个 HTML **到**该‘**body**’标签”。

```js
  // teleport 传送门
const app = Vue.createApp({
    data() {
        return {
            show: false,
            message: 'hello'
        }
    },
    methods: {
        handleBtnClick() {
            this.show = !this.show;
        }
    },
    template: `
      <div class="area">
        <button @click="handleBtnClick">按钮</button>
        <teleport to="body">
          <div class="mask" v-show="show">{{message}}</div>
        </teleport>
      </div>
    `
});
```

![image-20210817194608746](https://gitee.com/sheep101/typora-img-save/raw/master/img/image-20210817194608746.png)

### 与 Vue components 一起使用

如果 `<teleport>` 包含 Vue 组件，则它仍将是 `<teleport>` 父组件的逻辑子组件：

```js
const app = Vue.createApp({template: `    <h1>Root instance</h1>    <parent-component />  `})
app.component('parent-component', {template: `    <h2>This is a parent component</h2>    <teleport to="#endofbody">      <child-component name="John" />    </teleport>  `})
app.component('child-component', {props: ['name'], template: `    <div>Hello, {{ name }}</div>  `})
```

在这种情况下，即使在不同的地方渲染 `child-component`，它仍将是 `parent-component` 的子级，并将从中接收 `name` prop。

这也意味着来自父组件的注入按预期工作，并且子组件将嵌套在 Vue Devtools 中的父组件之下，而不是放在实际内容移动到的位置。

### 在同一目标上使用多个 teleport

一个常见的用例场景是一个可重用的 `<Modal>` 组件，它可能同时有多个实例处于活动状态。对于这种情况，多个 `<teleport>`
组件可以将其内容挂载到同一个目标元素。顺序将是一个简单的追加——稍后挂载将位于目标元素中较早的挂载之后。

```js
<teleport to="#modals">
    <div>A</div>
</teleport>
<teleport to="#modals">
    <div>B</div>
</teleport><!-- result-->
<div id="modals">
    <div>A</div>
    <div>B</div>
</div>
```

### **Props：**

- `to` - `string`。需要 prop，必须是有效的查询选择器或 HTMLElement (如果在浏览器环境中使用)。指定将在其中移动 `<teleport>` 内容的目标元素

```html
<!-- 正确 -->
<teleport to="#some-id"/>
<teleport to=".some-class"/>
<teleport to="[data-teleport]"/><!-- 错误 -->
<teleport to="h1"/>
<teleport to="some-string"/>
```

- `disabled` - `boolean`。此可选属性可用于禁用 `<teleport>` 的功能，这意味着其插槽内容将不会移动到任何位置，而是在你在周围父组件中指定了 `<teleport>` 的位置渲染。

```html

<teleport to="#popup" :disabled="displayVideoInline">
    <video src="./my-movie.mp4">
</teleport>
```

> 请注意，这将移动实际的 DOM 节点，而不是被销毁和重新创建，并且它还将保持任何组件实例的活动状态。所有有状态的 HTML 元素 (即播放的视频) 都将保持其状态。

## 更加底层的 render 函数

### render 例子

```js
  const app = Vue.createApp({template: `      <my-title :level="2">        hello       </my-title>    `});
app.component('my-title', {props: ['level'], render() {      // 使用vue中的h函数      const { h } = Vue;      return h('h' + this.level, {}, this.$slot)    },  })
```

render函数相当于底下的template

```js
    template: `    <h1 v-if='level ===1'><slot/></h1> 	<h2 v-if='level ===1'><slot/></h2>	`
```

### h函数

vue中的虚拟DOM

> template -> render -> h -> 虚拟DOM（JS对象）-> 真实 DOM -> 展示到页面上

### render

- **类型：**`Function`

- **详细：**

	字符串模板之外的另一种选择，允许你充分利用 JavaScript 的编程功能。

- **用法：**

	```html
  <div id="app" class="demo">	<my-title blog-title="A Perfect Vue"></my-title></div>
  ```

	```js
  const { createApp, h } = Vueconst app = createApp({})app.component('my-title', {	render() {		return h(			'h1',           // 标签名称			this.blogTitle  // 标签内容		)	},	props: {		blogTitle: {			type: String,			required: true		}	}})app.mount('#app')
  ```

	> 注意
	>
	> `render` 函数的优先级高于根据 `template` 选项或挂载元素的 DOM 内 HTML 模板编译的渲染函数。

## 插件的定义和使用

### vue插件基础写法

```js
// 自定义插件 其实就是一个对象 const myPlugin = {    install(app, options) {      console.log(app,options)    }  }    const app = Vue.createApp({    template: `      <div>hello</div>    `  });// 使用插件  app.use(myPlugin, { name: 'kelo'});
```

### 通用性封装

plugin 插件, 也是把通用性的功能封装起来

```js
  const myPlugin = {
    install(app, options) {
        app.provide('name', 'Dell Lee');
        app.directive('focus', {
            mounted(el) {
                el.focus();
            }
        })
        app.mixin({
            mounted() {
                console.log('mixin')
            }
        })      // $ 表示对vue底层私有的进行扩展      app.config.globalProperties.$sayHello = 'hello world';    }  }  const app = Vue.createApp({    template: `      <my-title />    `  });  app.component('my-title', {    inject: ['name'],    mounted() {      // 和前面的 app.config.globalProperties.$sayHello 相对应      console.log(this.$sayHello);    },    template: `<div>{{name}}<input v-focus /></div>`  })  app.use(myPlugin, { name: 'kelo'});
```

## 数据校验插件开发实例

```js
  const app = Vue.createApp({
    data() {
        return {name: 'dell', age: 23}
    },
    rules: {
        age: {validate: age => age > 25, message: 'too young, to simple'},
        name: {validate: name => name.length >= 4, message: 'name too short'}
    },
    template: `      <div>name:{{name}}, age:{{age}}</div>    `
});
```

```js
//对数据做校验的插件  const validatorPlugin = (app, options) => {    app.mixin({      created() {        //遍历 rules 中元素        for (let key in this.$options.rules) {          // key:age item:{validate...}          const item = this.$options.rules[key];          // 调用底层监听方法          this.$watch(key, (value) => {            const result = item.validate(value);            if (!result) console.log(item.message);          })        }      }    })  }
```

```js
// 插件使用 并挂载  app.use(validatorPlugin);  const vm = app.mount('#root');
```

# 第6章 Composition API

本章重，将会给大家全面介绍 Vue3 新提供的 Composition API 语法，帮助大家学会优雅合理的使用新版本 Vue 语法。在本章中，还通过小例子的形式帮助大家进行实操联系，确保大家能够学以致用，为之后的实战课程做好准备。

## 6-1 Setup 函数的使用

![Vue 选项式 API: 按选项类型分组的代码](https://gitee.com/sheep101/typora-img-save/raw/master/img/options-api.png)

- `setup()` 在生命周期`created `实例被完全初始化之前执行
- 接收两个参数 `props` `context`
- 在 `setup` 中你应该避免使用 `this`，因为它不会找到组件实例
- setup 无法调用实例那些 methods之类的方法，但实例可以调用 setup方法

```js
  const app = Vue.createApp({
    template: `
      <div @click="handleClick">{{name}}</div>
    `,
    methods: {
        test() {
            console.log(this.$options.setup());
        }
    },
    mounted() {
        this.test();
    },
    // created 实例被完全初始化之前
    setup(props, context) {
        return {
            name: 'dell',
            handleClick: () => {
                alert(123)
            }
        }
    }
});
const vm = app.mount('#root');
```

### `setup` 组件选项

新的 `setup` 选项在组件创建**之前**执行，一旦 `props` 被解析，就将作为组合式 API 的入口。

> 在 `setup` 中你应该避免使用 `this`，因为它不会找到组件实例。`setup` 的调用发生在 `data` property、`computed` property 或 `methods` 被解析之前，所以它们无法在 `setup` 中被获取。

`setup` 选项是一个接收 `props` 和 `context` 的函数，我们将在之后进行讨论。此外，我们将 `setup` 返回的所有内容都暴露给组件的其余部分 (计算属性、方法、生命周期钩子等等) 以及组件的模板。

让我们把 `setup` 添加到组件中：

```js
// src/components/UserRepositories.vue

export default {
    components: {RepositoriesFilters, RepositoriesSortBy, RepositoriesList},
    props: {
        user: {
            type: String,
            required: true
        }
    },
    setup(props) {
        console.log(props) // { user: '' }

        return {} // 这里返回的任何内容都可以用于组件的其余部分
    }
    // 组件的“其余部分”
}
```

现在让我们从提取第一个逻辑关注点开始 (在原始代码段中标记为“1”)。

> 1. 从假定的外部 API 获取该用户的仓库，并在用户有任何更改时进行刷新

我们将从最明显的部分开始：

- 仓库列表
- 更新仓库列表的函数
- 返回列表和函数，以便其他组件选项可以对它们进行访问

```js
// src/components/UserRepositories.vue `setup` function
import {fetchUserRepositories} from '@/api/repositories'

// 在我们的组件内
setup(props)
{
    let repositories = []
    const getUserRepositories = async () => {
        repositories = await fetchUserRepositories(props.user)
    }

    return {
        repositories,
        getUserRepositories // 返回的函数与方法的行为相同
    }
}
```

这是我们的出发点，但它还无法生效，因为 `repositories` 变量是非响应式的。这意味着从用户的角度来看，仓库列表将始终为空。让我们来解决这个问题！

### 带 `ref` 的响应式变量

在 Vue 3.0 中，我们可以通过一个新的 `ref` 函数使任何响应式变量在任何地方起作用，如下所示：

```js
import {ref} from 'vue'

const counter = ref(0)
```

`ref` 接收参数并将其包裹在一个带有 `value` property 的对象中返回，然后可以使用该 property 访问或更改响应式变量的值：

```js
import {ref} from 'vue'

const counter = ref(0)

console.log(counter) // { value: 0 }
console.log(counter.value) // 0

counter.value++
console.log(counter.value) // 1
```

将值封装在一个对象中，看似没有必要，但为了保持 JavaScript 中不同数据类型的行为统一，这是必须的。这是因为在 JavaScript 中，`Number` 或 `String` 等基本类型是通过值而非引用传递的：

![按引用传递与按值传递](https://gitee.com/sheep101/typora-img-save/raw/master/img/pass-by-reference-vs-pass-by-value-animation.gif)

在任何值周围都有一个封装对象，这样我们就可以在整个应用中安全地传递它，而不必担心在某个地方失去它的响应性。

> 换句话说，`ref` 为我们的值创建了一个**响应式引用**。在整个组合式 API 中会经常使用**引用**的概念

回到我们的例子，让我们创建一个响应式的 `repositories` 变量：

```js
// src/components/UserRepositories.vue `setup` function
import {fetchUserRepositories} from '@/api/repositories'
import {ref} from 'vue'

// 在我们的组件中
setup(props)
{
    const repositories = ref([])
    const getUserRepositories = async () => {
        repositories.value = await fetchUserRepositories(props.user)
    }

    return {
        repositories,
        getUserRepositories
    }
}
```

完成！现在，每当我们调用 `getUserRepositories` 时，`repositories` 都将发生变化，视图也会更新以反映变化。我们的组件现在应该如下所示：

```js
// src/components/UserRepositories.vue
import {fetchUserRepositories} from '@/api/repositories'
import {ref} from 'vue'

export default {
    components: {RepositoriesFilters, RepositoriesSortBy, RepositoriesList},
    props: {
        user: {
            type: String,
            required: true
        }
    },
    setup(props) {
        const repositories = ref([])
        const getUserRepositories = async () => {
            repositories.value = await fetchUserRepositories(props.user)
        }

        return {
            repositories,
            getUserRepositories
        }
    },
    data() {
        return {
            filters: {...}, // 3
            searchQuery: '' // 2
        }
    },
    computed: {
        filteredRepositories() { ...
        }, // 3
        repositoriesMatchingSearchQuery() { ...
        }, // 2
    },
    watch: {
        user: 'getUserRepositories' // 1
    },
    methods: {
        updateFilters() { ...
        }, // 3
    },
    mounted() {
        this.getUserRepositories() // 1
    }
}
```

我们已经将第一个逻辑关注点中的几个部分移到了 `setup` 方法中，它们彼此非常接近。剩下的就是在 `mounted` 钩子中调用 `getUserRepositories`，并设置一个监听器，以便在 `user` prop
发生变化时执行此操作。

我们将从生命周期钩子开始。

### 在 `setup` 内注册生命周期钩子

为了使组合式 API 的功能和选项式 API 一样完整，我们还需要一种在 `setup` 中注册生命周期钩子的方法。这要归功于 Vue 导出的几个新函数。组合式 API 上的生命周期钩子与选项式 API 的名称相同，但前缀为 `on`
：即 `mounted` 看起来会像 `onMounted`。

这些函数接受一个回调，当钩子被组件调用时，该回调将被执行。

让我们将其添加到 `setup` 函数中：

```js
// src/components/UserRepositories.vue `setup` function
import {fetchUserRepositories} from '@/api/repositories'
import {ref, onMounted} from 'vue'

// 在我们的组件中
setup(props)
{
    const repositories = ref([])
    const getUserRepositories = async () => {
        repositories.value = await fetchUserRepositories(props.user)
    }

    onMounted(getUserRepositories) // 在 `mounted` 时调用 `getUserRepositories`

    return {
        repositories,
        getUserRepositories
    }
}
```

现在我们需要对 `user` prop 的变化做出反应。为此，我们将使用独立的 `watch` 函数。

### `watch` 响应式更改

就像我们在组件中使用 `watch` 选项并在 `user` property 上设置侦听器一样，我们也可以使用从 Vue 导入的 `watch` 函数执行相同的操作。它接受 3 个参数：

- 一个想要侦听的**响应式引用**或 getter 函数
- 一个回调
- 可选的配置选项

**下面让我们快速了解一下它是如何工作的**

```js
import {ref, watch} from 'vue'

const counter = ref(0)
watch(counter, (newValue, oldValue) => {
    console.log('The new counter value is: ' + counter.value)
})
```

每当 `counter` 被修改时，例如 `counter.value=5`，侦听将触发并执行回调 (第二个参数)，在本例中，它将把 `'The new counter value is:5'` 记录到控制台中。

**以下是等效的选项式 API：**

```js
export default {
    data() {
        return {counter: 0}
    }, watch: {
        counter(newValue, oldValue) {
            console.log('The new counter value is: ' + this.counter)
        }
    }
}
```

有关 `watch` 的详细信息，请参阅我们的[深入指南](https://v3.cn.vuejs.org/guide/reactivity-computed-watchers.html#watch)。

**现在我们将其应用到我们的示例中：**

```js
// src/components/UserRepositories.vue `setup` functionimport { fetchUserRepositories } from '@/api/repositories'import { ref, onMounted, watch, toRefs } from 'vue'// 在我们组件中setup (props) {  // 使用 `toRefs` 创建对prop的 `user` property 的响应式引用  const { user } = toRefs(props)  const repositories = ref([])  const getUserRepositories = async () => {    // 更新 `prop.user` 到 `user.value` 访问引用值    repositories.value = await fetchUserRepositories(user.value)  }  onMounted(getUserRepositories)  // 在 user prop 的响应式引用上设置一个侦听器  watch(user, getUserRepositories)  return {    repositories,    getUserRepositories  }}
```

你可能已经注意到在我们的 `setup` 的顶部使用了 `toRefs`。这是为了确保我们的侦听器能够根据 `user` prop 的变化做出反应。

有了这些变化，我们就把第一个逻辑关注点移到了一个地方。我们现在可以对第二个关注点执行相同的操作——基于 `searchQuery` 进行过滤，这次是使用计算属性。

### 独立的 `computed` 属性

与 `ref` 和 `watch` 类似，也可以使用从 Vue 导入的 `computed` 函数在 Vue 组件外部创建计算属性。让我们回到 counter 的例子：

```js
import {ref, computed} from 'vue'

const counter = ref(0)
const twiceTheCounter = computed(() => counter.value * 2)
counter.value++
console.log(counter.value) // 1console.log(twiceTheCounter.value) // 2
```

这里我们给 `computed` 函数传递了第一个参数，它是一个类似 getter 的回调函数，输出的是一个*只读*的**响应式引用**。为了访问新创建的计算变量的 **value**，我们需要像 `ref` 一样使用 `.value`
property。

让我们将搜索功能移到 `setup` 中：

```js
// src/components/UserRepositories.vue `setup` functionimport { fetchUserRepositories } from '@/api/repositories'import { ref, onMounted, watch, toRefs, computed } from 'vue'// 在我们的组件中setup (props) {  // 使用 `toRefs` 创建对 props 中的 `user` property 的响应式引用  const { user } = toRefs(props)  const repositories = ref([])  const getUserRepositories = async () => {    // 更新 `props.user ` 到 `user.value` 访问引用值    repositories.value = await fetchUserRepositories(user.value)  }  onMounted(getUserRepositories)  // 在 user prop 的响应式引用上设置一个侦听器  watch(user, getUserRepositories)  const searchQuery = ref('')  const repositoriesMatchingSearchQuery = computed(() => {    return repositories.value.filter(      repository => repository.name.includes(searchQuery.value)    )  })  return {    repositories,    getUserRepositories,    searchQuery,    repositoriesMatchingSearchQuery  }}
```

对于其他的**逻辑关注点**我们也可以这样做，但是你可能已经在问这个问题了——*这不就是把代码移到 `setup` 选项并使它变得非常大吗*？嗯，确实是这样的。这就是为什么我们要在继续其他任务之前，我们首先要将上述代码提取到一个独立的**
组合式函数**中。让我们从创建 `useUserRepositories` 函数开始：

```js
// src/composables/useUserRepositories.jsimport { fetchUserRepositories } from '@/api/repositories'import { ref, onMounted, watch } from 'vue'export default function useUserRepositories(user) {  const repositories = ref([])  const getUserRepositories = async () => {    repositories.value = await fetchUserRepositories(user.value)  }  onMounted(getUserRepositories)  watch(user, getUserRepositories)  return {    repositories,    getUserRepositories  }}
```

然后是搜索功能：

```js
// src/composables/useRepositoryNameSearch.jsimport { ref, computed } from 'vue'export default function useRepositoryNameSearch(repositories) {  const searchQuery = ref('')  const repositoriesMatchingSearchQuery = computed(() => {    return repositories.value.filter(repository => {      return repository.name.includes(searchQuery.value)    })  })  return {    searchQuery,    repositoriesMatchingSearchQuery  }}
```

**现在我们有了两个单独的功能模块，接下来就可以开始在组件中使用它们了。以下是如何做到这一点：**

```js
// src/components/UserRepositories.vueimport useUserRepositories from '@/composables/useUserRepositories'import useRepositoryNameSearch from '@/composables/useRepositoryNameSearch'import { toRefs } from 'vue'export default {  components: { RepositoriesFilters, RepositoriesSortBy, RepositoriesList },  props: {    user: {      type: String,      required: true    }  },  setup (props) {    const { user } = toRefs(props)    const { repositories, getUserRepositories } = useUserRepositories(user)    const {      searchQuery,      repositoriesMatchingSearchQuery    } = useRepositoryNameSearch(repositories)    return {      // 因为我们并不关心未经过滤的仓库      // 我们可以在 `repositories` 名称下暴露过滤后的结果      repositories: repositoriesMatchingSearchQuery,      getUserRepositories,      searchQuery,    }  },  data () {    return {      filters: { ... }, // 3    }  },  computed: {    filteredRepositories () { ... }, // 3  },  methods: {    updateFilters () { ... }, // 3  }}
```

你可能已经知道了其中的奥妙，所以让我们跳到最后，迁移剩余的过滤功能。我们不需要深入了解实现细节，因为这并不是本指南的重点。

```js
// src/components/UserRepositories.vueimport { toRefs } from 'vue'import useUserRepositories from '@/composables/useUserRepositories'import useRepositoryNameSearch from '@/composables/useRepositoryNameSearch'import useRepositoryFilters from '@/composables/useRepositoryFilters'export default {  components: { RepositoriesFilters, RepositoriesSortBy, RepositoriesList },  props: {    user: {      type: String,      required: true    }  },  setup(props) {    const { user } = toRefs(props)    const { repositories, getUserRepositories } = useUserRepositories(user)    const {      searchQuery,      repositoriesMatchingSearchQuery    } = useRepositoryNameSearch(repositories)    const {      filters,      updateFilters,      filteredRepositories    } = useRepositoryFilters(repositoriesMatchingSearchQuery)    return {      // 因为我们并不关心未经过滤的仓库      // 我们可以在 `repositories` 名称下暴露过滤后的结果      repositories: filteredRepositories,      getUserRepositories,      searchQuery,      filters,      updateFilters    }  }}
```

我们完成了！

请记住，我们只触及了组合式 API 的表面以及它允许我们做什么。要了解更多信息，请参阅深入指南。

### `setup`

一个组件选项，在组件被创建**之前**，`props` 被解析之后执行。它是`组合式 API 的入口`。

- **入参：**
	
	- `{Data} props`
	- `{SetupContext} context`
	
	与使用选项式 API 时的 `this.$props` 类似，该 `props` 对象将仅包含显性声明的 prop。并且，所有声明了的 prop，不管父组件是否向其传递了，都将出现在 `props` 对象中。其中未被传入的可选的
	prop 的值会是 `undefined`。
	
	如果需要检测一个可选的 prop 是否未被传递，你可以将其默认值`设置`为一个 `Symbol`：

	```js
  const isAbsent = Symbol()export default {	props: {		foo: { default: isAbsent }	},	setup(props) {		if (props.foo === isAbsent) {			// foo 没有被传入。		}	}}
  ```

- **类型声明**：

	```ts
  interface Data {	[key: string]: unknown}interface SetupContext {	attrs: Data	slots: Slots	emit: (event: string, ...args: unknown[]) => void}function setup(props: Data, context: SetupContext): Data
  ```

	> 若要对传递给 `setup()` 的参数进行类型推断，你需要使用 [defineComponent](https://v3.cn.vuejs.org/api/global-api.html#definecomponent)。

- **示例：**

	使用模板：

	```vue
  <!-- MyBook.vue --><template>	<div>{{ readersNumber }} {{ book.title }}</div></template><script>	import { ref, reactive } from 'vue'	export default {		setup() {			const readersNumber = ref(0)			const book = reactive({ title: 'Vue 3 Guide' })			// 暴露给模板			return {				readersNumber,				book			}		}	}</script>
  ```

	使用渲染函数：

	```js
  // MyBook.vueimport { h, ref, reactive } from 'vue'export default {	setup() {		const readersNumber = ref(0)		const book = reactive({ title: 'Vue 3 Guide' })		// 请注意，我们需要在这里显式地暴露ref值		return () => h('div', [readersNumber.value, book.title])	}}
  ```

## ref，reactive 响应式引用的用法和原理

> 响应式原理 通过 `proxy` 对数据进行封装，当数据变化时，触发模版等内容的更新

### ref 响应式引用的用法和原理

> ref 处理基础类型的数据 `字符串 数字 等`

> 通过 `ref` 使用  ` proxy` ,将 'dell' 变成 `proxy({value: 'dell'}) `这样的一个响应式引用
>
> `  let name = ref('dell');`

```js
  const app = Vue.createApp({
    template: `    // 模板中 会自动转化 name相当于name.value      <div>{{name}}</div>    `,
    setup(props, context) {
        const {ref} = Vue;      // proxy , 'dell' 变成 proxy({value: 'dell'}) 这样的一个响应式引用      let name = ref('dell');      setTimeout(() => {        name.value = 'lee'      }, 2000)      return { name }    }  });
```

> 注意 改变的是 `xxx.value`

### reactive 响应式引用的用法和原理

> reactive 处理非基础类型的数 比如`数组 对象`

> `   let nameObj = reactive({ name: 'kelo' });`

```js
  const app = Vue.createApp({
    template: `      <div>{{nameObj.name}}</div>    `, setup(props, context) {      /* reactive */
        const {reactive} = Vue;      // proxy , 'dell' 变成 proxy({value: 'dell'}) 这样的一个响应式引用      let nameObj = reactive({ name: 'kelo' });      setTimeout(() => {        nameObj.name = 'lee'      }, 2000)      return { nameObj }    }
```

### readonly 对响应式内容进行限制

![image-20210818110609941](https://gitee.com/sheep101/typora-img-save/raw/master/img/image-20210818110609941.png)

```js
    setup(props, context)
{
    const {reactive, readonly} = Vue;
    let nameObj = reactive({name: 'kelo'});
    let namecopy = readonly(nameObj)
    setTimeout(() => {
        nameObj.name = 'lee'
        namecopy.name = 231
    }, 2000)
    return {nameObj, namecopy}
}
```

### 解构 toRefs

在reactive的基础上直接解构

nameObj 是响应式的对象 会自动变换 但

name 是值 不具有响应式 不会变化

```js
  const app = Vue.createApp({
    template: `      <div>{{name}}</div>    `, setup(props, context) {      /* reactive */
        const {reactive} = Vue;      // proxy , 'dell' 变成 proxy({value: 'dell'}) 这样的一个响应式引用      let nameObj = reactive({ name: 'kelo' });      setTimeout(() => {        nameObj.name = 'lee'      }, 2000)        const {name} = nameObj      return { name }    }
```

> toRefs 原理： 调用 proxy , 将原本的 `proxy({ name: 'dell'})` 变成 `{name:proxy({ value: 'dell'})}` 这样的一个响应式引用

```js
    setup(props, context)
{
    const {reactive, toRefs} = Vue;
    const nameObj = reactive({name: 'dell', age: 28});
    setTimeout(() => {
        nameObj.name = 'lee'
    }, 2000)      // toRefs proxy({ name: 'dell', age: 28}), {       //  name: proxy({ value: 'dell'}),      //  age: proxy({value: 28})      // }      const { name, age } = toRefs(nameObj);      return { name }    }
```

```js
      const {name, age} = toRefs(nameObj);
```

```js
      toRefs
proxy({name: 'dell', age: 28}), {name: proxy({value: 'dell'}), age: proxy({value: 28})}
```

## toRef 以及 context 参数

### toRef

> toRefs 解构 但是对于响应式 data 中没有定义的元素 并不能设默认值 还会报错
>
> toRef 很好解决了这个问题

对 data 进行解构 如果没有 age 则默认添加一个 age 属性，并具备响应特性

`const age = toRef(data,'age)`

```js
  const app = Vue.createApp({
    template: `      <div>{{age}}</div>    `, setup(props, context) {      /* reactive */
        const {reactive} = Vue;
        let data = reactive({name: 'kelo'});
        let age = toRef(data, age)
        setTimeout(() => {
            age.value = 20
        }, 2000)
        return {age}
    }
```

### context

- attrs
- slots
- emit

#### attrs None-props 父组件传过来的 子组件在props中未接受的

```js
  const app = Vue.createApp({
    methods: {
        handleChange() {
            alert('change');
        }
    }, template: `<child @change="handleChange" param='params'>parent</child>`,
});
app.component('child', {
    template: '<div @click="handleClick">123123</div>', setup(props, context) {
        const {h} = Vue;
        const {attrs} = context;
        console.log(attrs);
    }
})
```

![image-20210818113404813](https://gitee.com/sheep101/typora-img-save/raw/master/img/image-20210818113404813.png)

#### slots 插槽 使用h函数将插槽内容回显

```js
  const app = Vue.createApp({
    methods: {
        handleChange() {
            alert('change');
        }
    }, template: `<child @change="handleChange">parent</child>`,
});
app.component('child', {
    template: '<div @click="handleClick">123123</div>', setup(props, context) {
        const {h} = Vue;
        const {attrs, slots, emit} = context;       // slots 插槽 使用h函数将插槽内容回显      return ()=>h('div',{},slots.default())    }  })
```

![image-20210818113229692](https://gitee.com/sheep101/typora-img-save/raw/master/img/image-20210818113229692.png)

#### emit

emit(‘change’) ---> @change—–>handleChnage()

```js
  const app = Vue.createApp({
    methods: {
        handleChange() {
            alert('change');
        }
    }, template: `<child @change="handleChange" param='params'>parent</child>`,
});
app.component('child', {
    template: '<div @click="handleClick">123123</div>', setup(props, context) {
        const {h} = Vue;
        const {attrs, slots, emit} = context;

        function handleClick() {
            emit('change');
        }

        return {handleClick}
    }
})
```

## 使用 Composition API 开发TodoList

### 关于 list 操作的内容进行了封装

```js
  const listRelativeEffect = () => {
    const {reactive} = Vue    // 列表    const list = reactive([])    // 提交    const addItemToList = (item) => {      list.push(item)    }    return { list, addItemToList }  }
```

### 关于 inputValue 操作的内容进行了封装

```js
  const inputRelativeEffect = () => {
    const {ref} = Vue    // 响应式数据 双向绑定 v-model    const inputValue = ref('')    const handleInputValueChange = (e) => {      inputValue.value = e.target.value    }    return { inputValue, handleInputValueChange }  }
```

### 流程调度中转

```js
  const app = Vue.createApp({setup() {       // 流程调度中转      const { list, addItemToList } = listRelativeEffect()      const { inputValue, handleInputValueChange } = inputRelativeEffect()      return {        inputValue,        handleInputValueChange,        list,        addItemToList      }    },    template: `      <div>        <div>          <input :value="inputValue" @input="handleInputValueChange" />          <button @click="() => addItemToList(inputValue)">提交</button>        </div>        <ul>          <li v-for="(item, index) in list" :key="index">{{item}}</li>        </ul>      </div>    `,  });
```

## computed方法生成计算属性

### 基本

![1-5](https://gitee.com/sheep101/typora-img-save/raw/master/img/1-5.gif)

- const { ref, computed } = Vue;
- const countAddFive = computed(() => { return count.value + 5 })

```js
  const app = Vue.createApp({
    setup() {
        const {ref, computed} = Vue;
        const count = ref(0);
        const handleClick = () => {
            count.value += 1;
        }      // 简单版      const countAddFive = computed(() => {        return count.value + 5      })      return { count, countAddFive, handleClick }    },    template: `      <div>        <span @click="handleClick">{{count}}</span> -- {{countAddFive}}      </div>    `,  });
```

### 对象方式

![105](https://gitee.com/sheep101/typora-img-save/raw/master/img/105.gif)

```js
  const app = Vue.createApp({
    setup() {
        const {reactive, computed} = Vue;
        const countObj = reactive({count: 0});
        const handleClick = () => {
            countObj.count += 1;
        }
        let countAddFive = computed({
            get: () => {
                return countObj.count + 5;
            },        // 获取参数并修改        set: (param) => {          countObj.count = param - 5;        }      })      // 3s后去修改      setTimeout(() => {        countAddFive.value = 10;      }, 1000)      return { countObj, countAddFive, handleClick }    },    template: `      <div>        <span @click="handleClick">{{countObj.count}}</span> -- {{countAddFive}}      </div>    `,  });
```

## watch 和 watchEffect 的使用和差异性

### watch

- 具备一定的惰性 lazy 首次加载的时候不执行 只有你改变才执行

> 改变惰性 变成非惰性

```js
      watch(name, (currentValue, preValue) => {
    console.log(currentValue, preValue);
}, {immediate: true})
```

- 参数可以拿到原始和当前值
- 可以侦听多个数据的变化，用一个侦听器承载

![image-20210818153541218](https://gitee.com/sheep101/typora-img-save/raw/master/img/image-20210818153541218.png)

```js
  const app = Vue.createApp({
    setup() {
        const {ref, reactive, watch, watchEffect, toRefs} = Vue;      // 具备一定的惰性 lazy 首次加载的时候不执行 只有你改变才执行      // 参数可以拿到原始和当前值      const name = ref('kelo')      watch(name, (currentValue, preValue) => {        console.log(currentValue, preValue);      })      return { name }    },    template: `      <div>        <div>          Name: <input v-model="name">         </div>        <div>          Name is {{name}}        </div>      </div>    `,  });
```

> 当`监听reactive`的时候 要变成函数 watch(`()=>nameObj.name,`(cur,per)=>{…})

```js
  const app = Vue.createApp({
    setup() {
        const {ref, reactive, watch, watchEffect, toRefs} = Vue;      // 监听reactive的时候 watch监听函数      const nameObj = reactive({        name: 'kelo'      })      // watch(nameObj.name,(cur,pre)=>{... }) 会报错      watch(()=>nameObj.name,(cur,pre)=>{        console.log(cur,pre);       })       const {name} = toRefs(nameObj)      return { name }    },
```

> 监听多个参数 watch 就传 数组 （ [当前]，[之前] ）=>{ }

```js
watch([() => xxx, () => xxx], ([oneCur, twoCur], [onePre, twoPre]) => {
    console.log(oneCur, onePre, twoCur, twoPre)
})
```

```js
  const app = Vue.createApp({
    setup() {
        const {ref, reactive, watch, watchEffect, toRefs} = Vue;      // 可以侦听多个数据的变化，用一个侦听器承载      const nameObj = reactive({        name: 'dell', englishName: 'lee'      })      watch([() => nameObj.name, () => nameObj.englishName], ([curName, curEng], [prevName, preEng]) => {        console.log('watch', curName, prevName, '---', curEng, preEng);      }, { immediate: true })      const { name, englishName } = toRefs(nameObj);      return { name, englishName }    },    template: `      <div>        <div>          Name: <input v-model="name">         </div>        <div>          Name is {{name}}        </div>        <div>         EnglishName: <input v-model="englishName">         </div>        <div>        EnglishName is {{englishName}}        </div>      </div>    `,  });
```

### watchEffect

> watchEffect 侦听器，偏向于 effect

- 立即执行，没有惰性 immediate
- 不需要传递你要侦听的内容，`自动会感知代码依赖`
- 不需要传递很多参数，只要传递一个毁掉函数
- 不能获取之前数据的值

```js
const {watchEffect} = VuewatchEffect(() => {
    console.log(nameObj.name)
})
```

### 停止监听 stop

```js
      const stop = watchEffect(() => {
    console.log(nameObj.name);
    console.log(nameObj.englishName);
    setTimeout(() => {
        stop();
    }, 5000)
})
```

## 生命周期函数的新写法

- beforeMount => onBeforeMount
- mounted => onMounted
- beforeUpdate => onBeforeUpdate
- updated =>onUpdated
- beforeUnmount => onBeforeUnmount
- unmouted => onUnmounted

不能使用

- beforeCreate
- created

在setup中有新的

- onRenderTracked 每次渲染后重新收集响应式依赖
- onRenderTriggered 每次触发页面重新渲染时自动执行

```js
  const app = Vue.createApp({    // beforeMount => onBeforeMount    // mounted => onMounted    // beforeUpdate => onBeforeUpdate    // beforeUnmount => onBeforeUnmount    // unmouted => onUnmounted    setup() {      const {        ref, onBeforeMount, onMounted, onBeforeUpdate, onUpdated,        onRenderTracked, onRenderTriggered      } = Vue;      const name = ref('dell')      onBeforeMount(() => {        console.log('onBeforeMount')      })      onMounted(() => {        console.log('onMounted')      })      onBeforeUpdate(() => {        console.log('onBeforeUpdate')      })      onUpdated(() => {        console.log('onUpdated')      })      // 每次渲染后重新收集响应式依赖      onRenderTracked(() => {        console.log('onRenderTracked')      })      // 每次触发页面重新渲染时自动执行      onRenderTriggered(() => {        console.log('onRenderTriggered')      })      const handleClick = () => {        name.value = 'lee'      }      return { name, handleClick }    },    template: `      <div @click="handleClick">        {{name}}      </div>    `,  });
```

## Provide,Inject,模版 Ref 的用法

### provide和inject

```js
  const app = Vue.createApp({
    setup() {
        const {provide} = Vue
        provide('name', 'kelo')//key,value    },    template: `    <div>      <child/>      </div>`  })
```

```js
  app.component('child', {
    setup() {
        const {inject} = Vue
        const name = inject('name', 'hello')//其中hello表示为默认值      return{name}    },    template:`    <div>{{name}}</div>`  })
```

#### 应用 子组件改变父组件的值

- 父组件 provide 一个 changeName的方法
- 子组件 inject 父组件的changeName 方法
- 父组件再加上 readOnly 属性 约束单项数据的概念 `readOnly(name)`

```js
  const app = Vue.createApp({
    setup() {
        const {provide, ref，readOnly
    }
        = Vue
        const name = ref('kelo')
        provide('name', readOnly(name))//key,value      const changeName = (item)=>{        name.value= item      }      provide('changeName',changeName)    },    template: `    <div>      <child/>      </div>`  })
```

```js
  app.component('child', {
    setup() {
        const {inject} = Vue
        const name = inject('name', 'hello')//其中hello表示为默认值      const changeName = inject('changeName')      const handleClick = ()=>{        changeName('可乐')      }      return{name,handleClick}    },    template:`    <div>{{name}}      <div @click='handleClick'>改变名字</div>      </div>`  })
```

### ref 获取dom节点

> 基础用法

![image-20210818162810869](https://gitee.com/sheep101/typora-img-save/raw/master/img/image-20210818162810869.png)

```js
  const app = Vue.createApp({
    setup() {
        const {ref, onMounted} = Vue
        const hello = ref(null)//首先hello 要和获取节点的名称一致      onMounted(() => {        console.log(hello.value);      })      return{ hello}    },    template:`    <div ref = 'hello'>hello world</div>    `  })
```

# 第7章 Vue 项目开发配套工具讲解

在开发真实大型项目之前，本章中，将会给大家讲解 Vue 配套的一些开发工具的使用方式，包括 VueCLI 脚手架工具的使用，Axios 请求发送库的使用，Vue-Router 路由概念以及 VueX
数据状态管理工具等。通过本章的学习，针对复杂Vue 工程的开发的最后一些难题，大家就可以轻松解决掉啦。...

## VueCLI 的使用和单文件组件

- 安装node
- 安装vue-cli
- 4.5.9版本

`src/main.js`入口文件

```js
import {createApp} from 'vue'
import App from './App.vue'

createApp(App).mount('#app')

```

`src/app.vue`

```vue

<template>
  <div>
    <img alt="Vue logo" src="./assets/logo.png"/>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// 单文件组件
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

```

## 使用单文件组件编写 TodoList

```vue

<template>
  <div>
    <input v-model="inputValue"/>
    <button @click="handleClick">提交</button>
    <div>
      <ul>
        <li v-for="item in list" :key="item">{{item}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import {reactive, ref} from 'vue'

export default {
  name: 'TodoList',
  setup() {
    // 数组
    const list = reactive([])
    const inputValue = ref('')
    const handleClick = () => {
      list.push(inputValue.value)
      inputValue.value = ''
    }
    return {list, inputValue, handleClick}
  }
}
</script>


```

## Vue-Router 路由的理解和使用

`src\router\index.js`

```js
import {createRouter, createWebHashHistory} from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/about',
        name: 'About',
        // 异步加载路由
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router

```

`src/app.vue`

```vue

<template>
  <div id="nav">
    <!-- router-link 是跳转路由的标签 -->
    <router-link to="/">Home</router-link>
    |
    <router-link to="/about">About</router-link>
    |
    <router-link to="/login">Login</router-link>
  </div>
  <!-- router-view 负责展示当前路由对应的组件内容 -->
  <router-view/>
</template>

<style></style>

```

## VueX 的语法详解

- VueX 数据管理框架
- VueX 创建了一个全局唯一的仓库，用来存放全局的数据

`main.js`

```js
import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

createApp(App).use(store).use(router).mount('#app')

```

`src\store\index.js`

```js
import {createStore} from 'vuex'
// VueX 数据管理框架
// VueX 创建了一个全局唯一的仓库，用来存放全局的数据
export default createStore({
    state: {name: 'dell'},
    // mutation 里面只允许写同步代码，不允许写异步代码
    // commit 和 mutation 做关联
    mutations: {
        change(state, str) {
            state.name = str;
        }
    },
    // dispatch 和 actions 做关联
    actions: {
        // change(store, str) {
        //   setTimeout(() => {
        //     store.commit('change', str)
        //   }, 2000)
        // }
    }
})

```

### 修改vuex 中数据

1. dispatch 方法，派发一个 action，名字叫做change

2. 感知到 change 这个action，执行store 中 actions 下面的 change 方法

3. commit 提交一个叫做 change 的数据改变

4. mutation 感知到提交的change改变，执行 change 方法改变数据

## CompositionAPI 中如何使用 VueX

### useStore

```
import { useStore } from 'vuex';
```

```
 const store = useStore();
```

```js
        //同步修改        store.commit('changeName')
```

```js
        //异步修改      store.dispatch('getData')
```

```vue

<template>
  <div class="about"><h1 @click="handleClick">This is an about page</h1>
    <h1>{{name}}</h1></div>
</template>
<script>import {toRefs} from 'vue';
import {useStore} from 'vuex';

export default {
  name: 'Home',
  setup() {      // 获取store    const store = useStore();      //解构    const { name } = toRefs(store.state);    const handleClick = () => {        //同步修改        store.commit('changeName')        //异步修改      store.dispatch('getData')    }    return { name, handleClick }  }}</script>·
```

### store

```js
import {createStore} from 'vuex'

export default createStore({
    state: {name: 'dell'}, mutations: {
        changeName(state, str) {
            state.name = str;
        }
    }, actions: {
        getData(store) {
            setTimeout(() => {
                store.commit('changeName', 'hello')
            }, 2000)
        }
    }
})
```

## 使用 axios 发送ajax 请求

- 安装 axios 用来发送请求

### 组件里触发 vuex

```vue

<template>
  <div class="about"><h1 @click="handleClick">This is an about page</h1>
    <h1>{{name}}</h1></div>
</template>
<script>// https://www.fastmock.site/mock/ae8e9031947a302fed5f92425995aa19/jd/api/user/registerimport { toRefs } from 'vue';import { useStore } from 'vuex';export default {  name: 'Home',  setup() {    const store = useStore();    const { name } = toRefs(store.state);    const handleClick = () => {      store.dispatch('getData')    }    return { name, handleClick }  }}</script>·
```

### store 里 触发axios

```js
import {createStore} from 'vuex'
import axios from 'axios';

export default createStore({
    state: {name: 'dell'}, mutations: {
        changeName(state, str) {
            state.name = str;
        }
    }, actions: {
        getData(store) {
            axios.post('https://www.fastmock.site/mock/ae8e9031947a302fed5f92425995aa19/jd/api/user/register').then((response) => {
                const msg = response.data.message;
                store.commit('changeName', msg)
            })
        }
    }
})
```

# 第8章 “京东到家”项目首页开发

本章中，将会带大家通过首页布局的开发，了解 Vue 基础语法在实战中的使用方法，过程中帮助大家对组件化，组件设计，SCSS 样式编写技巧，BEM CSS
设计模式有更深入的理解。通过本章学习，大家不仅可以完成页面的布局开发，还能学习到很多代码设计的技巧。

## 工程初始化

- vue3
- sass
- vuex
- eslint stand

## 工程目录代码简介及整理

- main 入口文件
- store vuex
- router

![image-20210818192712618](https://gitee.com/sheep101/typora-img-save/raw/master/img/image-20210818192712618.png)

## 基础样式集成及开发模拟器的使用

- normalize.css 为了使各个浏览器劲量一致

`cnpm install normalize.css --save`

### css 样式重置

`mian.js`

```js
import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css'
import './style/base.scss'

createApp(App).use(store).use(router).mount('#app')

```

`src/stylr/base.css`

```css
html {
    font-size: 100px;
}

/
/
1
rem

=
html fontsize
```

## flex + iconfont 完成首页 docker 样式编写

![image-20210818195056500](https://gitee.com/sheep101/typora-img-save/raw/master/img/image-20210818195056500.png)

### 引入 阿里图标库的字体

`style/iconfont.css`

```css
@font-face {
    font-family: "iconfont";
    src: url('//at.alicdn.com/t/font_1906953_0m9tbudwu0jc.eot');
    src: url('//at.alicdn.com/t/font_1906953_0m9tbudwu0jc.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_1906953_0m9tbudwu0jc.woff2') format('woff2'),
    url('//at.alicdn.com/t/font_1906953_0m9tbudwu0jc.woff') format('woff'),
    url('//at.alicdn.com/t/font_1906953_0m9tbudwu0jc.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_1906953_0m9tbudwu0jc.svg#iconfont') format('svg');
}

.iconfont {
    font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
```

`index.scss`

```scss
@import './base.scss';
@import './iconfont.css';
```

`main.js`

```js
import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css'
import './style/base.scss'
import './style/index.scss'

createApp(App).use(store).use(router).mount('#app')

```

### 首页样式编写

`app.vue`

```vue

<template>
  <div class="docker">
    <div class="docker__item docker__item--active">
      <div class="iconfont">&#xe6f3;</div>
      <div class="docker__title">首页</div>
    </div>
    <div class="docker__item">
      <div class="iconfont">&#xe7e5;</div>
      <div class="docker__title">购物车</div>
    </div>
    <div class="docker__item">
      <div class="iconfont">&#xe61e;</div>
      <div class="docker__title">订单</div>
    </div>
    <div class="docker__item">
      <div class="iconfont">&#xe660;</div>
      <div class="docker__title">我的</div>
    </div>
  </div>
</template>
```

```scss
.docker {
  // flex 布局
  display: flex;
  // 怪异盒子
  box-sizing: border-box;
  // 绝对定位
  position: absolute;
  padding: 0 .18rem;
  left: 0;
  bottom: 0;
  width: 100%;
  height: .49rem;
  // 上边框
  border-top: 1px solid #F1F1F1;
  // 孩子
  &__item {
    // 均匀分布
    flex: 1;
    // 文字居中
    text-align: center;
    // 图标设置
    .iconfont {
      margin: .07rem 0 .02rem 0;
      font-size: .18rem;
    }

    // 选中项
    &--active {
      color: #1FA4FC;
    }
  }

  // 字体设置
  &__title {
    font-size: 20px;
    // 缩放
    transform: scale(.5, .5);
    // 缩放中心点
    transform-origin: center top;
  }
}
```

> BEM
>
> block_element Modifier
>
> docker__item--active
>
> docker 块区域
>
> item是docker底下的元素 用 `_`
>
> active是状态 用`--`

## 使用Scss 组织地址区域布局

### 添加新的icon 更新style中的地址

`style/iconfont.css`

```css
@font-face {
    font-family: 'iconfont';  /* project id 1906953 */
    src: url('//at.alicdn.com/t/font_1906953_tidbrplju9.eot');
    src: url('//at.alicdn.com/t/font_1906953_tidbrplju9.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_1906953_tidbrplju9.woff2') format('woff2'),
    url('//at.alicdn.com/t/font_1906953_tidbrplju9.woff') format('woff'),
    url('//at.alicdn.com/t/font_1906953_tidbrplju9.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_1906953_tidbrplju9.svg#iconfont') format('svg');
}

.iconfont {
    font-family: "iconfont" !important;
    font-size: .16rem;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
```

### 内容的主色

`style/viriables.scss`

```scss
$content-fontcolor: #333;
```

使用

```css
@import './style/viriables.scss';

color:

$
content-fontcolor

;
```

### 定位栏

```html

<div>
    <div class="wrapper">
        <div class="position"><span class="iconfont position__icon">&#xe619;</span> 北京理工大学国防科技园2号楼10层 <span
                class="iconfont position_notice">&#xe60b;</span></div>
    </div>
```

### 样式

![image-20210818201618264](https://gitee.com/sheep101/typora-img-save/raw/master/img/image-20210818201618264.png)

```scss
@import './style/viriables.scss';
@import './style/mixins.scss';
```

```scss
// 地址栏区域.wrapper {  position: absolute;  left: 0;  top: 0;  bottom: 0.5rem; //扣去购物车标准那一栏  right: 0;  padding: 0 0.18rem;}
```

```scss
// 内容位置.position {  position: relative;  padding: 0.16rem 0.24rem 0.16rem 0;  line-height: 0.22rem; //高度  font-size: 0.16rem; //字体大小  @include ellipsis; //混入 内容溢出处理  // 位置坐标icon  .position__icon {    position: relative;    top: 0.01rem;    font-size: 0.2rem;  }  // 闹钟坐标icon  .position_notice {    position: absolute;    right: 0;    top: 0.17rem;    font-size: 0.2rem;  }  // 主体颜色  color: $content-fontcolor;}
```

### 混入

```scss
@mixin ellipsis {
  overflow: hidden;

//超出隐藏  white-space: nowrap;//不换行  text-overflow: ellipsis;//超出省略号}
```

## 利用CSS技巧实现搜索区域布局

![image-20210818202626461](https://gitee.com/sheep101/typora-img-save/raw/master/img/image-20210818202626461.png)

### 图标更新

`style/iconfont.css`

```css
@font-face {
    font-family: 'iconfont';  /* project id 1906953 */
    src: url('//at.alicdn.com/t/font_1906953_gwx6b95tmo.eot');
    src: url('//at.alicdn.com/t/font_1906953_gwx6b95tmo.eot?#iefix') format('embedded-opentype'), url('//at.alicdn.com/t/font_1906953_gwx6b95tmo.woff2') format('woff2'), url('//at.alicdn.com/t/font_1906953_gwx6b95tmo.woff') format('woff'), url('//at.alicdn.com/t/font_1906953_gwx6b95tmo.ttf') format('truetype'), url('//at.alicdn.com/t/font_1906953_gwx6b95tmo.svg#iconfont') format('svg');
}

.iconfont {
    font-family: "iconfont" !important;
    font-size: .16rem;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
```

### search 区域

```html

<div>
    <div class="wrapper"> ...
        <div class="search"><span class="iconfont">&#xe62d;</span> <span class="search__text">山姆会员商店优惠商品</span></div>
    </div>
```

![image-20210818202626461](https://gitee.com/sheep101/typora-img-save/raw/master/img/image-20210818202626461.png)

### search样式

```scss
/* 搜索区域 */
.search {
  margin-bottom: 0.12rem;
  line-height: 0.32rem;
  background: #f5f5f5;
  color: #b7b7b7;
  border-radius: 0.16rem;

//圆角  // 搜索图标  .iconfont {    display: inline-block;    padding: 0 0.08rem 0 0.16rem;    font-size: 0.16rem;  }  // 搜索文字  &__text {    display: inline-block;    font-size: 0.14rem;  }}
```

## banner 区域布局

![image-20210818203246443](https://gitee.com/sheep101/typora-img-save/raw/master/img/image-20210818203246443.png)

### banner区域

```html

<div class="wrapper"> ...
    <div class="banner"><img class="banner__img" src="http://www.dell-lee.com/imgs/vue3/banner.jpg"/></div>
</div>
```

### banner样式

```scss
.banner {
  height: 0;
  overflow: hidden;
  padding-bottom: 25.4%;

  &__img {
    width: 100%;
  }
}
```

## 使用 flex布局实现图标列表布局

![image-20210818203627512](https://gitee.com/sheep101/typora-img-save/raw/master/img/image-20210818203627512.png)

### 图标列表布局

```html

<div class="icons">
    <div class="icons__item"><img class="icons__item__img" src="http://www.dell-lee.com/imgs/vue3/超市.png"/>
        <p class="icons__item__desc">超市便利</p></div>
    *10
</div>
<div class="gap"></div>
```

### 图标列表样式

![image-20210818205000752](https://gitee.com/sheep101/typora-img-save/raw/master/img/image-20210818205000752.png)

```scss
/* 图标列表icon */
.icons {
  display: flex;
  flex-wrap: wrap;

//换行  margin-top: .16rem;  // 元素  &__item {    width: 20%;//每行排5个    // 图片    &__img {      display:block;      width: .4rem;      height: .4rem;      margin: 0 auto;    }    // 文字    &__desc {      margin: .06rem 0 .16rem 0;      text-align: center;      color: $content-fontcolor;    }  }}
```

```scss
.gap {
  margin: 0 -.18rem;
  height: .1rem;
  background: $content-bgColor;
}
```

### 抽离白色样式

`viriables`

```scss
$content-fontcolor: #333;
$content-bgColor: #F1F1F1;
```

## 附近商店

### 布局

```html

<div class="nearby"><h3 class="nearby__title">附近店铺</h3>
    <div class="nearby__item"><img src="http://www.dell-lee.com/imgs/vue3/near.png" class="nearby__item__img">
        <div class="nearby__content">
            <div class="nearby__content__title">沃尔玛</div>
            <div class="nearby__content__tags"><span class="nearby__content__tag">月售1万+</span> <span
                    class="nearby__content__tag">月售1万+</span> <span class="nearby__content__tag">月售1万+</span></div>
            <p class="nearby__content__highlight">VIP尊享满89元减4元运费券（每月3张）</p></div>
    </div>
</div>      </div>
```

### 样式

![image-20210818211336207](https://gitee.com/sheep101/typora-img-save/raw/master/img/image-20210818211336207.png)

```scss
.nearby {
  &__title {
    margin: 0.16rem 0 0.02rem 0;
    font-size: 0.18rem;
    font-weight: normal;
    color: $content-fontcolor;
  }

  &__item {
    display: flex;
    padding-top: 0.12rem;

    &__img {
      margin-right: 0.16rem;
      width: 0.56rem;
      height: 0.56rem;
    }
  }

  &__content {
    flex: 1;
    padding-bottom: 0.12rem;
    border-bottom: 1px solid $content-bgColor;

    &__title {
      line-height: 0.22rem;
      font-size: 0.16rem;
      color: $content-fontcolor;
    }

    &__tags {
      margin-top: 0.08rem;
      line-height: 0.18rem;
      font-size: 0.13rem;
      color: $content-fontcolor;
    }

    &__tag {
      margin-right: 0.16rem;
    }

    &__highlight {
      margin: 0.08rem 0 0 0;
      line-height: 0.18rem;
      font-size: 0.13rem;
      color: #e93b3b;
    }
  }
}
```

## 8-9 首页组件的合理拆分

![image-20210819150310133](https://gitee.com/sheep101/typora-img-save/raw/master/img/image-20210819150310133.png)

### App.vue 入口

```vue

<template>
  <Home/>
</template>
<script>import Home from './views/home/Home'

export default {name: 'App', components: {Home}}</script>
```

### Home组件

```vue

<template>
  <div class="wrapper">
    <StaticPart/>
    <Nearby/>
  </div>
  <Docker/>
</template>
<script>import StaticPart from './StaticPart'
import Nearby from './Nearby'
import Docker from './Docker'

export default {name: 'Home', components: {StaticPart, Nearby, Docker}}</script>
<style lang="scss">.wrapper {
  overflow-y: auto;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0.5rem;

//扣去购物车标准那一栏  right: 0;  padding: 0 .18rem .1rem .18rem;}</style>
```

### StaticPart组件

```vue

<template>
  <div class="position"><span class="iconfont position__icon">&#xe619;</span> 北京理工大学国防科技园2号楼10层 <span
      class="iconfont position_notice">&#xe60b;</span></div>
  <div class="search"><span class="iconfont">&#xe62d;</span> <span class="search__text">山姆会员商店优惠商品</span></div>
  <div class="banner"><img class="banner__img" src="http://www.dell-lee.com/imgs/vue3/banner.jpg"/></div>
  <div class="icons">
    <div class="icons__item"><img class="icons__item__img" src="http://www.dell-lee.com/imgs/vue3/超市.png"/>
      <p class="icons__item__desc">超市便利</p></div>
    <div class="icons__item"><img class="icons__item__img" src="http://www.dell-lee.com/imgs/vue3/菜市场.png"/>
      <p class="icons__item__desc">菜市场</p></div>
    <div class="icons__item"><img class="icons__item__img" src="http://www.dell-lee.com/imgs/vue3/水果店.png"/>
      <p class="icons__item__desc">水果店</p></div>
    <div class="icons__item"><img class="icons__item__img" src="http://www.dell-lee.com/imgs/vue3/鲜花.png"/>
      <p class="icons__item__desc">鲜花绿植</p></div>
    <div class="icons__item"><img class="icons__item__img" src="http://www.dell-lee.com/imgs/vue3/医药健康.png"/>
      <p class="icons__item__desc">医药健康</p></div>
    <div class="icons__item"><img class="icons__item__img" src="http://www.dell-lee.com/imgs/vue3/家居.png"/>
      <p class="icons__item__desc">家居时尚</p></div>
    <div class="icons__item"><img class="icons__item__img" src="http://www.dell-lee.com/imgs/vue3/蛋糕.png"/>
      <p class="icons__item__desc">烘培蛋糕</p></div>
    <div class="icons__item"><img class="icons__item__img" src="http://www.dell-lee.com/imgs/vue3/签到.png"/>
      <p class="icons__item__desc">签到</p></div>
    <div class="icons__item"><img class="icons__item__img" src="http://www.dell-lee.com/imgs/vue3/大牌免运.png"/>
      <p class="icons__item__desc">大牌免运</p></div>
    <div class="icons__item"><img class="icons__item__img" src="http://www.dell-lee.com/imgs/vue3/红包.png"/>
      <p class="icons__item__desc">红包套餐</p></div>
  </div>
  <div class="gap"></div>
</template>
```

```vue

<script>export default {name: 'StaticPart'}</script>
```

```vue

<style lang="scss">@import '../../style/viriables.scss';
@import '../../style/mixins.scss'; // 内容位置.position {  position: relative;  padding: 0.16rem 0.24rem 0.16rem 0;  line-height: 0.22rem; //高度  font-size: 0.16rem; //字体大小  @include ellipsis; //混入 内容溢出处理  // 位置坐标icon  .position__icon {    position: relative;    top: 0.01rem;    font-size: 0.2rem;  }  // 闹钟坐标icon  .position_notice {    position: absolute;    right: 0;    top: 0.17rem;    font-size: 0.2rem;  }  // 主体颜色  color: $content-fontcolor;}/* 搜索区域 */.search {  margin-bottom: 0.12rem;  line-height: 0.32rem;  background: #f5f5f5;  color: #b7b7b7;  border-radius: 0.16rem; //圆角  // 搜索图标  .iconfont {    display: inline-block;    padding: 0 0.08rem 0 0.16rem;    font-size: 0.16rem;  }  // 搜索文字  &__text {    display: inline-block;    font-size: 0.14rem;  }}/* banner */.banner {  height: 0;  overflow: hidden;  padding-bottom: 25.4%; //解决抖动 宽/高  &__img {    width: 100%;  }}/* 图标列表icon */.icons {  display: flex;  flex-wrap: wrap; //换行  margin-top: 0.16rem;  // 元素  &__item {    width: 20%; //每行排5个    // 图片    &__img {      display: block;      width: 0.4rem;      height: 0.4rem;      margin: 0 auto;    }    // 文字    &__desc {      margin: 0.06rem 0 0.16rem 0;      text-align: center;      color: $content-fontcolor;    }  }}/* 分隔栏 */.gap {  margin: 0 -0.18rem;  height: 0.1rem;  background: $content-bgColor;}</style>
```

### Nearby组件

```vue

<template>
  <div class="nearby"><h3 class="nearby__title">附近店铺</h3>
    <div class="nearby__item"><img src="http://www.dell-lee.com/imgs/vue3/near.png" class="nearby__item__img">
      <div class="nearby__content">
        <div class="nearby__content__title">沃尔玛</div>
        <div class="nearby__content__tags"><span class="nearby__content__tag">月售1万+</span> <span
            class="nearby__content__tag">月售1万+</span> <span class="nearby__content__tag">月售1万+</span></div>
        <p class="nearby__content__highlight">VIP尊享满89元减4元运费券（每月3张）</p></div>
    </div>
    <div class="nearby__item"><img src="http://www.dell-lee.com/imgs/vue3/near.png" class="nearby__item__img">
      <div class="nearby__content">
        <div class="nearby__content__title">沃尔玛</div>
        <div class="nearby__content__tags"><span class="nearby__content__tag">月售1万+</span> <span
            class="nearby__content__tag">月售1万+</span> <span class="nearby__content__tag">月售1万+</span></div>
        <p class="nearby__content__highlight">VIP尊享满89元减4元运费券（每月3张）</p></div>
    </div>
    <div class="nearby__item"><img src="http://www.dell-lee.com/imgs/vue3/near.png" class="nearby__item__img">
      <div class="nearby__content">
        <div class="nearby__content__title">沃尔玛</div>
        <div class="nearby__content__tags"><span class="nearby__content__tag">月售1万+</span> <span
            class="nearby__content__tag">月售1万+</span> <span class="nearby__content__tag">月售1万+</span></div>
        <p class="nearby__content__highlight">VIP尊享满89元减4元运费券（每月3张）</p></div>
    </div>
    <div class="nearby__item"><img src="http://www.dell-lee.com/imgs/vue3/near.png" class="nearby__item__img">
      <div class="nearby__content">
        <div class="nearby__content__title">沃尔玛</div>
        <div class="nearby__content__tags"><span class="nearby__content__tag">月售1万+</span> <span
            class="nearby__content__tag">月售1万+</span> <span class="nearby__content__tag">月售1万+</span></div>
        <p class="nearby__content__highlight">VIP尊享满89元减4元运费券（每月3张）</p></div>
    </div>
    <div class="nearby__item"><img src="http://www.dell-lee.com/imgs/vue3/near.png" class="nearby__item__img">
      <div class="nearby__content">
        <div class="nearby__content__title">沃尔玛</div>
        <div class="nearby__content__tags"><span class="nearby__content__tag">月售1万+</span> <span
            class="nearby__content__tag">月售1万+</span> <span class="nearby__content__tag">月售1万+</span></div>
        <p class="nearby__content__highlight">VIP尊享满89元减4元运费券（每月3张）</p></div>
    </div>
    <div class="nearby__item"><img src="http://www.dell-lee.com/imgs/vue3/near.png" class="nearby__item__img">
      <div class="nearby__content">
        <div class="nearby__content__title">沃尔玛</div>
        <div class="nearby__content__tags"><span class="nearby__content__tag">月售1万+</span> <span
            class="nearby__content__tag">月售1万+</span> <span class="nearby__content__tag">月售1万+</span></div>
        <p class="nearby__content__highlight">VIP尊享满89元减4元运费券（每月3张）</p></div>
    </div>
  </div>
</template>
```

```vue

<script>export default {name: 'Nearby'}</script>
```

```vue

<style lang="scss">@import '../../style/viriables.scss'; /* 附近店铺 */
.nearby {
  &__title {
    margin: 0.16rem 0 0.02rem 0;
    font-size: 0.18rem;
    font-weight: normal;
    color: $content-fontcolor;
  }

  &__item {
    display: flex;
    padding-top: 0.12rem;

    &__img {
      margin-right: 0.16rem;
      width: 0.56rem;
      height: 0.56rem;
    }
  }

  &__content {
    flex: 1;
    padding-bottom: 0.12rem;
    border-bottom: 1px solid $content-bgColor;

    &__title {
      line-height: 0.22rem;
      font-size: 0.16rem;
      color: $content-fontcolor;
    }

    &__tags {
      margin-top: 0.08rem;
      line-height: 0.18rem;
      font-size: 0.13rem;
      color: $content-fontcolor;
    }

    &__tag {
      margin-right: 0.16rem;
    }

    &__highlight {
      margin: 0.08rem 0 0 0;
      line-height: 0.18rem;
      font-size: 0.13rem;
      color: #e93b3b;
    }
  }
}</style>
```

### Docker组件

```vue

<template>
  <div class="docker">
    <div class="docker__item docker__item--active">
      <div class="iconfont">&#xe6f3;</div>
      <div class="docker__title">首页</div>
    </div>
    <div class="docker__item">
      <div class="iconfont">&#xe7e5;</div>
      <div class="docker__title">购物车</div>
    </div>
    <div class="docker__item">
      <div class="iconfont">&#xe61e;</div>
      <div class="docker__title">订单</div>
    </div>
    <div class="docker__item">
      <div class="iconfont">&#xe660;</div>
      <div class="docker__title">我的</div>
    </div>
  </div>
</template>
<script>export default {name: 'Docker'}</script>
<style lang="scss">@import '../../style/viriables.scss'; /* 底部菜单 */
.docker {

// flex 布局  display: flex;  // 怪异盒子  box-sizing: border-box;  // 绝对定位  position: absolute;  padding: 0 0.18rem;  left: 0;  bottom: 0;  width: 100%;  height: 0.49rem;  // 上边框  border-top: 1px solid #f1f1f1;  color: $content-fontcolor;  // 孩子  &__item {    // 均匀分布    flex: 1;    // 文字居中    text-align: center;    // 图标设置    .iconfont {      margin: 0.07rem 0 0.02rem 0;      font-size: 0.18rem;    }    // 选中项    &--active {      color: #1fa4fc;    }  }  // 字体设置  &__title {    font-size: 0.2rem;    // 缩放    transform: scale(0.5, 0.5);    // 缩放中心点    transform-origin: center top;  }}</style>
```

## 使用v-for, v-html 指令精简页面代码

### 精简docker 组件内容

使用v-for

```vue

<template>
  <div class="docker">
    <div v-for="(item,index) in dockerList" :class="{'docker__item':true, 'docker__item--active':index===0}"
         :key="item.icon">
      <div class="iconfont" v-html="item.icon"/>
      <div class="docker__title">{{item.text}}</div>
    </div>
  </div>
</template>
<script>export default {
  name: 'Docker', setup() {
    const dockerList = [{icon: '&#xe6f3;', text: '首页'}, {icon: '&#xe7e5;', text: '购物车'}, {
      icon: '&#xe61e;',
      text: '订单'
    }, {icon: '&#xe660;', text: '我的'}]
    return {dockerList}
  }
}</script>
```

### 精简NearBy组件

```vue

<template>
  <div class="nearby"><h3 class="nearby__title">附近店铺</h3>
    <div class="nearby__item" v-for="item in nearbyList" :key="item.id"><img :src="item.imgUrl"
                                                                             class="nearby__item__img">
      <div class="nearby__content">
        <div class="nearby__content__title">{{item.title}}</div>
        <div class="nearby__content__tags"><span class="nearby__content__tag"
                                                 v-for="(innerItem, innerIndex) in item.tags" :key="innerIndex">{{innerItem}}</span>
        </div>
        <p class="nearby__content__highlight">{{item.desc}}</p></div>
    </div>
  </div>
</template>
<script>export default {
  name: 'Nearby', setup() {
    const nearbyList = [{
      id: 1,
      imgUrl: 'http://www.dell-lee.com/imgs/vue3/near.png',
      title: '沃尔玛',
      tags: ['月售1万+', '起送¥0', '基础运费¥5'],
      desc: 'VIP尊享满89元减4元运费券（每月3张）'
    }, {
      id: 2,
      imgUrl: 'http://www.dell-lee.com/imgs/vue3/near.png',
      title: '沃尔玛',
      tags: ['月售1万+', '起送¥5', '基础运费¥5'],
      desc: 'VIP尊享满89元减4元运费券（每月3张）'
    }];
    return {nearbyList};
  }
}</script>
```

### 精简StaticPart 组件中icon的内容

```vue

<div class="icons">
<div class="icons__item" v-for="item in iconsList" :key="item.desc"><img class="icons__item__img"
                                                                         :src="`http://www.dell-lee.com/imgs/vue3/${item.imgName}.png`"/>
  <p class="icons__item__desc">{{item.desc}}</p></div>
</div>
```

```js
  setup()
{
    const iconsList = [{imgName: "超市", desc: "超市便利"}, {imgName: "菜市场", desc: "菜市场"}, {
        imgName: "水果店",
        desc: "水果店"
    }, {imgName: "鲜花", desc: "鲜花绿植"}, {imgName: "医药健康", desc: "医药健康"}, {imgName: "家居", desc: "家居时尚"}, {
        imgName: "蛋糕",
        desc: "烘培蛋糕"
    }, {imgName: "签到", desc: "签到"}, {imgName: "大牌免运", desc: "大牌免运"}, {imgName: "红包", desc: "红包套餐"},]
    return {iconsList}
}
```

## CSS 作用域约束以及 Vue 开发者工具的安装使用

### css作用域约束

`<style lang="scss" >`添加scoped

`<style lang="scss" scoped>`

### vue 开发者工具

![image-20210819154117999](https://gitee.com/sheep101/typora-img-save/raw/master/img/image-20210819154117999.png)

# 第9章 登陆功能开发

本章中，将会通过登录注册功能的实现，带大家理解路由守卫和更多高级路由使用技巧，帮助大家理解前端登陆鉴权的基本逻辑。同时带领大家深入学习如何Composition API
的新语法上，合理的进行逻辑拆分，增加项目的可维护性，提高大家的工程能力。

![image-20210819155349792](https://gitee.com/sheep101/typora-img-save/raw/master/img/image-20210819155349792.png)

## 登陆页面布局开发

![image-20210819161927738](https://gitee.com/sheep101/typora-img-save/raw/master/img/image-20210819161927738.png)

### 修改app.vue

```vue

<template>
  <router-view/>
</template>

<script>
export default {
  name: 'App'
}
</script>

```

### 创建login组件

`src/view/login/login.vue`

HTML样式

```vue

<template>
  <div class="wrapper">
    <img class="wrapper__img" src="http://www.dell-lee.com/imgs/vue3/user.png"/>
    <div class="wrapper__input">
      <input class="wrapper__input__content" placeholder="请输入手机号"/>
    </div>
    <div class="wrapper__input">
      <input class="wrapper__input__content" placeholder="请输入密码"/>
    </div>
    <div class="wrapper__login-button">登陆</div>
    <div class="wrapper__login-link">立即注册</div>
  </div>
</template>

```

css样式

```scss
<
style lang

=
"scss"
scoped >

@import '../../style/viriables.scss';
.wrapper {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  // 用户图标
  &__img {
    display: block;
    margin: 0 auto .4rem auto;
    width: .66rem;
    height: .66rem;
  }

  // 输入框
  &__input {
    height: .48rem;
    margin: 0 .4rem .16rem .4rem;
    padding: 0 .16rem;
    background: #F9F9F9;
    border: 1px solid rgba(0, 0, 0, 0.10);
    border-radius: 6px;
    border-radius: 6px;
    // 输入框内容
    &__content {
      line-height: .48rem;
      border: none;
      outline: none;
      width: 100%;
      background: none;
      font-size: .16rem;
      color: $content-notice-fontcolor;

      &::placeholder {
        color: $content-notice-fontcolor;
      }
    }
  }

  /* 登录按钮 */
  &__login-button {
    margin: .32rem .4rem .16rem .4rem;
    line-height: .48rem;
    background: #0091FF;
    box-shadow: 0 .04rem .08rem 0 rgba(0, 145, 255, 0.32);
    border-radius: .04rem;
    border-radius: .04rem;
    color: #fff;
    font-size: .16rem;
    text-align: center;
  }

  /* 立即注册 */
  &__login-link {
    text-align: center;
    font-size: .14rem;
    color: $content-notice-fontcolor;
  }
}

<
/
style >

```

### 修改router

```js
import {createRouter, createWebHashHistory} from 'vue-router'
import Home from '../views/home/Home'
import Login from '../views/login/Login'

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
}, {
    path: '/login',
    name: 'Login',
    component: Login
}
    // {
    //   path: '/about',
    //   name: 'About',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    // }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router

```

### 抽离多次出现的登录输入框颜色

`src/style/viriables.scss`

```css
$
content-fontcolor: #333

;
$
content-bgColor: #F1F1F1

;
/
/
登录 输入框字体颜色
$ content-notice-fontcolor: #777

;
```

## 路由守卫实现基础登陆校验功能

### 全局路由守卫

```js
// 路由守卫
router.beforeEach((to, from, next) => {
    // // 定义下是否登录
    // const isLogin = localStorage.isLogin
    // if (isLogin || to.name === 'Login') {
    //   // 已经登录或者前往登录页 则跳转
    //   next()
    // } else {
    //   // 跳转登录页
    //   next({ name: 'Login' })
    // }
    // 解构赋值
    const {isLogin} = localStorage;
    (isLogin || to.name === 'Login') ? next() : next({name: 'Login'})
})
```

### login 进入前判断

```js
const routes = [{
    path: '/',
    name: 'Home',
    component: Home
}, {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: (to, from, next) => {
        // const isLogin = localStorage.isLogin
        // // 判断是否是已登录状态，是的话就跳转到首页，不是就继续跳转登录页面
        // if (isLogin) {
        //   next({ name: 'Home' })
        // } else {
        //   next()
        // }
        const {isLogin} = localStorage
        isLogin ? next({name: 'Home'}) : next()
    }
}
```

### 登录模拟并跳转

```html

<div class="wrapper__login-button" @click="handleLogin">登陆</div>
```

```js
<script>import {useRouter} from 'vue-router'export default {name: 'Login',  setup () {    // 使用vuerouter    const router = useRouter()    // 点击就当做已经登录    const handleLogin = () => {      localStorage.isLogin = true      // 路由跳转      router.push({ name: 'Home' })    }    return { handleLogin }  }}</script>
```

## 注册页面开发及路由串联复习

![image-20210819164842884](https://gitee.com/sheep101/typora-img-save/raw/master/img/image-20210819164842884.png)

### 注册页面样式

`src/view/register/Register.vue`

```html

<template>
    <div class="wrapper"><img class="wrapper__img" src="http://www.dell-lee.com/imgs/vue3/user.png"/>
        <div class="wrapper__input"><input class="wrapper__input__content" placeholder="请输入手机号"/></div>
        <div class="wrapper__input"><input class="wrapper__input__content" placeholder="请输入密码" type="password"/></div>
        <div class="wrapper__input"><input class="wrapper__input__content" placeholder="确认密码" type="password"/></div>
        <div class="wrapper__register-button">注册</div>
        <div class="wrapper__register-link" @click="handleLoginClick">已有账号去登陆</div>
    </div>
</template>
```

```js
import {useRouter} from 'vue-router'

export default {
    name: 'Register', setup() {
        const router = useRouter()
        const handleLoginClick = () => {
            router.push({name: 'Login'})
        }
        return {handleLoginClick}
    }
}
```

```scss
@import '../../style/viriables.scss';

.wrapper {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);

  &__img {
    display: block;
    margin: 0 auto .4rem auto;
    width: .66rem;
    height: .66rem;
  }

  &__input {
    height: .48rem;
    margin: 0 .4rem .16rem .4rem;
    padding: 0 .16rem;
    background: #F9F9F9;
    border: 1px solid rgba(0, 0, 0, 0.10);
    border-radius: 6px;
    border-radius: 6px;

    &__content {
      line-height: .48rem;
      border: none;
      outline: none;
      width: 100%;
      background: none;
      font-size: .16rem;
      color: $content-notice-fontcolor;

      &::placeholder {
        color: $content-notice-fontcolor;
      }
    }
  }

  &__register-button {
    margin: .32rem .4rem .16rem .4rem;
    line-height: .48rem;
    background: #0091FF;
    box-shadow: 0 .04rem .08rem 0 rgba(0, 145, 255, 0.32);
    border-radius: .04rem;
    border-radius: .04rem;
    color: #fff;
    font-size: .16rem;
    text-align: center;
  }

  &__register-link {
    text-align: center;
    font-size: .14rem;
    color: $content-notice-fontcolor;
  }
}
```

### 路由修改

```js
import Register from '../views/register/Register'

const routes = [...{
    path: '/register', name: 'Register', component: Register, beforeEnter(to, from, next) {
        const {isLogin} = localStorage
        isLogin ? next({name: 'Home'}) : next()
    }
}...
}
```

```js
// 路由守卫router.beforeEach((to, from, next) => {  const { isLogin } = localStorage  const { name } = to  const isLoginOrRegister = (name === 'Login' || name === 'Register');  (isLogin || isLoginOrRegister) ? next() : next({ name: 'Login' })})
```

### 登录链接

`login.vue`

```html

<div class="wrapper__login-link" @click="handleRegisterClick">立即注册</div>
```

```js
  setup()
{    // 使用vuerouter    const router = useRouter()    // 点击就当做已经登录    const handleLogin = () => {      localStorage.isLogin = true      // 路由跳转      router.push({ name: 'Home' })    }    const handleRegisterClick = () => {      router.push({ name: 'Register' })    }    return { handleLogin, handleRegisterClick }  }
```

## 使用axios 发送登陆 Mock 请求

![image-20210819170638334](https://gitee.com/sheep101/typora-img-save/raw/master/img/image-20210819170638334.png)

### 安装axios

`cnpm install axios --save`

### 修改登录页面并双向绑定

```html

<template>
    <div class="wrapper"><img class="wrapper__img" src="http://www.dell-lee.com/imgs/vue3/user.png"/>
        <div class="wrapper__input"><input class="wrapper__input__content" placeholder="用户名" v-model="data.username"/>
        </div>
        <div class="wrapper__input"><input type="password" class="wrapper__input__content" placeholder="请输入密码"
                                           v-model="data.password"/></div>
        <div class="wrapper__login-button" @click="handleLogin">登陆</div>
        <div class="wrapper__login-link" @click="handleRegisterClick">立即注册</div>
    </div>
</template>
```

```js
  setup()
{    // 定义一个data    const data = reactive({      username: '',      password: ''    })        return { data }  }
```

### 发送请求

```js
import axios from 'axios' // 引用axiosimport { reactive } from 'vue'// 全局更改axios发送post请求的默认方式axios.defaults.headers.post['Content-Type'] = 'application/json'
```

```js
  setup()
{      ...    /* 登录并发送一个请求 */
    const handleLogin = () => {
        axios.post('https://www.fastmock.site/mock/ae8e9031947a302fed5f92425995aa19/jd/api/user/login', {
            username: data.username,
            password: data.password
        }).then(() => {
            localStorage.isLogin = true
            router.push({name: 'Home'})
        }).catch(() => {
            alert('登陆失败')
        })
    }
...
    return {handleLogin, handleRegisterClick, data}
}
```

### 更改axios请求格式

`axios.defaults.headers.post['Content-Type'] = 'application/json'`

## 请求函数的封装

### 封装一个post请求

实际上就是promise应用

`utils/reques.js`

```js
import axios from 'axios'

export const post = (url, data = {}) => {
    return new Promise((resolve, reject) => {
        axios.post(url, data, {
            baseURL: 'https://www.fastmock.site/mock/ae8e9031947a302fed5f92425995aa19/jd',
            headers: {'Content-Type': 'application/json'}
        }).then((response) => {
            resolve(response.data)
        }, err => {
            reject(err)
        })
    })
}
```

### 在login组建发送一个请求 并使用async await 语法

之前我们用的都是.then().catch

vue3 支持async语法

```js
import {post} from '../../utils/request' //调用post请求	const handleLogin = async () => {      try {        const result = await post('/api/user/login', {          username: data.username,          password: data.password        })        if (result?.errno === 0) {          localStorage.isLogin = true          router.push({ name: 'Home' })        } else {          alert('登陆失败')        }      } catch (e) {        alert('请求失败')      }    }
```

## Toast 弹窗组件的开发

![image-20210819172154559](https://gitee.com/sheep101/typora-img-save/raw/master/img/image-20210819172154559.png)

### toast 组件封装

`component/toast`

```vue

<template>
  <div class="toast">{{message}}</div>
</template>
<script>export default {props: ['message']}</script>
<style lang="scss" scoped>.toast {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: .1rem;
  background: rgba(0, 0, 0, .35);
  border-radius: .05rem;
  color: #FFF;
}</style>
```

### login组件中引用

```html

<Toast v-if="data.showToast" :message="data.toastMessage"/>
```

```js
import {useRouter} from 'vue-router'
import {post} from '../../utils/request' // 调用post请求import { reactive } from 'vue'import Toast from '../../components/Toast' // 引用弹窗组件
```

```js
  name: 'Login', components
:
{
    Toast
}
, 
```

  ```js
  setup()
{    // 定义一个data    const data = reactive({      username: '',      password: '',      showToast: false,      toastMessage: ''    })    // 弹窗显示    const showToast = (message) => {      data.showToast = true      data.toastMessage = message      setTimeout(() => {        data.showToast = false        data.toastMessage = ''      }, 2000)    }    // 使用vuerouter    const router = useRouter()    /* 登录并发送一个请求 */    const handleLogin = async () => {      try {        const result = await post('111/api/user/login', {          username: data.username,          password: data.password        })        if (result?.errno === 0) {          localStorage.isLogin = true          router.push({ name: 'Home' })        } else {          showToast('登陆失败')        }      } catch (e) {        showToast('请求失败')      }    }    return { handleLogin, handleRegisterClick, data }  }}
  ```

## 通过代码拆分增加逻辑可维护性

### 系统引入的放上面 自己写的 放下面

```js
import {useRouter} from 'vue-router'
import {reactive} from 'vue'
import {post} from '../../utils/request' // 调用post请求import Toast from '../../components/Toast' // 引用弹窗组件
```

### 抽离出关于toast的data function

```js
const useToastEffect = () => {
    const toastData = reactive({showToast: false, toastMessage: ''})  // 弹窗显示  const showToast = (message) => {    toastData.showToast = true    toastData.toastMessage = message    setTimeout(() => {      toastData.showToast = false      toastData.toastMessage = ''    }, 2000)  }  return { toastData, showToast }}
```

```js
  setup()
{    // 引入toast    const { toastData, showToast } = useToastEffect()    }
```

```html

<Toast v-if="toastData.showToast" :message="toastData.toastMessage"/>
```

完整代码

```vue

<template>
  <div class="wrapper"><img class="wrapper__img" src="http://www.dell-lee.com/imgs/vue3/user.png"/>
    <div class="wrapper__input"><input class="wrapper__input__content" placeholder="用户名" v-model="data.username"/></div>
    <div class="wrapper__input"><input type="password" class="wrapper__input__content" placeholder="请输入密码"
                                       v-model="data.password"/></div>
    <div class="wrapper__login-button" @click="handleLogin">登陆</div>
    <div class="wrapper__login-link" @click="handleRegisterClick">立即注册</div>
  </div>
  <Toast v-if="toastData.showToast" :message="toastData.toastMessage"/>
</template>
<script>import {useRouter} from 'vue-router'
import {reactive} from 'vue'
import {post} from '../../utils/request' // 调用post请求import Toast from '../../components/Toast' // 引用弹窗组件const useToastEffect = () => {  const toastData = reactive({    showToast: false,    toastMessage: ''  })  // 弹窗显示  const showToast = (message) => {    toastData.showToast = true    toastData.toastMessage = message    setTimeout(() => {      toastData.showToast = false      toastData.toastMessage = ''    }, 2000)  }  return { toastData, showToast }}export default {  name: 'Login',  components: { Toast },  setup () {    // 使用vuerouter    const router = useRouter()    // 定义一个data    const data = reactive({ username: '', password: '' })    // 引入toast    const { toastData, showToast } = useToastEffect()    /* 登录并发送一个请求 */    const handleLogin = async () => {      try {        const result = await post('111/api/user/login', {          username: data.username,          password: data.password        })        if (result?.errno === 0) {          localStorage.isLogin = true          router.push({ name: 'Home' })        } else {          showToast('登陆失败')        }      } catch (e) {        showToast('请求失败')      }    }    const handleRegisterClick = () => {      router.push({ name: 'Register' })    }    return { handleLogin, handleRegisterClick, data, toastData }  }}</script>...
```

### 多处引用这个方法的时候我们封装成全局的

`Toast.vue`

```js
<template>
    <div class="toast">{{message}}</div>
</template>
<script>import {reactive} from 'vue'export default {props: ['message']}// 导出有关弹窗的方法export const useToastEffect = ()
    => {const toastData = reactive({showToast: false,    toastMessage: ''})  // 弹窗显示函数  const showToast = (message) => {    toastData.showToast = true    toastData.toastMessage = message    setTimeout(() => {      toastData.showToast = false      toastData.toastMessage = ''    }, 2000)  }  return { toastData, showToast }}</script><style lang="scss" scoped>.toast {  position: fixed;  left: 50%;  top: 50%;  transform: translate(-50%, -50%);  padding: 0.1rem;  background: rgba(0, 0, 0, 0.35);  border-radius: 0.05rem;  color: #fff;}</style>
```

`login.vue`

```vue
import Toast, { useToastEffect } from '../../components/Toast' // 引用弹窗组件//其他不变
```

## Setup函数的职责

职责就是告诉你，代码执行的一个流程

### setUp（）

> 数据解构很重要` const {a,b,c} = XXX() `

```js
export default {name: 'Login', components: {Toast},  // 职责就是告诉你，代码执行的一个流程  setup () {    const { show, toastMessage, showToast } = useToastEffect()    const { username, password, handleLogin } = useLoginEffect(showToast)    const { handleRegisterClick } = useRegisterEffect()    return {        // username, password,来自useLoginEffect（）里解构来的      username, password, show, toastMessage,      handleLogin, handleRegisterClick,    }  }}
```

### 关于login

```js
// 处理登录逻辑const useLoginEffect = (showToast) => {  const router = useRouter()  const data = reactive({ username: '', password: '' })  const handleLogin = async () => {    try {      const result = await post('/api/user/login', {        username: data.username,        password: data.password      })      if (result?.errno === 0) {        localStorage.isLogin = true        router.push({ name: 'Home' })      } else {        showToast('登陆失败')      }    } catch (e) {      showToast('请求失败')    }  }  const { username, password } = toRefs(data)  return { username, password, handleLogin}}
```

### 关于 register

```js
// 处理注册跳转const useRegisterEffect = () => {  const router = useRouter()  const handleRegisterClick = () => {    router.push({ name: 'Register' })  }  return { handleRegisterClick }}
```

### 解决提示自动填充问题 `autocomplete="new-password"`

```html
      <input type="password" class="wrapper__input__content" placeholder="请输入密码" v-model="password"
             autocomplete="new-password"/>
```

## 注册功能的实现

![image-20210819191015348](https://gitee.com/sheep101/typora-img-save/raw/master/img/image-20210819191015348.png)

```vue

<template>
  <div class="wrapper"><img class="wrapper__img" src="http://www.dell-lee.com/imgs/vue3/user.png"/>
    <div class="wrapper__input"><input class="wrapper__input__content" placeholder="请输入用户名" v-model="username"/></div>
    <div class="wrapper__input"><input type="password" class="wrapper__input__content" placeholder="请输入密码"
                                       autocomplete="new-password" v-model="password"/></div>
    <div class="wrapper__input"><input class="wrapper__input__content" placeholder="确认密码" type="password"
                                       v-model="ensurement"/></div>
    <div class="wrapper__register-button" @click="handleRegister">注册</div>
    <div class="wrapper__register-link" @click="handleLoginClick">已有账号去登陆</div>
    <Toast v-if="show" :message="toastMessage"/>
  </div>
</template>
```

```vue

<script>import {useRouter} from 'vue-router'
import {reactive, toRefs} from 'vue'
import {post} from '../../utils/request'
import Toast, {useToastEffect} from '../../components/Toast'</script>
```

```js
// 处理注册相关逻辑const useRegisterEffect = (showToast) => {  const router = useRouter()  const data = reactive({    username: '',    password: '',    ensurement: ''  })  const handleRegister = async () => {    try {      const result = await post('/api/user/register', {        username: data.username,        password: data.password      })      if (result?.errno === 0) {        router.push({ name: 'Login' })      } else {        showToast('注册失败')      }    } catch (e) {      showToast('请求失败')    }  }  const { username, password, ensurement } = toRefs(data)  return { username, password, ensurement, handleRegister }}
```

```js
// 处理登陆跳转const useLoginEffect = () => {  const router = useRouter()  const handleLoginClick = () => {    router.push({ name: 'Login' })  }  return { handleLoginClick }}
```

```js
export default {
    name: 'Register', components: {Toast}, setup() {
        const {show, toastMessage, showToast} = useToastEffect()
        const {username, password, ensurement, handleRegister} = useRegisterEffect(showToast)
        const {handleLoginClick} = useLoginEffect()
        return {username, password, ensurement, show, toastMessage, handleRegister, handleLoginClick}
    }
}
```

# 第10章 商家展示功能开发（上）

在本章中，我们将通过商家详情页面的布局和基础逻辑实现，带大家巩固复习基础部分的更多语法，同时讲解请求数据如何通过 watchEffect 来巧妙实现，这一章节难度适中，请同学们认真学习为复杂知识点做好准备，大家加油！

![image-20210819192516274](https://gitee.com/sheep101/typora-img-save/raw/master/img/image-20210819192516274.png)

## 首页附近店铺数据动态化-详情页准备

![image-20210819193609950](https://gitee.com/sheep101/typora-img-save/raw/master/img/image-20210819193609950.png)

### 封装get方法

```js
import axios from 'axios'
// 创建一个axios 实例
const instance = axios.create({
    baseURL: 'https://www.fastmock.site/mock/ae8e9031947a302fed5f92425995aa19/jd',
    timeout: 10000 // 超时
})
```

```js
/**
 * get 请求
 * @param {*} url
 * @param {*} params
 * @returns
 */
export const get = (url, params = {}) => {
        return new Promise((resolve, reject) => {
            instance.get(url, {params}).then((response) => {
                resolve(response.data)
            }, err => {
                reject(err)
            })
        })
    }
```

```js
/**
 * post 请求
 * @param {*} url
 * @param {*} data
 * @returns
 */
export const post = (url, data = {}) => {
        return new Promise((resolve, reject) => {
            instance.post(url, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                resolve(response.data)
            }, err => {
                reject(err)
            })
        })
    }
```

### 附近商家

![image-20210819193609950](https://gitee.com/sheep101/typora-img-save/raw/master/img/image-20210819193609950.png)

```html

<template>
    <div class="nearby">
        <h3 class="nearby__title">附近店铺</h3>
        <div
                class="nearby__item"
                v-for="item in nearbyList"
                :key="item._id"
        >
            <img :src="item.imgUrl" class="nearby__item__img">
            <div class="nearby__content">
                <div class="nearby__content__title">{{item.name}}</div>
                <div class="nearby__content__tags">
                    <span class="nearby__content__tag">月售: {{item.sales}}</span>
                    <span class="nearby__content__tag">起送: {{item.expressLimit}}</span>
                    <span class="nearby__content__tag">基础运费: {{item.expressPrice}}</span>
                </div>
                <p class="nearby__content__highlight">{{item.slogan}}</p>
            </div>
        </div>
    </div>
</template>
```

```js
import {ref} from 'vue'
import {get} from '../../utils/request'

const useNearbyListEffect = () => {
    const nearbyList = ref([])
    const getNearbyList = async () => {
        const result = await get('/api/shop/hot-list')
        if (result?.errno === 0 && result?.data?.length) {
            nearbyList.value = result.data
        }
    }
    return {nearbyList, getNearbyList}
}
```

```js
export default {
    name: 'Nearby',
    setup() {
        const {nearbyList, getNearbyList} = useNearbyListEffect()
        getNearbyList()
        return {nearbyList}
    }
}
```

## 动态路由，异步路由与组件拆分复用

### 创建shop路由

> 常规路由

```js
import Shop

form
'xxxxx'
const routes = [{
    path: '/shop',
    name: 'Shop',
    component: Shop
}]
```

> 动态路由

```js
 {
    path: '/shop',
        name
:
    'Shop',
        component
:
    () => import(/* webpackChunkName: "shop" */ '../views/shop/Shop')
}
```

### 创建全局商店详情组件

![image-20210819194850559](https://gitee.com/sheep101/typora-img-save/raw/master/img/image-20210819194850559.png)

`component/shopInfo.vue`

```vue

<template>
  <div class="shop"><img :src="item.imgUrl" class="shop__img">
    <div :class="{'shop__content': true, 'shop__content--bordered': hideBorder ? false: true}">
      <div class="shop__content__title">{{item.name}}</div>
      <div class="shop__content__tags"><span class="shop__content__tag">月售: {{item.sales}}</span> <span
          class="shop__content__tag">起送: {{item.expressLimit}}</span> <span class="shop__content__tag">基础运费: {{item.expressPrice}}</span>
      </div>
      <p class="shop__content__highlight">{{item.slogan}}</p></div>
  </div>
</template>
<script>export default {name: 'ShopInfo',    // hideBorder 是否隐藏边框  props: ['item', 'hideBorder']}</script>
```

### 修改nearby组件

```vue

<template>
  <div class="nearby"><h3 class="nearby__title">附近店铺</h3>
    <ShopInfo v-for="item in nearbyList" :key="item._id" :item="item"/>
  </div>
</template>
<script>import {ref} from 'vue'
import {get} from '../../utils/request'
import ShopInfo from '../../components/ShopInfo'

const useNearbyListEffect = () => {
  const nearbyList = ref([]);    //获取列表信息  const getNearbyList = async () => {    const result = await get('/api/shop/hot-list')    if (result?.errno === 0 && result?.data?.length) {      nearbyList.value = result.data    }  }  return { nearbyList, getNearbyList}}export default {  name: 'Nearby',  components: { ShopInfo },  setup() {    const { nearbyList, getNearbyList } = useNearbyListEffect();    getNearbyList();    return { nearbyList };  }}</script>
```

### 创建shop组件

```vue

<template>
  <div class="wrapper">
    <ShopInfo :item="item" :hideBorder="true"/>
  </div>
</template>
<script>import ShopInfo from '../../components/ShopInfo'

export default {
  name: 'Shop', components: {ShopInfo}, setup() {
    const item = {
      _id: '1',
      name: '沃尔玛',
      imgUrl: 'http://www.dell-lee.com/imgs/vue3/near.png',
      sales: 10000,
      expressLimit: 0,
      expressPrice: 5,
      slogan: 'VIP尊享满89元减4元运费券'
    }
    return {item}
  }
}</script>
<style lang="scss" scoped>.wrapper {
  padding: 0 .18rem;
}</style>
```

去掉全局组件的边框

`shopinfo.vue` 中的 `--bordered`

```scss
  &__content {
  flex: 1;
  padding-bottom: .12rem;

  &--bordered {
    border-bottom: 1px solid $content-bgColor;
  }
```

```html

<div :class="{'shop__content': true, 'shop__content--bordered': hideBorder ? false: true}">
```

## 搜索布局及路由跳转

![image-20210819200309937](https://gitee.com/sheep101/typora-img-save/raw/master/img/image-20210819200309937.png)

### search布局

```html

<template>
    <div class="wrapper">
        <div class="search">
            <div class="search__back iconfont" @click="handleBackClick">&#xe6f2;</div>
            <div class="search__content"><span class="search__content__icon iconfont">&#xe62d;</span> <input
                    class="search__content__input" placeholder="请输入商品名称"/></div>
        </div>
        <ShopInfo :item="item" :hideBorder="true"/>
    </div>
</template>
```

```js
<script>import {useRouter} from 'vue-router'import ShopInfo from '../../components/ShopInfo'export
    default {name: 'Shop',  components: {ShopInfo},  setup () {const router = useRouter()    const item = {_id: '1',      name: '沃尔玛',      imgUrl: 'http://www.dell-lee.com/imgs/vue3/near.png',      sales: 10000,      expressLimit: 0,      expressPrice: 5,      slogan: 'VIP尊享满89元减4元运费券'}    const handleBackClick = () => {router.back()}    return {item, handleBackClick}}}</script>
```

```scss
  .wrapper {
  padding: 0 .18rem;
}

.search {
  display: flex;
  margin: .2rem 0 .16rem 0;
  line-height: .32rem;

  &__back {
    width: .3rem;
    font-size: .24rem;
    color: #B6B6B6;
  }

  &__content {
    display: flex;
    flex: 1;
    background: #F5F5F5;
    border-radius: .16rem;

    &__icon {
      width: .44rem;
      text-align: center;
      color: #B7B7B7;
    }

    &__input {
      display: block;
      width: 100%;
      padding-right: .2rem;
      border: none;
      outline: none;
      background: none;
      height: .32rem;
      font-size: .14rem;
      color: #333;

      &::placeholder {
        color: #333;
      }
    }
  }
}
```

### 更新icon

`style/iconfont.css`

```css
@font-face {
    font-family: 'iconfont';  /* project id 1906953 */
    src: url('//at.alicdn.com/t/font_1906953_fx6ekp39fco.eot');
    src: url('//at.alicdn.com/t/font_1906953_fx6ekp39fco.eot?#iefix') format('embedded-opentype'), url('//at.alicdn.com/t/font_1906953_fx6ekp39fco.woff2') format('woff2'), url('//at.alicdn.com/t/font_1906953_fx6ekp39fco.woff') format('woff'), url('//at.alicdn.com/t/font_1906953_fx6ekp39fco.ttf') format('truetype'), url('//at.alicdn.com/t/font_1906953_fx6ekp39fco.svg#iconfont') format('svg');
}
```

### 附近商家跳转

```vue

<template>
  <div class="nearby"><h3 class="nearby__title">附近店铺</h3>
    <router-link to="/shop" v-for="item in nearbyList" :key="item._id">
      <ShopInfo :item="item"/>
    </router-link>
  </div>
</template>
```

![image-20210819201649000](https://gitee.com/sheep101/typora-img-save/raw/master/img/image-20210819201649000.png)

去除a标签的下划线

```scss
.nearby {
  a {
    text-decoration: none;
  }
}
```

## 路由参数的传递以及商家详情的获取

### 修改路由 shop/id

`path: '/shop/:id',`

```js
{
    path: '/shop/:id', name
:
    'Shop', component
:
    () => import(/* webpackChunkName: "shop" */ '../views/shop/Shop')
}
,
```

### 修改nearby组件跳转

> <router-link :to="`/shop/${item._id}`" v-for="item in nearbyList" :key="item._id">

```html {4}
<template>  <div class="nearby">    <h3 class="nearby__title">附近店铺</h3>    <router-link :to="`/shop/${item._id}`" v-for="item in nearbyList" :key="item._id">      <ShopInfo :item="item" />    </router-link>  </div></template>
```

### shop组件获取商店信息

```js
import {reactive, toRefs} from 'vue'
import {useRouter, useRoute} from 'vue-router'
import {get} from '../../utils/request'
import ShopInfo from '../../components/ShopInfo'
```

>      if(result?.errno === 0 && result?.data) {

data.item = result.data ​ }

```js
// 获取当前商铺信息const useShopInfoEffect = () => {  const route = useRoute()  const data = reactive({ item: {} })  const getItemData = async () => {    const result = await get(`/api/shop/${route.params.id}`)    if(result?.errno === 0 && result?.data) {      data.item = result.data    }  }  const { item } = toRefs(data)  return { item, getItemData }}
```

```js
// 点击回退逻辑const useBackRouterEffect = () => {  const router = useRouter()  const handleBackClick = () => {    router.back()  }  return handleBackClick}
```

```js
export default {
    name: 'Shop', components: {ShopInfo}, setup() {
        const {item, getItemData} = useShopInfoEffect()
        const handleBackClick = useBackRouterEffect()
        getItemData()
        return {item, handleBackClick}
    }
}
```

### 优化图片裂图 当图片加载才显示

```html

<ShopInfo :item="item" :hideBorder="true" v-show="item.imgUrl"/>
```

## 商家页面核心样式开发

![image-20210820105211021](https://gitee.com/sheep101/typora-img-save/raw/master/img/image-20210820105211021.png)

### shop 引入content组件

```html

<Content/>import Content from './Content'components: {  Content },
```

### content组件布局

```vue

<template>
  <div class="content">
    <div class="category">
      <div class="category__item category__item--active">全部商品</div>
      <div class="category__item">秒杀</div>
      <div class="category__item">新鲜水果</div>
      <div class="category__item">休闲食品</div>
      <div class="category__item">时令蔬菜</div>
      <div class="category__item">肉蛋家禽</div>
    </div>
    <div class="product">
      <div class="product__item"><img class="product__item__img" src="http://www.dell-lee.com/imgs/vue3/near.png"/>
        <div class="product__item__detail"><h4 class="product__item__title">番茄250g/份</h4>
          <p class="product__item__sales">月售10件</p>
          <p class="product__item__price"><span class="product__item__yen">&yen;</span>33.6 <span
              class="product__item__origin">&yen;66.6</span></p></div>
      </div>
    </div>
  </div>
</template>
```

![image-20210820111507478](https://gitee.com/sheep101/typora-img-save/raw/master/img/image-20210820111507478.png)

```scss
.content {
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  top: 1.5rem;
  bottom: .5rem;
}
```

```scss
//左边.category {  overflow-y: scroll;  height: 100%;  width: .76rem;  background: #F5F5F5;  &__item {    line-height: .4rem;    text-align: center;    font-size: 14px;    color: #333;    &--active {      background: #FFF;    }  }}
```

```scss
.product {
  overflow-y: scroll;
  flex: 1;

  &__item {
    display: flex;
    padding: .12rem 0;
    margin: 0 .16rem;
    border-bottom: .01rem solid #F1F1F1;

    &__img {
      width: .68rem;
      height: .68rem;
      margin-right: .16rem;
    }

    &__title {
      margin: 0;
      line-height: .2rem;
      font-size: .14rem;
      color: $content-fontcolor;
      @include ellipsis;
    }

    &__sales {
      margin: .06rem 0;
      font-size: .12rem;
      color: #333;
    }

    &__price {
      margin: 0;
      line-height: .2rem;
      font-size: .14rem;
      color: #E93B3B;
    }

    &__yen {
      font-size: .12rem;
    }

    &__origin {
      margin-left: .06rem;
      line-height: .2rem;
      font-size: .12rem;
      color: #999;

//划线删除      text-decoration: line-through;    }  }}
```

## 样式的优化与代码复用

### 颜色抽离

![image-20210820112806347](https://gitee.com/sheep101/typora-img-save/raw/master/img/image-20210820112806347.png)

```scss
$content-fontcolor: #333;
$medium-fontColor: #666;
$light-fontColor: #999;
$content-bgColor: #F1F1F1; // 登录 输入框字体颜色$content-notice-fontcolor: #777;// 搜索框 背景色$search-bgColor: #F5F5F5;// 搜索框 字体颜色$search-fontColor: #B7B7B7;$hightlight-fontColor: #E93B3B;$btn-bgColor: #0091FF;$bgColor: #FFF;
```

### + - 样式

![image-20210820113350950](https://gitee.com/sheep101/typora-img-save/raw/master/img/image-20210820113350950.png)

![image-20210820113453555](https://gitee.com/sheep101/typora-img-save/raw/master/img/image-20210820113453555.png)

### css样式

```scss
    .product__number {
  position: absolute;
  right: 0;
  bottom: .12rem;

  &__minus, &__plus {
    display: inline-block;
    width: .2rem;
    height: .2rem;
    line-height: .16rem;;
    border-radius: 50%;
    font-size: .2rem;
    text-align: center;
  }

  &__minus {
    border: .01rem solid $medium-fontColor;
    color: $medium-fontColor;
    margin-right: .05rem;
  }

  &__plus {
    background: $btn-bgColor;
    color: $bgColor;
    margin-left: .05rem;
  }
}
```

## 商家详情页分类及内容联动的实现

```vue
        :class="{'category__item': true, 'category__item--active': currentTab === item.tab}"
```

```vue

<template>
  <div class="content">
    <div class="category">
      <div :class="{'category__item': true, 'category__item--active': currentTab === item.tab}"
           v-for="item in categories" :key="item.name" @click="() => handleCategoryClick(item.tab)"> {{item.name}}
      </div>
    </div>
    <div class="product">
      <div class="product__item" v-for="item in contentList" :key="item._id"><img class="product__item__img"
                                                                                  src="http://www.dell-lee.com/imgs/vue3/near.png"/>
        <div class="product__item__detail"><h4 class="product__item__title">{{item.name}}</h4>
          <p class="product__item__sales">月售 {{item.sales}} 件</p>
          <p class="product__item__price"><span class="product__item__yen">&yen;</span>{{item.price}} <span
              class="product__item__origin">&yen;{{item.oldPrice}}</span></p></div>
        <div class="product__number"><span class="product__number__minus">-</span> 0 <span
            class="product__number__plus">+</span></div>
      </div>
    </div>
  </div>
</template>
```

```js
import {reactive, toRefs} from 'vue'
import {get} from '../../utils/request'

export default {
    name: 'Content', setup() {
        const categories = [{name: '全部商品', tab: 'all'}, {name: '秒杀', tab: 'seckill'}, {name: '新鲜水果', tab: 'fruit'}]
        const data = reactive({currentTab: categories[0].tab, contentList: []})
        const getContentData = async (tab) => {
            const result = await get('/api/shop/1/products', {tab})
            if (result?.errno === 0 && result?.data?.length) {
                data.contentList = result.data;
            }
        }
        const handleCategoryClick = (tab) => {
            getContentData(tab)
            data.currentTab = tab
        }
        getContentData('all')
        const {contentList, currentTab} = toRefs(data)
        return {categories, currentTab, contentList, handleCategoryClick}
    }
}
```

## 10-14 使用 watchEffect 巧妙的进行代码拆分

### setup

```js
  setup()
{
    const {currentTab, handleTabClick} = useTabEffect()
    const {list} = useCurrentListEffect(currentTab)
    return {categories, currentTab, handleTabClick, list}
}
```

### 常量

```js
const categories = [{name: '全部商品', tab: 'all'}, {name: '秒杀', tab: 'seckill'}, {name: '新鲜水果', tab: 'fruit'}]
```

### 关于tab切换的逻辑

```js
// Tab 切换相关的逻辑const useTabEffect = () => {  const currentTab = ref(categories[0].tab)  const handleTabClick = (tab) => {    currentTab.value = tab  }  return { currentTab, handleTabClick }}
```

### 列表内容相关的逻辑

```js
  // 首屏加载 或者是 getContentData中依赖的数据变化的时候  watchEffect(() => { getContentData() })
```

```js
const useCurrentListEffect = (currentTab) => {
}
)
```

```js
// 列表内容相关的逻辑const useCurrentListEffect = (currentTab) => {  const route = useRoute()  const shopId = route.params.id  const content = reactive({ list: [] })  const getContentData = async () => {    const result = await get(`/api/shop/${shopId}/products`, {      tab: currentTab.value//由于上面用的是ref    })    if (result?.errno === 0 && result?.data?.length) {      content.list = result.data    }  }  // 首屏加载 或者是 getContentData中依赖的数据变化的时候  watchEffect(() => { getContentData() })  const { list } = toRefs(content)  return { list }}
```

# 第11章 商家展示功能开发（下）

本章难度明显提升，通过商品详情页面与购物车数据的联动功能，讲解了在 Vue3 中处理复杂业务逻辑的编码思路，帮助大家深入学习使用了 VueX 以及 Composition API
中各种新语法的实战场景。同时讲解了路由的异步加载等高级实战内容，是整个实战项目中复杂度最高的一章节。

## 购物车的样式开发

`shop/cart.vue`

![image-20210820161238307](https://gitee.com/sheep101/typora-img-save/raw/master/img/image-20210820161238307.png)

```vue

<template>
  <div class="cart">
    <div class="check">
      <div class="check__icon">
        <img src="http://www.dell-lee.com/imgs/vue3/basket.png" class="check__icon__img"/>
        <div class="check__icon__tag">1</div>
      </div>
      <div class="check__info">
        总计：
        <span class="check__info__price">&yen;127</span>
      </div>
      <div class="check__btn">去结算</div>
    </div>
  </div>
</template>
```

![image-20210820162224090](https://gitee.com/sheep101/typora-img-save/raw/master/img/image-20210820162224090.png)

```scss
@import '../../style/viriables.scss';

.cart {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
}
```

check类内部

```scss
.check {
  display: flex;
  height: 0.49rem;
  // 顶部边框
  border-top: 0.01rem solid $content-bgColor;
  line-height: 0.49rem;
}
```

![image-20210820163506038](https://gitee.com/sheep101/typora-img-save/raw/master/img/image-20210820163506038.png)

```scss
  &__icon {
  position: relative;
  width: 0.84rem;

  &__img {
    display: block;
    // 总共50 来设水平垂直居中
    margin: 0.12rem auto;
    width: 0.28rem;
    height: 0.26rem;
  }

  &__tag {
    position: absolute;
    right: 0.2rem;
    top: 0.04rem;
    // 由于fontsize 小于10px 系统会自动给到12px
    // 所有我们想乘两倍 再通过scale 缩小
    width: 0.2rem;
    height: 0.2rem;
    font-size: 0.12rem;
    transform: scale(0.5);
    line-height: 0.2rem;
    background-color: $hightlight-fontColor;
    border-radius: 50%;

    text-align: center;
    color: #fff;
  }
}
```

![image-20210820163519087](https://gitee.com/sheep101/typora-img-save/raw/master/img/image-20210820163519087.png)

```scss
  &__info {
  flex: 1;
  color: $content-fontcolor;
  font-size: 0.12rem;

  &__price {
    line-height: 0.49rem;
    color: $hightlight-fontColor;
    font-size: 0.18rem;
  }
}
```

![image-20210820163529110](https://gitee.com/sheep101/typora-img-save/raw/master/img/image-20210820163529110.png)

```scss
  &__btn {
  width: 0.98rem;
  background-color: #4fb0f9;
  text-align: center;
  color: #fff;
  font-size: 0.14rem;
}
```

## Vuex中购物车数据结构的设计

```js
  state: {
    cartList: {
        // 第一层级是商铺的id
        shopId: {
            // 第二层是商品id
            // 第二层内容是商品内容以及购物数量
            productId: {
                _id: '1',
                    name
            :
                '番茄250g/份',
                    imgUrl
            :
                'http://www.dell-lee.com/imgs/vue3/tomato.png',
                    sales
            :
                10,
                    price
            :
                33.6,
                    oldPrice
            :
                39.6,
                    count
            :
                2
            }
        }
    }
}
,
```

> 第一层级是商铺的id
>
> 第二层是商品id, 第二层内容是商品内容以及购物数量

```js
import Vuex from 'vuex'

export default Vuex.createStore({
    state: {
        cartList: {}
    },
    mutations: {
        addItemToCart(state, payload) {
            // 获取商铺id 产品id 产品信息
            const {shopId, productId, productInfo} = payload
            // 获取state中 购物车信息 注意不要用解构
            let shopInfo = state.cartList[shopId]
            //  之前没存过商铺 就让商铺信息为空
            if (!shopInfo) {
                shopInfo = {}
            }
            //  获取商铺中的产品
            let product = shopInfo[productId]
            // 不存在产品就 让传进来的商品信息填充并将数量改为0
            if (!product) {
                product = productInfo
                product.count = 0
            }
            // 商品存不存在 都加1
            product.count += 1
            // shopinfo 赋值
            shopInfo[productId] = product
            state.cartList[shopId] = shopInfo
        }
    },
    actions: {},
    modules: {}
})

```

### content组件编写购物车逻辑

购买几份

`            {{cartList?.[shopId]?.[item._id]?.count || 0}}`

```vue

<template>
  <div class="content">
    <div class="category">
      <div :class="{'category__item': true, 'category__item--active': currentTab === item.tab}"
           v-for="item in categories" :key="item.name" @click="() => handleTabClick(item.tab)"> {{item.name}}
      </div>
    </div>
    <div class="product">
      <div class="product__item" v-for="item in list" :key="item._id"><img class="product__item__img"
                                                                           :src="item.imgUrl"/>
        <div class="product__item__detail"><h4 class="product__item__title">{{item.name}}</h4>
          <p class="product__item__sales">月售 {{item.sales}} 件</p>
          <p class="product__item__price"><span class="product__item__yen">&yen;</span>{{item.price}} <span
              class="product__item__origin">&yen;{{item.oldPrice}}</span></p></div>
        <div class="product__number"><span class="product__number__minus">-</span>
          {{cartList?.[shopId]?.[item._id]?.count || 0}} <span class="product__number__plus"
                                                               @click="() => { addItemToCart(shopId, item._id, item) }">+</span>
        </div>
      </div>
    </div>
  </div>
</template>
```

```js
import {useStore} from 'vuex'// 购物车相关逻辑const useCartEffect = () => {  const store = useStore()  const { cartList } = toRefs(store.state)  //拼成vuex想要存的数据结构  const addItemToCart = (shopId, productId, productInfo) => {    store.commit('addItemToCart', {      shopId, productId, productInfo    })  }  return { cartList, addItemToCart }}
```

```js
export default {
    name: 'Content', setup() {
        const route = useRoute()
        const shopId = route.params.id
        const {currentTab, handleTabClick} = useTabEffect()
        const {list} = useCurrentListEffect(currentTab, shopId)
        const {cartList, addItemToCart} = useCartEffect()
        return {categories, currentTab, handleTabClick, list, cartList, shopId, addItemToCart}
    }
}
</script>
```

## 购物车内容删减

```
// 减@click="() => { changeCartItemInfo(shopId, item._id, item, -1) }"// 加@click="() => { changeCartItemInfo(shopId, item._id, item, +1) }"
```

```js
// 购物车相关逻辑const useCartEffect = () => {  const store = useStore()  const { cartList } = toRefs(store.state)  const changeCartItemInfo = (shopId, productId, productInfo, num) => {    store.commit('changeCartItemInfo', {      shopId, productId, productInfo, num    })  }  return { cartList, changeCartItemInfo }}
```

vuex中

```js
    changeCartItemInfo(state, payload)
{
    const {shopId, productId, productInfo} = payload;
    let shopInfo = state.cartList[shopId]
    if (!shopInfo) {
        shopInfo = {}
    }
    let product = shopInfo[productId]
    if (!product) {
        product = productInfo
        product.count = 0
    }
    product.count = product.count + payload.num        //边界处理      if(product.count < 0) { product.count = 0 }      shopInfo[productId] = product      state.cartList[shopId] = shopInfo    }
```

## 使用 computed 完成订单价格计算

`cart组件`

```js
import {computed} from 'vue'
import {useStore} from 'vuex'
import {useRoute} from 'vue-router'
```

```js
// 获取购物车信息逻辑const useCartEffect = () => {  const store = useStore()  const route = useRoute()  const shopId = route.params.id  const cartList = store.state.cartList  const total = computed(() => {    const productList = cartList[shopId]    let count = 0    if (productList) {      for (const i in productList) {        const product = productList[i]        count += product.count      }    }    return count  })
```

```js
  const price = computed(() => {
    const productList = cartList[shopId]
    let count = 0
    if (productList) {
        for (const i in productList) {
            const product = productList[i]
            count += (product.count * product.price)
        }
    }
    return count.toFixed(2)
})
return {total, price}
}
```

```js
export default {
    name: 'Cart', setup() {
        const {total, price} = useCartEffect()
        return {total, price}
    }
}
```

## 购物车及列表双向数据同步功能开发

![image-20210823101319421](https://gitee.com/sheep101/typora-img-save/raw/master/img/image-20210823101319421.png)

### 样式

```vue

<template>
  <div class="cart">    <!-- 商品信息 -->
    <div class="product">
      <template v-for="item in productList" :key="item._id">
        <div class="product__item" v-if="item.count > 0"><img class="product__item__img" :src="item.imgUrl"/>
          <div class="product__item__detail"><h4 class="product__item__title">{{item.name}}</h4>
            <p class="product__item__price"><span class="product__item__yen">&yen;</span> {{item.price}} <span
                class="product__item__origin">&yen;{{item.oldPrice}}</span></p></div>
          <div class="product__number"><span class="product__number__minus"
                                             @click="() => { changeCartItemInfo(shopId, item._id, item, -1) }">-</span>
            {{item.count || 0}} <span class="product__number__plus"
                                      @click="() => { changeCartItemInfo(shopId, item._id, item, 1) }">+</span></div>
        </div>
      </template>
    </div>
    <div class="check">
      <div class="check__icon"><img src="http://www.dell-lee.com/imgs/vue3/basket.png" class="check__icon__img"/>
        <div class="check__icon__tag">{{total}}</div>
      </div>
      <div class="check__info"> 总计： <span class="check__info__price">&yen; {{price}}</span></div>
      <div class="check__btn">去结算</div>
    </div>
  </div>
</template>
```

```scss
.product {
  overflow-y: scroll;
  flex: 1;
  background: #fff;

  &__item {
    position: relative;
    display: flex;
    padding: 0.12rem 0;
    margin: 0 0.16rem;
    border-bottom: 0.01rem solid $content-bgColor;

    &__detail {
      overflow: hidden;
    }

    &__img {
      width: 0.46rem;
      height: 0.46rem;
      margin-right: 0.16rem;
    }

    &__title {
      margin: 0;
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: $content-fontcolor;
      @include ellipsis;
    }

    &__price {
      margin: 0.06rem 0 0 0;
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: $hightlight-fontColor;
    }

    &__yen {
      font-size: 0.12rem;
    }

    &__origin {
      margin-left: 0.06rem;
      line-height: 0.2rem;
      font-size: 0.12rem;
      color: $light-fontColor;
      text-decoration: line-through;
    }

    .product__number {
      position: absolute;
      right: 0;
      bottom: 0.12rem;

      &__minus, &__plus {
        display: inline-block;
        width: 0.2rem;
        height: 0.2rem;
        line-height: 0.16rem;
        border-radius: 50%;
        font-size: 0.2rem;
        text-align: center;
      }

      &__minus {
        border: 0.01rem solid $medium-fontColor;
        color: $medium-fontColor;
        margin-right: 0.05rem;
      }

      &__plus {
        background: $btn-bgColor;
        color: $bgColor;
        margin-left: 0.05rem;
      }
    }
  }
}
```

```js
  const productList = computed(() => {
    const productList = cartList[shopId] || []
    return productList
})
return {total, price, productList}
}
```

### 加减购物车

```vue

<div class="product__number"><span class="product__number__minus"
                                   @click="() => { changeCartItemInfo(shopId, item._id, item, -1) }">-</span>
{{item.count || 0}} <span class="product__number__plus"
                          @click="() => { changeCartItemInfo(shopId, item._id, item, 1) }">+</span></div>
```

```js
import {useCommonCartEffect} from './commonCartEffect'

export default {
    name: 'Cart', setup() {
        const route = useRoute()
        const shopId = route.params.id
        const {changeCartItemInfo} = useCommonCartEffect()
        const {total, price, productList} = useCartEffect(shopId)
        return {total, price, shopId, productList, changeCartItemInfo}
    }
}
```

`commonCartEffect`

```js
import {useStore} from 'vuex'
import {toRefs} from 'vue'// 购物车相关逻辑export const useCommonCartEffect = () => {  const store = useStore()  const { cartList } = toRefs(store.state)  const changeCartItemInfo = (shopId, productId, productInfo, num) => {    store.commit('changeCartItemInfo', {      shopId, productId, productInfo, num    })  }  return { cartList, changeCartItemInfo }} 
```

## 根据购物车选中状态计算订单金额

选中状态和非选中状态

### 更新icon

### 修改样式

```html

<div class="product__item__checked iconfont" v-html="item.check ? '&#xe652;': '&#xe6f7;'"
     @click="() => changeCartItemChecked(shopId, item._id)"/>
```

```scss
    &__checked {
  line-height: 0.5rem;
  margin-right: 0.2rem;
  color: #0091ff;
  font-size: 0.2rem;
}
```

### 计算总价钱

```js
  const price = computed(() => {
    const productList = cartList[shopId]
    let count = 0
    if (productList) {
        for (const i in productList) {
            const product = productList[i]        // 勾选的才加入        if (product.check) {          count += product.count * product.price        }      }    }    return count.toFixed(2)  })
```

### 勾选状态改变

```js
  const changeCartItemChecked = (shopId, productId) => {
    store.commit('changeCartItemChecked', {shopId, productId})
}
```

`store`

```js
    changeCartItemChecked(state, payload)
{
    const {shopId, productId} = payload
    const product = state.cartList[shopId][productId]
    product.check = !product.check
}
```

## 全选及清空购物车的功能实现

![image-20210823112354213](https://gitee.com/sheep101/typora-img-save/raw/master/img/image-20210823112354213.png)

### 全选 & 清空购物车 & 遮罩

```vue

<template>  <!-- 遮罩 -->
  <div class="mask" v-if="showChart"/>
  <div class="cart">
    <div class="product" v-if="showChart">      <!-- 全选 &  清空购物车-->
      <div class="product__header">
        <div class="product__header__all" @click="() => setCartItemsChecked(shopId)"><span
            class="product__header__icon iconfont" v-html="allChecked ? '&#xe652;': '&#xe6f7;'"></span> 全选
        </div>
        <div class="product__header__clear" @click="() => cleanCartProducts(shopId)">清空购物车</div>
      </div>      <!-- 购物车中商品list -->      ...
    </div>    <!-- 总计 -->
    <div class="check">
      <div class="check__icon"><img src="http://www.dell-lee.com/imgs/vue3/basket.png" class="check__icon__img"
                                    @click="handleCartShowChange"/>
        <div class="check__icon__tag">{{total}}</div>
      </div>
      <div class="check__info"> 总计： <span class="check__info__price">&yen; {{price}}</span></div>
      <div class="check__btn">去结算</div>
    </div>
  </div>
</template>
```

```scss
  // 全選&清空購物車  &__header {    display: flex;    line-height: 0.52rem;    border-bottom: 1px solid #f1f1f1;    font-size: 0.14rem;    color: #333;    &__all {      width: 0.64rem;      margin-left: 0.18rem;    }    &__icon {      display: inline-block;      color: #0091ff;      font-size: 0.2rem;    }    &__clear {      flex: 1;      margin-right: 0.16rem;      text-align: right;    }  }
```

### 清空当前商铺购物车逻辑

```js
  // 清空当前商店的购物车  const cleanCartProducts = (shopId) => {    store.commit('cleanCartProducts', { shopId })  }
```

```js
  // 清空购物车    cleanCartProducts (state, payload) {      const { shopId } = payload      state.cartList[shopId] = {}    },
```

### 全选当前商铺购物车逻辑

```html

<div class="product__header__all" @click="() => setCartItemsChecked(shopId)"><span
        class="product__header__icon iconfont" v-html="allChecked ? '&#xe652;': '&#xe6f7;'"></span> 全选
</div>
```

```js
  // 全选逻辑  const allChecked = computed(() => {    const productList = cartList[shopId]    let result = true    if (productList) {      for (const i in productList) {        const product = productList[i]        if (product.count > 0 && !product.check) {          result = false        }      }    }    return result  })
```

```js
  const setCartItemsChecked = (shopId) => {
    store.commit('setCartItemsChecked', {shopId})
}
```

```js
    // 全选    setCartItemsChecked (state, payload) {      const { shopId } = payload      const products = state.cartList[shopId]      if (products) {        for (const key in products) {          const product = products[key]          product.check = true        }      }    }
```

### 购物车的展示与隐藏

```js
    // 购物车卡片遮罩是否显示    const handleCartShowChange = () => {      showChart.value = !showChart.value    }
```

### 遮罩

![image-20210823114641952](https://gitee.com/sheep101/typora-img-save/raw/master/img/image-20210823114641952.png)

```html

<div class="mask" v-if="showChart"/>        <img src="http://www.dell-lee.com/imgs/vue3/basket.png"
                                                 class="check__icon__img" @click="handleCartShowChange"/>
```

```scss
.mask {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
}
```

```js
    const showChart = ref(false)    // 购物车卡片遮罩是否显示    const handleCartShowChange = () => {      showChart.value = !showChart.value    }
```

## 商家详情页面代码优化

### 清空购物车

```html

<div class="product__header__clear"><span class="product__header__clear__btn" @click="() => cleanCartProducts(shopId)">清空购物车</span>
</div>
```

```scss
    &__clear {
  flex: 1;
  margin-right: 0.16rem;
  text-align: right;

  &__btn {
    display: inline-block;
  }
}
```

### 展示隐藏购物车逻辑

```js
const toggleCartEffect = () => {
    const showCart = ref(false)
    const handleCartShowChange = () => {
        showCart.value = !showCart.value;
    }
    return {showCart, handleCartShowChange}
}
```

### 去结算新增跳转

```html

<div class="check__btn">
    <router-link :to="{name: 'Home'}"> 去结算</router-link>
</div>
```

```scss
  &__btn {
  width: .98rem;
  background-color: #4FB0F9;
  text-align: center;
  font-size: .14rem;

  a {
    color: $bgColor;
    text-decoration: none;
  }
}
```

#### 去除跳转a标签下划线

> text-decoration: none;

### 短路运算符优化

> () && ()
>
> 前面括号为true 才执行后面括号内容

原函数

```js
 if (payload.num > 0) {
    product.check = true
}
```

优化后

```js
  (payload.num > 0) && (product.check = true)
```

### 其他写法优化

原函数

```js
      let shopInfo = state.cartList[shopId]      //  之前没存过商铺 就让商铺信息为空      if (!shopInfo) { shopInfo = {} }
```

优化后

```js
      const shopInfo = state.cartList[shopId] || {}
```

## 购物车数据结构的变更

![image-20210823152244978](https://gitee.com/sheep101/typora-img-save/raw/master/img/image-20210823152244978.png)

原来结构

```js
  state: {
    cartList: {      // 第一层级是商铺的id      // shopId: {      // 第二层是商品id      // 第二层内容是商品内容以及购物数量        productId: {          _id: '1',          name: '番茄250g/份',          imgUrl: 'http://www.dell-lee.com/imgs/vue3/tomato.png',          sales: 10,          price: 33.6,          oldPrice: 39.6,          count: 2        },      },    }  },
```

变更后结构

```js
    cartList: {
    shopId: {
        shopName: '沃尔玛', productList
    :
        {
            productId: {
                _id: '1', name
            :
                '番茄250g/份', imgUrl
            :
                'http://www.dell-lee.com/imgs/vue3/tomato.png', sales
            :
                10, price
            :
                33.6, oldPrice
            :
                39.6, count
            :
                2
            }
        }
    }
}
```

### 改变商铺名字

`shop.vue`组件中

```html

<Content :shopName="item.name"/>
```

`content.vue`组件中

```html

<div class="product__number"><span class="product__number__minus"
                                   @click="() => { changeCartItem(shopId, item._id, item, -1) }">-</span>
    {{cartList?.[shopId]?.[item._id]?.count || 0}} <span class="product__number__plus"
                                                         @click="() => { changeCartItem(shopId, item._id, item, 1) }">+</span>
</div>
```

```js
    const changeCartItem = (shopId, productId, item, num, shopName) => {      // 转发change 改变购物车数字之类的相关信息      changeCartItemInfo(shopId, productId, item, num)      // 修改 shopName      changeShopName(shopId, shopName)    }
```

```js
    const changeShopName = (shopId, shopName) => {
    store.commit('changeShopName', {shopId, shopName})
}
```

```js
    // 修改商店名称    changeShopName (state, payload) {      const { shopId, shopName } = payload      const shopInfo = state.cartList[shopId] || {        shopName: '', productList: {}      }      shopInfo.shopName = shopName      state.cartList[shopId] = shopInfo    },
```

### 修改changeCartItemInfo

```js
    changeCartItemInfo(state, payload)
{
    const {shopId, productId, productInfo} = payload
    let shopInfo = state.cartList[shopId] || {shopName: '', productList: {}}
    let product = shopInfo.productList[productId]
    if (!product) {
        productInfo.count = 0
        product = productInfo
    }
    product.count = product.count + payload.num
    if (payload.num > 0) {
        product.check = true
    }
    if (product.count < 0) {
        product.count = 0
    }
    shopInfo.productList[productId] = product
    state.cartList[shopId] = shopInfo
}
,
```

### 修改 cart。vue

```js
    const productList = cartList[shopId] || []
```

```js
    const productList = cartList[shopId]?.productList || []
```

## 优化代码

`content.vue`

```html

<div class="product__number"><span>-</span> {{getProductCartCount(shopId, item._id)}} <span>+</span></div>
```

```js
  const getProductCartCount = (shopId, productId) => {
    return cartList?.[shopId]?.productList?.[productId]?.count || 0
}
```

### 购物车相关逻辑

```js
// 购物车相关逻辑const useCartEffect = () => {  const store = useStore()  const { cartList, changeCartItemInfo } = useCommonCartEffect()  const changeShopName = (shopId, shopName) => {    store.commit('changeShopName', { shopId, shopName })  }  const changeCartItem = (shopId, productId, item, num, shopName) => {    changeCartItemInfo(shopId, productId, item, num)    changeShopName(shopId, shopName)  }  const getProductCartCount = (shopId, productId) => {    return cartList?.[shopId]?.productList?.[productId]?.count || 0  }  return { cartList, changeCartItem, getProductCartCount }}
```

### 流程管控

```js
export default {
    name: 'Content', props: ['shopName'], setup() {
        const route = useRoute()
        const shopId = route.params.id
        const {currentTab, handleTabClick} = useTabEffect()
        const {list} = useCurrentListEffect(currentTab, shopId)
        const {changeCartItem, cartList, getProductCartCount} = useCartEffect()
        return {categories, currentTab, handleTabClick, list, shopId, changeCartItem, cartList, getProductCartCount}
    }
}
```

### 公共购物车方法

`commonCartEffect.js`

```js
import {useStore} from 'vuex'// 购物车相关逻辑export const useCommonCartEffect = () => {  const store = useStore()  const cartList = store.state.cartList  const changeCartItemInfo = (shopId, productId, productInfo, num) => {    store.commit('changeCartItemInfo', {      shopId, productId, productInfo, num    })  }  return { cartList, changeCartItemInfo }}
```

## 通过 LocalStorage 实现购物车信息持久存储

### 存入本地

```js
const setLocalCartList = (state) => {
    const {cartList} = state
    const cartListString = JSON.stringify(cartList)
    localStorage.cartList = cartListString
}
```

### 获取本地

```js
const getLocaCartList = () => {  // { shopId: {shopName:'', productList:{ productId: {} }}}  return JSON.parse(localStorage.cartList) || {}}
```

```js
  state: {
    cartList: getLocaCartList()
}
,
```

## 购物车跳转

![image-20210823163222039](https://gitee.com/sheep101/typora-img-save/raw/master/img/image-20210823163222039.png)

### docker.vue

```html

<router-link :to="item.to">
    <div class="iconfont" v-html="item.icon"/>
    <div class="docker__title">{{item.text}}</div>
</router-link>
```

```scss
    // 跳转设置    a {      color: $content-fontcolor;      text-decoration: none;    }
```

```js
    const dockerList = [{icon: '&#xe6f3;', text: '首页', to: {name: 'Home'}}, {
    icon: '&#xe7e5;',
    text: '购物车',
    to: {name: 'CartList'}
}, {icon: '&#xe61e;', text: '订单', to: {name: 'Home'}}, {icon: '&#xe660;', text: '我的', to: {name: 'Home'}},];
```

### 路由配置

```js
,
{
    path: '/cartList', name
:
    'CartList', component
:
    () => import(/* webpackChunkName: "cartList" */ '../views/cartList/CartList')
}
```

# 第12章 核心购物链路开发

本章将会承上启下，以购物车为出发点，开始下单流程开发，帮助大家完成购物链路的完整开发。通过本章的学习，同学们可以完成一个比较完整的电商交易流程的开发。过程中进一步对代码进行拆解复用，帮助大家强化开发过程中的设计思想。

![image-20210823165414285](https://gitee.com/sheep101/typora-img-save/raw/master/img/image-20210823165414285.png)

## 确认订单页面创建及顶部布局

`cart.vue`

```html

<router-link :to="{path: `/orderConfirmation/${shopId}`}">
    去结算
</router-link>
```

`router`

```js
 {
    path: '/shop/:id',
        name
:
    'Shop',
        component
:
    () => import(/* webpackChunkName: "shop" */ '../views/shop/Shop')
}
,
```

### 订单组件-地址

![image-20210823170000667](https://gitee.com/sheep101/typora-img-save/raw/master/img/image-20210823170000667.png)

```vue

<template>
  <div class="wrapper">
    <div class="top">
      <div class="top__header">
        <div class="iconfont top__header__back">&#xe6f2;</div>
        确认订单
      </div>
      <div class="top__receiver">
        <div class="top__receiver__title">收货地址</div>
        <div class="top__receiver__address">北京理工大学国防科技园2号楼10层</div>
        <div class="top__receiver__info">
          <span class="top__receiver__info__name">瑶妹（先生）</span>
          <span class="top__receiver__info__name">18911024266</span>
        </div>
        <div class="iconfont top__receiver__icon">&#xe6f2;</div>
      </div>
    </div>
  </div>
</template>
```

```scss
  background-image:

linear-gradient
(
0
deg,

rgba
(
0
,
145
,
255
,
0.00
)
4
%, #0091FF

50
%)

;
```

```scss
<
style lang

=
"scss"
scoped >
.wrapper {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #eee;
}

.top {
  position: relative;
  height: 1.96rem;
  background-size: 100% 1.59rem;
  background-image: linear-gradient(0deg, rgba(0, 145, 255, 0.00) 4%, #0091FF 50%);
  background-repeat: no-repeat;

  &__header {
    position: relative;
    padding-top: .26rem;
    line-height: .24rem;
    color: #FFF;
    text-align: center;
    font-size: .16rem;

    &__back {
      position: absolute;
      left: .18rem;
      font-size: .22rem;
    }
  }

  &__receiver {
    position: absolute;
    left: .18rem;
    right: .18rem;
    bottom: 0;
    height: 1.11rem;
    background: #FFF;
    border-radius: .04rem;

    &__title {
      line-height: .22rem;
      padding: .16rem 0 .14rem .16rem;
      font-size: .16rem;
      color: #333;
    }

    &__address {
      line-height: .2rem;
      padding: 0 .4rem 0 .16rem;
      font-size: .14rem;
      color: #333;
    }

    &__info {
      padding: .06rem 0 0 .16rem;

      &__name {
        margin-right: .06rem;
        line-height: .18rem;
        font-size: .12rem;
        color: #666;
      }
    }

    &__icon {
      transform: rotate(180deg);
      position: absolute;
      right: .16rem;
      top: .5rem;
      color: #666;
      font-size: .2rem;
    }
  }
}

<
/
style >
```

### 订单组件-购物车布局

![image-20210823170940168](https://gitee.com/sheep101/typora-img-save/raw/master/img/image-20210823170940168.png)

```vue

<div class="products">
<div class="products__title">
  {{shopName}}
</div>
<div class="products__list">
  <div
      class="products__item"
      v-for="item in productList"
      :key="item._id"
  >
    <img class="products__item__img" :src="item.imgUrl"/>
    <div class="products__item__detail">
      <h4 class="products__item__title">{{item.name}}</h4>
      <p class="products__item__price">
              <span>
                <span class="products__item__yen">&yen; </span>
                {{item.price}} x {{item.count}}
              </span>
        <span class="products__item__total">
                 <span class="products__item__yen">&yen; </span>
                {{item.price * item.count}}
              </span>
      </p>
    </div>
  </div>
</div>
</div>
```

```scss
.products {
  margin: .16rem .18rem .55rem .18rem;
  background: #FFF;

  &__title {
    padding: .16rem .16rem 0 .16rem;
    font-size: .16rem;
    color: #333;
  }

  &__item {
    position: relative;
    display: flex;
    padding: .16rem;

    &__img {
      width: .46rem;
      height: .46rem;
      margin-right: .16rem;
    }

    &__detail {
      flex: 1;
    }

    &__title {
      margin: 0;
      line-height: .2rem;
      font-size: .14rem;
      color: $content-fontcolor;
      @include ellipsis;
    }

    &__price {
      display: flex;
      margin: .06rem 0 0 0;
      line-height: .2rem;
      font-size: .14rem;
      color: $hightlight-fontColor;
    }

    &__total {
      flex: 1;
      text-align: right;
      color: #000;
    }

    &__yen {
      font-size: .12rem;
    }
  }
}
```

## 订单商品列表数据获取

### 公共effects

`cartEffects.js`

```js
import {computed} from 'vue'
import {useStore} from 'vuex'
// 购物车相关逻辑
export const useCommonCartEffect = (shopId) => {
    const store = useStore()
    const cartList = store.state.cartList
    const changeCartItemInfo = (shopId, productId, productInfo, num) => {
        store.commit('changeCartItemInfo', {
            shopId, productId, productInfo, num
        })
    }
    const productList = computed(() => {
        const productList = cartList[shopId]?.productList || []
        return productList
    })

    const shopName = computed(() => {
        const shopName = cartList[shopId]?.shopName || ''
        return shopName
    })

    return {cartList, shopName, productList, changeCartItemInfo}
}

```

### 修改cart

```js
import {useCommonCartEffect} from '../../effects/cartEffects'
```

```js
import {computed, ref} from 'vue'
import {useStore} from 'vuex'
import {useRoute} from 'vue-router'
import {useCommonCartEffect} from '../../effects/cartEffects'
```

```js
  const {cartList, productList, changeCartItemInfo} = useCommonCartEffect(shopId)
```

```js
// 获取购物车信息逻辑const useCartEffect = (shopId) => {  const store = useStore()  const { cartList, productList, changeCartItemInfo } =    useCommonCartEffect(shopId)  const calculations = computed(() => {    const productList = cartList[shopId]?.productList    const result = { total: 0, price: 0, allChecked: true }    // 处理商品信息    if (productList) {      for (const i in productList) {        const product = productList[i]        result.total += product.count        // 处理是否勾选        if (product.check) {          result.price += product.count * product.price        }        // 处理全选状态        if (product.count > 0 && !product.check) {          result.allChecked = false        }      }    }    // 总价保留两位小数    result.price = result.price.toFixed(2)    return result  })  const changeCartItemChecked = (shopId, productId) => {    store.commit('changeCartItemChecked', { shopId, productId })  }  const cleanCartProducts = (shopId) => {    store.commit('cleanCartProducts', { shopId })  }  const setCartItemsChecked = (shopId) => {    store.commit('setCartItemsChecked', { shopId })  }  return {    calculations,    productList,    cleanCartProducts,    changeCartItemInfo,    changeCartItemChecked,    setCartItemsChecked  }}
```

```js
// 展示隐藏购物车逻辑const toggleCartEffect = () => {  const showCart = ref(false)  const handleCartShowChange = () => {    showCart.value = !showCart.value  }  return { showCart, handleCartShowChange }}
```

```js
export default {
    name: 'Cart', setup() {
        const route = useRoute()
        const shopId = route.params.id
        const {
            calculations,
            productList,
            cleanCartProducts,
            changeCartItemInfo,
            changeCartItemChecked,
            setCartItemsChecked
        } = useCartEffect(shopId)
        const {showCart, handleCartShowChange} = toggleCartEffect()
        return {
            calculations,
            shopId,
            productList,
            cleanCartProducts,
            changeCartItemInfo,
            changeCartItemChecked,
            setCartItemsChecked,
            showCart,
            handleCartShowChange
        }
    }
}
```

### orderCOnfirmation组件

```html

<div class="products">
    <div class="products__title"> {{shopName}}</div>
    <div class="products__list">
        <div class="products__item" v-for="item in productList" :key="item._id"><img class="products__item__img"
                                                                                     :src="item.imgUrl"/>
            <div class="products__item__detail"><h4 class="products__item__title">{{item.name}}</h4>
                <p class="products__item__price"><span>                <span class="products__item__yen">&yen; </span>                {{item.price}} x {{item.count}}              </span>
                    <span class="products__item__total">                 <span class="products__item__yen">&yen; </span>                {{item.price * item.count}}              </span>
                </p></div>
        </div>
    </div>
</div>
```

```html
              <span>                <span class="products__item__yen">&yen; </span>                {{item.price}} x {{item.count}}              </span>
<span class="products__item__total">                 <span class="products__item__yen">&yen; </span>                {{item.price * item.count}}              </span>
```

```js
import {useRoute} from 'vue-router'
import {useCommonCartEffect} from '../../effects/cartEffects'

export default {
    name: 'OrderConfirmation', setup() {
        const route = useRoute()
        const shopId = route.params.id
        const {shopName, productList} = useCommonCartEffect(shopId)
        return {shopName, productList}
    }
}
```

## 页面布局及展示逻辑开发

![image-20210823173212444](https://gitee.com/sheep101/typora-img-save/raw/master/img/image-20210823173212444.png)

```html

<div class="order">
    <div class="order__price"> 实付金额 <b>¥{{calculations.price}}</b></div>
    <div class="order__btn">提交订单</div>
</div>
```

```scss
.order {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  height: .49rem;
  line-height: .49rem;
  background: #FFF;

  &__price {
    flex: 1;
    text-indent: .24rem;
    font-size: .14rem;
    color: #333;
  }

  &__btn {
    width: .98rem;
    background: #4FB0F9;
    color: #fff;
    text-align: center;
    font-size: .14rem;
  }
}
```

## 确认订单页面组件拆分及弹框布局制作

### OrderConfirmation

```vue

<template>
  <div class="wrapper">
    <TopArea/>
    <ProductList/>
    <Order/>
  </div>
</template>
```

```js
import TopArea from './TopArea'
import ProductList from './ProductList'
import Order from './Order'

export default {name: 'OrderConfirmation', components: {TopArea, ProductList, Order},}
```

```scss
.wrapper {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #eee;
  overflow-y: scroll;
}
```

### TopArea

![image-20210824095701278](https://gitee.com/sheep101/typora-img-save/raw/master/img/image-20210824095701278.png)

```vue

<template>
  <div class="top">
    <div class="top__header">
      <div class="iconfont top__header__back" @click="handleBackClick">&#xe6f2;</div>
      确认订单
    </div>
    <div class="top__receiver">
      <div class="top__receiver__title">收货地址</div>
      <div class="top__receiver__address">北京理工大学国防科技园2号楼10层</div>
      <div class="top__receiver__info"><span class="top__receiver__info__name">瑶妹（先生）</span> <span
          class="top__receiver__info__name">18911024266</span></div>
      <div class="iconfont top__receiver__icon">&#xe6f2;</div>
    </div>
  </div>
</template>
```

```js
import {useRouter} from 'vue-router'

export default {
    name: 'TopArea', setup() {
        const router = useRouter()
        const handleBackClick = () => {
            router.back()
        }
        return {handleBackClick}
    }
}
```

```scss
@import '../../style/viriables.scss';

.top {
  position: relative;
  height: 1.96rem;
  background-size: 100% 1.59rem;
  background-image: linear-gradient(0deg, rgba(0, 145, 255, 0.00) 4%, #0091FF 50%);
  background-repeat: no-repeat;

  &__header {
    position: relative;
    padding-top: .26rem;
    line-height: .24rem;
    color: $bgColor;
    text-align: center;
    font-size: .16rem;

    &__back {
      position: absolute;
      left: .18rem;
      font-size: .22rem;
    }
  }

  &__receiver {
    position: absolute;
    left: .18rem;
    right: .18rem;
    bottom: 0;
    height: 1.11rem;
    background: $bgColor;
    border-radius: .04rem;

    &__title {
      line-height: .22rem;
      padding: .16rem 0 .14rem .16rem;
      font-size: .16rem;
      color: $content-fontcolor;
    }

    &__address {
      line-height: .2rem;
      padding: 0 .4rem 0 .16rem;
      font-size: .14rem;
      color: $content-fontcolor;
    }

    &__info {
      padding: .06rem 0 0 .16rem;

      &__name {
        margin-right: .06rem;
        line-height: .18rem;
        font-size: .12rem;
        color: $medium-fontColor;
      }
    }

    &__icon {
      transform: rotate(180deg);
      position: absolute;
      right: .16rem;
      top: .5rem;
      color: $medium-fontColor;
      font-size: .2rem;
    }
  }
}
```

### ProductList

![image-20210824095919457](https://gitee.com/sheep101/typora-img-save/raw/master/img/image-20210824095919457.png)

```vue

<template>
  <div class="products">
    <div class="products__title"> {{shopName}}</div>
    <div class="products__wrapper">
      <div class="products__list">
        <template v-for="item in productList" :key="item._id">
          <div v-if="item.count > 0" class="products__item"><img class="products__item__img" :src="item.imgUrl"/>
            <div class="products__item__detail"><h4 class="products__item__title">{{item.name}}</h4>
              <p class="products__item__price"><span>                <span class="products__item__yen">&yen; </span>                {{item.price}} x {{item.count}}              </span>
                <span class="products__item__total">                <span class="products__item__yen">&yen; </span>                {{(item.price * item.count).toFixed(2)}}              </span>
              </p></div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
```

```js
import {useRoute} from 'vue-router'
import {useCommonCartEffect} from '../../effects/cartEffects'

export default {
    name: 'ProductList', setup() {
        const route = useRoute()
        const shopId = route.params.id
        const {shopName, productList} = useCommonCartEffect(shopId)
        return {shopName, productList}
    }
}
```

```scss
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';

.products {
  margin: .16rem .18rem .1rem .18rem;
  background: $bgColor;

  &__title {
    padding: .16rem;
    font-size: .16rem;
    color: $content-fontcolor;
  }

  &__wrapper {
    overflow-y: scroll;
    margin: 0 .18rem;
    position: absolute;
    left: 0;
    right: 0;
    bottom: .6rem;
    top: 2.6rem;
  }

  &__list {
    background: $bgColor;
  }

  &__item {
    position: relative;
    display: flex;
    padding: 0 .16rem 0.16rem .16rem;

    &__img {
      width: .46rem;
      height: .46rem;
      margin-right: .16rem;
    }

    &__detail {
      flex: 1;
    }

    &__title {
      margin: 0;
      line-height: .2rem;
      font-size: .14rem;
      color: $content-fontcolor;
      @include ellipsis;
    }

    &__price {
      display: flex;
      margin: .06rem 0 0 0;
      line-height: .2rem;
      font-size: .14rem;
      color: $hightlight-fontColor;
    }

    &__total {
      flex: 1;
      text-align: right;
      color: $dark-fontColor;
    }

    &__yen {
      font-size: .12rem;
    }
  }
}
```

### Order

![image-20210824100147914](https://gitee.com/sheep101/typora-img-save/raw/master/img/image-20210824100147914.png)

```vue

<template>
  <div class="order">
    <div class="order__price">实付金额 <b>¥{{calculations.price}}</b></div>
    <div class="order__btn">提交订单</div>
  </div>
</template>
```

```js
import {useRoute} from 'vue-router'
import {useCommonCartEffect} from '../../effects/cartEffects'

export default {
    name: 'Order', setup() {
        const route = useRoute()
        const shopId = route.params.id
        const {calculations} = useCommonCartEffect(shopId)
        return {calculations}
    }
}
```

```scss
@import '../../style/viriables.scss';

.order {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  height: .49rem;
  line-height: .49rem;
  background: $bgColor;

  &__price {
    flex: 1;
    text-indent: .24rem;
    font-size: .14rem;
    color: $content-fontcolor;
  }

  &__btn {
    width: .98rem;
    background: #4FB0F9;
    color: #fff;
    text-align: center;
    font-size: .14rem;
  }
}
```

### 弹框也放在order中

![image-20210824100531268](https://gitee.com/sheep101/typora-img-save/raw/master/img/image-20210824100531268.png)

```vue

<div class="mask">
<div class="mask__content"><h3 class="mask__content__title">确认要离开收银台？</h3>
  <p class="mask__content__desc">请尽快完成支付，否则将被取消</p>
  <div class="mask__content__btns">
    <div class="mask__content__btn mask__content__btn--first" @click="handleCancelOrder">取消订单</div>
    <div class="mask__content__btn mask__content__btn--last" @click="handleConfirmOrder">确认支付</div>
  </div>
</div>
</div>
```

```js
import {useRoute} from 'vue-router'
import {useCommonCartEffect} from '../../effects/cartEffects'

export default {
    name: 'Order', setup() {
        const route = useRoute()
        const shopId = route.params.id
        const {calculations} = useCommonCartEffect(shopId)
        const handleCancelOrder = () => {
            alert('cancel')
        }
        const handleConfirmOrder = () => {
            alert('confirm')
        }
        return {calculations, handleCancelOrder, handleConfirmOrder}
    }
}
```

```scss
.mask {
  z-index: 1;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.50);

  &__content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 3rem;
    height: 1.56rem;
    background: #FFF;
    text-align: center;
    border-radius: .04rem;

    &__title {
      margin: .24rem 0 0 0;
      line-height: .26rem;
      font-size: .18rem;
      color: #333;
    }

    &__desc {
      margin: .08rem 0 0 0;
      font-size: .14rem;
      color: #666666;
    }

    &__btns {
      display: flex;
      margin: .24rem .58rem;
    }

    &__btn {
      flex: 1;
      width: .8rem;
      line-height: .32rem;
      border-radius: .16rem;
      font-size: .14rem;

      &--first {
        margin-right: .12rem;
        border: .01rem solid #4FB0F9;
        color: #4FB0F9;
      }

      &--last {
        margin-left: .12rem;
        background: #4FB0F9;
        color: #fff;
      }
    }
  }
}
```

## 购物流程开发完成

### 确认支付

```vue

<div class="mask__content__btn mask__content__btn--first" @click="() => handleConfirmOrder(true)">取消订单</div>
<div class="mask__content__btn mask__content__btn--last" @click="() => handleConfirmOrder(false)">确认支付</div>
```

```js
    const handleConfirmOrder = async (isCanceled) => {
    const products = []      // 循环参数获取product程序      for (const i in productList.value) {        const product = productList.value[i]        products.push({ id: parseInt(product._id, 10), num: product.count })      }      try {        const result = await post('/api/order', {          addressId: 1,          shopId,          shopName: shopName.value,          isCanceled,          products        })        if (result?.errno === 0) {          // 清除购物车中商店的信息          store.commit('clearCartData', shopId)          router.push({ name: 'Home' })        }      } catch (e) {        // 提示下单失败      }    }
```

```js
    clearCartData(state, shopId)
{
    state.cartList[shopId].productList = {}
}
```

### order 优化

```vue

<template>
  <div class="order">
    <div class="order__price">实付金额 <b>¥{{calculations.price}}</b></div>
    <div class="order__btn" @click="() => handleShowConfirmChange(true)">提交订单</div>
  </div>
  <div class="mask" v-show="showConfirm" @click="() => handleShowConfirmChange(false)">
    <div class="mask__content" @click.stop><h3 class="mask__content__title">确认要离开收银台？</h3>
      <p class="mask__content__desc">请尽快完成支付，否则将被取消</p>
      <div class="mask__content__btns">
        <div class="mask__content__btn mask__content__btn--first" @click="() => handleConfirmOrder(true)">取消订单</div>
        <div class="mask__content__btn mask__content__btn--last" @click="() => handleConfirmOrder(false)">确认支付</div>
      </div>
    </div>
  </div>
</template>
```

```js
import {ref} from 'vue'
import {useRouter, useRoute} from 'vue-router'
import {useStore} from 'vuex'
import {post} from '../../utils/request'
import {useCommonCartEffect} from '../../effects/cartEffects'
```

```js
// 下单相关逻辑const useMakeOrderEffect = (shopId, shopName, productList) => {  const router = useRouter()  const store = useStore()  const handleConfirmOrder = async (isCanceled) => {    const products = []    for(let i in productList.value) {      const product = productList.value[i]      products.push({id: parseInt(product._id, 10), num: product.count})    }    try {      const result = await post('/api/order', {        addressId: 1,        shopId,        shopName: shopName.value,        isCanceled,        products      })      if (result?.errno === 0) {        store.commit('clearCartData', shopId)        router.push({ name: 'OrderList' })      }     } catch (e) {      // 提示下单失败    }  }  return { handleConfirmOrder }}
```

```js
// 蒙层展示相关的逻辑const useShowMaskEffect = () => {  const showConfirm = ref(false)  const handleShowConfirmChange = (status) => {    showConfirm.value = status  }  return { showConfirm, handleShowConfirmChange }}
```

```js
export default {
    name: 'Order', setup() {
        const route = useRoute()
        const shopId = parseInt(route.params.id, 10)
        const {calculations, shopName, productList} = useCommonCartEffect(shopId)
        const {handleConfirmOrder} = useMakeOrderEffect(shopId, shopName, productList)
        const {showConfirm, handleShowConfirmChange} = useShowMaskEffect()
        return {showConfirm, handleShowConfirmChange, calculations, handleConfirmOrder}
    }
}
```

## 订单列表页布局开发

### orderList

![image-20210824104641349](https://gitee.com/sheep101/typora-img-save/raw/master/img/image-20210824104641349.png)

```vue

<template>
  <div class="wrapper">
    <div class="title">我的订单</div>
    <div class="orders">
      <div class="order" v-for="(item, index) in list" :key="index">
        <div class="order__title"> {{item.shopName}} <span class="order__status">            {{item.isCanceled ? '已取消' : '已下单'}}          </span>
        </div>
        <div class="order__content">
          <div class="order__content__imgs">
            <template v-for="(innerItem, innerIndex) in item.products" :key="innerIndex"><img
                class="order__content__img" :src="innerItem.product.img" v-if="innerIndex <= 3"/></template>
          </div>
          <div class="order__content__info">
            <div class="order__content__price">¥ {{item.totalPrice}}</div>
            <div class="order__content__count">共 {{item.totalNumber}} 件</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Docker :currentIndex="2"/>
</template>
```

```scss
<
style lang

=
"scss"
scoped >

@import '../../style/viriables.scss';
.wrapper {
  overflow-y: auto;
  position: absolute;
  left: 0;
  top: 0;
  bottom: .5rem;
  right: 0;
  background: rgb(248, 248, 248);
}

.title {
  line-height: .44rem;
  background: $bgColor;
  font-size: .16rem;
  color: $content-fontcolor;
  text-align: center;
}

.order {
  margin: .16rem .18rem;
  padding: .16rem;
  background: $bgColor;

  &__title {
    margin-bottom: .16rem;
    line-height: .22rem;
    font-size: .16rem;
    color: $content-fontcolor;
  }

  &__status {
    float: right;
    font-size: .14rem;
    color: $light-fontColor;
  }

  &__content {
    display: flex;

    &__imgs {
      flex: 1;
    }

    &__img {
      width: .4rem;
      height: .4rem;
      margin-right: .12rem;
    }

    &__info {
      width: .7rem;
    }

    &__price {
      margin-bottom: .04rem;
      line-height: .2rem;
      font-size: .14rem;
      color: $hightlight-fontColor;
      text-align: right;
    }

    &__count {
      line-height: .14rem;
      font-size: .12rem;
      color: $content-fontcolor;
      text-align: right;
    }
  }
}

<
/
style >
```

### 将Home下的Docker 放在 公共component里

### 修改docker

```js
  name: 'Docker', props
:
['currentIndex'], setup()
{
    const dockerList = [{icon: '&#xe6f3;', text: '首页', to: {name: 'Home'}}, {
        icon: '&#xe7e5;',
        text: '购物车',
        to: {name: 'CartList'}
    }, {icon: '&#xe61e;', text: '订单', to: {name: 'OrderList'}}, {icon: '&#xe660;', text: '我的', to: {name: 'Home'}}]
    return {dockerList}
}
}
```

```html

<div v-for="(item, index) in dockerList" :class="{'docker__item': true, 'docker__item--active': index === currentIndex}"
     :key="item.icon">
```

### 修改home

```html

<Docker :currentIndex="0"/>
```

## 订单列表逻辑开发

![image-20210824104935847](https://gitee.com/sheep101/typora-img-save/raw/master/img/image-20210824104935847.png)

```html

<template>
    <div class="wrapper">
        <div class="title">我的订单</div>
        <div class="orders">
            <div class="order" v-for="(item, index) in list" :key="index">
                <div class="order__title"> {{item.shopName}} <span class="order__status">            {{item.isCanceled ? '已取消' : '已下单'}}          </span>
                </div>
                <div class="order__content">
                    <div class="order__content__imgs">
                        <template v-for="(innerItem, innerIndex) in item.products" :key="innerIndex"><img
                                class="order__content__img" :src="innerItem.product.img" v-if="innerIndex <= 3"/>
                        </template>
                    </div>
                    <div class="order__content__info">
                        <div class="order__content__price">¥ {{item.totalPrice}}</div>
                        <div class="order__content__count">共 {{item.totalNumber}} 件</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Docker :currentIndex="2"/>
</template>
```

```js
import {reactive, toRefs} from 'vue'
import {get} from '../../utils/request'
import Docker from '../../components/Docker'
```

```js
// 处理订单列表逻辑const useOrderListEffect = () => {  const data = reactive({ list: [] })  const getNearbyList = async () => {    const result = await get('/api/order')    if (result?.errno === 0 && result?.data?.length) {      const orderList = result.data      orderList.forEach((order) => {        const products = order.products || []        let totalPrice = 0        let totalNumber = 0        products.forEach((productItem) => {          totalNumber += (productItem?.orderSales || 0)          totalPrice += ((productItem?.product?.price * productItem?.orderSales) || 0)        })        order.totalPrice = totalPrice        order.totalNumber = totalNumber      })      data.list = result.data    }  }  getNearbyList()  const { list } = toRefs(data)  return { list }}
```

```js
export default {
    name: 'OrderList', components: {Docker}, setup() {
        const {list} = useOrderListEffect()
        return {list}
    }
}
```

# 第13章 真机调试及工程发布流程

本章将会带大家通过真实手机进行项目的测试，发现测试中的问题，进行问题的解决处理，在测试无误后，带大家了解开发后的代码发布流程，帮助大家理解 Vue 项目发布的基本原理。本章内容学习过后，大家对 Vue3
的开发，调试，上线，将具备全面丰富的理解。

## 如何进行真机调试

访问局域网地址

![image-20210824110125436](https://gitee.com/sheep101/typora-img-save/raw/master/img/image-20210824110125436.png)

## 解决真机调试过程中的展示问题

### 光标太大

![image-20210824110418301](https://gitee.com/sheep101/typora-img-save/raw/master/img/image-20210824110418301.png)

```scss
//原来
&__content {
  line-height: .48rem;
```

```scss
//改进
&__content {
  margin-top: .12rem;
  line-height: .22rem;
```

```scss
  &__input {
  height: .48rem;
  margin: 0 .4rem .16rem .4rem;
  padding: 0 .16rem;
  background: #F9F9F9;
  border: 1px solid rgba(0, 0, 0, 0.10);
  border-radius: 6px;
  border-radius: 6px;

  &__content {
    margin-top: .12rem;
    line-height: .22rem;
    border: none;
    outline: none;
    width: 100%;
    background: none;
    font-size: .16rem;
    color: $content-notice-fontcolor;

    &::placeholder {
      color: $content-notice-fontcolor;
    }
  }
}
```

### store 存取

```js
const setLocalCartList = (state) => {
    const {cartList} = state
    const cartListString = JSON.stringify(cartList)
    localStorage.cartList = cartListString
}

const getLocaCartList = () => {
    // { shopId: {shopName:'', productList:{ productId: {} }}}
    try {
        return JSON.parse(localStorage.cartList);
    } catch (e) {
        return {}
    }
}
```

## 实现项目对不同设备的展示适配

### 使用 rem 布局

### 基于 style/base.scss

```scss
html {
  font-size: 100px;
}

body {
  font-size: .12rem;
}
```

### 动态变化

在入口` public/index.html `文件中 写入 script

```js
      // 获取屏幕大小
var width = document.documentElement.clientWidth || document.body.clientWidth;
// 由于我们是基于375像素开发的 获取比例
var ratio = width / 375;
var fontSize = 100 * ratio;
document.getElementsByTagName('html')[0].style['font-size'] = fontSize + 'px';
```



