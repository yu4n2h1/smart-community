<template>
	<view style="background-color: #e6e6e6; height: 100vh;">
		<topBlock></topBlock>	<!-- 顶部栏 -->
		<lineBlock></lineBlock>	<!-- 信息列表 -->
	</view>	

</template>

<style lang="scss">

</style>

<script setup>
	import topBlock from "@/pages/mine/topBlock.vue"
	import lineBlock from "@/pages/mine/lineBlock.vue"
	
	import { ref, computed, onMounted } from 'vue';
	
	const disabled = ref(true);
	
	// onMounted(() => {
	//   // userCode();
	//   const nickname = wx.getStorageSync('nickname');
	//   console.log(nickname);
	//   console.log("进入了")
	// });	
</script>

