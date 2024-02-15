<!-- 
	用户问卷列表
	
	TODO问卷数据结构待优化
 -->
<template>
	<view class="W">
		
		<!-- 无问卷 提示 -->
		<view v-if="data.length === 0" class="item-null">当前没有问卷</view>
		
		<view class="item" v-for="(item, index) in data" :key="item.id" @click="showDetail(item)">
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
import {
		onReachBottom,
		onShow,
	 } from '@dcloudio/uni-app'
import {onBeforeMount, reactive} from 'vue'
import {getLocalData, setLocalData} from '../../utils/cache.js'

/* 
	data
	问卷数组
	每一项存储 原始问卷信息
 */
let data = reactive([])

// 显示 问卷详情
const showDetail = (item) =>{
	// item是 问卷元素项
	// 页面传值 传当前问卷
	if(item.flag === 1) setLocalData('cur-questionnaire', getLocalData('user-data').qlist.filter((q, i, a) =>{
		if(q.id === item.id) {
			return q
		}
	})[0]) 
	else setLocalData('cur-questionnaire', item)
	
	uni.navigateTo({
		url: '/pages/questionnaire/questionnaire'
	})
}

// 初始化
const load = () =>{
	// 清楚缓存
	data.splice(0, data.length)
	
	// 获取问卷数据
	if(!getLocalData('questionnaire-list')) return
	data.push(...getLocalData('questionnaire-list'))
	
	// 获取用户填写数据
	// user-data-index 包含 用户ID 用户填写的所有问卷ID
	let qlist = getLocalData('user-data-index')?getLocalData('user-data-index').qlist:{}
	
	// 检索是否完成
	for(let i in data){
		Object.assign(data[i], {flag: 0})
		for(let j in qlist){
			if(qlist[j] === data[i].id) data[i].flag = 1
		}
	}
}

onBeforeMount(() =>{
	load()
})

onShow(() =>{
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
