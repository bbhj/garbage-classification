<template>
	<view>

		<web-view :webview-styles="webviewStyles" :src="url"></web-view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: '',
			}
		},
		onLoad(options) {
			console.log(options)
			let type = options.type
			this.showPage(type)
		},
		onShow() {
			// this.showPage(type)
			uni.getStorage({
				key: 'USERID',
				success: (res) => {
					this.addStudyNum(res.data)
				}
			})
		},
		methods: {
			showPage(type) {
				switch (type) {
					case '1':
						this.url = 'https://baike.baidu.com/item/%E5%B9%B2%E5%9E%83%E5%9C%BE/23589706?fr=aladdin'
						break
					case '2':
						this.url = 'https://baijiahao.baidu.com/s?id=1642981259661579841&wfr=spider&for=pc'
						break;
					case '3':
						this.url =
							'https://baike.baidu.com/item/%E5%8F%AF%E5%9B%9E%E6%94%B6%E7%89%A9?fromtitle=%E5%8F%AF%E5%9B%9E%E6%94%B6%E5%9E%83%E5%9C%BE&fromid=2084517&fromModule=lemma_search-box'
						break
					case '4':
						this.url =
							'https://baike.baidu.com/item/%E6%9C%89%E5%AE%B3%E5%9E%83%E5%9C%BE?fromModule=lemma_search-box'
						break
				}
			},
			async addStudyNum(userId) {
				await this.$myRequest({
					url: '/baiduAI/testAdd?userId='+userId
				})
			}
		}
	}
</script>

<style>

</style>
