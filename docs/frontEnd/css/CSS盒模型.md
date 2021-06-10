<!--
 * @Description: 
 * @version: 
 * @Author: hmlhml
 * @Date: 2021-06-03 09:58:25
 * @LastEditors: hmlhml
-->
## 盒模型

#### 组成元素：

content（内容）、padding（内填充）、border（边框）、margin（外边距） 

#### 分类：

* 标准盒模型   
    width = contentWidth  
    设置：box-sizing: content-box
* 怪异盒模型  
    width = contentWidth + 左右border + 左右padding  
    设置：box-sizing: border-box 

## BFC

#### BFC解释

BFC（Block Formatting Context）块级格式化上下文
* BFC 是一个独立的布局环境,可以理解为一个容器,在这个容器中按照一定规则进行物品摆放,并且不会影响其它环境中的物品。
* 如果一个元素符合触发 BFC 的条件，则 BFC 中的元素布局不受外部影响。
* 浮动元素会创建 BFC，则浮动元素内部子元素主要受该浮动元素影响，所以两个浮动元素之间是互不影响的。

#### 创建BFC

* 根元素或包含根元素的元素
* 浮动元素 float ＝ left | right 或 inherit（≠ none）
* 绝对定位元素 position ＝ absolute 或 fixed
* display ＝ inline-block | flex | inline-flex | table-cell 或 table-caption
* overflow ＝ hidden | auto 或 scroll (≠ visible)

#### BFC的特性

* 内部的Box会在垂直方向，一个接一个地放置。
* Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠
* 每个元素的左外边缘（margin-left)， 与包含块的左边（contain box left）相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。除非这个元素自己形成了一个新的BFC。
* BFC的区域不会与float box重叠。
* BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
* 计算BFC的高度时，浮动元素也参与计算

#### BFC的作用

1.包含浮动元素（清除浮动）  
2.导致外边距折叠


### IFC布局规则
在行内格式化上下文中，框(boxes)一个接一个地水平排列，起点是包含块的顶部。  
水平方向上的 margin，border 和 padding在框之间得到保留。  
框在垂直方向上可以以不同的方式对齐：它们的顶部或底部对齐，或根据其中文字的基线对齐。包含那些框的长方形区域，会形成一行，叫做行框。