<template>
	<view :style="`height:${topHeight}`">
		<view :class="fixedHead===true?'zy_searchFixedHead_container':'zy_search_container'" class="zy_search">
			<view :class="{'zy_search_bg_dis':disabled===true}" class="zy_search_bg"
				:style="customSearch?customSearch:zy_search">
				<!-- 前置自定义 -->
				<!-- 前置iconfont图标 -->
				<view class="zy_search_pre" v-if="preIconfont">
					<i :class="preIconfont" @click="preHandler" :style="[{fontSize:`${preSize?preSize:'50'}rpx`}]"></i>
				</view>
				<!-- 前置zy-icon图标 -->
				<view class="zy_search_pre" v-else-if="preIcon" @click="preHandler">
					<zy-icon :name="'zy-icon-'+ preIcon" :size="preSize||'42'">
					</zy-icon>
				</view>
				<!-- 前置图片 -->
				<image v-else-if="preImg" :src="preImg" class="zy_search_pre"
					:style="[{width:`${preSize?preSize:'50'}rpx`,height:`${preSize?preSize:'50'}rpx`}]" mode="aspectFit"
					@click="preHandler"></image>
				<!-- 前置文本 -->
				<text @click="preHandler" v-else-if="preText" :style="[{fontSize:`${preSize?preSize:'26'}rpx`}]"
					class="zy_search_pre">{{preText}}</text>
				<!-- 自定义前置内容 -->
				<view v-else-if="preSlot" class="zy_search_pre">
					<slot></slot>
				</view>
				<view class="zy_search_border" v-if="preIconfont||preIcon||preImg||preText"></view>
				<!-- input搜索框 -->
				<view class="zy_search_content">
					<input class="zy_search_content_input" :style="[{fontSize:`${size}rpx`}]" v-model="fieldValue"
						:placeholder="placeholder" :disabled="disabled" :focus="focus" :type="type"
						:maxlength="maxlength" @input="onInput" @focus="onFocus" @blur="onBlur" @confirm="onConfirm" />
					<!-- 清除事件 -->
					<view v-if="clearable">
						<i v-if="fieldValue&&disabled==false" class="iconfont icon-qingchu" @click="clear"
							style="color: #999;"></i>
					</view>
				</view>
				<!-- 后置自定义 -->
				<!-- 后置按钮 -->
				<view v-if="sufBtn" @click="sufHandler" class="zy_search_suf_btn" :style="[{fontSize:`${size}rpx`}]">
					{{sufBtn}}
				</view>
				<!-- 后置iconfont图标 -->
				<view class="zy_search_suf" v-if="sufIconfont">
					<i :class="sufIconfont" @click="sufHandler" :style="[{fontSize:`${sufSize?sufSize:'50'}rpx`}]"></i>
				</view>
				<!-- 后置zy-icon图标 -->
				<view class="zy_search_suf" v-else-if="sufIcon" @click="sufHandler">
					<zy-icon :name="'zy-icon-'+ sufIcon" :size="sufSize||'42'">
					</zy-icon>
				</view>
				<!-- 后置图片 -->
				<image v-else-if="sufImg" :src="sufImg" class="zy_search_suf"
					:style="[{width:`${sufSize?sufSize:'50'}rpx`,height:`${sufSize?sufSize:'50'}rpx`}]" mode="aspectFit"
					@click="sufHandler"></image>
				<!-- 后置文本 -->
				<text @click="sufHandler" v-else-if="sufText" :style="[{fontSize:`${sufSize?sufSize:'36'}rpx`}]"
					class="zy_search_suf">{{sufText}}</text>
				<!-- 自定义后置内容 -->
				<view v-else-if="sufSlot" class="zy_search_suf">
					<slot></slot>
				</view>
			</view>
			<!-- 后置外侧文本 -->
			<text @click="actionHandler" v-if="actionText" :style="[{fontSize:`${actionSize}rpx`}]"
				class="zy_search_action">{{actionText}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		emits: ['onInput', 'onFocus', 'onBlur', 'onConfirm', 'preHandler', 'clear', 'sufHandler', 'actionHandler'],
		props: {
			//监听父组件传搜索框值
			value: {
				type: String
			},
			//搜索框置顶固定
			fixedHead: {
				type: Boolean,
				default: false,
			},
			//搜索框自定义样式
			customSearch: {
				type: Object,
			},
			//搜索框前置iconfont图标
			preIconfont: {
				type: String,
				// default: 'iconfont icon-saoyisao'
			},
			//搜索框前置zy-icon图标
			preIcon: {
				type: String,
			},
			//搜索框前置图片
			preImg: {
				type: String,
			},
			//搜索框前置文字
			preText: {
				type: String,
			},
			//自定义前置尺寸（单位默认rpx）
			preSize: {
				type: Number | String,
			},
			//自定义前置内容
			preSlot: {
				type: Boolean,
				default: false
			},
			//控制搜索框文本和后置按钮尺寸（单位默认rpx）
			size: {
				type: Number | String,
				default: 32
			},
			//输入框为空时占位符
			placeholder: {
				type: String,
				default: "请输入",
			},
			//搜索框是否禁用
			disabled: {
				type: Boolean,
				default: false,
			},
			//输入框获取焦点
			focus: {
				type: Boolean,
				default: false,
			},
			//输入框类型，默认text（与原生input一致）
			type: {
				type: String,
				default: "text",
			},
			//最大输入长度，设置为 -1 的时候不限制最大长度，默认140
			maxlength: {
				type: String | Number,
				default: "140",
			},
			//清除按钮
			clearable: {
				type: Boolean,
				default: false,
			},
			//后置按钮
			sufBtn: {
				type: String,
			},
			//后置Iconfont图标
			sufIconfont: {
				type: String,
			},
			//后置zy-icon图标
			sufIcon: {
				type: String,
			},
			//后置图片
			sufImg: {
				type: String,
			},
			//后置文本
			sufText: {
				type: String,
			},
			//自定义后置尺寸（单位默认rpx）
			sufSize: {
				type: String | String,
			},
			//自定义后置内容
			sufSlot: {
				type: Boolean,
				default: false
			},
			// 后置外侧文本
			actionText: {
				type: String,
			},
			// 后置外侧文本尺寸（单位默认rpx）
			actionSize: {
				type: Number | String,
				default: 36
			},
		},
		data() {
			return {
				topHeight: '', //搜索框固定高度
				fieldValue: '',
				zy_search: {
					borderRadius: "50rpx",
					border: "5rpx solid #409EFF",
				}
			}
		},
		mounted() {
			const query = uni.createSelectorQuery().in(this)
			query
				.select('.zy_searchFixedHead_container')
				.boundingClientRect(data => {
					//搜索框固定设置高度
					this.topHeight = data.height + 'px'
				})
				.exec();
		},
		//监听父组件传值
		watch: {
			value: {
				handler(val) {
					this.fieldValue = val
				},
				deep: true, // 深度监听
				immediate: true, // 初次监听即执行  
			},
		},
		methods: {
			//当键盘输入时，触发input事件
			onInput(event) {
				this.$emit('onInput', {
					value: event.detail.value
				})
			},
			//输入框聚焦时触发，event.detail = { value, height }，height 为键盘高度
			onFocus(event) {
				this.$emit('onFocus', {
					value: event.detail.value
				})
			},
			//输入框失去焦点时触发，event.detail = {value: value}
			onBlur: function(event) {
				this.$emit('onFocus', {
					value: event.detail.value
				})
			},
			//点击完成按钮时触发，event.detail = {value: value}
			onConfirm(event) {
				this.$emit('onConfirm', {
					value: event.detail.value
				})
				this.fieldValue = ''
			},
			//前置自定义事件
			preHandler() {
				this.$emit('preHandler')
			},
			//清除输入框内容
			clear() {
				this.fieldValue = ''
				this.$emit('clear')
			},
			//后置自定义事件
			sufHandler() {
				this.$emit('sufHandler', {
					value: this.fieldValue
				})
			},
			//后置外侧自定义事件
			actionHandler() {
				this.$emit('actionHandler', {
					value: this.fieldValue
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import './index.scss';
</style>
