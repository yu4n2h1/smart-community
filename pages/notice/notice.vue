<template>
	<view>
		<uni-section :title="tittle" sub-title="" type="line" style="width: 98%;margin: auto;">
			<view class="notice-list">
				<view class="notice-item" v-for="(item,index) in articles" :key="index" @click="todetail(item.articleId)">
					<text style="text-align: center;">{{item.title}}</text>
					<text>{{item.summary}}</text>
					<text style="text-align: right;">发布人：{{item.author}}</text>
					<text style="text-align: right;">发布时间：{{item.publishDate}}</text>
				</view>
			</view>
		</uni-section>
	</view>
</template>

<script setup>
import { service } from "@/utils/request.js"
// import { service } from "@/api/request.js"
import { onBeforeMount, ref } from "vue";
	import { onLoad, onShow } from "@dcloudio/uni-app";


	const articles = ref([]);
	const tittle = ref();
	
    async function fetchArticles(option) {
      try {
        const response = await service('/article/getList', 'GET' ,option);
        if (Array.isArray(response.data)) {
			articles.value = response.data;
			if (response.data == null ) {
				tittle = "页面不存在"
			}
        } else {
          console.error('Invalid response format.');
        }
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    }
    // onBeforeMount(() => {
    //   fetchArticles();
    // });
	onLoad((option) => {
		fetchArticles(option);
		tittle.value = option.categoryType;
	})
	
	
	function todetail (articleId){
		uni.navigateTo({
			url:"/pages/notice/noticedetail?articleId="+articleId
		})
	}
</script>

<style>
	.notice-list {
	}
	
	.notice-item {
		width: 89%;
		height: auto;
		border: 1px solid #e2e2e2;
		border-radius: calc(18rpx * 2);
		box-sizing: border-box;
		padding: 10rpx 30rpx;
		padding-top: 30rpx;
		flex-shrink: 0;
		margin-top: 24rpx!important;
		margin-button: 24rpx;
		font-family: 'Inter';
		font-style: normal;
		font-weight: 400;
		font-size: calc(14rpx * 2);
		line-height: calc(17rpx * 2);
		color: #333333;
		margin: auto;
		
	}

	.notice-item>text {
		display: block;
	}
	
	.notice-item text:nth-child(2) {
		text-indent: 2em;
		display: flex;
		padding-top: 10rpx;
	}

	.notice-item text:nth-child(3) {
		padding-top: 24rpx;
		font-size: 16rpx !important;
	}
	.notice-item text:nth-child(4) {
		font-size: 16rpx !important;
	}
	
	.notice-item text:nth-child(2),
	.notice-item text:nth-child(3),
	.notice-item text:nth-child(4) {
		color: #999999;
		font-family: 'Inter';
		font-style: normal;
		font-weight: 400;
		font-size: calc(12rpx * 2);
		line-height: calc(15rpx * 2);
	}
</style>