<template>
	<!-- 顶部栏 -->
	<view style="display: flex; flex-direction: row; align-items: center; margin-bottom: 10px;" class="top-block">
		<!-- <image :class="avatarUrl ==''?'avatar-img':'' " :src="avatarUrl"></image> -->
		<image class="avatar-img"
			:src="avatarUrl ? avatarUrl : 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'"
			@click="previewImage"></image>
		<u-text :show="toLoginShow" @click="navigateToLoginPage" color="white" text="微信登录" margin="10px"></u-text>
		<u-text :text="nickname" color="white" margin="10px"> </u-text>
		<!-- <button class="avatar-button" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">微信登陆</button> -->
		
	</view>
</template>

<script setup>
	import {
		ref,
		computed,
		onMounted
	} from 'vue';
	import {
		onShow
	} from '@dcloudio/uni-app';
	const avatarUrl = ref('');
	const navigateToLoginPage = (e) => {
		uni.navigateTo({
			url: '/pages/login/loginPage'
		});
	}

	let props = defineProps({
		'nickname': {
			type: String,
			default: "111"
		},
		'toLoginShow': {
			type: Boolean,
			default: true
		}
	})
	const saveBlobAsTempFile = (avatarByte) => {
		const fs = uni.getFileSystemManager();

		// 生成临时文件路径
		const tempFilePath = `${uni.env.USER_DATA_PATH}/temp-avatar.png`;

		try {
			// 同步写入文件
			fs.writeFileSync(tempFilePath, avatarByte, 'binary');
			return tempFilePath;

		} catch (err) {
			throw err;
		}
	};


	// onMounted(() => {
	//   // userCode();
	//   nickname.value = wx.getStorageSync('nickname');
	//   console.log(nickname.value);
	//   console.log("===============================");
	// });	
</script>

<style lang="scss">
	.top-block {
		width: 100%;
		height: 205px;
		background: linear-gradient(to bottom, #87CEEB, #ADD8E6, #B0E0E6, #B0E0E6, #CAE1FF);
		border-bottom-left-radius: 20px;
		border-bottom-right-radius: 20px;
	}

	.avatar-button {
		width: 150rpx;
		height: 80rpx;
		padding: 0;
		margin-left: 5%;
		// margin: 30rpx auto 0 auto;
		color: white;
		background-color: transparent;
	}

	.avatar-img {
		// z-index: 1;
		// position: relative;
		margin-left: 5%;
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
		display: block;
		border: 2px solid white;
		// &:before {
		// 	content: '头像授权';
		// 	position: absolute;
		// 	top: 0;
		// 	left: 0;
		// 	width: 120rpx;
		// 	height: 120rpx;
		// 	// line-height: 40rpx;
		// 	display: flex;
		// 	align-items: center;
		// 	justify-content: center;
		// 	color: #ffffff;
		// 	font-size: 25rpx;
		// 	background-color: rgba(130, 128, 127, 0.5);
		// 	z-index: 4;
		// }
	}
</style>