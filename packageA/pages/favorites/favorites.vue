<template>
	<view>
		<uni-card :title="item.title" :extra="item.answer" v-for="(item,index) in Favs" :key="index"
			@click="cancelFav(item.queId)"></uni-card>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Favs: [],
				userId: 0
			}
		},
		onLoad() {
			uni.getStorage({
				key: 'USERID',
				success: (res) => {
					this.getFav(res.data)
					this.userId = res.data
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
			async getFav(userId) {
				const res = await this.$myRequest({
					url: '/favorites/getFav?userId=' + userId
				})
				this.Favs = res.data.data
			},
			cancelFav(queId) {
				let that = this
				uni.showModal({
					title: '取消收藏',
					content: '取消收藏后将无法恢复',
					success: async res => {
						if (res.confirm) {
							const res = await this.$myRequest({
								url: '/favorites/updateStatus',
								data: {
									userId: that.userId,
									questionId: queId
								},
								method: 'POST'
							})
							if (res.data.code == 200) {
								uni.showToast({
									title: '取消收藏!',
									icon: 'none',
									complete: () => {
										uni.redirectTo({
											url: '../favorites/favorites'
										});
									}
								})
							}

							// uni.request({
							// 	url: 'http://localhost:8080/favorites/updateStatus',
							// 	data: {
							// 		userId: that.userId,
							// 		questionId: queId
							// 	},
							// 	method: 'POST',
							// 	success: (res) => {
							// 		uni.showToast({
							// 			title: '取消收藏!',
							// 			icon: 'none',
							// 			complete: () => {
							// 				uni.redirectTo({
							// 					url: '../favorites/favorites'
							// 				});
							// 			}
							// 		})
							// 	}
							// })
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})


			}
		}
	}
</script>

<style>

</style>
