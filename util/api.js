//封装get请求
const BASE_URL = "https://www.lvxingc.com:9999"
export const myRequest = (options) => {
	return new Promise((resolve, reject) => {
		uni.request({
			method: options.method,
			data: options.data,
			url: BASE_URL + options.url,
			success(res) {
				if (res.data.code !== 200) {
					return uni.showToast({
						title: res.data.msg,
						icon: "error"
					})
				} 
				resolve(res)
			},
			fail(err) {
				uni.showToast({
					title: '获取数据失败'
				})
				reject(err)
			}
		})
	})
}
