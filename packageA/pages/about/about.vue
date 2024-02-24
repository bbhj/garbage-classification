<template>
	<view>
		<web-view :webview-styles="webviewStyles" :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: 'https://czh-dev.gitee.io/czh-blog.gitee.io/',
			}
		},
		methods: {
 
		}
	}
</script>

<style>

</style>
