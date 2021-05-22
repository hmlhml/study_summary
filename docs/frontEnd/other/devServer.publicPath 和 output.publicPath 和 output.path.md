<!--
 * @Description: 
 * @version: 
 * @Author: hmlhml
 * @Date: 2021-05-19 22:44:05
 * @LastEditors: hmlhml
-->

## 1、output.path
文件打包后生成的目录，只在 **production**  配置下有效

## 2、output.publicPath
output的publicPath会在打包的html文件中引用资源路径添加前缀

```
publicPath: process.env.NODE_ENV == "development" ? "/assets/" : "http://cdn.com/"
```
## 3、devServer.publicPath
devServer中的publicPath表示在浏览器中用此路径可以访问到内存中的资源  
相当于express的static静态资源中间件功能

```
app.use(express.static('public',path.join(__dirname,'/static')))
```

如果未设置devServer.publicPath，则会使用output.publicPath指定的路径

## 4、devServer.contentBase
devServer中的contentBase指定一个虚拟路径来让devServer服务器提供内容