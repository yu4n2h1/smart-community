<!-- 
 
	帖子 组件
 
 -->

<template>
	<view class="content">

		<!-- 顶部 用户信息 -->
		<view class="top">
			<view class="avatar">
				<!--
					暂时 不使用 头像
					<image :src="user.avatar" mode="aspectFill"></image>
				 -->
				<view style="
					background-color: #98a1bb;
					border-radius: 50%;
					height: 60rpx;
					width: 60rpx;
					font-size: 0.7rem;
					line-height: 60rpx;
					overflow: hidden;
					white-space: nowrap;
					text-align: center;
					color: white;
				 ">{{user.username.substring(0,2)}}</view>
			</view>
			<view class="username">
				{{user.username}}
				<view class="date" style="
				            font-size: 0.6rem;
				            color: #888888;
				            margin-top: 5rpx; 
				        ">
					{{feedback.createTime}}
				</view>
			</view>
		</view>

		<!-- 正文 -->
		<view class="middle">
			<up-text class="title" :text="feedback.comment" style="user-select: auto;">
				{{feedback.comment}}
			</up-text>
			<view style="white-space: nowrap; overflow-x: auto;display: flex;">

				<view class="photoList" v-for="(item,index) in feedback.picture" :key="index"
					style="margin-right: 10rpx;">

					<image style="width: 200rpx; height: 200rpx;" :src="item" mode="aspectFit"></image>

				</view>
			</view>
		</view>

		<!-- 下方 标签 交互 等 -->
		<view class="bottem">
			<view class="tag" :style="tagColors[0]">
				#{{feedback.tag}}
			</view>
			<view class="action">
				<!-- 
					TODO 点击量
				 -->
				<view class="like">
					<view class="icon">
						<svg t="1708393555276" class="icon" viewBox="0 0 1024 1024" version="1.1"
							xmlns="http://www.w3.org/2000/svg" p-id="1050" width="200" height="200">
							<path
								d="M518.25 838.89a98.92 98.92 0 0 1-56.59-17.68c-98.2-68.16-169.87-130.88-219.11-191.75-25.26-31.21-44.55-62.18-57.34-92.07-13.28-31-20-61.84-20-91.64 0-36.56 5.38-71.22 16-103 10.65-31.93 26.3-60.17 46.52-83.94A214.14 214.14 0 0 1 302 202.32c29.4-13.48 61.87-20.32 96.51-20.32 19.38 0 36.85 2.57 53.41 7.86a25 25 0 0 1-15.22 47.63c-11.73-3.75-23.86-5.49-38.19-5.49-53.86 0-99.74 20.47-132.69 59.21-32.62 38.35-50.58 93.24-50.58 154.54 0 46.73 22.28 98 66.22 152.26C327 654.35 397.23 715.62 490.15 780.12a49.6 49.6 0 0 0 56.22 0c92.9-64.5 163.13-125.77 208.72-182.12C799 543.71 821.3 492.48 821.3 445.75c0-61.3-18-116.19-50.58-154.54C737.77 252.47 691.89 232 638 232c-44.49 0-75.52 13.38-100.6 43.39l-0.26 0.31c-1.32 1.59-29.85 36.81-22 81.54A25 25 0 1 1 466 365.9c-12-67.69 29.27-118.11 33.16-122.68 18.43-22 40.28-38.24 64.95-48.2 21.68-8.76 45.86-13 73.92-13 34.64 0 67.11 6.84 96.51 20.32a214.14 214.14 0 0 1 74.26 56.49c20.22 23.77 35.87 52 46.52 83.94 10.6 31.78 16 66.44 16 103 0 29.8-6.73 60.63-20 91.64-12.79 29.89-32.08 60.86-57.33 92.07C744.7 690.33 673 753.05 574.86 821.19a98.9 98.9 0 0 1-56.61 17.7z"
								p-id="1051"></path>
						</svg>
					</view>
					: {{feedback.like?feedback.like:0}}
				</view>
			</view>
		</view>
	</view>
	<u-line></u-line>
</template>

<script setup>
	import {
		computed,
		reactive
	} from 'vue';

	const props = defineProps({
		// 反馈
		feedback: {
			type: Object,
			default: {
				fid: 1,
				tag: '默认标签',
				comment: '这是一条评论这是一条评论这是一条评论这是一条评论这是一条评论这是一条评论这是一条评论',
				picture: [],
				phone: '10086',
				like: 0,
				uid: 114
			}
		},

		// 通用 帖子 
		post: {
			type: Object,
			default: {}
		}
	})
	// 用户信息
	const user = reactive({
		id: '',
		username: '用户名',
		avatar: ''
	})

	// 标签颜色
	const tagColors = [{
			border: "2px solid #768BFF",
			color: "#768BFF"
		},
		{
			border: "2px solid #FFC460",
			color: "#FFC460"
		},
		{
			border: "2px solid #FC697B",
			color: "#FC697B"
		},
		{
			border: "2px solid #15FDF4",
			color: "#15FDF4"
		},
		{
			border: "2px solid #0FD7FF",
			color: "#0FD7FF"
		},
		{
			border: "2px solid #DF87FD",
			color: "#DF87FD"
		},
		{
			border: "2px solid #53FFC0",
			color: "#53FFC0"
		},
		{
			border: "2px solid #6CA0FC",
			color: "#6CA0FC"
		}
	]
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		margin: 20rpx;
		border-radius: 8rpx;
		padding: 20rpx;
		background-color: #fff;
	}

	.top {
		display: flex;
		align-items: flex-end;
	}

	.avatar {
		width: 60rpx;
		height: 60rpx;
	}

	.username {
		font-size: 0.9rem;
		padding-left: 20rpx;
	}

	.middle {
		margin: 20rpx 10rpx;
		display: flex;
		flex-direction: column;
	}

	.title {
		font-size: 1.1rem;
		height: 100rpx;
		overflow: hidden;
	}

	.bottem {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.tag {
		font-size: 0.7rem;
		padding: 5rpx 10rpx 5rpx 5rpx;
		border-radius: 8rpx;
	}

	.action {
		display: flex;
	}

	.like {
		display: flex;
		color: #98a1bb;
	}

	.icon {
		height: 40rpx;
		width: 40rpx;
	}
</style>