```
├─api                   // 网路请求代码、工具类函数和相关配置
├─application           // 项目核心功能
├─assets                // 字体配置及全局样式
├─baseUI                // 基础 UI 轮子
├─components            // 可复用的 UI 组件
├─routes                // 路由配置文件
└─store                 //redux 相关文件
  App.js                // 根组件
  index.js              // 入口文件
  serviceWorker.js      // PWA 离线应用配置
  style.js              // 默认样式

store 文件夹
actionCreators.js // 放不同 action 的地方
constants.js      // 常量集合，存放不同 action 的 type 值
index.js          // 用来导出 reducer，action
reducer.js        // 存放 initialState 和 reducer 函数
```