<!-- 
	问卷发布管理列表
 -->
<template>
	<view class="header" :style="[{height: data.delmode?'100rpx':'0'}]">
		<button class="header-btn" @click="selAll">{{data.selAlled?"全不选":"全选"}}</button>
		<button class="header-btn" @click="delItem()">删除</button>
		<button class="header-btn" @click="data.delmode = !data.delmode">取消</button>
	</view>
	<view class="W">
		<view v-if="data.questionnaireList.length === 0" class="item-null">{{data.status}}</view>
		<view class="item" v-for="(item, index) in data.questionnaireList" :key="item.id" @click="selItem(index)">
			<view style="display: flex; justify-content: space-between;">				
				<text>{{item.name}}</text>
				<view class="item-sel" 
					:style="[{backgroundColor: data.dellist[index]?'#22cdee':'#fff', transform: data.delmode?'scale(1)':'scale(0)'}]">
					√
				</view>
			</view>
			<view class="item-btm">
				<view class="item-time">
					<u-icon name="clock" style="padding: 7rpx 10rpx 0 0;" color="#98A1BB"></u-icon>
					<text>截止到：</text>
					<text>{{item.endTime}}</text>
				</view>
				<text style="color: green;">已填写：{{data.queCntList[index]?data.queCntList[index]:0}}份</text>	
			</view>
		</view>
	</view>
	<!-- 右下角按钮 -->
	<view class="btn" @click="data.mored = !data.mored">
		<view class="btn-icon" :style="[{transform: data.mored?'scale(0.8)':'scale(1)'}]">				
			<u-icon name="grid-fill" color="#fff" size="80rpx"></u-icon>
		</view>
		<view style="position: relative;">			
			<view class="btn-icon-otr" 
			:style="[{top: data.mored?'-20rpx':'-100rpx', 
					left: data.mored?'-80rpx':'0rpx', 
					transform: data.mored?'scale(0.8)':'scale(0)', 
					backgroundColor: data.mored?'#768BFF':'transparent'
					}]">
				<u-icon name="plus" color="#fff" size="60rpx" @click="addItem()"></u-icon>
			</view>		
			<view class="btn-icon-otr"
			:style="[{top: data.mored?'-180rpx':'-100rpx', 
					left: data.mored?'-80rpx':'0rpx', 
					transform: data.mored?'scale(0.8)':'scale(0)', 
					backgroundColor: data.mored?'#768BFF':'transparent'
					}]">
				<u-icon name="minus" color="#fff" size="60rpx" @click="data.delmode = !data.delmode"></u-icon>
			</view>
		</view>
	</view>	
</template>

<script setup>
import {reactive, readonly, ref} from 'vue'
import { delLocalData, getLocalData, setLocalData} from '../../utils/cache';
import {onShow} from '@dcloudio/uni-app'
import { delQuestionnaire, getPaperCount, getQuestionnaire, getQUID } from '../../api/questionnaire';

let data = reactive({
	questionnaireList: [],
	// 按钮显示
	mored: false,
	// 顶部菜单
	delmode: false,
	// 待删除问卷
	dellist: [],
	// 是否全选
	selAlled: false,
	// 问卷ID数组
	qeidList: [],
	// 问卷 填写数量
	queCntList: [],
	// 状态
	status: "加载中...请稍后"
})

// 初始化
const load = () =>{
	// （页面切换时）清缓存 
	data.questionnaireList.splice(0)
	data.qeidList.splice(0)
	data.queCntList.splice(0)
	// 查询 问卷
	getQuestionnaire().then(res =>{
		// 查询后 更改 空 状态信息
		data.status = "当前没有问卷"
		if(res.length === 0) return
		for(let i in res) {
			data.questionnaireList.push(res[i])
			data.qeidList.push(data.questionnaireList[i].id)
			data.dellist[i] = false
		}
		// 查询填写数量 TODO 查询优化
		getPaperCount(data.qeidList).then(res =>{
			for(let i in data.qeidList) {
				for(let j in res.data) {
					if(res.data[j].questionnaire === data.qeidList[i]) {
						data.queCntList.push(res.data[j].cnt)
					}
				}
			}
		})
	}).catch(err =>{
		// 获取 失败
		return
	})
			
	// 初始化删除数组
	for(let i in data.questionnaireList){
		data.dellist.push(false)
	}
}

onShow(() =>{
	// uni.navigateBack 时 重新初始化
	load()
})

// 问卷详情页 TODO
const showDetail = (index) =>{
	setLocalData("qeid", data.qeidList[index])
	setLocalData("qidList", data.questionnaireList[index].questionList)
	uni.navigateTo({
		url: '/pages/questionnaire/userPaperList'
	})
}

// 新增问卷
const addItem = () =>{
	if(data.mored){
		setLocalData("new-qeid", getQUID())
		uni.navigateTo({
			url: '/pages/questionnaire/questionnaireAdmin'
		})
	}
}

const selItem = (index) =>{
	if(!data.delmode) showDetail(index)
	else data.dellist[index] = !data.dellist[index]
}

const selAll = () =>{
	for(let i in data.dellist) {
		data.dellist[i] = data.selAlled?false:true
	}
	data.selAlled = !data.selAlled
}

const delItem = () =>{
	let noned = true
	for(let i in data.dellist) {
		if(data.dellist[i]) {
			noned = false
			break
		}
	}
	if(noned) {
		uni.showToast({
			title: '请选择',
			icon: "error",
			duration: 1000,
		})
		return
	}
	uni.showModal({
		title: '提示',
		content: '是否确认删除?',
		success: res =>{
			if(res.confirm){
				for(let i in data.dellist) {
					uni.showToast({
						title: '删除中...',
						icon: 'loading',
						duration: 2000,
					})
					if(data.dellist[i]) delQuestionnaire(data.qeidList[i]).then(res =>{
						load()
					}).catch(err =>{
						uni.showToast({
							title: '请稍后重试',
							icon: 'error',
							duration: 2000,
						})
					})
				}
			} 
		}
	})
}
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
	.btn-icon-otr{
		width: 100rpx;
		height: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #22cdee;
		border-radius: 50%;
		transition: 0.5s ease all;
		position: absolute;
		left: 0rpx;
	}
	.item-null{
		text-align: center;
		padding-top: 30rpx;
		color: #98A1BB;
	}
	.header{
		background-color: #768BFF;
		border-radius: 0 0 15rpx 15rpx;
		margin-bottom: 20rpx;
		transition: 0.5s ease all;
		display: flex;
		justify-content: space-around;
		box-shadow: 0 4px 15px 0 rgba(230, 228, 228, 0.52);
		overflow: hidden
	}
	.header-btn{
		width: 200rpx;
		height: 60rpx;
		background-color: #fff;
		color: #768BFF;
		font-size: 1rem;
		margin-top: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.item-sel{
		border: 1px solid #333333;
		width: 38rpx;
		height: 38rpx;
		border-radius: 5rpx;
		padding-left: 5rpx;
		box-sizing: border-box;
		color: #fff;
		transition: 0.5s ease all;
	}
</style>