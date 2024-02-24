<template> 
	<view style="display: flex; flex-direction: column; background-color: #e6e6e6; height: auto;">
		<view class="content">
			<search></search>
		</view>
		<view class="content">			
			<swiperView></swiperView>
		</view>
		<view class="content" style="display: flex;align-items: center;">
				<homeTabBar></homeTabBar>
		</view>
		<view class="content" style="display: flex;align-items: center;">
			<bulletin style="width: 100%;"></bulletin>
		</view>
	</view>
</template>

<script setup>
	import homeTabBar from "@/pages/index/homeTabBar.vue"
	import search from "@/pages/index/search.vue"
	import swiperView from "@/pages/index/swiperView.vue"
	import bulletin from '/pages/index/bulletin.vue'
</script>

<style>

	.content{
		background-color: #fff;
		border-radius: 15rpx;
		margin: 10rpx 20rpx;
		padding-bottom: 2%;
		padding-top: 2%;
	}
</style>