<template>
	<view class="sw-view" style="align-self: center;">
		<u-swiper show-title="true" :list="swiperArr" indicator circular previous-margin="15" next-margin="15"
			height="100%" interval="8000"></u-swiper>
	</view>
</template>

<script setup>
	import config from "../../system.config.js"
	const swiperArr = [{
			url: `${config.fileUrl}/index/img/swiper1.jpg`,
			title: "标题1"
		},
		{
			url: `${config.fileUrl}/index/img/swiper2.jpg`,
			title: "标题2"
		},
		{
			url: `${config.fileUrl}/index/img/swiper3.jpg`,
			title: "标题3"
		},
		{
			url: `${config.fileUrl}/index/img/swiper4.jpg`,
			title: "标题4"
		}
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