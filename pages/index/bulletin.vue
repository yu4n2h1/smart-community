<template>
	<uni-section title="社区公告" sub-title="" type="line">
		<view class="noticeView" v-for="(item,index) in textArr" :key="index">
			<uni-notice-bar class="noticeBar" color="#333333" bac getmore single show-icon :text="item.title" @click="noticeBarClick(item.url)" />
		</view>
	</uni-section>
</template>

<script setup>
	const textArr = [{
			"title": "智慧社区：上线了！",
			"url": "11"
		},
		{
			"title": "祝愿社区各位居民欢度春节！",
			"url": "22"
		},
		{
			"title": "大雪预警",
			"url": "333"
		},
	];

	function noticeBarClick(url) {
		uni.switchTab({
			url
		})
	};
</script>

<style>
	.noticeBar {
		width: calc(351rpx * 2);
		height: auto;
		border: 1px solid #fff098;
		border-radius: calc(18rpx * 2);
		box-sizing: border-box;
		padding: 50rpx 30rpx;
		flex-shrink: 0;
		margin: 15rpx 15rpx;
	}
</style>