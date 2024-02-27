<template>
	<view class="title">
		<text>{{title}}</text>
	</view>
	<view class="line-block">
		<view v-for="(value, key, index) in data" :key="index">
			<view style="height: 100rpx; border-bottom: 1px solid #ccc; display: flex; align-items: center;">
			    <text style="margin: 20rpx;flex: 1; text-align: left;">{{key}}</text>
			    <text style="margin: 20rpx;flex: 1; text-align: right;">{{value}}</text>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive
	} from 'vue'
	import {
		service
	} from '../../utils/request.js'
	import {
		onLoad
	} from "@dcloudio/uni-app"
	let data = ref()
	let relation = {
		"address": "地址",
		"contact": "联系方式",
		"establishtime": "创建时间",
		"history": "历史",
		"communityname": "小区名称",
		"ownerscommitteename": "业主委员会"
	}
	let title = "小区信息"

	onLoad((() => {
		service("/ownerscommittee/getDetail", "GET", {
			"communityname": "山东科技大学"
		}).then(res => {
			const result = {};

			for (const key in res.data) {
				if (res.data.hasOwnProperty(key)) {
					const r = relation[key] || key;
					result[r] = res.data[key];
				}
			}
			data.value = result
		})
	}))
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