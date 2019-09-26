var MYVUE = require('./utils/MYVUE.js') // 引入VUE构造函数

let obj = {
  el: '#myvue-app', // 传入整个vue项目(单页面)的dom
  /**
   * 👇data是全局变量的集合，不同于组件内使用data(){return {}}
   * 本分析暂时不做项目工程化模块化的分析，此处只分析直接使用对象的data情况
   * 
   * 参考：
   *    《组件中 data 为什么是一个函数》
   *    (https://juejin.im/post/5d59f2a451882549be53b170#heading-13)
   */
  data: {
    title: 'hello world'
  },
  // 原始前端项目操作dom触发事件，vue项目中给dom写个自定义指令且事件写在methods中触发
  methods: {
    clickBtn: function (e) {
      this.title = 'hello world'
    }
  }
}

var vm = new MYVUE(obj) // 创建的VUE实例类，传入参数对象包括{整个dom、整个data、整个事件...}

obj.data.title = '修改data的值'
