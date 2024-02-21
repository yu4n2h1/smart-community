<template>
	<view style="display: flex; flex-direction: column; height: auto;">
		<view style="width: 82.9%;height: auto; margin: auto;">
			<view class="title">
				<text> {{article.title}}</text>
			</view>
			<view class="message" >
				<text> {{article.author}}</text>
				<text> {{article.publishDate}} </text>
			</view>
		</view>
		<view style="width: 82.9%;margin: auto;">
			<ua-markdown :source="article.content" class="content" />
		</view>
	</view>
</template>

<script setup>
	import { service } from "@/api/request.js"
	import { onBeforeMount, ref } from "vue";
	
	const article = ref({});
	async function fetchArticles() {
	  try {
	    const response = await service('/article/getContent', 'GET');
	    article.value = response;
		console.log(articles);
	  } catch (error) {
	    console.error('Error fetching articles:', error);
	  }
	}
	
	onBeforeMount(() => {
	  fetchArticles();
	});
	
</script>
<style>
	.content :text {
		text-align: center;
	}
	
	.title {
		font-family: 'Inter';
		font-style: normal;
		font-weight: 400;
		font-size: 16px;
		line-height: 19px;
		color: #333333;
		padding-top: 40rpx;
		text-align: center;
		padding-bottom: 20rpx;
		border-width: 3rpx;
		border-bottom-style: solid;
		border-color: cornflowerblue;
		
	}
	.message {
		font-family: 'Inter';
		font-style: normal;
		font-weight: 400;
		font-size: 12px;
		line-height: 15px;
		color: #999999;
		margin-bottom: 70rpx;
		margin-top: 6rpx;
	}
	.message text:nth-child(1) {
		float: left;
	}
	.message text:nth-child(2) {
		float: right;
	}
</style>
