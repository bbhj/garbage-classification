<template>
	<view>
		<button class="user_btn" v-if="Object.keys(userInfo).length===0" @click="wxlogin" type="primary"
			plain>登录</button>

		<!-- 头像 -->
		<view class="user_info_wrap" v-if="Object.keys(userInfo).length!==0">
			<view class="user_img_wrap">
				<image class="user_bg" :src="userInfo.headImg"></image>
				<view class="user_info">
					<image class="user_icon" :src="userInfo.headImg"></image>
					<view class="user_name" @click="updateUserName(userInfo.username)">{{userInfo.username}}</view>
				</view>
			</view>
		</view>
		<view class="user_content">
			<view class="user_main">
				<view class="history_wrap">
					<navigator>
						<view class="his_num">{{userNum.scanNum}}</view>
						<view class="his_name">扫描次数</view>
					</navigator>
					<navigator>
						<view class="his_num">{{userNum.studyNum}}</view>
						<view class="his_name">学习次数</view>
					</navigator>
					<navigator>
						<view class="his_num">{{userNum.testNum}}</view>
						<view class="his_name">测试次数</view>
					</navigator>
				</view>

				<view class="orders_wrap">
					<view class="orders_title">更多服务</view>
					<view class="order_content">
						<navigator url="../../packageA/pages/order/order">
							<view class="order_icon iconfont icon-ding_dan"></view>
							<view class="order_icon">📜</view>
							<view class="order_name">订单</view>
						</navigator>
						<navigator url="../../packageA/pages/favorites/favorites">
							<view class="order_icon iconfont icon-daishouhuo"></view>
							<view class="order_icon">⭐</view>
							<view class="order_name">收藏</view>
						</navigator>
						<navigator @click="modelShow">
							<view class="order_icon iconfont icon-tuihuotuikuan_dianpu"></view>
							<view class="order_icon">💬</view>
							<view class="order_name">客服</view>
						</navigator>
					</view>
				</view>
				<view class="app_info_wrap">
					<view class="app_info_item app_info_contact" @click="call">
						<text>联系客服</text>
						<text>0770-10086</text>
					</view>
					<view class="app_info_item" @click="openion()">意见反馈</view>
					<view class="app_info_item" @click="about()">关于我们</view>
				</view>
				<!-- 推荐 -->
				<view class="recommed_wrap">
					<button size="mini" open-type="share">把应用推荐给其他人</button>
				</view>
			</view>
			<zwy-popup :ishide="ishide" radius="20rpx" height="320rpx">
				<button type="primary">选择客服类型</button>
				<button open-type="contact">微信客服</button>
				<button @click="call">电话客服</button>
			</zwy-popup>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ishide: false,
				num: 0,
				userInfo: {},
				userNum: {}
			}
		},
		onLoad() {
			uni.getStorage({
				key: 'USERINFO_OPENID',
				success: (res) => {
					// this.getUserInfo(res.data)
					this.num++
				}
			})
		},
		onShow() {
			//num：标志，防止第一次打开[我的]页面时请求两次
			if (this.num >= 1) {
				uni.getStorage({
					key: 'USERINFO_OPENID',
					success: (res) => {
						this.getUserInfo(res.data)
					}
				})
			}
		},
		methods: {
			async getUserNum(userId) {
				const res = await this.$myRequest({
					url: '/user/getUserNum?id=' + userId
				})
				this.userNum = res.data.data
			},
			async getUserInfo(openId) {
				const res = await this.$myRequest({
					url: '/user/getByOpenId?openId=' + openId
				})
				this.userInfo = res.data.data
				this.getUserNum(res.data.data.id)
			},
			wxlogin() {
				console.log("登录")
				let that = this
				uni.login({
					provider: 'weixin', //使用微信登录
					success: async loginRes => {
						const res = await this.$myRequest({
							url: '/user/login?jsCode=' + loginRes.code,
							method: 'POST',
						})
						if (res.data.code == 200) {
							that.userInfo = res.data.data
							that.getUserNum(res.data.data.id)
							uni.setStorage({
								key: 'USERINFO_OPENID',
								data: res.data.data.openId
							})
							uni.setStorage({
								key: 'USERID',
								data: res.data.data.id,
							})
						}
					}
				});
			},
			call() {
				uni.makePhoneCall({
					phoneNumber: '10086'
				})
			},
			about() {
				uni.navigateTo({
					url: '../../packageA/pages/about/about'
				})
			},
			updateUserName(username) {
				let that = this
				uni.showModal({
					title: '修改昵称',
					content: username,
					editable: true,
					placeholderText: '请输入新的用户名',
					success: (res) => {
						if (res.confirm) {
							console.log(res)
							uni.request({
								url: 'https://www.lvxingc.com:9999/user/saveOrUpdate',
								method: 'POST',
								data: {
									id: that.userInfo.id,
									username: res.content
								},
								success: () => {
									uni.showToast({
										title: '昵称修改成功！',
										complete: () => {
											uni.getStorage({
												key: 'USERINFO_OPENID',
												success: (res) => {
													this.getUserInfo(res.data)
												}
											})
										}
									})
								}
							})
						}
					}
				})
			},
			modelShow() {
				let that = this
				this.ishide = true
				setTimeout(function() {
					that.ishide = false
				}, 2000)
			},
			openion() {
				let that = this
				uni.getStorage({
					key: 'USERID',
					fail() {
						uni.showToast({
							title: '请先登录！',
							icon: 'error'
						})
					},
					success: () => {
						uni.showModal({
							title: '意见反馈',
							editable: true,
							method: 'POST',
							placeholderText: '非常感谢您宝贵的意见',
							success: function(res) {
								if (res.confirm && res.content != "") {
									console.log(res)
									uni.request({
										url: 'https://www.lvxingc.com:9999/user/saveOrUpdateOpinion',
										data: {
											userId: that.userInfo.id,
											opinion: res.content
										},
										success: (res) => {
											if (res.data.code == 200) {
												uni.showToast({
													title: '提交反馈成功！',
													icon: 'success'
												})
											} else {
												uni.showToast({
													title: '系统异常！',
													icon: 'error'
												})
											}
										}
									})
								}
							}
						})
					}
				})

			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #dedede;
	}

	.user_btn {
		margin-top: 40rpx;
		margin-bottom: 80rpx;
		width: 50%;
	}

	.user_info_wrap {
		height: 45vh;

	}

	.user_img_wrap {
		position: relative;
	}

	.user_bg {
		height: 45vh;
		width: 100%;
		/* 高斯模糊 */
		filter: blur(10rpx)
	}

	.user_info {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		top: 20%;
		text-align: center;
	}

	.user_icon {
		width: 150rpx;
		height: 150rpx;
		border-radius: 50%;
	}

	.user_name {
		color: #fff;
		margin-top: 40rpx;
		font-size: 40rpx;
	}

	.user_content {
		position: relative;
	}

	.user_main {

		color: #666;
		position: absolute;
		width: 90%;
		left: 50%;
		transform: translateX(-50%);
		top: -40rpx;
		padding-bottom: 100rpx;
	}

	.history_wrap {
		background-color: #fff;
		display: flex;
	}

	navigator {
		flex: 1;
		text-align: center;
		padding: 10rpx 0;
	}

	.his_num {
		color: #eb4450;

	}

	.orders_wrap {
		background-color: #fff;
		margin-top: 30rpx;
	}

	.orders_title {
		padding: 20rpx;
		border-bottom: 1rpx solid #ccc;
	}

	.order_content {
		display: flex;
	}

	navigator {
		padding: 15rpx 0;
		flex: 1;
		text-align: center;
	}

	.iconfont {
		color: #eb4450;
		font-size: 50rpx;
	}

	.order_icon {
		font-size: 50rpx;
	}

	.order_name {
		font-size: 30rpx;
		color: #999999;
	}

	.app_info_wrap {
		margin-top: 30rpx;
		background-color: #fff;
	}

	.app_info_item {
		padding: 20rpx;
		border-bottom: 1rpx solid #ccc;
	}

	.app_info_contact {
		display: flex;
		justify-content: space-between;
	}

	.recommed_wrap {
		margin-top: 30rpx;
		background-color: #fff;
		padding: 20rpx;

		button {
			display: flex;
			padding: 0;
			font-size: 35rpx;
			color: #5f5f5f;
		}
	}

	button::after {
		border: none;
	}

	button {
		background-color: #fff;
		border-radius: 0;
	}
</style>
