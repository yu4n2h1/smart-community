<!-- 
	问卷内容编辑页
 -->
<template>
	<view class="W">
		<view class="header">
			<view style="display: flex; flex-direction: column; align-items: center;">
				<input class="header-tit" type="text" placeholder="在此输入题目" v-model="data.name"/>
				<input class="header-descr" type="text" placeholder="在此输入介绍" v-model="data.descr"/>
			</view>
			<view style="display: flex; flex-direction: row;">
				<u-icon name="clock" style="padding: 7rpx 10rpx 0 0;" color="#98A1BB"></u-icon>
				<picker style="color: #98A1BB; font-size: 0.9rem; margin-top: 4rpx;" 
					mode="date" :value="data.startTime" @change="setStartTime">{{data.startTime?data.startTime:"开始时间"}}</picker>
				<view style="margin: 0 10rpx; color: #98A1BB;">-</view>
				<picker style="color: #98A1BB; font-size: 0.9rem; margin-top: 4rpx;" 
					mode="date" :value="data.endTime" @change="setEndTime">{{data.endTime?data.endTime:"开始时间"}}</picker>
			</view>
		</view>
		<view v-for="(item, index) in data.questionList" :key="index">			
			<editableQuestion :question="item">{{index + 1}}.</editableQuestion>
			<!-- 操作菜单 -->
			<view class="item-bar">
				<view style="display: flex; padding: 20rpx; border-top: 1px solid #22CDEE;">
					<u-icon name="arrow-upward" color="#22CDEE" style="padding-right: 10rpx;" @click="upItem(index)"></u-icon>
					<u-icon name="arrow-downward" color="#22CDEE" style="padding-right: 10rpx;" @click="downItem(index)"></u-icon>
					<u-icon name="minus" color="#22CDEE" style="padding-right: 10rpx;" @click="delItem(index)"></u-icon>
					<u-icon name="plus" color="#22CDEE" @click="addItem(index)"></u-icon>
				</view>
			</view>
		</view>
	</view>
	<button class="btn" @click="deliver">发布</button>
</template>

<script setup>
import editableQuestion from '../../components/questionnaire/editableQuestion.vue'
import {onBeforeMount, reactive} from 'vue'
import {delLocalData, getLocalData, setLocalData} from '../../utils/cache.js'
import { addQuestionnaire } from '../../api/questionnaire';

const data = reactive({
	id: "0",
	type: 1,
	descr: "",
	name: "",
	startTime: "",
	endTime: "",
	questionList: [
		
	]
})

// 时间选择器 时间设置
const setStartTime = (n) =>{
	data.startTime = n.detail.value
}

const setEndTime = (n) =>{
	data.endTime = n.detail.value
}

// 返回 函数值 实现 深拷贝
// 返回一个 默认问题
const getDefaultItem = () =>{
	let dm = {
		id: "0",
		type: 1,
		name: "",
		descr: "",
		content: undefined,
		questionnaire: ""
	}
	return dm
}


const load = () =>{
	data.id = getLocalData("new-qeid") + ""
	// 新建草稿
	data.questionList.push(getDefaultItem())
}

onBeforeMount(() =>{
	load()
})

const addItem = (index) =>{
	data.questionList.splice(index + 1, 0, getDefaultItem())
}

const delItem = (index) =>{
	if(data.questionList.length === 1){
		uni.showToast({
			title: '至少一个题目',
			icon: 'error',
			duration: 2000,
			position: 'top'
		})
		return
	}
	data.questionList.splice(index, 1)
}

const upItem = (index) =>{
	if(index === 0){
		data.questionList.push(data.questionList.shift())
	} else{
		data.questionList[index] = data.questionList.splice(index -1, 1, data.questionList[index])[0]
	}
}

const downItem = (index) =>{
	if(index === data.questionList.length - 1){
		data.questionList.splice(0, 0, data.questionList.pop())
	} else{
		data.questionList[index] = data.questionList.splice(index + 1, 1, data.questionList[index])[0]
	}
}

const deliver = () =>{
	uni.showModal({
		title: '提示',
		content: '是否确认发布?',
		success: res =>{
			if(res.confirm){
				addQuestionnaire(data).then(res =>{
					if(res.code) {
						uni.showToast({
							title: '发布成功!',
							icon: 'success',
							duration: 2000,
							success: res =>{
								setTimeout(() =>{								
									uni.navigateBack({
										delta: 1
									})
								}, 1000)
							}
						})
					} else {
						uni.showToast({
							title: '请稍后重试',
							icon: 'loading',
							duration: 2000
						})
					}
				}).catch(err =>{
					// 失败
					uni.showToast({
						title: '请稍后重试',
						icon: 'loading',
						duration: 2000
					})
					return
				})
			} 
		}
	})
}
</script>

<style>
	.item-bar{
		display: flex;
		justify-content: end;
	}
	.btn{
		background-color: #22CDEE;
		color: #fff;
		width: 300rpx;
		height: 70rpx;
		margin: auto;
		margin-bottom: 20rpx;
		border-radius: 10rpx;
		font-size: 0.9rem;
		line-height: 70rpx;
	}
	.header-tit{
		border-left: 2px solid #768BFF;
		border-right: 2px solid #768BFF;
		padding-left: 5rpx;
		line-height: 40rpx;
		margin-bottom: 30rpx;
		font-size: 1.1rem;
		color: #768BFF;
		text-align: center;
		width: 100%;
	}
	.header-descr{
		border-left: 1px solid #333333;
		border-right: 1px solid #333333;
		margin-bottom: 50rpx;
		font-size: 0.8rem;
		color: #768BFF;
		text-align: center;
		word-wrap: break-word;
		width: 500rpx;
	}
	.header{
		width: 702rpx;
		min-height: 150rpx;
		background-color: #fff;
		box-shadow: 0 4px 15px 0 rgba(230, 228, 228, 0.52);
		display: flex;
		flex-direction: column;
		margin: 22rpx 0;
		border-radius: 10px;
		padding: 20rpx;
		box-sizing: border-box;
	}
</style>