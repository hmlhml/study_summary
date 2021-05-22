### 1.mode

webpack增加了一个mode配置，只有两种值development | production。对不同的环境他会启用不同的配置。

webpack4中通过内置的mode使用相应模式的内置优化。
比如设置mode等于'development'，会将 process.env.NODE_ENV 的值设为 development，开发环境下启用optimization.nameModules（原nameModulesPlugin已经弃用）。
设置mode等于'production'，会将 process.env.NODE_ENV 的值设为 production，而生产环境默认用optimization.noEmitOnErrors`（原noEmitOnErrorsPlugin已弃用）


webpack4中通过内置的mode使用相应模式的内置优化。设置mode等于'development'，会将 process.env.NODE_ENV 的值设为 development。启用 NamedChunksPlugin 和 NamedModulesPlugin。
设置mode等于'production'，会将 process.env.NODE_ENV 的值设为 production。启用 FlagDependencyUsagePlugin, FlagIncludedChunksPlugin, ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, OccurrenceOrderPlugin, SideEffectsFlagPlugin 和 UglifyJsPlugin.


不同环境下配置如下

1 默认生产环境开起了很多代码优化（minify, splite）
2 开发时开启注视和验证，并加上了evel devtool
3 生产环境不支持watching，开发环境优化了打包的速度
4 生产环境开启模块串联（原ModulecondatenationPlugin）
5 自动设置process.env.NODE_EVN到不同环境，也就是不使用DefinePlugin了
6 如果mode设置none，所有默认设置都去掉了。

 

### 2.CommonsChunkPlugin

CommonChunksPlugin已经从webpack4中移除。可使用optimization.splitChunks进行模块划分（提取公用代码）。

但是需要注意一个问题，默认配置只会对异步请求的模块进行提取拆分，如果要对entry进行拆分，需要设置optimization.splitChunks.chunks = 'all'。

对应之前我们拆分runtime的情况，现在也有一个配置optimization.runtimeChunk，设置为true就会自动拆分runtime文件
```
module.exports = {
  optimization: {
    runtimeChunk: true,
    splitChunks: {
      vendors: {
        name:  'venders',
        chunks:  'all',
        minChunks: 2
    }
  }
}
```
 

### 3.webpack4使用MiniCssExtractPlugin取代ExtractTextWebpackPlugin。
```
module.exports = {
  plugins: [
    new  MiniCssExtractPlugin({
      filename:  'css/[name].css'
    }),
  ],
}

module.exports = {
  module: {
    rules: [
      {
        test:/\.vue$/,
        loader: 'vue-loader',
      },
      { test: /\.css$/,
         use: [
                  {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                      publicPath: '../',
                      hmr: process.env.NODE_ENV === 'development',
                    },
                  },
                  'css-loader',
                ],
        },
    ]
  }
}
```
### 4.代码分割。

使用动态import，而不是用system.import或者require.ensure

### 5.vue-loader。

使用vue-loader插件为.vue文件中的各部分使用相对应的loader，比如css-loader等

### 6.UglifyJsPlugin

现在也不需要使用这个plugin了，只需要使用optimization.minimize为true就行，production mode下面自动为true

optimization.minimizer可以配置你自己的压缩程序

```
module.exports = {
  optimization: {
    minimizer: [
      new TerserPlugin({ // 压缩js
          cache:  true,
          parallel:  true  //开启多线程
        }
      }),
      new OptimizeCSSAssetsPlugin({ // 压缩css
        cssProcessorOptions: {
          safe: true
        }
      })
    ]
  }
}
```


7.移除loaders，必须使用rules（在3版本的时候loaders和rules 是共存的但是到4的时候只允许使用rules）

9.升级happypack插件（happypack可以进行多线程加速打包）

运行在node.js之上的webpack时单线程模型，也就是只能一个一个文件进行处理，不能并行处理，happypack可以将任务分解给多个子进程，最后将结果发给主进程，js是单线程模型，只能通过这种多线程的方式提高性能
vue-loader 不支持 HappyPack，官方建议用 thread-loader

```
const HappyPack = require('happypack');

exports.module = {
  rules: [
    {
      test: /.js$/,
      use: ['happypack/loader?id=babel'],// 将对.js文件的处理转交给id为babel的HappyPack的实列
      exclude:/node_modules/
    }
  ]
};

exports.plugins = [
  new HappyPack({
    id: 'babel',// 用唯一的标识符id来代表当前的HappyPack 处理一类特定的文件
    loaders: [ 'babel-loader' ] // 如何处理.js文件，用法和Loader配置是一样的
  })
];
```
