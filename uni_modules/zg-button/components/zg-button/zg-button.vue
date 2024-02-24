<template>
	<view
		class="zg-button"
		:class="{
			'zg-button--primary': type === 'primary',
			'zg-button--success': type === 'success',
			'zg-button--warn': type === 'warn',
			'zg-button--error': type === 'error',
			'zg-button--large': size === 'large',
			'zg-button--base': size === 'base',
			'zg-button--small': size === 'small',
			'zg-button--plain': plain,
			'zg-button--disabled': disabled,
			'zg-button--loading': loading,
			'zg-button--block': block,
			'zg-button--text': text,
		}"
		@click="onClick"
	>
		<image class="zg-button__icon" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PHBhdGggZmlsbD0ibm9uZSIgZD0iTTAgMGgxMDB2MTAwSDB6Ii8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTlFOUU5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgLTMwKSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iIzk4OTY5NyIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgzMCAxMDUuOTggNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjOUI5OTlBIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDYwIDc1Ljk4IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0EzQTFBMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSg5MCA2NSA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNBQkE5QUEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoMTIwIDU4LjY2IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0IyQjJCMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgxNTAgNTQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjQkFCOEI5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDE4MCA1MCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDMkMwQzEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTE1MCA0NS45OCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDQkNCQ0IiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTEyMCA0MS4zNCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNEMkQyRDIiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTkwIDM1IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0RBREFEQSIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgtNjAgMjQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTJFMkUyIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKC0zMCAtNS45OCA2NSkiLz48L3N2Zz4=" mode="" v-if="loading"></image>
		<view>
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		name:"zg-button",
		props:{
			type: {
				type: String,
				default: '' // primary success warn error
			},
			plain: {
				type: Boolean,
				default: false
			},
			loading: {
				type: Boolean,
				default: false
			},
			disabled: {
				type: Boolean,
				default: false
			},
			block: {
				type: Boolean,
				default: false
			},
			text: {
				type: Boolean,
				default: false
			},
			size: {
				type: String,
				default: 'base' // large base small
			},
		},
		methods: {
			onClick() {
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.zg-button {
		background-color: $uni-text-color-placeholder;
		color: $uni-text-color-inverse;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
	
		&__icon {
			width: 36rpx;
			height: 36rpx;
			animation: uni-loading 1s steps(12) infinite;
		}
		&--primary {
			background-color: $uni-color-primary;
		}
		&--success {
			background-color: $uni-color-success;
		}
		&--warn {
			background-color: $uni-color-warning;
		}
		&--error {
			background-color: $uni-color-error;
		}
		&--plain {
			border: 1px solid $uni-border-color;
			background-color: transparent !important;
		}
		&--disabled,
		&--loading {
			pointer-events: none;
			opacity: $uni-opacity-disabled;
		}
		&--large {
			border-radius: $uni-border-radius-lg;
			padding: $uni-spacing-col-lg;
			font-size: $uni-font-size-lg;
		}
		&--base {
			border-radius: $uni-border-radius-base;
			padding: $uni-spacing-col-base $uni-spacing-row-base;
			font-size: $uni-font-size-base;
		}
		&--small {
			border-radius: $uni-border-radius-sm;
			padding: $uni-spacing-col-sm $uni-spacing-row-sm;
			font-size: $uni-font-size-sm;
		}
		&--text {
			background-color: transparent !important;
			border: 0;
			color: $uni-text-color;
		}
	}
	.zg-button--plain.zg-button--primary {
		border-color: $uni-color-primary;
		color: $uni-color-primary;
	}
	.zg-button--plain.zg-button--success {
		border-color: $uni-color-success;
		color: $uni-color-success;
	}
	.zg-button--plain.zg-button--warn {
		border-color: $uni-color-warning;
		color: $uni-color-warning;
	}
	.zg-button--plain.zg-button--error {
		border-color: $uni-color-error;
		color: $uni-color-error;
	}
	.zg-button--large.zg-button--block {
		padding: $uni-spacing-col-lg*1.5 $uni-spacing-row-lg;
	}
	.zg-button--base.zg-button--block {
		padding: $uni-spacing-col-base*2 $uni-spacing-row-base;
	}
	.zg-button--small.zg-button--block {
		padding: $uni-spacing-col-sm*2.5 $uni-spacing-row-sm;
	}
	.zg-button--text.zg-button--primary {
		color: $uni-color-primary;
	}
	.zg-button--text.zg-button--success {
		color: $uni-color-success;
	}
	.zg-button--text.zg-button--warn {
		color: $uni-color-warning;
	}
	.zg-button--text.zg-button--error {
		color: $uni-color-error;
	}
</style>
