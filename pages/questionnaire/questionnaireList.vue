<!-- 
	用户问卷列表
 -->
<template>
	<view class="W">
		<view v-if="data.questionnaireList.length === 0" class="item-null">{{data.status}}</view>
		<view class="item" v-for="(item, index) in data.questionnaireList" :key="item.id" @click="showDetail(item)">
			<text>{{item.name}}</text>
			<view class="item-btm">
				<view class="item-time">
					<u-icon name="clock" style="padding: 7rpx 10rpx 0 0;" color="#98A1BB"></u-icon>
					<text>截止到：</text>
					<text>{{item.endTime}}</text>
				</view>
				<text :style="[{color : data.finished[item.id]?'green':'red'}]">{{data.finished[item.id]?"已完成":"未完成"}}</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import { onReachBottom, onShow } from "@dcloudio/uni-app"
import { reactive } from "vue";
import { getQuestionnaire, getUserPaper } from "../../api/questionnaire.js"
import { setLocalData, getLocalData } from "../../utils/cache.js";

const data = reactive({
	questionnaireList: [],
	// 用户 是否完成
	finished: {},
	// 状态信息
	status: "加载中...请稍后"
})

// 显示 问卷内容
const showDetail = (item) =>{
	// 缓存 当前问卷
	setLocalData("qeid", item.id)
	setLocalData("qetype", item.type)
	setLocalData("qidList", item.questionList)
	uni.navigateTo({
		url: "/pages/questionnaire/questionnaire"
	})
}

// 初始化
const load = () =>{
	// 清楚缓存
	data.questionnaireList.splice(0)
	data.finished = {}
	// 获取问卷数据
	let user = getLocalData("user-token").id
	getQuestionnaire().then(res =>{
		data.status = "当前没有问卷"
		if(res.length === 0) return
		data.questionnaireList.push(...res)
		// 检索是否完成 TODO 查询优化
		for(let i in data.questionnaireList) {
			getUserPaper(data.questionnaireList[i].id, user).then(res =>{
				if(res.length == 0) data.finished[data.questionnaireList[i].id] = 0
				else data.finished[data.questionnaireList[i].id] = 1
			})
		}
	}).catch(err =>{
		// 获取 失败
		return
	})

}

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
