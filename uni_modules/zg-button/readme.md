# zg-button

解决原生`button`组件的样式不能随着`uni.scss`的变量的值变化的问题；按钮默认是`display:block`类型；点击事件用法与普通`view`一样。

## props
属性名称|数据类型|必需|默认值|说明
-|-|-|-|-
type|string|否| |按钮类型：`primary`、`success`、`warn`、`error`
size|string|否|base|按钮大小：`large(大)`、`base(中，默认)`、`small(小)`
plain|boolean|否|false|是否空心
disabled|boolean|否|false|禁用
loading|boolean|否|false|加载中
block|boolean|否|false|块状按钮，作为块使用时，请一定要添加此属性
text|boolean|否|false|文字按钮，`text`的优先级大于`plain`

## event
事件名称|参数|说明
-|-|-
click| |点击

## 基本用法
```
<zg-button>按钮</zg-button>
<zg-button type="primary">按钮</zg-button>
<zg-button type="warn">按钮</zg-button>
<zg-button type="error">按钮</zg-button>
```
## 尺寸
设置`size`属性
```
<zg-button size="small">按钮</zg-button>
<zg-button size="base">按钮</zg-button>
<zg-button size="large">按钮</zg-button>
```
## 空心
设置`plain`属性
```
<zg-button plain>按钮</zg-button>
<zg-button type="primary" plain>按钮</zg-button>
<zg-button type="warn" plain>按钮</zg-button>
<zg-button type="error" plain>按钮</zg-button>
```
## 禁用
设置`disabled`属性
```
<zg-button disabled>按钮</zg-button>
<zg-button type="primary" disabled>按钮</zg-button>
<zg-button type="warn" disabled>按钮</zg-button>
<zg-button type="error" disabled>按钮</zg-button>
```
## 加载中
设置`loading`属性
```
<zg-button loading>按钮</zg-button>
<zg-button type="primary" loading>按钮</zg-button>
<zg-button type="warn" loading>按钮</zg-button>
<zg-button type="error" loading>按钮</zg-button>
```
## 块级按钮
设置`block`属性
```
<zg-button block size="small">按钮</zg-button>
<zg-button block>按钮</zg-button>
<zg-button block size="large">按钮</zg-button>
<zg-button type="primary" block>按钮</zg-button>
<zg-button type="warn" block>按钮</zg-button>
<zg-button type="error" block>按钮</zg-button>
```
## 文字按钮
设置`text`属性
```
<zg-button text>按钮</zg-button>
<zg-button type="primary" text>按钮</zg-button>
<zg-button type="warn" text>按钮</zg-button>
<zg-button type="error" text>按钮</zg-button>
```

## 点击事件
```
<zg-button @click="onClick">按钮</zg-button>
```