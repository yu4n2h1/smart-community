<!-- 
	问卷详情页
	TODO报表
 -->
<template>
	<view class="W">
		<view v-if="data.userPaperList.length === 0" class="item-null">{{data.status}}</view>
		<view class="item" v-for="(item, index) in data.userPaperList" :key="item.id" @click="showDetail(item)">
			<text>用户 {{item.user}} 的提交</text>
			<view class="item-btm">
				<view class="item-time">
					<u-icon name="clock" style="padding: 7rpx 10rpx 0 0;" color="#98A1BB"></u-icon>
					<text>填写时间：</text>
					<text>{{item.gmtCreate.substring(0, 10)}}</text>
					<text style="padding-left: 22rpx;">{{item.gmtCreate.substring(11, 16)}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { onBeforeMount, reactive } from "vue";
import { getPaperList, getQuestionnaire, getUserPaper } from "../../api/questionnaire.js"
import { setLocalData, getLocalData, delLocalData } from "../../utils/cache.js";

const data = reactive({
	userPaperList: [],
	// 状态信息
	status: "加载中...请稍后",
	// 问卷ID
	qeid: ""
})

// 显示 问卷内容
const showDetail = (item) =>{
	// 缓存 当前问卷
	setLocalData("qeid", data.qeid)
	setLocalData("qetype", 1)
	setLocalData("quser", item.user)
	uni.navigateTo({
		url: "/pages/questionnaire/userPaper"
	})
}

// 初始化
const load = () =>{
	// 清楚缓存
	data.userPaperList.splice(0)
	// 获取答卷数据
	data.qeid = getLocalData("qeid")
	delLocalData("qeid")
	getPaperList(data.qeid).then(res =>{
		if(res.data.length === 0) {
			data.status = "当前没有提交"
			return
		}
		data.userPaperList.push(...res.data)
	}).catch(err =>{
		// 加载失败
		console.log(err);
		return
	})
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
		padding-left: 10rpx;
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
