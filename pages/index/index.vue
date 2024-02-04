<template>
	<view class="uni-margin-wrap">
		<swiper class="sw-cont" indicator-dots="true" indicator-active-color="#22CDEE" circular="true" autoplay="true">
			<swiper-item class="sw-item" v-for="(item,index) in swiperArr" :key="index">
				<image class="sw-img" :src="item"></image>
			</swiper-item>
		</swiper>
	</view>
</template>

<script setup>
	const title = "Hello";
	const swiperArr = [
					'/static/img/swiper1.jpg',
					'/static/img/swiper2.jpg',
					'/static/img/swiper3.jpg',
					'/static/img/swiper4.jpg'
				];
</script>

<style>
	.uni-margin-wrap {
		width: calc(351rpx * 2);
		width: 100%;
		border: 10rpx;
		
	}
	
	.sw-cont {
		height: 197px;
		weight: 351px;
	}
	
	.sw-item {
		display: block;
		height: calc(197rpx * 2);
		line-height: calc(197rpx * 2);
		text-align: center;
	}

	.sw-item .sw-img {
		width: calc(351rpx * 2);
		height: calc(197rpx * 2);
		border-radius: 20rpx 20rpx 20rpx 20rpx;
	}
	

</style>