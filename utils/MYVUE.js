// var Compile = require('./compile') // 解析dom指令
// var {observe} = require('./observer') // 数据劫持（监听器）

// options：data-所有数据对象 methods-自定义指令事件 el-整个dom
function MYVUE(options) {
  this.el = options.el  // 只是一个字符串，并不是一个dom
  this.data = options.data
  this.methods = options.methods

  this.dep = {}

  _observe(this.data,this) // 数据劫持函数（遍历data数据对象）

  new Compile(this,this.el)

  // console.dir(document.querySelector(this.el))// 注意console.dir不支持写字符串来标注
  // let doms = document.querySelector(this.el).children
  // doms[1].innerHTML = this.data.title;  // 初始化模板数据的值

  // new Watcher(this, 'title', (value)=>{
  //   console.log('执行callback，此时doms和val',doms,value);
  //     doms[1].innerHTML = value; // 先不实现变量的data操作dom，而是写死dom
  // });
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
      defineReactive(key,data[key],vm)
    }
  }
  console.log('劫持后的data-->',data)  // 执行这里可以看有getset属性的对象值
  console.log('劫持后的dep-->',vm.dep)  // 执行这里可以看有getset属性的对象值
}

// 定义数据的监听**响应**
function defineReactive(key, val,vm) {
  Object.defineProperty(vm.data, key, {
    get() {
      console.log(`${key}属性被读取了...`);
      return val;
    },
    set(newVal) {
      console.log(`${key}属性从${val}被修改成了${newVal}`)
      val = newVal;
      vm.dep[key].forEach((item)=>{
        item.cb(val)
      })
      // console.log('触发set()后订阅器和data',vm.dep,vm.data)
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
  console.log('执行watcher构造函数',key,vm.dep[key]);
  vm.dep[key].push(this)  // 把自身存入dep对应的数组
  this.cb = cb
}

/******************** 解析器，解析dom *********************/
function Compile(vm,el){
  this.fragment = null
  this.vm = vm;
  this.el = document.querySelector(el)  // 传入进来的el是个字符串

  this.init()
}

Compile.prototype = {
  init(){
    console.log('run new Compile init',this.el);
    if(this.el){
      // 初始化到dom片段中，做dom操作
      this.fragment = this.domToFragment(this.el)
      this.compileElement(this.fragment)  // 解析指令(找到dom执行操作)
      this.el.appendChild(this.fragment)
    }else console.log('Dom元素不存在')
  },
  domToFragment(el){
    let fragment = document.createDocumentFragment()  // 创建dom片段
    let firstDom = el.firstChild  // 不取dom数组，而是取第一个dom
    while(firstDom){
      fragment.appendChild(firstDom) // firstDoms是真实dom，移入片段后，会消失
      firstDom = el.firstChild // el中的真实dom减少了，更新一下变量为下一个dom
    }
    console.log('移动完成的dom片段',fragment)
    console.log('移动完成后的真实dom',el)
    return fragment   // 要把这个dom传出去
  },
  compileElement(dom){
    let childDoms = dom.childNodes
    // 教程里，不能直接用这个dom数组，要拷贝一份来操作（问题是也没有直接操作它啊）
    console.log('解析dom',childDoms);
    childDoms.forEach((item)=>{
      let reg = /\{\{(.*)\}\}/    // 正则{{}}
      let domContent = item.textContent   // dom标签里的内容
      // console.log(item.nodeType == 1,'是否元素节点');
      if(reg.test(domContent)) {  // 判断是否是符合这种形式{{}}的指令
        this.compileText(item, reg.exec(domContent)[1])   // 1、dom 2、变量key
      }
      if(item.nodeType == 1) this.compileAttr(item)
    })
  },
  compileText(dom,key){
    console.log('执行到替换{{}}的值',this,this.vm);
    // 变量key对应的值--this是MYVUE实例（在prototype里的函数this是构造函数的外层而不是构造函数本身）
    let value = this.vm.data[key]
    dom.textContent = value?value:''
    new Watcher(this.vm, key, (value)=>{
      console.log('触发{{}}的set');
      console.log('执行callback，此时doms和val',dom,value);
      dom.innerHTML = value;
    });
  },
  compileAttr(dom){
    let attrs = dom.attributes  // 标签所有属性，数组
    console.log('获取dom属性指令',attrs)
    // attrs.forEach((item)=>{
    Array.prototype.forEach.call(attrs, (item)=>{
      let arrtName = item.name  // 属性名
      console.log(item.name,'遍历dom属性名');
      if(arrtName.indexOf('v-') == 0){
        let dir = arrtName.substring(2)   // dir--指令
        let key = item.value  // 属性值，key
        console.log('dir',dir);
        if(dir == 'model') this.compileModel(dom,key)   // 执行初始化和创建订阅者，设置callback改变dom
      }
    })
  },
  compileModel(dom,key){
    let value = this.vm.data[key]
    // 初始化dom，input的可以v-model的标签，都是直接dom.value
    dom.value = value ? value :''
    // 创建订阅者观察者，设置callback
    console.log(this.vm,'v-model');
    new Watcher(this.vm,key,(value)=>{
      console.log('触发v-model的set');
      dom.value = value ? value :''
    })
    // v-model的标签把事件也封装起来，不需要用户自己写
    dom.addEventListener('input',(e)=>{
      let newVal = e.target.value
      if(value == newVal) return
      val = newVal 
      this.vm.data[key] = val
    })
  }
}


module.exports = MYVUE