<template>
	<view class="sw-view">
		<swiper class="sw-cont" indicator-active-color="#22CDEE" indicator-dots circular autoplay>
			<swiper-item style="text-align: center" class="sw-item" v-for="(item,index) in swiperArr" :key="index">
				<image class="sw-img" :src="item"></image>
			</swiper-item>
		</swiper>
	</view>
</template>

<script setup>
	const swiperArr = [
		'/static/img/swiper1.jpg',
		'/static/img/swiper2.jpg',
		'/static/img/swiper3.jpg',
		'/static/img/swiper4.jpg'
	]
</script>

<style>
	.sw-view {
		height: calc(197rpx * 2);
		width: 100%;
		margin-bottom: 20rpx;
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
