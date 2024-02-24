<template>
	<view class="order">
		<scroll-view class="goodsList" scroll-y>
			<uni-card :title="item.productName" :sub-title="item.content" v-for="(item,index) in list" :key="index"
				:thumbnail="item.productImg" @click="onClickCard(1)" isShadow="true" border="false" margin="0px">
				<view class="price">
					<text>￥{{item.nowIntegral}}</text>
					<text>￥{{item.oldIntegral}}</text>
					<text decode>{{item.exchangeTime}}</text>
				</view>
			</uni-card>
			<text v-if="list.length===0" style="margin-left: 200rpx; background-color: aquamarine;">暂无数据</text>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: []
			}
		},
		onLoad() {  
			uni.getStorage({
				key: 'USERID',
				success: (res) => {
					this.getExchanges(res.data)
				},
				fail() {
					uni.showToast({
						title: '请先登录！',
						icon: 'error'
					})
				}
			})
		},
		methods: {
			async getExchanges(userId) {
				const res = await this.$myRequest({
					url: '/integral/getExchanges?userId=' + userId
				})
				this.list = res.data.data
			}
		}
	}
</script>

<style lang="scss">
	.order {
		.goodsList {
			position: fixed;
			width: 720rpx;
			margin-left: 15rpx;
			margin-top: 10rpx;
			height: 100%;
			// height: 850rpx;
			display: flex;

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
						color: #7c7c7c;
						font-size: 32rpx;
						margin-left: 80rpx;
						// border: 2px solid #10d169;
						// border-radius: 10px;
					}
				}
			}

		}
	}
</style>
