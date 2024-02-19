
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
					height: 80rpx;
					width: 80rpx;
				 "></view>
			</view>
			<view class="username">
				{{user.username}}
			</view>
		</view>
		
		<!-- 正文 -->
		<view class="middle">
			<view class="title">
				{{feedback.comment}}
			</view>
			<view class="photoList" v-for="(item,index) in feedback.example" :key="index">
				<view class="photo">
					<image :src="item" mode="aspectFill"></image>
				</view>
			</view>
		</view>
		
		<!-- 下方 标签 交互 等 -->
		<view class="bottem">
			<view class="tag">
				#{{feedback.tag}}
			</view>
			<view class="action">
				点击量
				<!-- 
					TODO 点击量
				 -->
			</view>
		</view>
	</view>
</template>

<script setup>
import { reactive } from 'vue';
	
	const props = defineProps({
		
		// 反馈
		feedback: {
			type: Object,
			default: {
				fid: 1,
				tag: '默认标签',
				comment: '这是一条评论这是一条评论这是一条评论这是一条评论这是一条评论这是一条评论这是一条评论',
				example: [],
				phone: '10086',
				uid: 114,
			}
		},
		
		// 通用 帖子 
		post :{
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
</script>

<style>
	.content{
		display: flex;
		flex-direction: column;
		margin: 20rpx;
		border-radius: 8rpx;
		padding: 20rpx;
	}
	.top{
		display: flex;
		align-items: center;
	}
	.avatar{
		width: 80rpx;
		height: 80rpx;
	}
	.username{
		font-size: 1.2rem;
		padding-left: 20rpx;
	}
	.middle{
		margin: 20rpx 0;
		display: flex;
		flex-direction: column;
	}
	.title{
		font-size: 1.1rem;
		height: 100rpx;
		overflow: hidden;
	}
	.bottem{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.tag{
		border: 2px solid #333333;
		padding: 5rpx;
	}
</style>