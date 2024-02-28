<template>
	<view class="sw-view" style="align-self: center;">
		<swiper class="sw-cont" indicator-active-color="#22CDEE" indicator-dots circular autoplay>
			<swiper-item style="text-align: center" class="sw-item" v-for="(item,index) in swiperArr" :key="index">
				<image class="sw-img" :src="item"></image>
			</swiper-item>
		</swiper>
	</view>
</template>

<script setup>
	import config from "../../system.config.js"
	const swiperArr = [
		`${config.fileUrl}/index/img/swiper1.jpg`,
		`${config.fileUrl}/index/img/swiper2.jpg`,
		`${config.fileUrl}/index/img/swiper3.jpg`,
		`${config.fileUrl}/index/img/swiper4.jpg`
	]
</script>

<style>
	.sw-view {
		height: calc(197rpx * 2);
		width: 100%;

	}

	.sw-cont {
		height: calc(197rpx * 2);
	}

	.sw-item .sw-img {
		width: 93%;
		height: 100%;
		border-radius: 20rpx;
		filter: drop-shadow(3rpx 3rpx 12rpx #a8a8a8);
	}
</style>
