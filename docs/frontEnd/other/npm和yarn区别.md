<!--
 * @Author: your name
 * @Date: 2021-05-17 10:12:39
 * @LastEditTime: 2021-05-17 10:50:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /study_summary/docs/frontEnd/other/npm和yarn区别.md
-->
## 一、命令对比
* 安装卸载：install/uninstall - >add /remove
* 全局： --global -> global
* 更新： update -> upgrrade
* 生产依赖： --save -> 无
* 开发依赖： --save-dev -> --dev


|  npm   | yarn  |
|  ----  | ----  |
| npm init  | yarn init |
| npm install  | yarn |
| npm install xxx | yarn add xxx |
| npm install --global xxx  | yarn global add xxx |
| npm uninstall xxx | yarn remove xxx |
| npm install xxx --save  | yarn add xxx |
| npm install xxx --save-dev  | yarn add xxx --dev |
| npm update --save | yarn upgrade |

## 二、npm的缺陷

* 速度慢 `按照队列执行每个package，即要等到当前 package 安装完成之后，才能继续后面的安装。`
* 可能导致安装版本不一致
* 输出信息太多 `有关错误包的错误信息就会在一大堆npm打印的警告中丢失掉`

## 三、yarn的优点：

* 速度快 `并行安装，离线安装`
* 安装版本统一 `yarn.lock：保证了，每一次拉取同一个项目依赖时，使用的都是一样的模块版本`
* 更简洁的输出：`npm 的输出信息比较冗长，Yarn 简洁太多`
* 多注册来源处理：`只会从一个注册来源去装`

## 四、npm5.0
* 默认新增了类似yarn.lock的 package-lock.json；

## 总结
在npm5.0之前，yarn的优势特别明显。但是在npm之后，通过以上一系列对比，我们可以看到 npm5 在速度和使用上确实有了很大提升，值得尝试，不过还没有超过yarn