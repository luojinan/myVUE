import Watcher from './Watcher'
/**
 * 解析dom指令
 *  1. 创建dom片段
 *  2. 遍历解析dom（解析出来并不直接操作，而是创建watcher->初始化、更新）
 *  3. 遍历创建watcher
 */

class Complier {
  constructor(el,vm){
    this.el = document.querySelector(el)  // 传入进来的el是字符串
    this.vm = vm

    // 遍历解析dom
    this.frag = this._creatFragment()
  }
  // 创建dom片段，遍历存入dom，同时遍历解析dom
  _creatFragment(){
    let frag = document.createDocumentFragment()
    let childDom
    // while(条件) 这里条件是childDom，做多了赋值这一部，当赋值为空时，中断遍历
    while(childDom = this.el.firstChild){
      this._complier(childDom)  // 此处的dom是 片段中的dom而不是el中的dom
      frag.appendChild(childDom)  //会移除this.el.firstChild
    }

    this.el.appendChild(frag)
  }
  _complier(dom){
    if(dom.nodeType===1){

    }
    // 有内容或者直接文本的dom
    if(dom.nodeType===3){
      // dom.nodeValue 和 dom.textContent的区别？都是获取don的文本内容
      let domContent = dom.textContent
      const reg = /\{\{(.*)\}\}/
      if(reg.test(domContent)){
        // reg.exec(domContent)[1] 和 reg.$1.trim()的区别？收拾获取正则匹配中间的内容
        let key = reg.exec(domContent)[1]
        // 初始化dom
        dom.nodeValue = this.vm[key]
        // 创建watcher
        new Watcher(dom,key,this.vm)
      }
    }
  }
}

export default Complier