<template>
	<view class="integral">
		<view class="title">
			<uni-section class="mb-10" title="当前积分:" titleColor="" titleFontSize="40rpx" type="circle">
				<template v-slot:right>
					<text class="text">{{currentIntegral}}</text>
				</template>
			</uni-section>
		</view>
		<view class="nullView"></view>

		<view class="down">
			<scroll-view class="left" scroll-y>
				<view :class="active===index?'active':''" @click="leftClickHandle(index, item.id)"
					v-for="(item,index) in leftData" :key="item.id">
					{{item.name}}
				</view>
			</scroll-view>
			<scroll-view class="goodsList" scroll-y>
				<uni-card :title="item.productName" :sub-title="item.content" v-for="item in secondData" :key="item.id"
					:thumbnail="item.productImg" @click="onClickCard(item.id)" isShadow="true" border="false"
					margin="0px">
					<view class="price">
						<text>￥{{item.nowIntegral}}</text>
						<text>￥{{item.oldIntegral}}</text>
						<text decode @click="exchange(item.id)">{{textBtn}}</text>
					</view>
				</uni-card>
				<text v-if="secondData.length===0"
					style="margin-left: 200rpx; background-color: aquamarine;">暂无数据</text>

			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentIntegral: '请先登录后查看积分',
				textBtn: '&ensp;兑换&ensp;',
				active: 0,
				type: 1,
				leftData: [], 
				secondData: [],
				userId: null
			}
		},
		onLoad() {
			
		},
		onShow() {
			this.getSecondData(this.type)
			this.getLeftData()
			uni.getStorage({
				key: 'USERINFO_OPENID',
				success: (res) => {
					this.getUserInfo(res.data)
				}
			})
		},
		methods: {
			async exchange(productId) {
				const res = await this.$myRequest({
					url: '/integral/exchange',
					method: 'POST',
					data: {
						userId: this.userId,
						productId: productId
					},
				})
				console.log(res)
				if (res.data.code !== 500) {
					uni.showToast({
						title: '兑换成功'
					})
					this.getUserIntegral()
				} else {
					uni.showToast({
						title: res.data.msg,
						icon: 'error'
					})
				}
			},
			async getUserIntegral() {
				const res = await this.$myRequest({
					url: '/integral/getIntegralByUserId?id=' + this.userId
				})
				this.currentIntegral = res.data.data
			},
			async getUserInfo(openId) {
				const res = await this.$myRequest({
					url: '/user/getByOpenId?openId=' + openId
				})
				this.userId = res.data.data.id
				this.getUserIntegral()
			},
			async getLeftData() {
				const res = await this.$myRequest({
					url: '/product/getLeftData'
				})
				this.leftData = res.data.data
			},
			async getSecondData(type) {
				const res = await this.$myRequest({
					url: '/product/getSecondData?type=' + type
				})
				this.secondData = res.data.data
			},
			onClickCard(id) {
			},
			leftClickHandle(index, id) {
				this.active = index
				this.getSecondData(id)
			},
			
		}
	}
</script>

<style lang="scss">
	.title {
		position: fixed;

		.mb-10 {
			margin-bottom: 10px;
			// position: fixed;

			.text {
				color: red;
				font-weight: bold;
			}
		}
	}

	.nullView {
		height: 100rpx;
	}



	.down {
		height: 100%;
		display: flex;

		.left {
			width: 200rpx;
			height: 100%;
			border-right: 1px solid #eee;
			position: fixed;

			view {
				height: 60px;
				line-height: 60px;
				color: #333;
				text-align: center;
				font-size: 30rpx;
				border-top: 1px solid #eee;
			}

			.active {
				background: #10d169;
				color: #fff;
			}
		}

		.goodsList {
			position: fixed;
			width: 520rpx;
			margin-left: 27%;
			height: 1150rpx;
			// height: 950rpx;
			// height: 850rpx;

			uni-card {

				.price {
					color: #ff0b44;
					font-size: 36rpx;
					margin: 20rpx 0 5rpx 0;
					display: flex;

					text:nth-child(2) {
						color: #ccc;
						font-size: 28rpx;
						margin-left: 17rpx;
						text-decoration: line-through;
					}

					text:nth-child(3) {
						color: #10d169;
						font-size: 40rpx;
						margin-left: 80rpx;
						border: 2px solid #10d169;
						border-radius: 10px;
					}
				}
			}

		}
	}

	/* 	.goods_nav {
		position: fixed;
		bottom: 0;
		width: 100%;
	} */
</style>
