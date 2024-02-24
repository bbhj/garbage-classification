## 参数属性
|序号	|参数			|说明											|类型			|可选值		|默认值	|是否必须	|
|---	| ---			| ---											| ---			| ---		| ---	| ---		|
|1		|value			|监听父组件传搜索框值							|String			| ---		| ---	|×			|
|2		|fixedHead		|搜索框置顶固定									|Boolean		|true/false	|false	|×			|
|3		|customSearch	|搜索框自定义样式								|Object			| ---		| ---	|×			|
|4		|preIconfont	|搜索框前置iconfont图标							|String			| ---		| ---	|×			|
|5		|preIcon		|搜索框前置zy-icon图标							|String			| ---		| ---	|×			|
|6		|preImg			|搜索框前置图片									|String			| ---		| ---	|×			|
|7		|preText		|搜索框前置文字									|String			| ---		| ---	|×			|
|8		|preSize		|自定义前置尺寸（单位默认rpx）					|Number/String	| ---		| ---	|×			|
|9		|preSlot		|自定义前置内容									|Boolean		| true/false| false	|×			|
|10		|size			|控制搜索框文本和后置按钮尺寸（单位默认rpx）	|Number			| ---		| 32	|×			|
|11		|placeholder	|input框为空时占位符							|String			| ---		|请输入	|×			|
|12		|disabled		|搜索框是否禁用									|Boolean		|true/false	|false	|×			|
|13		|focus			|输入框获取焦点									|Boolean		|true/false	|false	|×			|
|14		|type			|输入框类型，默认text（与原生input一致）		|String			| ---		|text	|×			|
|15		|maxlength		|最大输入长度，设置为 -1 的时候不限制最大长度	|String			| ---		| 140	|×			|
|16		|clearable		|input框清除按钮								|Boolean		|true/false	|false	|×			|
|27		|sufBtn			|搜索框后置按钮									|String			| ---		| ---	|×			|
|18		|sufIconfont	|搜索框后置iconfont图标							|String			| ---		| ---	|×			|
|19		|sufIcon		|搜索框后置zy-icon图标							|String			| ---		| ---	|×			|
|20		|sufImg			|搜索框后置图片									|String			| ---		| ---	|×			|
|21		|sufText		|搜索框后置文字									|String			| ---		| ---	|×			|
|22		|sufSize		|自定义后置尺寸（单位默认rpx）					|Number/String	| ---		| ---	|×			|
|23		|sufSlot		|自定义后置内容									|Boolean		| true/false| false	|×			|
|24		|actionText		|搜索框后置外侧文本								|String			| ---		| ---	|×			|
|25		|actionSize		|后置外侧文本尺寸（单位默认rpx）				|Number/String	| ---		| 36	|×			|

## 事件
|序号	|参数			|说明																	|类型		|可选值		|默认值	|是否必须	|
|---	| ---			| ---																	| ---		| ---		| ---	| ---		|
|1		|onInput		|当键盘输入时，触发input事件											|Function	|(event)=>{}|否		|×			|
|2		|onFocus		|输入框聚焦时触发，event.detail = { value, height }，height 为键盘高度	|Function	|(event)=>{}|否		|×			|
|3		|onBlur			|输入框失去焦点时触发，event.detail = {value: value}					|Function	|(event)=>{}|否		|×			|
|4		|onConfirm		|点击完成按钮时触发，event.detail = {value: value}						|Function	|(event)=>{}|否		|×			|
|5		|preHandler		|前置自定义事件															|Function	|()=>{}		|否		|×			|
|7		|clear			|清除输入框内容															|Function	|()=>{}		|否		|×			|
|8		|sufHandler		|后置自定义事件															|Function	|(event)=>{}|否		|×			|
|9		|actionHandler	|后置外侧自定义事件														|Function	|(event)=>{}|否		|×			|

## 使用方式
```
<template>
	<view class="container">
		<zy-search :focus="false" fixedHead></zy-search>
		<view class="text">基础功能+固定顶部</view>

		<view class="text">自定义边框样式</view>
		<zy-search :customSearch="customSearch"></zy-search>

		<view class="text">通过value向子组件传值+回车事件</view>
		<!-- 两种传值方法都可以 -->
		<zy-search clearable @clear="clear" v-model:value="fieldValue" @onConfirm="onConfirm"></zy-search>
		<!-- <zySearch clearable @clear="clear" :value="fieldValue" @onConfirm="onConfirm"></zySearch> -->

		<view class="text">清除功能</view>
		<zy-search clearable @clear="clear"></zy-search>

		<view class="text">禁用功能</view>
		<zy-search disabled placeholder="搜索框禁用"></zy-search>

		<view class="text">前置iconfont图标控件+事件</view>
		<zy-search :preIconfont="preIconfont" @preHandler="preHandler"></zy-search>

		<view class="text">前置zy-icon图标控件+前置自定义尺寸</view>
		<zy-search :preIcon="preIcon" preSize='40'></zy-search>

		<view class="text">前置图片控件</view>
		<zy-search :preImg="preImg"></zy-search>

		<view class="text">前置文字控件</view>
		<zy-search :preText="preText"></zy-search>

		<view class="text">自定义前置内容</view>
		<zy-search preSlot>
			<template>
				<view class="preSlot">
					<image src="./static/tel.png" class="img" mode="aspectFit">
					</image>
					<text style="font-size: 32rpx;">phone</text>
				</view>
			</template>
		</zy-search>

		<view class="text">修改输入框文本尺寸</view>
		<zy-search size="36"></zy-search>

		<view class="text">后置按钮控件+事件(button的尺寸是size)</view>
		<zy-search :sufBtn="sufBtn" @sufHandler="sufHandler"></zy-search>

		<view class="text">后置iconfont图标控件+后置自定义尺寸</view>
		<zy-search :sufIconfont="sufIconfont" sufSize="45"></zy-search>

		<view class="text">后置zy-icon图标控件</view>
		<zy-search :sufIcon="sufIcon"></zy-search>

		<view class="text">后置图片控件</view>
		<zy-search :sufImg="sufImg"></zy-search>

		<view class="text">后置文字控件</view>
		<zy-search :sufText="sufText"></zy-search>

		<view class="text">自定义后置内容</view>
		<zy-search sufSlot>
			<template>
				<view class="sufSlot">
					<image src="./static/voice.png" class="img" mode="aspectFit">
					</image>
					<view class="border"></view>
					<image src="./static/scan.png" class="img" mode="aspectFit">
					</image>
				</view>
			</template>
		</zy-search>

		<view class="text">后置外侧文字控件+后置外侧自定义尺寸</view>
		<zy-search :actionText="actionText" actionSize="40" @actionHandler="actionHandler"></zy-search>
	</view>
</template>
<script>
	import zySearch from '@/uni_modules/zy-function-search/components/zy-function-search/zy-function-search.vue'
	export default {
		components: {
			zySearch,
		},
		data() {
			return {
				fieldValue: '',
				customSearch: {
					borderRadius: "10rpx",
					border: "5rpx solid #ff0000",
				},
				preIconfont: "iconfont icon-saoyisao",
				preIcon: "magnifier",
				preImg: require('./static/scan.png'),
				preText: "搜索",
				sufBtn: "查 询",
				sufIconfont: "iconfont icon-saoyisao",
				sufIcon: "location",
				sufImg: require('./static/scan.png'),
				sufText: "搜 索",
				actionText: "搜 索"
			}
		},
		methods: {
			//清除事件
			clear() {
				uni.showToast({
					title: "清除成功",
					duration: 2000,
					icon: 'none'
				});
			},
			//前置事件
			preHandler() {
				uni.showToast({
					title: "前置事件",
					duration: 2000,
					icon: 'none'
				});
			},
			//回车事件
			onConfirm(val) {
				this.fieldValue = val.value
				uni.showToast({
					title: "回车事件：" + val.value,
					duration: 2000,
					icon: 'none'
				});
			},
			//后置事件
			sufHandler(val) {
				uni.showToast({
					title: "后置事件：" + val.value,
					duration: 2000,
					icon: 'none'
				});
			},
			//后置外侧事件
			actionHandler(val) {
				uni.showToast({
					title: "后置外侧事件：" + val.value,
					duration: 2000,
					icon: 'none'
				});
			},
		},
	}
</script>

<style lang="scss" scoped>
	// @import '@/common/zy.scss';

	.container {
		padding-bottom: 10rpx;
	}

	.text {
		padding: 20rpx 0 0 20rpx;
		font-size: 26rpx;
		color: #999999;
	}

	.preSlot {
		display: flex;
		margin: auto 0;
		white-space: nowrap;
	}

	.sufSlot {
		display: flex;
		margin: auto 0;
	}

	.img {
		width: 40rpx;
		height: 40rpx;
		margin: auto 0;
	}

	.border {
		height: 40rpx;
		margin: auto 10rpx;
		border-right: 5rpx solid #e9e9e9;
	}
</style>

```

#### 1.若使用到iconfont图标，需至iconfont网站自行下载
#### 2.若使用到zy-icon图标，需至主页下载https://ext.dcloud.net.cn/plugin?id=10518配套使用

#### 如使用过程中有任何问题，或者您有一些好的建议，欢迎联系QQ：2360273432 
