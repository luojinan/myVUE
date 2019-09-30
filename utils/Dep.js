class Dep {
  // 赋值变量target一个watcher的地方在解析dom创建watcher的时候
  static target = null  // 初始值为null，作为判断标志符
  
  constructor(){
    // 创建容器数组
    this.watcherList = []
  }
  
  // 触发把所有数据key相关的watcher存入订阅器容器
  listen(watcher){
    this.watcherList.push(watcher)
  }
  // 遍历触发数组中所有观察者的更新事件
  notify(){
    this.watcherList.forEach(item=>{
      item.updata()
    })
  }
}

export default Dep