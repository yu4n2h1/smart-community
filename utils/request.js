/* 
 
	Promise 封装 uni.request
	优雅的返回Promise对象
 
 */
import sysurl from '../system.config.js'

export const service = (url, method, data) => {

	return new Promise((resolve, reject) => {

		uni.request({
			url: sysurl.developUrl + url,
			method,
			data,
			header: {
				'Authorization': `${uni.getStorageSync('token')}`
			},
			success: (res) => {
				resolve(res.data)
			},
			fail: (err) => {
				reject(err)
			}
		})

	})

}

export const serviceWithParam = (url, method, data) => {

	return new Promise((resolve, reject) => {

		uni.request({
			url: sysurl.developUrl + url,
			method,
			data,
			header: {
				'content-type': 'application/x-www-form-urlencoded',
				'Authorization': `${uni.getStorageSync('token')}`
			},
			success: (res) => {
				resolve(res.data)
			},
			fail: (err) => {
				reject(err)
			}
		})

	})
}
uni.addInterceptor('navigateTo',{
	invoke:(config)=> {
		if (uni.getStorageSync('token') == null || uni.getStorageSync('token') == "") {
			config.url = "/pages/login/loginPage"
			uni.showToast({
				title:"请先登录"
			})
		}
		return config
	}
})
uni.addInterceptor('request', {
	invoke: (requestConfig) => {
		const whiteList = "/user/login"
		if (requestConfig.url.search(whiteList) == -1 && (uni.getStorageSync('token') == null || uni.getStorageSync('token') == "")) {
			return false
		}
		requestConfig.header.Authorization = uni.getStorageSync('token');
		return requestConfig;
	},
	fail(error) {
		console.error('请求失败:', error);
	},
});
uni.addInterceptor('uploadFile', {
	invoke: (requestConfig) => {
		const whiteList = "/user/login"
		if (requestConfig.url.search(whiteList) == -1 && (uni.getStorageSync('token') == null || uni.getStorageSync('token') == "")) {
			return false
		}
		requestConfig.header.Authorization = uni.getStorageSync('token');
		return requestConfig;
	},
	fail(error) {
		console.error('请求失败:', error);
	},
});