<template>
	
	<view class="sw-view">
		<swiper class="sw-cont" indicator-dots="true" indicator-active-color="#22CDEE" circular="true" autoplay="true">
			<swiper-item style="text-align: center" class="sw-item" v-for="(item,index) in swiperArr" :key="index">
				<image class="sw-img" :src="item"></image>
			</swiper-item>
		</swiper>
	</view>
	
	<!-- 导航菜单 -->
	<view id="navView">
	  <view class="navItemView" v-for="(item, index) in navItems" :key="index">
		<image :src="item.imgSrc"></image>
		<br>
		<text>{{ item.text }}</text>
	  </view>
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
	const navItems = [
		{"imgSrc": "/static/img/home.png" , "text": "心理测评"},
		{"imgSrc": "/static/img/home-select.png" , "text": "咨询预约"},
		{"imgSrc": "/static/img/me.png" , "text": "心理答疑"},
		{"imgSrc": "/static/img/me-select.png" , "text": "心理知识"},
		{"imgSrc": "/static/img/service.png" , "text": "FM"},
		{"imgSrc": "/static/img/service-select.png" , "text": "公益中心"},
	]
</script>

<style>
	.sw-view {
		height: 197px;
	}
	
	.sw-cont {
		height: 197px;
		width: 375px;
	}

	.sw-item .sw-img {
		width: 93%;
		height: 100%;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
	}
	
	.dh-view {
		height: 190px;
		width: 100%;
	}
	
	#navView{
	  display: flex;  /* 应用flex布局 ，所有的子元素排在一行*/
	  flex-wrap: wrap; /* 换行*/
	  height: 380rpx;
	  align-content: space-around; /* 多行垂直排列*/
	  font-size: 20rpx;
	  font-weight: 600;
	}
	.navItemView{
	  width: 87rpx;
	  text-align: center;
	  margin: 0 50rpx;
	}
	.navItemView > image{
	  width: 87rpx;
	  height: 87rpx;
	}
</style>