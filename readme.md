### VUE双向数据绑定原理分析

- 数据劫持
- 订阅器容器收集多个观察者(dom)
- data数据通过`dom编写事件`改变视图
- dom通过`交互事件`赋值data
