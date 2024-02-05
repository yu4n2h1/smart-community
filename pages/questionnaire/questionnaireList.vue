<template>
	<view class="W">
		<view v-if="data.length === 0" class="item-null">当前没有问卷</view>
		<view class="item" v-for="(item, index) in data" :key="item.id" @click="toQuestionnaire(item.id)">
			<text>{{item.name}}</text>
			<view class="item-btm">
				<view class="item-time">
					<u-icon name="clock" style="padding: 7rpx 10rpx 0 0;" color="#98A1BB"></u-icon>
					<text>截止到：</text>
					<text>{{item.endTime}}</text>
				</view>
				<text :style="[{color : item.flag?'green':'red'}]">{{item.flag?'已完成':'未完成'}}</text>	
			</view>
		</view>
	</view>
</template>

<script setup>
import {onBeforeMount, reactive} from 'vue'
import {getLocalData, setLocalData} from '../../utils/cache.js'

let data = reactive([])

const toQuestionnaire = (id) =>{
	setLocalData('questionnaire-id', id)
	uni.navigateTo({
		url: '/pages/questionnaire/questionnaire'
	})
}

const load = () =>{
	data.splice(0, data.length)
	if(!getLocalData('questionnaire-list')) return
	data.push(...getLocalData('questionnaire-list'))
}

onBeforeMount(() =>{
	load()
})
</script>

<style>
	.item{
		width: 702rpx;
		background-color: #fff;
		box-shadow: 0 4px 15px 0 rgba(230, 228, 228, 0.52);
		display: flex;
		flex-direction: column;
		margin: 22rpx 0;
		border-radius: 10px;
		padding: 20rpx 40rpx;
		box-sizing: border-box;
	}
	.item text:nth-child(1){
		border-left: 2px solid #768BFF;
		padding-left: 5rpx;
		line-height: 40rpx;
		margin-bottom: 50rpx;
		font-size: 1.1rem;
		color: #768BFF;
	}
	.item-btm{
		display: flex;
		justify-content: space-between;
	}
	.item-time{
		display: flex;
		flex-direction: row;
	}
	.item-time text:nth-child(2){
		color: #98A1BB;
	}
	.item-null{
		text-align: center;
		padding-top: 30rpx;
		color: #98A1BB;
	}
</style>