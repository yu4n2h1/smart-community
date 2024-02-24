<!--
* @author: Jay
* @description: 微信小程序  头像昵称填写
* @createTime: 2022-11-23 10:51:34
 -->
<template>
	<view>
		<!-- 获取头像 -->
		<view class="bg-gray padding-top-sm">
			<button class="avatar-button" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
				<image :class="avatarUrl ==''?'avatar-img':'' " :src="avatarUrl"></image>
			</button>
		</view>
		<!-- 输入用户名 -->
		<view class="nickname-code">
			<view class="nickname-title">
				用户名:
			</view>
			<input type="nickname" class="weui-input" placeholder="请输入用户名" v-model="nickname" />
		</view>
		<!-- 手机号登录 -->
		<view class="padding-lr padding-top flex flex-direction">
			<button class="cu-btn bg-green round lg text-white" open-type="getPhoneNumber"
				@getphonenumber="getUserPhone" :disabled="explainName == '' ? false : true">微信手机号登录</button>
		</view>
		<view class="text-red text-df padding-lr-xl padding-tb-xs text-center">
			{{explainName}}
		</view>
	</view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const avatarUrl = ref('');
const nickname = ref('');
const logCode = ref('');
const disabled = ref(true);

const explainName = computed(() => {
  let name = '';
  if (avatarUrl.value === '') {
    name = '请授权用户头像';
    return name;
  }
  if (nickname.value === '') {
    name = '请输入用户名';
    return name;
  }
  return name;
});

const userCode = () => {
  uni.login({
    provider: 'weixin',
    success(res) {
      console.log('登录code', res);
      logCode.value = res.code;
    },
  });
};

const onChooseAvatar = (e) => {
  console.log(e.detail);
  avatarUrl.value = e.detail.avatarUrl;
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

onMounted(() => {
  userCode();
});
</script>

<style>
	page {
		background-color: #fff;
	}
</style>
<style lang="scss" scoped>
	// 用户头像
	.avatar-button {
		width: 120rpx;
		padding: 0;
		border-radius: 50%;
		margin: 30rpx auto 0 auto;

		image {
			width: 120rpx;
			height: 120rpx;
			border-radius: 50%;
			display: block;
			border: 4rpx solid #d8bf9f;
		}
	}

	.avatar-img {
		z-index: 3;
		position: relative;

		&:before {
			content: '头像授权';
			position: absolute;
			top: 0;
			left: 0;
			width: 120rpx;
			height: 120rpx;
			// line-height: 40rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #ffffff;
			font-size: 25rpx;
			background-color: rgba(130, 128, 127, 0.5);
			z-index: 4;
		}
	}

	//用户昵称
	.nickname-code {
		display: flex;
		align-items: center;
		padding: 60rpx 20rpx 20rpx 20rpx;
		margin-top: -40rpx;
		background-color: #ffffff;
		border-radius: 50rpx 50rpx 0 0;

		.nickname-title {
			font-size: 30rpx;
			color: #333;
			margin-right: 15rpx;
		}

		.weui-input {
			flex: 1;
			color: #333;
			font-size: 30rpx;
		}
	}
</style>
