<template>

	<view class="background-container">
		<u-image src="https://cdn.jsdelivr.net/gh/zishuQ/PicGo/img/login.jpg" custom-style="object-fit: cover;position: absolute;top: 0;left: 0;z-index: 0;" width="100%" height="100%" ></u-image>

		<view style="margin-top: 60vh;">
			<u-button
				custom-style="width: 320px;height: 35px;display: flex;justify-content: center;align-items: center;"
				@click="loginConfirm(null,true)" color="blue" throttle-time="500">业主登录</u-button>
			<view class="test" style="margin-top: 20px; display: flex; flex-direction: row; align-items: center;">
				<u-checkbox-group><u-checkbox
						@change="licenseDisagree = !licenseDisagree"></u-checkbox></u-checkbox-group>
				<view style="margin-left: 2%; white-space: nowrap; font-size: 12px;">
					<text>
						我已阅读并同意
					</text>
					<text @click="showDeal1 = true"
						style="color: aqua; white-space: nowrap; font-size: 12px;">《用户服务协议》</text>
					<text style="white-space: nowrap; font-size: 12px;">及</text>
					<text @click="showDeal2 = true"
						style="color: aqua; white-space: nowrap; font-size: 12px;">《隐私政策》</text>
				</view>
			</view>
		</view>
		<u-modal :show="showDeal1" :title="userAgreement.title" @confirm="showDeal1=false">
			<view class="slot-content">
				<rich-text :nodes="userAgreement.content"></rich-text>
			</view>
		</u-modal>
		<u-modal :show="showDeal2" :title="privacyAgreement.title" @confirm="showDeal2=false">
			<view class="slot-content">
				<rich-text :nodes="privacyAgreement.content"></rich-text>
			</view>
		</u-modal>
		<loginModal :show="show" @getUserInfo="loginConfirm" @closeModal="show=false"></loginModal>
	</view>
</template>
<script setup>
	import {
		ref,
		computed,
		onMounted
	} from 'vue';
	import loginModal from "../../components/loginModal.vue"
	import {
		login
	} from "./api/login.js"
	import {
		setLocalData
	} from "../../utils/cache.js"
	import config from "../../system.config.js"

	const backgroundUrl = `${config.fileUrl}/loginPage/img/login.jpg`
	let show = ref(false);
	const showDeal1 = ref(false);
	const showDeal2 = ref(false);
	const title = ref("标题")
	let licenseDisagree = ref(true)
	const userAgreement = {
		title: "用户服务协议",
		content: `A如果本《协议》中的任何条款无论因何种原因完全或部分无效，或不具有执行力，或违反任何适用的法律，则该条款被视为删除，但本《协议》的其余条款仍应有效，并且有约束力。<br>
		B我公司有权随时根据有关法律法规的变化、公司经营状况和经营策略的调整等情况修改本《协议》。修改后的协议将随附于新版本软件。当发生有关争议时，以最新的协议文本为准。如果不同意改动的内容，用户可以自行删除本产品。如果用户继续使用本产品，则视为您接受本产品的变动。<br>
		A如果本《协议》中的任何条款无论因何种原因完全或部分无效，或不具有执行力，或违反任何适用的法律，则该条款被视为删除，但本《协议》的其余条款仍应有效，并且有约束力。B我公司有权随时根据有关法律法规的变化、公司经营状况和经营策略的调整等情况修改本《协议》。修改后的协议将随附于新版本软件。当发生有关争议时，以最新的协议文本为准。如果不同意改动的内容，用户可以自行删除本产品。如果用户继续使用本产品，则视为您接受本产品的变动。`
	}
	const privacyAgreement = {
		title: "隐私协议",
		content: `A如果本《协议》中的任何条款无论因何种原因完全或部分无效，或不具有执行力，或违反任何适用的法律，则该条款被视为删除，但本《协议》的其余条款仍应有效，并且有约束力。<br>
		B我公司有权随时根据有关法律法规的变化、公司经营状况和经营策略的调整等情况修改本《协议》。修改后的协议将随附于新版本软件。当发生有关争议时，以最新的协议文本为准。如果不同意改动的内容，用户可以自行删除本产品。如果用户继续使用本产品，则视为您接受本产品的变动。<br>
		A如果本《协议》中的任何条款无论因何种原因完全或部分无效，或不具有执行力，或违反任何适用的法律，则该条款被视为删除，但本《协议》的其余条款仍应有效，并且有约束力。B我公司有权随时根据有关法律法规的变化、公司经营状况和经营策略的调整等情况修改本《协议》。修改后的协议将随附于新版本软件。当发生有关争议时，以最新的协议文本为准。如果不同意改动的内容，用户可以自行删除本产品。如果用户继续使用本产品，则视为您接受本产品的变动。`
	}
	const avatarUrl = ref('');
	const userInfo = ref({})
	const neighborhoodName = ref('')
	const logCode = ref('');
	const phone = ref('');
	const isauthentic = ref('');
	const community_name = ref('');
	const islogin = ref('');
	const getUserInfo = (e) => {
		userInfo.value = e
	}

	const getCode = () => {
		return new Promise((resolve, reject) => {
			uni.login({
				provider: 'weixin',
				success(res) {
					logCode.value = res.code;
					resolve(logCode.value); // 表示异步操作成功
				},
				fail(err) {
					reject(err); // 表示异步操作失败
				},
			});
		});
	};

	const getAvatarData = (openid) => {
		return new Promise((resolve, reject) => {
			wx.getFileSystemManager().readFile({
				filePath: avatarUrl.value, //选择图片返回的相对路径
				encoding: 'base64', //编码格式
				success: res => { //成功的回调
				}
			})
			// wx.uploadFile({
			//     url: 'http://127.0.0.1:8080/user/uploadAvatar',
			//     filePath: avatarUrl.value, // 要传的图片路径
			//     name: 'file', // 获取图片二进制文件的key
			//     formData: { // 其他需要携带的参数
			//         'openid': openid
			//     },
			//     success(res) {
			//         resolve(res.data); // 注意：这里是直接返回响应的二进制数据
			//         console.log(res);
			//         // do something
			//     },
			//     fail(err) {
			//         reject(err); // 表示异步操作失败
			//     },
			// })
		});
	}


	const postUserinfo2Back = (openid, avatarByte) => {
		return new Promise((resolve, reject) => {
			uni.setStorageSync('nickname', "这是nickname");
			uni.setStorage({
				key: 'avatar',
				data: avatarByte,
				success: function() {
					console.log('存入图片二进制数据成功！');
				}
			});
		});
	};

	const loginConfirm = async (userInfo, verify = false) => {
		if (licenseDisagree.value) {
			uni.showToast({
				title: "请先阅读并同意协议",
				icon: "error"
			})
			return false;
		}
		const code = await getCode();
		let userName = null;
		let neighborhoodName = null;
		if (userInfo) {
			userName = userInfo.name
			neighborhoodName = userInfo.neighborhoodName
		}
		const req = {
			code,
			name: userName,
			neighborhoodName,
			verify
		}

		login(req).then(res => {
			if (res.msg == "success") {
				setLocalData("token", res.data.token)
				show.value = false
				uni.switchTab({
					url: "/pages/mine/mine"
				})
				uni.showToast({
					title: "登录成功"
				})
			} else {
				if (verify) {
					show.value = true
					return
				}
				reject("error")
			}
		}).catch(err => {

			uni.showToast({
				title: "" + err,
				icon: "error"
			})
		})

	}
	// const result3 = await postUserinfo2Back(openid, avatarByte);
</script>

<style lang="scss">
	.background-container {
		position: relative;
		width: 100%;
		height: 100vh; // 或者你希望的高度
		overflow: hidden;
	}

	.background-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 0; // 设置较低的 z-index
	}

	.test {
		position: relative; // 不知道为什么这里放上这个之后就可以在图层上显示了
		z-index: 1;
		margin-left: 10%;
	}

	.overlay-button {
		position: relative;
		width: 80%;
		height: 46px;
		border-radius: 5%;
		z-index: 1; // 设置较高的 z-index，使其在图片上方
		font-size: 15px;
		display: flex;
		justify-content: center;
		align-items: center;
		color: white;
		// background-color: rgba(255, 255, 255, 0.8);

	}

	.pop-block {
		height: 200px;
		width: 300px;
		z-index: 2;
	}

	// 用户头像
	.avatar-button {
		width: 80rpx;
		height: 80rpx;
		padding: 0;
		border-radius: 50%;
		margin-left: 20%;

		image {
			width: 80rpx;
			height: 80rpx;
			border-radius: 50%;
			// border: 4rpx solid black;
		}
	}

	.avatar-img {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		background-image: url('https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0');
		background-size: cover;
	}

	.pop-block-bottom-button {
		width: 120px;
		height: 35px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>