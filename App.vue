<script>
	export default {
		onLaunch: function() {
			uni.clearStorageSync()
			uni.setStorage({
				key: 'INDEX_TO_STUDY_TYPRID',
				data: 1
			})
			// uni.setStorage({
			// 	key: 'USERINFO_OPENID',
			// 	data: 'oeSEv5pCmNXV_LOOJtQZ2v9UsonQ',
			// 	success: (res) => {
			// 		this.getUserInfo(res.data)
			// 	}
			// })
			/* uni.setStorage({
				key: 'USER_ID',
				data: 1
			}) */
		},
		onShow: function() {

		},
		onHide: function() {

		},
		methods: {
			async getUserInfo(openId) {
				uni.getStorage({
					key: 'USERINFO_OPENID',
					success: (result) => {
						const res = this.$myRequest({
							url: '/user/getByOpenId?openId=' + result.data
						})
						console.log(res)
						uni.setStorage({
							key: 'USERID',
							data: res.data.data.id
						})
					}
				})

			},
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
