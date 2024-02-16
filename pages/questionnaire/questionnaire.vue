<!-- 
	用户问卷详情页

	TODO问卷数据结构待优化
	TODO表单校验
	TODO问卷可以填写多次
 -->

<template>
	
	<view v-if="data.flag === 1" style="text-align: center; color: #98A1BB; padding-top: 30rpx;">您已完成该问卷</view>
	
	<view class="W" v-for="(item, index) in data.questionList" :key="index">	
	
		<!-- 问题组件 -->
		<question :question="item">{{index + 1}}.</question>
	</view>
	
	<!-- 遮罩层 -->
	<view v-if="data.flag === 1" class="overlay"></view>
	
	<button v-if="data.flag === 0" class="btn" @click="submit">提交</button>
</template>

<script setup>
import question from '../../components/question.vue'
import {onBeforeMount, reactive} from 'vue'
import {delLocalData, getLocalData, setLocalData} from '../../utils/cache.js'

/* 
	data
	问卷对象
	包含题目选项等信息
 */
let data = reactive({})

// 当前用户ID
let uid = 0

// 初始化
const load = () =>{
	// 获取 用户ID 当前问卷
	uid = getLocalData('user-token').id
	data = reactive(getLocalData('cur-questionnaire'))
	
	// 如果问卷已经完成 读取填写内容 设置遮罩层
}

onBeforeMount(() =>{
	load()
})

// 提交
const submit = () =>{
	// 消息提示框
	uni.showModal({
		title: '提示',
		content: '是否确认提交？',
		success: (res) => {
			if(res.confirm){
				// 点击确定
				try{
					// 尝试存储本地数据 为空则新建 否则新增
					let userDataIndex = getLocalData('user-data-index')?getLocalData('user-data-index'):{uid: uid, qlist: []}
					userDataIndex.qlist.push(data.id)
					let userData = getLocalData('user-data')?getLocalData('user-data'):{uid: uid, qlist: []}
					data.flag = 1
					userData.qlist.push(data)
					setLocalData('user-data-index', userDataIndex)
					setLocalData('user-data', userData)
					uni.showToast({
						title: '提交成功',
						icon: 'success',
						duration: 2000,
						success: () => {
							setTimeout(() =>{
								uni.navigateBack({
									delta: 1
								})
							}, 1000)
						}
					})
				} catch(e){
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
	.overlay{
		position: absolute;
		top: 0%;
		width: 100%;
		height: 100%;
	}
</style>