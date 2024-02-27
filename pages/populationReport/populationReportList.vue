<!-- 
	报备列表
	TODO筛选
	TODO查看详情
 -->
<template>
	<view class="W">
		<view v-if="data.populationReportList.length === 0" class="item-null">{{data.status}}</view>
		<view class="item" v-for="(item, index) in data.populationReportList" :key="item.id" @click="showDetail(item)">
			<view style="display: flex;">
				<text class="item-name">{{item.name}}</text>
				<view class="item-status" :style="[{color: item.status == 1?'#ffaa00':item.status == 2?'green':'red'}]">
					{{item.status == 1?"审批中":item.status == 2?"已通过":"未通过"}}
				</view>
			</view>
			<text class="item-reason">{{item.reason}}</text>
			<view class="item-btm">
				<view class="item-time">
					<u-icon name="clock" style="padding: 7rpx 10rpx 0 0;" color="#98A1BB"></u-icon>
					<text style="color: #98A1BB;">{{stamp2format(item.gmtCreate, 2)}}</text>
					<text style="padding-left: 22rpx; color: #98A1BB;">{{stamp2format(item.gmtCreate, 3)}}</text>
				</view>
			</view>
		</view>
	</view>
	<!-- 右下角按钮 -->
	<view class="btn" @click="create()">
		<view class="btn-icon">				
			<u-icon name="plus" color="#fff" size="70rpx"></u-icon>
		</view>
	</view>	
</template>

<script setup>
import { onBeforeMount, reactive } from "vue";
import { getPaperList, getQuestionnaire, getUserPaper } from "../../api/questionnaire.js"
import { getPopulationReport } from "../../api/populationReport.js"
import { setLocalData, getLocalData, delLocalData } from "../../utils/cache.js";
import { stamp2format } from "../../utils/timeHandler.js";

const data = reactive({
	populationReportList: [],
	// 状态信息
	status: "加载中...请稍后"
})

// 显示 提交内容
const showDetail = (item) =>{
	
	
}

const create = () =>{
	uni.navigateTo({
		url: "/pages/populationReport/populationReport"
	})
}

// 初始化
const load = () =>{
	// 清楚缓存
	data.populationReportList.splice(0)
	// 获取答卷数据
	getPopulationReport(getLocalData("user-token").id).then(res =>{
		if(res.code) {
			console.log(res.data);
			data.status = "当前没有提交"
			data.populationReportList.push(...res.data)
		}
	}).catch(err =>{
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
		display: flex;
		flex-direction: column;
		margin: 22rpx 0;
		padding: 20rpx 40rpx;
		box-sizing: border-box;
		border-bottom: 2px solid #e6e6e6;
	}
	.item-name{
		font-size: 1.0rem;
		margin-bottom: 20rpx;
	}
	.item-reason{
		margin-bottom: 30rpx;
		font-size: 0.9rem;
	}
	.item-status{
		margin-left: 20rpx;
		font-size: 0.7rem;
	}
	.item-btm{
		display: flex;
		justify-content: space-between;
	}
	.item-time{
		display: flex;
		flex-direction: row;
	}
	.item-null{
		text-align: center;
		padding-top: 30rpx;
		color: #98A1BB;
	}
	.btn{
		position: fixed;
		top: 80%;
		left: 80%;
		width: 100rpx;
		height: 100rpx;
	}
	.btn-icon{
		width: 100rpx;
		height: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #22cdee;
		border-radius: 50%;
		transition: 0.5s ease all;
	}
</style>
