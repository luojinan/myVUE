import Watcher from './Watcher'
/**
 * 解析dom指令
 *  1. 创建dom片段
 *  2. 遍历解析dom（解析出来并不直接操作，而是创建watcher->初始化、更新）
 *  3. 遍历创建watcher
 */

class Complier {
  constructor(el, vm) {
    this.el = document.querySelector(el) // 传入进来的el是字符串
    this.vm = vm

    // 遍历解析dom
    this.frag = this._creatFragment()

    this._recursive(this.frag)

    this.el.appendChild(this.frag)
  }
  // 创建dom片段，遍历存入dom，同时遍历解析dom
  _creatFragment() {
    let frag = document.createDocumentFragment()
    let childDom
    // while(条件) 这里条件是childDom，做多了赋值这一部，当赋值为空时，中断遍历
    while (childDom = this.el.firstChild) {
      // this._complier(childDom) // 此处的dom是 片段中的dom而不是el中的dom
      frag.appendChild(childDom) //会移除this.el.firstChild
    }
    return frag
  }
  // 递归执行遍历
  _recursive(doms) {
    // 根据dom片段最外层遍历做遍历次数，操作解析dom
    Array.from(doms.childNodes).forEach(domItem => {
      this._complier(domItem)
      // 当dom有多层级的时候，用是否有childNodes来判断，做递归
      if (domItem.childNodes) {
        this._recursive(domItem) // 递归执行自身，递归结束才会执行该递归的下一步（恢复dom）
      }
    })
  }

  _complier(dom) {
    if (dom.nodeType === 1) {
      // console.log('有标签属性的dom',dom.attributes.hasOwnProperty('v-model'))
      if (dom.attributes.hasOwnProperty('v-model')) {
        // 获取到v-属性的变量key
        // dom标签属性数组中的属性是个对象
        // console.log(typeof(dom.attributes['v-model']),'dom标签属性是什么type');
        console.log(dom.attributes['v-model'].nodeValue, 'v-model后的变量key值');
        const key = dom.attributes['v-model'].nodeValue
        // 以下是针对v-model标签做的封装1、复制dom 2、绑定input事件
        dom.value = this.vm[key]
        // 事件绑定input
        dom.addEventListener('input', e => {
          this.vm[key] = e.target.value
        })
      }
    }
    // 有内容或者直接文本的dom
    if (dom.nodeType === 3) {
      // dom.nodeValue 和 dom.textContent的区别？都是获取don的文本内容
      let domContent = dom.textContent
      const reg = /\{\{(.*)\}\}/
      if (reg.test(domContent)) {
        // reg.exec(domContent)[1] 和 reg.$1.trim()的区别？收拾获取正则匹配中间的内容
        let key = reg.exec(domContent)[1]
        // 初始化dom
        dom.nodeValue = this.vm[key]
        // 创建watcher
        new Watcher(dom, key, this.vm)
      }
    }
  }
}

export default Complier