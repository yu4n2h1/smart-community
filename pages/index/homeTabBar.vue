<template>
	<view class="navView">
		<view class="navItemView" v-for="(item, index) in navItems" :key="index" @click="navClick(item.path)">
			<view style="display: flex;justify-content: center;">
				<view class="img_sty" :style="cssItems[index%8]">
					<image :src="item.imgSrc"></image>
				</view>
			</view>
			<text>{{ item.text }}</text>
		</view>
	</view>
</template>

<script setup>
	const navItems = [{
			"path": "/pages/populationReport/populationReportList",
			"text": "人口报备",
			"imgSrc": "/static/img/homeBar/Population_reporting.png",
		},
		{
			"path": "/pages/notice/notice?categoryType=公告通知",
			"text": "公告通知",
			"imgSrc": "/static/img/homeBar/Announcement_Notice.png",
		},
		{
			"path": "/pages/notice/notice?categoryType=政务发布",
			"text": "政务发布",
			"imgSrc":  "/static/img/homeBar/Chief.png",
		},
		{
			"path": "/pages/feedback/feedbackList",
			"text": "居民诉求",
			"imgSrc":  "/static/img/homeBar/Residents_demands.png",
		},
		{
			"path": "/pages/basicInfo/basicInfo",
			"text": "社区信息",
			"imgSrc":  "/static/img/homeBar/Community_Information.png",
		},
		{
			"path": "/pages/feedback/neighborhoodFeedbackList",
			"text": "业主诉求",
			"imgSrc":  "/static/img/homeBar/Owner_Appeal.png",
		},
		{
			"path": "/pages/test/test",
			"text": "团购",
			"imgSrc":  "/static/img/homeBar/Buy.png",
		},
		{
			"path": "/pages/test/test",
			"text": "便民组织",
			"imgSrc":  "/static/img/homeBar/Convenient_service.png",
		},
	]
	
	const cssItems = [
		{"filter": "drop-shadow(0px 3px 6px rgba(166, 133, 241, 0.502))", "background": "linear-gradient(142.24deg, #768BFF 14.61%, #776AFF 43.6%, #7838FF 87.37%)"},
		{"filter": "drop-shadow(0px 3px 6px rgba(254, 184, 131, 0.502))", "background": "linear-gradient(140.69deg, #FFC460 14.81%, #FF8531 87.27%)"},
		{"filter": "drop-shadow(0px 3px 6px rgba(253, 134, 175, 0.502))", "background": "linear-gradient(140.69deg, #FC697B 14.81%, #FC3F83 87.27%)"},
		{"filter": "drop-shadow(0px 3px 6px rgba(39, 224, 223, 0.502))", "background": "linear-gradient(140.69deg, #15FDF4 14.81%, #00DBED 87.27%)"},
		{"filter": "drop-shadow(0px 3px 6px rgba(32, 190, 253, 0.502))", "background": "linear-gradient(140.69deg, #0FD7FF 14.81%, #00B1FD 87.27%)"},
		{"filter": "drop-shadow(0px 3px 6px rgba(193, 141, 240, 0.502))", "background": "linear-gradient(140.69deg, #DF87FD 14.81%, #A048F8 87.27%)"},
		{"filter": "drop-shadow(0px 3px 6px rgba(47, 207, 159, 0.502))", "background": "linear-gradient(140.69deg, #53FFC0 14.81%, #17E083 87.27%)"},
		{"filter": "drop-shadow(0px 3px 6px rgba(123, 152, 252, 0.502))", "background": "linear-gradient(140.69deg, #6CA0FC 14.81%, #335CFA 87.27%)"},
	]
	function navClick(url) {
		uni.navigateTo({
			url
		});
	};
</script>

<style>
	.navView {
		display: flex;
		flex-wrap: wrap;
		height: auto;
		align-content: space-around;
		justify-content: left;
		font-style: normal;
		font-weight: 700;
		font-size: 12px;
		
	}
	.navItemView {
		width: 20%;
		text-align: center;
		margin: 0 2.5%;
		height: 150rpx;
	}
	.img_sty {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100rpx;
		height: 100rpx;
		border-radius: 50rpx 50rpx 50rpx 50rpx ;
	}
	.img_sty image{
		width: 70rpx;
		height: 70rpx;
	}
</style>



