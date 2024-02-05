<template>
	<view class="sw-view">
		<swiper class="sw-cont" indicator-dots="true" indicator-active-color="#22CDEE" circular="true" autoplay="true">
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
	}

	.sw-cont {
		height: calc(197rpx * 2);
	}

	.sw-item {
		display: block;
		height: calc(197rpx * 2);
		line-height: calc(197rpx * 2);
		align-items: center;
		justify-content: center;
	}

	.sw-item .sw-img {
		width: calc(351rpx * 2);
		height: calc(197rpx * 2);
		border-radius: 20rpx;
		box-shadow: 0 1rpx 12rpx 3rpx #a8a8a8;
	}
</style>