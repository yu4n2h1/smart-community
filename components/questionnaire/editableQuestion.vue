<!-- 
	可编辑 问题组件
 -->
<template>
	<view class="item">
		<view class="item-tit">
			<view class="item-tit-lft">	
				<slot><!-- 题目序号 --></slot>
				<input type="text" v-model="props.question.name" placeholder="题目名称">
			</view>
			<!-- 右上角按钮 -->
			<view class="item-tit-rit">
				<u-icon name="list" @click="data.typed = !data.typed" color="#22CDEE"></u-icon>
				<view class="item-lst" :style="[{height : data.typed?'220rpx':'0'}]">
					<u-button type="primary" :plain="true" size="small" v-for="(item, index) in data.typeList" 
						@click="setType(index + 1)" :key="index">{{item}}</u-button>
				</view>
			</view>
		</view>
		<view class="item-descr">
			<input type="text" v-model="props.question.descr" placeholder="在此输入说明"/>
		</view>
		<view class="item-content">
			
		</view>
		<!-- 单选题 -->
		<view class="item-content" v-if="props.question.type === 1">
			<view>
				<view class="item-content-label" v-for="(item,index) in props.question.content">
					<view style="padding-top: 4rpx; display: flex;">
						<view class="item-content-radio"></view>
						<input type="text" v-model="props.question.content[index]" style="color: #606266;  font-size: 28rpx;" placeholder="选项"/>
					</view>
					<view style="display: flex;">
						<u-icon name="minus" color="#22CDEE" style="padding-right: 10rpx;" @click="delItem(index)"></u-icon>
						<u-icon name="plus" color="#22CDEE" @click="addItem(index)"></u-icon>
					</view>
				</view>
			</view>
		</view>
		<!-- 多选题 -->
		<view class="item-content" v-else-if="props.question.type === 2">
			<view>
				<view class="item-content-label" v-for="(item,index) in props.question.content">
					<view style="padding-top: 4rpx; display: flex;">
						<view class="item-content-checkbox"></view>
						<input type="text" v-model="props.question.content[index]" style="color: #606266;  font-size: 28rpx;" placeholder="选项"/>
					</view>
					<view style="display: flex;">
						<u-icon name="minus" color="#22CDEE" style="padding-right: 10rpx;" @click="delItem(index)"></u-icon>
						<u-icon name="plus" color="#22CDEE" @click="addItem(index)"></u-icon>
					</view>
				</view>
			</view>
		</view>
		<!-- 简答题 -->
		<view class="item-content" v-else-if="props.question.type === 3">
			<u-input
				border="surround"
				disabled
			  ></u-input>
		</view>
	</view>
</template>

<script setup>
import { onBeforeMount, reactive } from "vue";
import { getQUID } from "../../api/questionnaire";
import { getLocalData } from "../../utils/cache";
	const props = defineProps({
		question: {
			typeo: Object,
			default: {
				id: "1",
				type: 1,
				name: "",
				descr: "",
				content: [""],
				questionnaire: "0",
			}
		}
	})
	
	const data = reactive({
		// 右上角角标
		typed: false,
		// 题目类型
		typeList: [
			"单选题",
			"多选题",
			"问答题"
		]
	})
	
	// 初始化
	const load = () =>{
		props.question.type = 1
		props.question.content = [""]
		props.question.id = getQUID()
		props.question.questionnaire = getLocalData("new-qeid") + ""
	}
	
	onBeforeMount(() =>{
		load()
	})
	
	const setType = (index) =>{
		// 更改 题目类型
		data.typed = !data.typed
		if(props.question.type === index) return
		if(index === 3) {
			props.question.content = ""
			props.question.type = index
			return
		}
		props.question.content = [""]
		props.question.type = index
	}
	
	const delItem = (index) =>{
		// 删除选项
		// 至少存在一个选项
		if(props.question.content.length === 1){
			uni.showToast({
				title: '至少一个选项',
				icon: 'error',
				position: 'top',
				duration: 2000
			})
			return
		}
		props.question.content.splice(index, 1)
	}
	
	const addItem = (index) =>{
		// 增加选项
		props.question.content.splice(index + 1, 0, "")
	}
</script>

<style>
	.item{
		width: 702rpx;
		min-height: 356rpx;
		background-color: #fff;
		box-shadow: 0 4px 15px 0 rgba(230, 228, 228, 0.52);
		display: flex;
		flex-direction: column;
		margin: 22rpx 0;
		border-radius: 10px;
		padding: 20rpx;
		box-sizing: border-box;
	}
	.item-descr{
		color: #98A1BB;
		font-size: 1rem;
		margin-left: 40rpx;
	}
	.item-content{
		padding: 20rpx 50rpx 0 40rpx;
	}
	.item-tit{
		display: flex;
		color: #333333;
		font-size: 1.1rem;
		margin: 10rpx;
		justify-content: space-between;
	}
	.item-tit-lft{
		display: flex;
	}
	.item-tit-rit{
		display: flex;
		position: relative;
	}
	.item-lst{
		width: 200rpx;
		position: absolute;
		top: 70rpx;
		right: 0rpx;
		overflow: scroll;
		z-index: 1;
		transition: 0.2s ease all;
		background-color: #fff;
	}
	.item-lst button{
		font-size: 0.8rem;
		width: 150rpx;
		color: #22CDEE;
		margin-top: 10rpx;
	}
	.item-content-label{
		display: flex;
		margin-bottom: 20rpx;
		justify-content: space-between;
	}
	.item-content-radio{
		border: 1px solid #d1d1d1;
		width: 28rpx;
		height: 28rpx;
		border-radius: 50%;
		margin-right: 10rpx;
	}
	.item-content-checkbox{
		border: 1px solid #d1d1d1;
		width: 28rpx;
		height: 28rpx;
		border-radius: 5rpx;
		margin-right: 10rpx;
	}
</style>