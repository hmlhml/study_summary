/*
 * @Author: your name
 * @Date: 2021-04-30 09:10:11
 * @LastEditTime: 2021-05-14 17:48:26
 * @LastEditors: Please set LastEditors
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
            { title: "css", path: "/frontEnd/css/BFC" },
            { title: "内置功能", path: "/frontEnd/css/布局" },
          ],
        },
        {
          title: "3. 其他",
          collapsable: true,
          children: [
            { title: "npm包版本号", path: "/frontEnd/other/npm包版本号" }
          ],
        },
      ],
    },
  },
};
