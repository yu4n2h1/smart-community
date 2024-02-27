<template>

	<view class="background-container">
		<image src="https://cdn.jsdelivr.net/gh/zishuQ/PicGo/img/login.jpg" class="background-image"></image>

		<view style="margin-top: 60vh;">
			<button @click="show = true" class="overlay-button" style="background-color: blue;">业主登录</button>
			<view class="test" style="margin-top: 20px; display: flex; flex-direction: row; align-items: center;">
				<checkbox>
					<!-- 这里不能使用<input type="checkbox"/> 会不显示 -->
				</checkbox>
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
	import {login} from "../../api/login.js"
	let show = ref(false);
	const showDeal1 = ref(false);
	const showDeal2 = ref(false);
	const title = ref("标题")
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
	// wx.setStorageSync('nickname',title.value)
	// console.log(wx.getStorageSync('nickname'))
	const onChooseAvatar = (e) => {
		console.log("已进入")
		avatarUrl.value = e.detail.avatarUrl;
		console.log(avatarUrl.value);
	};
	const getUserPhone = (e) => {
		if (e.detail.errMsg === 'getPhoneNumber:ok') {
			console.log('手机号数据', e);
			// 在这一步把 手机号 头像 昵称 code 一次性全部丢给后端
		} else {
			// 适应你的项目结构来显示错误提示
			console.error('授权失败无法登录！');
		}
	};
	// onMounted(() => {
	//   userCode();
	// });
	const getCode = () => {
		return new Promise((resolve, reject) => {
			uni.login({
				provider: 'weixin',
				success(res) {
					console.log('登录code', res.code);
					logCode.value = res.code;
					resolve(logCode.value); // 表示异步操作成功
				},
				fail(err) {
					reject(err); // 表示异步操作失败
				},
			});
		});
	};

	const getOpenid = (code) => {
		return new Promise((resolve, reject) => {
			console.log(code);
			wx.request({
				url: `https://api.weixin.qq.com/sns/jscode2session?appid=wx77113e1b6b983a02&secret=fcfefbca594f405b962e521e2f3f7759&js_code=${code}&grant_type=authorization_code`,
				success: (res) => {
					console.log(res.data.openid);
					resolve(res.data.openid);
					// userInfo.openid=res.data.openid
					// //获取到你的openid
					// console.log(userInfo.openid);
				},
				fail(err) {
					reject(err); // 表示异步操作失败
				},
			})
		});
	};

	const getAvatarData = (openid) => {
		return new Promise((resolve, reject) => {
			wx.getFileSystemManager().readFile({
				filePath: avatarUrl.value, //选择图片返回的相对路径
				encoding: 'base64', //编码格式
				success: res => { //成功的回调
					console.log('data:image/png;base64,' + res.data)
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
			// console.log(uni.getStorageSync('avatar'));

			// console.log(uni.getStorageSync('nickname'));
			// console.log(nickname.value)
			// uni.request({
			// 	  url: "http://127.0.0.1:8080/user/addUser",
			// 	  method: 'POST',
			// 	  header: {
			// 	        'content-type': 'application/json', // 设置请求的 header，使用 JSON 格式
			// 		},
			// 	  data: {
			// 		id: openid,
			// 		username: nickname.value,
			// 		phone: phone.value,
			// 		// avatar: avatarByte,
			// 		isauthentic: isauthentic.value,
			// 		community_name: community_name.value,
			// 		islogin: '1'
			// 		// 其他属性...
			// 	  },
			// 	  success: (res) => {
			// 		// 处理后端返回的数据
			// 		console.log('后端返回的数据:', res.data);
			// 		// 将数据传递给下一个 then
			// 		resolve(res.data);
			// 		wx.setStorageSync('nickname', nickname.value)
			// 	  },
			// 	  fail: (error) => {
			// 		// 请求失败的处理
			// 		reject(error);
			// 	  },
			// });
		});
	};


	const loginConfirm = async (userInfo) => {

		const code = await getCode();
		const req = {
			code: code,
			name: userInfo.name,
			neighborhoodName: userInfo.neighborhoodName
		}
		console.log(req)
		try {
			login(req).then(res => {
				console.log(res)
			})

			// const result3 = await postUserinfo2Back(openid, avatarByte);
		} catch (error) {
			console.error('Error:', error);
		}
		show.value = false
	};
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