<template>
	<uni-section title="社区公告" sub-title="" type="line">
		<view class="notice-list">
			<view class="notice-item" v-for="(item,index) in textArr" :key="index">
				<text>{{item.title}}</text>
				<text>发布时间：{{item.date}}</text>
			</view>
		</view>
	</uni-section>
</template>

<script setup>
	const textArr = [{
			"title": "智慧社区：上线了！",
			"url": "11",
			"date": "2024-2-5 21:48"
		},
		{
			"title": "祝愿社区各位居民欢度春节！",
			"url": "22",
			"date": "2024-1-6 13:50"
		},
		{
			"title": "大雪预警",
			"url": "333",
			"date": "2023-11-11 11:11"
		},
	];

	function noticeBarClick(url) {
		uni.switchTab({
			url
		})
	};
</script>

<style>
	.notice-list {
		width: 100vw;
	}

	.notice-item {
		width: calc(351rpx * 2);
		height: calc(101rpx * 2);
		border: 1px solid #e2e2e2;
		border-radius: calc(18rpx * 2);
		box-sizing: border-box;
		padding: 50rpx 30rpx;
		flex-shrink: 0;
		margin: 24rpx;
		font-family: 'Inter';
		font-style: normal;
		font-weight: 400;
		font-size: calc(14rpx * 2);
		line-height: calc(17rpx * 2);
		color: #333333;
	}

	.notice-item>text {
		display: block;
	}

	.notice-item text:nth-child(2) {
		display: flex;
		justify-content: space-between;
		color: #999999;
		font-family: 'Inter';
		font-style: normal;
		font-weight: 400;
		font-size: calc(12rpx * 2);
		line-height: calc(15rpx * 2);
		padding-top: 38rpx;
	}
</style>