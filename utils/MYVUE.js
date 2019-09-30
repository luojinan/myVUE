import Observer from './Observer'
import Complier from './Complier'

class MYVUE{
  constructor(options){
    // new实例的时候传入的参数在constructor获取
    this.$options = options
    this.$el = this.$options.el
    this._data = this.$options.data

    // 遍历数据代理
    for(let key in this._data){
      this._proxy(key)
    }
    console.log('数据代理前数据',this._data.title)
    console.log('数据代理后数据',this.title)
    new Observer(this._data)  // 数据劫持
    new Complier(this.$el,this) // 解析dom指令(并创建)
  }
  // 遍历数据代理
  // 使用vm.xxx 代替 vm._data.xxx或者vm.$options.data.xxx
  _proxy(key){
    Object.defineProperty(this,key,{
      get(){
        return this._data[key]
      },
      set(newVal){
        this._data[key] = newVal
      }
    })
  }
}

export default MYVUE




