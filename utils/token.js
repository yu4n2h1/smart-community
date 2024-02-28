import {getLocalData} from '../utils/cache.js'

export function getUserToken(){
	const token = uni.getStorageSync("user-token")
	if(token){
		return token
	} else {
		uni.showModal({
			title: '提示',
			content: '先请登录',
			success: function(res){
				if (res.confirm) {
					goLogin()
				} else if (res.cancel) {
					goHome()
				}
			}
		})
	}	
}

function goLogin(){
	uni.navigateTo({
		url: '/pages/login/login'
	})
}

function goHome(){
	uni.switchTab({
		url: '/pages/home/home'
	})
}