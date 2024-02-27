<template>
	<view class="title">
		<text>{{title}}</text>
	</view>
	<view class="line-block" v-for="(item,index) in data" style="margin-bottom: 10rpx;">
		<view v-for="(value, key, index) in item" :key="index">
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
		"communityname": "小区名称",
		"name": "姓名",
		"post": "职位",
		"contact": "联系方式"
	}
	let title = "业主委员会信息"

	onLoad((() => {
		service("/ownerscommitteepers/getList", "GET", {
			"communityname": "山东科技大学"
		}).then(res => {
			const result = res.data.map(item => {
				const newItem = {}
				for (const key in item) {
					if (item.hasOwnProperty(key)) {
						const newKey = relation[key] || key
						newItem[newKey] = item[key]
					}
				}
				return newItem
			})
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