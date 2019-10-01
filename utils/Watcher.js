import Dep from "./Dep"

/**
 * 接收dom，key  还有整个vm
 * 1、把自身push进对应的Dep订阅器（数据劫持遍历创建了dep但是没有内容）
 * 2、更新事件
 */


class Watcher {
  constructor(dom,key,vm){
    this.dom = dom
    this.key = key
    this.vm = vm

    Dep.setTarget(this)

    this.update()

    Dep.setTarget(null)
  }
  update(){
    // dom.nodeValue 和 dom.textContent的区别？都是赋值dom的内容文本
    this.dom.nodeValue = this.vm[this.key]
  }
}

export default Watcher