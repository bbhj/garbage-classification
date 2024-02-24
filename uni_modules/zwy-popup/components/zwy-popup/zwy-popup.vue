<template>
	<view v-show="ishide" @touchmove.stop.prevent>
		<!-- 遮罩 -->
		<view class="mask" :style="maskStyle"></view>
		<!-- 内容 -->
		<view class="tip" :style="tipStyle">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			// 控制弹窗显隐
			ishide: {
				type: Boolean,
				required: true
			},
			// 设置弹窗层级
			zindex: {
				type: Number,
				default: 99
			},
			// 设置遮罩透明度
			opacity: {
				type: Number,
				default: 0.6
			},
			// 设置内容区宽度
			width: {
				type: String,
				default: '500rpx'
			},
			// 设置内容区高度
			height: {
				type: String,
				default: '500rpx'
			},
			// 设置内容区圆角
			radius: {
				type: String
			},
			// 设置内容区底色
			bgcolor: {
				type: String,
				default: '#FFFFFF'
			}
		},
		computed: {
			// 遮罩样式
			maskStyle() {
				return `
					z-index:${this.zindex};
					background:rgba(0,0,0,${this.opacity});
				`
			},
			// 内容样式
			tipStyle() {
				return `
					width:${this.width};
					height:${this.height};
					z-index:${this.zindex+1};
					border-radius:${this.radius};
					background-color:${this.bgcolor};
				`
			}
		}
	}
</script>

<style scoped>
	.mask {
		position: fixed;
		bottom: 0;
		right: 0;
		left: 0;
		top: 0;
	}

	.tip {
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}
</style>
