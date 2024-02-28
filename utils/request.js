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
uni.addInterceptor('request', {
	invoke: (requestConfig) => {
		requestConfig.header.Authorization = uni.getStorageSync('token');
		return requestConfig;
	},
	fail(error) {
		console.error('请求失败:', error);
	},
});
uni.addInterceptor('uploadFile', {
	invoke(requestConfig) {
		requestConfig.header.Authorization = uni.getStorageSync('token');
		return requestConfig;
	},
	fail(error) {
		console.error('请求失败:', error);
	},
});