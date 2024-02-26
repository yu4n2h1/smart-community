<template>
	<view class="title">
		<text>{{title}}</text>
	</view>
	<view class="line-block">
		<view v-for="(item,index) in mess" :key="index">
			<view style="height: 100rpx; border-bottom: 1px solid #ccc; display: flex; align-items: center;">
			    <text style="margin: 20rpx;flex: 1; text-align: left;">{{index}}</text>
			    <text style="margin: 20rpx;flex: 1; text-align: right;">{{item}}</text>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { onLoad, onShow } from "@dcloudio/uni-app";
	// import { onLoad, onShow } from "@dcloudio/uni-app";
	import { onBeforeMount, ref } from "vue";
	import { service } from "@/utils/request.js";
	
	const mess = ref();
	const title = ref();
	
	async function fetchMess(option) {
	  try {
	    const response = await service('/ownerscommittee/getDetail', 'GET', option);
		if ((response.data) != null) {
			mess.value = response.data;
			if (response.data == null ) {
				console.log("页面信息不存在")
			}
	    } else {
	      console.error('Invalid response format.');
	    }
	  } catch (error) {
	    console.error('Error fetching articles:', error);
	  }
	}
	
	onLoad((option) => {
		fetchMess(option);
		title.value = option.title;
	})
</script>

<style>
	.line-block {
		margin-left: auto;
		margin-right: auto;
		width: 90%;
		border-style: solid;
		border-color: #ccc;
		border-radius: 20rpx;
		
	}
	
	.title {
		font-family: 'Inter';
		font-style: normal;
		font-weight: 400;
		font-size: 16px;
		width: 92.3%;
		line-height: 19px;
		color: #333333;
		padding-top: 40rpx;
		text-align: center;
		padding-bottom: 20rpx;
		border-width: 3rpx;
		border-bottom-style: solid;
		border-color: cornflowerblue;
		margin-bottom: 40rpx;
		margin-left: auto;
		margin-right: auto;
	}
</style>
