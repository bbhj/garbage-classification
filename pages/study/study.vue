<template>
	<view class="study">
		<!-- 顶部导航卡片 -->
		<view class="flex nav">
			<view :class="item.id===current?'nav-item text-selected current':'nav-item'" v-for="item in tabs"
				:key="item.id" @click="tabSelect(item.id)">
				{{item.title}}
			</view>
		</view>
		<!-- 悬浮按钮 -->
		<view>
			<uni-fab ref="fab" :pattern="pattern" :content="content" :horizontal="horizontal" :vertical="vertical"
				:direction="direction" @trigger="trigger" />
		</view>

		<!-- 卡片 -->
		<view class="card">
			<uni-section title="card" type="line">
				<uni-card :cover="cardContent.imgUrl" @click="onClick" isFull="true">
					<rich-text :nodes="cardContent.detail">

					</rich-text>
				</uni-card>
			</uni-section>
		</view>

		<!-- 列表 -->
		<view class="list">
			<uni-list>
				<uni-list-item v-for="item in garbageData" :title="item.name" :key="item.id"
					rightText="点我试试" clickable="true" @click="clickGarbageData(item.detail, item.name)">
				</uni-list-item>
			</uni-list>


		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				first: true, // 是否是第一次进入页面
				pageSize: 0, // 每页数据条数
				cardContent: {},
				cover: 'https://web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg',
				avatar: 'https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png',
				extraIcon: {
					color: '#4cd964',
					size: '22',
					type: 'gear-filled'
				},
				tabs: [], //顶部标签页
				current: 1,
				garbageData: [],
				horizontal: 'right',
				vertical: 'bottom',
				direction: 'vertical',
				pattern: {
					color: '#282c35',
					backgroundColor: '#fff',
					selectedColor: '#10d169',
					buttonColor: '#10d169',
					iconColor: '#fff'
				},
				content: [{
						selectedIconPath: 'https://czh-pic.oss-cn-guangzhou.aliyuncs.com/202305180232984.png',
						text: '练习',
						active: true
					},
					{
						selectedIconPath: 'https://czh-pic.oss-cn-guangzhou.aliyuncs.com/202305180228624.png',
						text: '记录',
						active: true
					},
					{
						selectedIconPath: 'https://czh-pic.oss-cn-guangzhou.aliyuncs.com/202305180233230.png',
						text: '测试',
						active: true
					}
				],

			}
		},
		onLoad() {
			this.getTabs()
		},
		onShow() {
			this.first = true;
			uni.getStorage({
				key: 'INDEX_TO_STUDY_TYPRID',
				success: (res) => {
					this.current = res.data
					this.getList(res.data)
					/* uni.removeStorage({
						key: 'INDEX_TO_STUDY_TYPRID'
					}) */
				}
			})

		},
		onReachBottom() {
			this.getList(this.current)
		},
		methods: {
			async getTabs() {
				const res = await this.$myRequest({
					url: '/garbageType/getTabs'
				})
				console.log("[getTabs] - res:",res.data)
				this.tabs = res.data.data
			},
			async getList(current) {
				if (!this.first) {
					uni.showLoading({
						title:'数据加载中'
					})
				}
				
				console.log("[getList] - current:",current)
				this.pageSize += 50;
				const res = await this.$myRequest({
					url: '/garbageType/findListByType?id=' + current + "&pageSize=" + this.pageSize,
				})
				this.cardContent = res.data.data
				this.garbageData = res.data.data.garbageTypes;
				console.log("[getList] - res:", res.data)
				if (!this.first) {
					setTimeout(() => {
						uni.hideLoading() // 隐藏加载动画
					}, 1000); // 延迟2秒执行
				}
				this.first=false
			},
			onClick(e) {
				uni.navigateTo({
					url: "/packageA/pages/garbage_detail/garbage_detail?type=" + this.current
				})
			},
			trigger(e) {
				// this.content[e.index].active = !e.item.active
				uni.getStorage({
					key: 'USERID',
					success() {
						let choose = e.index
						if (choose == '1') {
							uni.navigateTo({
								url: '/packageA/pages/wrong_question/wrong_question'
							})
						} else {
							uni.navigateTo({
								url: '/packageA/pages/test_collection/test_collection?type=' + choose
							})
						}
					},
					fail() {
						uni.showToast({
							title: '请先登录！',
							icon: 'error'
						})
					}
				})


			},
			clickGarbageData(content, title) {
				uni.showModal({
					title: title,
					content: content
				})
			},
			tabSelect(num) {
				this.current = num
				// this.cardContent = {}
				this.garbageData = []
				this.pageSize = 0
				this.first=true
				this.getList(num)
				uni.setStorage({
					key: 'INDEX_TO_STUDY_TYPRID',
					data: num
				})
			},
		}
	}
</script>

<style lang="scss">
	/* 页面背景颜色为 #f2f2f2 */
	page {
		background: #f2f2f2;
	}

	/* 设置导航外层样式，绝对定位设置为fixed。z-index: 999999; 能够将 nav 布局层级结果放在最上层，避免被下层view遮挡*/
	.nav {
		position: fixed;
		background: white;
		color: #353535;
		z-index: 999999;
		max-height: 94rpx;
		width: 100%;
	}

	/* 设置为水平布局，文字居中显示 */
	.flex {
		display: flex;
		text-align: center;
	}

	/* 设置选中项的底部边框 */
	.nav .nav-item.current {
		border-bottom: 4rpx solid;
	}

	/* 设置选中项的文字颜色和大小 */
	.text-selected {
		color: #10d169;
		font-size: 34rpx;
	}

	/* 设置各项的高度、边距，同时设置flex=1，表示各项平分 */
	.nav .nav-item {
		height: 90rpx;
		display: inline-block;
		line-height: 90rpx;
		margin: 0 10rpx;
		padding: 0 20rpx;
		flex: 1;
	}

	/* uni-section {
		.grid-item-box {
			flex: 0;
			// position: relative;
			/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 15px 0;
	}
	}

	*/ .list {
		// padding-top: 100rpx;
	}
</style>
