!function(e){var t={};function o(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.m=e,o.c=t,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(n,r,function(t){return e[t]}.bind(null,r));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=0)}([function(e,t,o){let n={el:"#myvue-app",data:{title:"hello world"},methods:{clickBtn:function(e){this.title="hello world"}}};new(o(1))(n);n.data.title="修改data的值"},function(e,t){function o(e,t,o){Object.defineProperty(e,t,{get:()=>(console.log(`${t}属性被读取了...`),o),set(e){console.log("key",t),console.log("newVal",e),console.log("val",o),console.log(`${t}属性从${o}被修改成了${e}`),o=e}})}console.log("引入js成功"),e.exports=function(e){this.data=e.data,this.methods=e.methods,function(e){for(const t in e)e.hasOwnProperty(t)&&(console.log("遍历数据对象data中的key值",t),o(e,t,e[t]));console.log("劫持后的data",e)}(this.data)}}]);