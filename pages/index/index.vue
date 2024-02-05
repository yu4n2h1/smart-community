<template>

	<view class="sw-view">
		<swiper class="sw-cont" indicator-dots="true" indicator-active-color="#22CDEE" circular="true" autoplay="true">
			<swiper-item style="text-align: center" class="sw-item" v-for="(item,index) in swiperArr" :key="index">
				<image class="sw-img" :src="item"></image>
			</swiper-item>
		</swiper>
	</view>
	<homeTabBar></homeTabBar>
	<!-- 导航菜单 -->
</template>

<script setup>
	import homeTabBar from "@/pages/index/homeTabBar.vue"
	
	const swiperArr = [
		'/static/img/swiper1.jpg',
		'/static/img/swiper2.jpg',
		'/static/img/swiper3.jpg',
		'/static/img/swiper4.jpg'
	];
</script>

<style>
	.sw-view {
		height: calc(197rpx * 2);
	}

	.sw-cont {
		height: calc(197rpx * 2);
		width: 100%;
	}

	.sw-item .sw-img {
		width: 93%;
		height: 100%;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
	}

	.dh-view {
		height: calc(190rpx * 2);
		width: 100%;
	}
</style>