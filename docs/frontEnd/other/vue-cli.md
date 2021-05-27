<!--
 * @Description: 
 * @version: 
 * @Author: hmlhml
 * @Date: 2021-05-24 22:42:03
 * @LastEditors: hmlhml
-->

## 一、组成
*  作为全局命令的脚手架`@vue/cli`
*  作为项目内集成工具的`@vue/cli-service`
*  作为功能插件系统的`@vue/cli-plugin-xx`

## 二、优点
*  保留了创建项目开箱即用的优点
*  提供了用于覆盖修改原有配置的自定义构建配置文件和其他工具配置文件
*  Vue CLI提供了通过用户交互自行选择的一些定制化选项（eg：是否集成路由、TypeScript等），并且还能保存预设，方便下一次初始化项目使用

## 三、使用

`npm install -g @vue/cli`  
`vue create hello-world`


## 四、vue-cli-service的相关命令
在一个 Vue CLI 项目中，@vue/cli-service 安装了一个名为 vue-cli-service 的命令   

该功能的实现主要是调用了`api.registerCommand`这个方法向vue-cli-service内部注入额外的命令，不同的命令配置相对应的options
```javascript
// package.json
{
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint",
    "inspect": "vue-cli-service inspect",
}
```

## 五、处理静态资源

* 在 JavaScript 被导入或在 template/CSS 中通过相对路径被引用。这类引用会被 webpack 处理。  
* 放置在`public`目录下或通过绝对路径被引用。将会直接被**拷贝**，而不会经过 webpack 的处理。

## 六、打包多页面应用
在webpack.config.js中添加pages字段
```javascript
// vue.config.js
module.exports = {
  pages: {
    index: {
      // page 的入口
      entry: "src/main.ts",
      // 模板来源
      template: "public/index.html",
      // 在 dist/index.html 的输出
      filename: "index.html",
      title: "hml"
    },
    share: {
      entry: "src/project/share/main.ts",
      template: "public/share.html",
      filename: "share.html",
      title: "分享"
    }
  }
}
```
## 七、webpack配置

#### 查看webpack配置：
`vue inspect > output.js`

#### 新增webpack配置：

在Vue.config.js中，新增`configureWebpack`或`chainWebpack`节点，来自定义webpack的打包配置。
> 新配置的对象将会被 **webpack-merge** 合并入最终的 webpack 配置。 

* chainWebpack通过链式编程的形式，来修改默认的webpack配置   
* configureWebpack通过操作对象的形式，来修改默认的webpack配置  


```javascript
// vue.config.js
module.exports = {
  // configureWebpack
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
    } else {
      // 为开发环境修改配置...
    }
  }

  // chainWebpack 链式操作 (高级)
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
        .tap(options => {
          // 修改它的选项...
          return options
        })
  }
}

```
 
## 八、环境变量

```javascript
.env                # 在所有的环境中被载入
.env.local          # 在所有的环境中被载入，但会被 git 忽略
.env.[mode]         # 只在指定的模式中被载入
.env.[mode].local   # 只在指定的模式中被载入，但会被 git 忽略
```

> 注意，只有 `NODE_ENV``，BASE_URL` 和以 `VUE_APP_` 开头的变量将通过 `webpack.DefinePlugin` 静态地嵌入到客户端侧的代码中。

## 九、vue-cli-service serve之源码分析
列出主要涉及到的文件
```javascript
@vue/cli-service
    ├── bin
    │   └── vue-cli-service.js
    │  
    ├── lib
    │   └── commands
    │       │── build
    │       ├── inspect.js
    │       └── serve.js
    ├── PluginApi.js
    ├── Service.js
```    

执行`vue-cli-service serve`其实就是执行`service.run()`
```javascript
vue-cli-service.js
const Service = require('../lib/Service')
const service = new Service(process.env.VUE_CLI_CONTEXT || process.cwd())
service.run(command, args, rawArgv).catch(err => {
  error(err)
  process.exit(1)
})
```

1、serve、build、lint、help命令行的注入

```javascript
// cli-service/lib/commands/serve.js
module.exports = (api, options) => {
  // api是PluginAPI的实例对象
  api.registerCommand('serve', {
    '--open': `open browser on server start`,
    '--copy': `copy url to clipboard on server start`,
    // ...
  }, async function serve (args) {
  })
}
```
2、函数 registerCommand 会设置 service.commands
```javascript
// cli-service/lib/PluginAPI.js
class PluginAPI {
  constructor (id, service) {
    this.id = id
    this.service = service
  }
  registerCommand (name, opts, fn) {
    if (typeof opts === 'function') {
      fn = opts
      opts = null
    }
    this.service.commands[name] = { fn, opts: opts || {}}
  }
}
```

3、cli-service/lib/Service.js 会调用 run 方法：
```javascript
async run (name, args = {}, rawArgv = []) {
    
  // 初始化配置，防止多次初始化、设置mode、合并用户options...
  this.init(mode)

  // 里面会从 commands 里面取：
  let command = this.commands[name]


  // 最终执行它里面的 fn：
  const { fn } = command
  return fn(args, rawArgv)
}
```

## 打包产物分析
### `vue-cli-service build --mode development`
vue-cli3默认开启预加载，所以会出现下列的 `preload` 和 `prefetch`
```html
  <link href="/js/about.js" rel="prefetch" />
  <link href="/js/chunk-common.js" rel="preload" as="script" />
  <link href="/js/chunk-vendors.js" rel="preload" as="script" />
  <link href="/js/index.js" rel="preload" as="script" />
  
  <script type="text/javascript" src="/js/chunk-vendors.js"></script>
  <script type="text/javascript" src="/js/chunk-common.js"></script>
  <script type="text/javascript" src="/js/index.js"></script>
```

### `vue-cli-service build`
```html
<link href="/js/about.25f126ba.js" rel="prefetch" />
<link href="/css/index.b36de224.css" rel="preload" as="style" />
<link href="/js/chunk-vendors.2bcb7758.js" rel="preload" as="script" />
<link href="/js/index.379a1fb2.js" rel="preload" as="script" />
<link href="/css/index.b36de224.css" rel="stylesheet" />

<script src="/js/chunk-vendors.2bcb7758.js"></script>
<script src="/js/index.379a1fb2.js"></script>
```
