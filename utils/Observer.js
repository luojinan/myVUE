import Dep from './Dep'

// new这个类的时候传入的是data
class Observe {
  constructor(data){
    this.data = data

    // 遍历数据对象data，做数据劫持
    for(let key in this.data){
      this._bind(key,data[key]) // 为什么不用this.data[key]
    }
  }

  _bind(key,val){
    let myDep = new Dep()

    // 为什么不用this.data
    Object.defineProperty(data,key,{
      get(){
        // 把key相关的watcher存入订阅器容器
        // Dep.target作为watcher的暂存变量，同时作为标志符
        if(Dep.target)  myDep.listen(Dep.target)
        return val
      },
      set(newVal){
        if(newVal = val) return 
        val = newVal

        // 触发执行订阅者/观察者watcher的upload
        myDep.notify()
      }
    })
  }
}

export default Observe