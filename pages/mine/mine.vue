<template>
	<view style="background-color: #e6e6e6; height: 100vh;">
		<topBlock :nickname="nickname" :toLoginShow="toLoginShow"></topBlock> <!-- 顶部栏 -->
		<lineBlock v-if="lineShow"></lineBlock> <!-- 信息列表 -->
	</view>

</template>

<style lang="scss">

</style>

<script setup>
	import topBlock from "@/pages/mine/topBlock.vue"
	import lineBlock from "@/pages/mine/lineBlock.vue"
	import {
		ref,
		computed,
	} from 'vue';
	import {
		onLoad,
		onShow
	} from '@dcloudio/uni-app'
	import {
		service
	} from "../../utils/request";
	let nickname = ref('')
	let toLoginShow = ref(false)
	const disabled = ref(true)
	let lineShow = ref(true)
	onShow(() => {
		if (uni.getStorageSync('token') == null || uni.getStorageSync('token') == "") {
			uni.reLaunch({
				url: "/pages/login/loginPage"
			})
			toLoginShow.value = true
		}
		if (uni.getStorageSync('token') == null || uni.getStorageSync('token') == "") {
			lineShow.value = false
			toLoginShow.value = true
			nickname.value = ""
		}else{
			lineShow.value = true
			toLoginShow.value = false
		}
		service("/user/findByOpenid", "GET", null).then(res => {
			if (res.msg == "success") {
				nickname.value = "您好，" + res.data.name
				toLoginShow.value = false
			} else {
				nickname.value = "";
				toLoginShow.value = true
			}
		})
	})
	// onMounted(() => {
	//   // userCode();
	//   const nickname = wx.getStorageSync('nickname');
	//   console.log(nickname);
	//   console.log("进入了")
	// });	
</script>