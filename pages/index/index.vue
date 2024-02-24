<template>
	<view class="index">
		<view class="uni-margin-wrap">
			<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
				:duration="duration">
				<swiper-item>
					<view class="swiper-item uni-bg-red">
						<image
							src="https://img.zcool.cn/community/0133325c00f295a80121ab5d38cf9c.jpg@3000w_1l_2o_100sh.jpg">
						</image>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item uni-bg-green">
						<image src="https://pic2.zhimg.com/v2-fefda3094b0dee9c54aa633adbc0773e_b.jpg">
						</image>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item uni-bg-blue">
						<image
							src="https://bpic.588ku.com/Templet_origin_pic/05/04/08/637140ba9106d541fe4a3e39af0c7036.jpg">
						</image>
					</view>
				</swiper-item>
			</swiper>
		</view>

		<view class="search">
			<uni-easyinput confirmType="search" type="text" clearable="false" @confirm="searchBtn"
				@iconClick="searchBtn" suffixIcon="search" v-model="search" placeholder="请输入垃圾名称">
			</uni-easyinput>
		</view>

		<view class="camera">
			<button class="btn" @click="camera()">扫描物品</button>
		</view>

		<view class="main-show-classify">
			<view class="main-classify">
				<view @click="switchTabToClassify(1)">
					<image class="main-img" src="https://img.tukuppt.com/png_preview/02/92/28/nY6CD7HOIX.jpg!/fw/780">
					</image>
				</view>
				<view @click="switchTabToClassify(2)">
					<image class="main-img" src="https://img.tukuppt.com/png_preview/02/92/28/APpHu0MzqA.jpg!/fw/780">
					</image>
				</view>
			</view>
			<view class="main-classify">
				<view @click="switchTabToClassify(3)">
					<image class="main-img" src="https://img.tukuppt.com/png_preview/02/92/28/ZnB306Av9B.jpg!/fw/780">
					</image>
				</view>
				<view @click="switchTabToClassify(4)">
					<image class="main-img" src="https://img.tukuppt.com/png_preview/02/92/28/CKVe6E6EPt.jpg!/fw/780">
					</image>
				</view>
			</view>
		</view>

		<uni-nav-bar title="附近的垃圾桶" shadow="true" dark />
		<!-- map -->
		<view class="map">
			<map style="width: 100%; height: 750rpx;" :scale="scale" :latitude="latitude" :longitude="longitude"
				:markers="markers">
			</map>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				scanRes: {},
				userId: null,
				// city: '北京',
				/**
				 * 当前位置的经纬度
				 */
				longitude: 120.363472,
				latitude: 30.312212,
				scale: 19,
				markers: [], //附近垃圾桶坐标
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				search: '',
				num: 0,
			}
		},
		onLoad() {
			this.getCoordinateData()
			this.num++
		},
		onShow() {
			uni.getStorage({
				key: 'USERID',
				success: (res) => {
					this.userId = res.data
				}
			})

		},
		methods: {
			async getCoordinateData() {
				const res = await this.$myRequest({
					url: '/garbageType/getCoordinateData',
					method: 'GET'
				})
				console.log("[获取地图坐标] - getCoordinateData:", res.data)
				this.markers = res.data.data
			},
			camera() {
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['camera', 'album'], //这要注意，camera掉拍照，album是打开手机相册
					success: (res) => {
						const tempFilePaths = res.tempFilePaths;
						uni.uploadFile({
							url: 'https://www.lvxingc.com:9999/baiduAI/scan',
							filePath: tempFilePaths[0],
							name: 'file',
							formData: {
								'userId': this.userId
							},
							success: (res) => {
								var result = JSON.parse(res.data)
								console.log(result)
								this.scanRes = result.data
								if (result.code !== 200) {
									uni.showToast({
										title: result.msg,
										icon: 'none',
										duration: 2000
									})
								} else {
									uni.showModal({
										title: result.data.name,
										content: '该物品属于 [' + result.data.type + ']'
									})
					
	}
							}
						})
					}
				});
			},
			canvasIdErrorCallback: function(e) {
				console.error(e.detail.errMsg)
			},
			switchTabToClassify(id) {
				uni.setStorage({
					key: 'INDEX_TO_STUDY_TYPRID',
					data: id
				})
				uni.switchTab({
					url: '/pages/study/study?id=' + id
				})
			},
			async searchBtn() {
				const res = await this.$myRequest({
					url: '/garbageType/searchGarbage?name=' + this.search
				})
				uni.showModal({
					title: res.data.data.name,
					content: '该物品属于 [' + res.data.data.type + ']'
				})
			}
		}
	}
</script>

<style lang="scss">
	.index {
		.uni-margin-wrap {
			width: 690rpx;
			width: 100%;

			.swiper {
				height: 380rpx;

				.swiper-item {
					display: block;
					height: 380rpx;
					line-height: 380rpx;
					text-align: center;

					image {
						width: 750rpx;
						height: 380rpx;
					}
				}
			}
		}

		.search {
			display: flex;
			padding-top: 15rpx;

			image {
				padding-top: 5rpx;
				height: 70rpx;
				width: 70rpx;
			}

			uni-section {
				padding-left: 50rpx;
				width: 70%;
			}

			button-sp-area {
				padding-top: 15rpx;
			}
		}

		.camera {
			height: 300rpx;

			image {
				height: 300rpx;
			}

			/* From www.lingdaima.com */
			.btn {
				width: 60%;
				background-color: #00BFA6;
				padding: 14px 40px;
				color: #fff;
				text-transform: uppercase;
				letter-spacing: 2px;
				cursor: pointer;
				border-radius: 10px;
				border: 2px dashed #00BFA6;
				box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
				transition: .4s;
				margin-top: 100rpx;
			}

			.btn span:last-child {
				display: none;
			}

			.btn:hover {
				transition: .4s;
				border: 2px dashed #00BFA6;
				background-color: #fff;
				color: #00BFA6;
			}

			.btn:active {
				background-color: #87dbd0;
			}


		}

		.main-show-classify {
			.main-classify {
				display: flex;
				direction: center;
				justify-content: center;
			}

			.main-img {
				width: 300upx;
				height: 300upx;
				padding: 20upx;
			}
		}

		/* 下方搜索 */
		$nav-height: 30px;

		.city {
			/* #ifndef APP-PLUS-NVUE */
			display: flex;
			/* #endif */
			flex-direction: row;
			align-items: center;
			justify-content: flex-start;
			// width: 160rpx;
			margin-left: 4px;
		}

		.input-view {
			/* #ifndef APP-PLUS-NVUE */
			display: flex;
			/* #endif */
			flex-direction: row;
			// width: 500rpx;
			flex: 1;
			background-color: #f8f8f8;
			height: $nav-height;
			border-radius: 15px;
			padding: 0 15px;
			flex-wrap: nowrap;
			margin: 7px 0;
			line-height: $nav-height;
		}

		.input-uni-icon {
			line-height: $nav-height;
		}

		.nav-bar-input {
			height: $nav-height;
			line-height: $nav-height;
			/* #ifdef APP-PLUS-NVUE */
			width: 370rpx;
			/* #endif */
			padding: 0 5px;
			font-size: 12px;
			background-color: #f8f8f8;
		}

	}
</style>
