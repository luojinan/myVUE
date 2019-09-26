// var Compile = require('./compile') // 解析dom指令
// var {observe} = require('./observer') // 数据劫持（监听器）

// options：data-所有数据对象 methods-自定义指令事件 el-整个dom
function MYVUE(options) {
  this.el = options.el  // 只是一个字符串，并不是一个dom
  this.data = options.data
  this.methods = options.methods

  this.dep = {}

  _observe(this.data,this) // 数据劫持函数（遍历data数据对象）

  console.dir(document.querySelector(this.el))// 注意console.dir不支持写字符串来标注
  let doms = this.el.children
  // el.innerHTML = this.data[exp];  // 初始化模板数据的值
  new Watcher(this, 'title', function (value) {
    console.log('执行watcher');
      doms[1].innerHTML = value; // 先不实现变量的data操作dom，而是写是dom
      console.log('value,dep',value,dep);
  });
  // return this // 为什么要return this？
  // observe(this.data);
  // new Compile(options.el, this);
}

/******************** 数据劫持-遍历data对象 *********************/
function _observe(data,vm) {
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      // 重构订阅器容器
      vm.dep[key] = []

      console.log('遍历数据对象data中的key值-->', key)
      // 根据每个key值,对data数据做重构响应操作
      // (劫持后操作,利用Object.defineProperty)
      defineReactive(data, key,data[key])
    }
  }
  console.log('劫持后的data-->',data)  // 执行这里可以看有getset属性的对象值
  console.log('劫持后的dep-->',vm.dep)  // 执行这里可以看有getset属性的对象值
}

// 定义数据的监听**响应**
function defineReactive(data, key, val) {
  Object.defineProperty(data, key, {
    get() {
      console.log(`${key}属性被读取了...`);
      return val;
    },
    set(newVal) {
      console.log(`${key}属性从${val}被修改成了${newVal}`)
      val = newVal;
    }
  })
}

/******************** 消息订阅器-自动化澡盆(容器-数组) *********************/
// function Dep(){
//   this.watchers = []  // 定义容器(澡盆-数组)
// }
// // 给容器添加事件(自动化+内容)
// Dep.prototype = {
//   addItem(item){  // 往容器加内容
//     this.watchers.push(item)
//   },
//   notify(){
//     this.watchers.forEach(item=>{
//       item.updata() // 调用澡盆中的人清洗(更新xxx)事件
//     })
//   }
// }

/******************** 订阅者/观察者(更新dom等) *********************/
function Watcher(vm,key,cb){
  this.val = vm.data[key] // 观察者具有1、值 2、dom操作data改变视图事件
  console.log('执行watcher构造函数',vm,key,cb);
  vm.dep[key].push(this)  // 把自身存入dep对应的数组
  this.cb = cb
}


module.exports = MYVUE