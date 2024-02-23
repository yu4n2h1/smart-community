<!-- 
	问卷发布管理列表
 
 -->

<template>
	<view class="header" :style="[{height: delmode?'100rpx':'0'}]">
		
		<button class="header-btn" @click="selAll">全选</button>
		<button class="header-btn" @click="delItem()">删除</button>
		<button class="header-btn" @click="delmode = !delmode">取消</button>
	</view>
	<view class="W">
		<!-- 列表空提示 -->
		<view v-if="data.length === 0" class="item-null">当前没有问卷</view>
		
		<view class="item" v-for="(item, index) in data" :key="item.id" @click="selItem(index)">
			
			<view style="display: flex; justify-content: space-between;">				
				<text>{{item.name}}</text>
				
				<!-- 选择框 -->
				<view class="item-sel" 
					:style="[{backgroundColor: dellist[index]?'#22cdee':'#fff', 
							transform: delmode?'scale(1)':'scale(0)'}]">
					√
				</view>
			</view>
			
			<view class="item-btm">
				<view class="item-time">
					<u-icon name="clock" style="padding: 7rpx 10rpx 0 0;" color="#98A1BB"></u-icon>
					<text>截止到：</text>
					<text>{{item.endTime}}</text>
				</view>
				<text style="color: green;">已填写：{{item.cnt}}份</text>	
			</view>
		</view>
	</view>
	
	<!-- 右下角 按钮 -->
	<view class="btn" @click="mored = !mored">
		<view class="btn-icon" :style="[{transform: mored?'scale(0.8)':'scale(1)'}]">				
			<u-icon name="grid-fill" color="#fff" size="80rpx"></u-icon>
		</view>
		<view style="position: relative;">			
			<view class="btn-icon-otr" 
			:style="[{top: mored?'-20rpx':'-100rpx', 
					left: mored?'-80rpx':'0rpx', 
					transform: mored?'scale(0.8)':'scale(0)', 
					backgroundColor: mored?'#768BFF':'transparent'
					}]">
				<u-icon name="plus" color="#fff" size="60rpx" @click="addItem()"></u-icon>
			</view>		
			<view class="btn-icon-otr"
			:style="[{top: mored?'-180rpx':'-100rpx', 
					left: mored?'-80rpx':'0rpx', 
					transform: mored?'scale(0.8)':'scale(0)', 
					backgroundColor: mored?'#768BFF':'transparent'
					}]">
				<u-icon name="minus" color="#fff" size="60rpx" @click="delmode = !delmode"></u-icon>
			</view>
		</view>
	</view>	
</template>

<script setup>
import {reactive, readonly, ref} from 'vue'
import { delLocalData, getLocalData, setLocalData} from '../../utils/cache';
import {onShow} from '@dcloudio/uni-app'

let data = reactive([])

// 控制 按钮显示
let mored = ref(false)

// 控制 顶部菜单
let delmode = ref(false)

// 存储 需要删除的问卷
let dellist = reactive([])

// 初始化
const load = () =>{
	// （页面切换时）清缓存 
	data.splice(0, data.length)
	
	// 查询 问卷
	if(!getLocalData('questionnaire-list')) return
	data.push(...getLocalData('questionnaire-list'))
	
	// 初始化删除数组
	for(let i in data){
		dellist.push(false)
	}
}

onShow(() =>{
	// uni.navigateBack 时 重新初始化
	load()
})

// 问卷详情页 TODO
const showDetail = () =>{
	uni.navigateTo({
		url: '/pages/questionnaire/questionnaireDetail'
	})
}

// 创建新问卷
const create = () =>{
	uni.navigateTo({
		url: '/pages/questionnaire/questionnaireAdmin'
	})
}

const addItem = () =>{
	if(mored){
		uni.navigateTo({
			url: '/pages/questionnaire/questionnaireAdmin'
		})
	}
}

const selItem = (index) =>{
	if(!delmode._value) showDetail(index)
	else dellist[index] = !dellist[index]
}

const selAll = () =>{
	for(let i in dellist) {
		dellist[i] = true
	}
}

const delItem = () =>{
	uni.showModal({
		title: '提示',
		content: '是否确认删除?',
		success: res =>{
			if(res.confirm){
				let d = data.filter((item, index, arr) =>{
					if(!dellist[index]) return item
				})
				data.splice(0, data.length)
				data.push(...d)
				try{
					setLocalData('questionnaire-list', data)
					uni.showToast({
						title: '删除成功!',
						icon: 'success',
						duration: 2000,
						success: res =>{

						}
					})
				} catch(e){
					console.log(e);
					uni.showToast({
						title: '请稍后重试',
						icon: 'fail',
						duration: 2000
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