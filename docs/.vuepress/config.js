/*
 * @Author: your name
 * @Date: 2021-04-30 09:10:11
 * @LastEditTime: 2021-07-30 14:07:10
 * @LastEditors: hmlhml
 * @Description: In User Settings Edit
 * @FilePath: /vuepress-blog/docs/.vuepress/config.js
 */
module.exports = {
  base: "/study_summary/",
  title: "ゞ灬迴不去的甛╰→ ",
  description: "学习工作总结",
  head: [["link", { rel: "icon", href: "/favicon.ico" }]],
  themeConfig: {
    displayAllHeaders: true, // 默认值：false 侧边栏只会显示由当前活动页面的标题
    nav: [
      { text: "首页", link: "/" },
      {
        text: "前端整理",
        link: "/frontEnd/",
      },
      { text: "知识拓展", link: "/guide/" },
      { text: "待解决问题", link: "/todo/" },
    ],
    sidebar: {
      "/frontEnd/": [
        {
          title: "1. HTML整理",
          collapsable: true,
          children: [
            { title: "doctype", path: "/frontEnd/html/doctype" },
            { title: "内置功能", path: "/frontEnd/html/标签" },
          ],
        },
        {
          title: "2. CSS相关",
          collapsable: true,
          children: [
            { title: "选择器", path: "/frontEnd/css/选择器" },
            { title: "CSS3新特性", path: "/frontEnd/css/CSS3新特性" },
            { title: "CSS层叠上下文", path: "/frontEnd/css/CSS层叠上下文" },
            { title: "CSS盒模型", path: "/frontEnd/css/CSS盒模型" },
            { title: "常用布局方式", path: "/frontEnd/css/常用布局方式" },
            { title: "常见问题", path: "/frontEnd/css/常见问题" },
          ],
        },{
          title: "3. JavaScript",
          collapsable: true,
          children: [
            { title: "错误类型", path: "/frontEnd/javascript/错误类型" },
            { title: "常见问题", path: "/frontEnd/javascript/常见问题" },
          ],
        },{
          title: "4. 框架",
          collapsable: true,
          children: [
            { title: "vue-router", path: "/frontEnd/frame/vue-router" },
          ],
        },{
          title: "5.工程化",
          collapsable: true,
          children: [
            { title: "性能优化", path: "/frontEnd/project/性能优化" },
            { title: "webpack", path: "/frontEnd/project/webpack" },
          ],
        },
        {
          title: "6. 其他",
          collapsable: false,
          children: [
            { title: "npm包版本号", path: "/frontEnd/other/npm包版本号" },
            { title: "npm和yarn区别", path: "/frontEnd/other/npm和yarn区别" },
            { title: "webpack3和4的区别", path: "/frontEnd/other/webpack3和4的区别" },
            { title: "hash&chunkHash&contentHash", path: "/frontEnd/other/hash&chunkHash&contentHash.md" },
            { title: "publicPath和contentBase", path: "/frontEnd/other/devServer.publicPath 和 output.publicPath 和 output.path.md" },
            { title: "gulp的简单用法", path: "/frontEnd/other/gulp的简单用法" },      
            { title: "基于yeoman构建gulp项目脚手架", path: "/frontEnd/other/基于yeoman构建gulp项目脚手架" },      
            { title: "vue-cli", path: "/frontEnd/other/vue-cli" },      
          ],
        },
      ],
    },
  },
};
