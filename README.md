# manage

> app manage

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

### LOG

#### 10/20
* 导入jquery import $ from 'jquery'
* 基于jquery的第三方js使用出现问题,markdown解析排版问题
  > 使用内部样式覆盖elementUI的样式解决

#### 10/25
* [js-cookie cookie操作](https://www.npmjs.com/package/js-cookie)
* [nanobar进度条](http://nanobar.jacoborus.codes/)

#### 10/26
* [clipboard插件](https://clipboardjs.com/#example-action)
* 添加 个性评论

#### 11/3
* Q:权限

#### 11/9
* 每日美图

#### 11/22
* 娱乐模块添加权限需求
* 界面调整 ,apps展示也使用flex布局
* 添加手机端自适应

#### 11/23
* 处理qq浏览器无法打开 cause:不支持Promise,引入babel-polyfill的Promise

#### 11/24
* <link href="//cdn.webfont.youziku.com/webfonts/nomal/106962/28764/599c32fbf629d8117c40c36c.css" rel="stylesheet" type="text/css"> 英文艺术字体
  > 使用方式 .class{font-family: AdineKirnberg-Scaf506e941a1d2;}
* 优化布局,添加头部
* 用户表添加改密功能
* 表格中操作按钮添加图标
* webpack 只能分析静态代码, 封装后的异步加载路由无法分模块打包, 使用原生的异步路由

#### 11/27
* 处理退出dialog 显示过长
* 处理蒙版覆盖 dialog(cause: dialog的父元素设置了z-index,且比 蒙版的z-index小)
* 处理router中 firework路由失效(cause: 路由设置没有```.vue```后缀,且该目录下存在同名js)

#### 12/5
* 添加 删除修改功能
* webpack 引入 babel-polyfill错误, 改为main.js引入
* 仍存在问题,qq打开后有侧边栏无内容
