<!-- 
	用户问卷内容
 -->
<template>
	<view v-if="data.finished === 1" style="text-align: center; color: #98A1BB; padding-top: 30rpx;">{{data.finishText}}</view>
	<view class="W" v-for="(item, index) in data.question" :key="index">	
		<question :question="item">{{index + 1}}.</question>
	</view>
	<!-- 遮罩层 -->
	<view v-if="data.finished === 1" class="overlay"></view>
	<button v-if="data.finished === 0" class="btn" @click="submit">提交</button>
</template>

<script setup>
import question from '../../components/questionnaire/question.vue'
import {onBeforeMount, reactive} from 'vue'
import {delLocalData, getLocalData, setLocalData} from '../../utils/cache.js'
import { addUserPaper, getQuestion, getUserPaper } from '../../api/questionnaire';

const data = reactive({
	// 题目
	question: [],
	// 用户ID
	user: 0,
	// 问卷ID
	qeid: 0,
	// 问卷类型
	qetype: 0,
	// 是否完成
	finished: 1,
	// 提示文本
	finishText: "您已经完成该问卷！",
	// 答卷
	userPaper: []
})

// 初始化
const load = () =>{
	// 获取 用户ID 当前问卷
	data.user = getLocalData("user-token").id
	data.qeid = getLocalData("qeid")
	data.qetype = getLocalData("qetype")
	getQuestion(getLocalData("qidList")).then(res =>{
		// 处理 选项数组
		for(let i in res) {
			if(res[i].type < 3) res[i].content = JSON.parse(res[i].content)
		}
		/*
			Invalid prop: type check failed for prop "modelValue". Expected String | Number | Boolean, got Array
			下面这句话 会报警告 目前没有找到数据不对的地方
		*/
		data.question.push(...res)
		// 如果问卷 只能填写一次 并且 已经完成 读取填写内容 设置遮罩层
		if(data.qetype === 1) {
			getUserPaper(data.qeid, data.user).then(res =>{
				if(res.length == 0) {
					data.finished = 0
					setLocalData("finished", 0)
					return
				}
				setLocalData("finished", 1)
				data.finished = 1 - data.finished
				// 反序列化 
				res[0].answer = JSON.parse(res[0].answer)
				// 填充答案
				for(let i in data.question) {
					data.question[i].answer = res[0].answer[i]
				}
			}).catch(err =>{
				// 加载失败
				data.finishText = "加载失败，请稍后重试"
				return
			})
		}
	}).catch(err =>{
		// 获取 失败
		console.log(err);
		return
	})
}

onBeforeMount(() =>{
	load()
})

// 组合 用户答案
const createAnswer = () =>{
	// 题目答案
	for(let i in data.question) {
		// 表单 空 校验
		if(typeof data.question[i].answer === undefined 
			|| data.question[i].answer == null) {
			return false
		} else {				
			data.userPaper.push(data.question[i].answer)
		}
	}
	return true
}

// 提交
const submit = () =>{
	// 消息提示框
	uni.showModal({
		title: '提示',
		content: '是否确认提交？',
		success: (res) => {
			if(res.confirm){
				if(!createAnswer()) {
					uni.showToast({
						title: '请检查作答！',
						icon: 'loading',
						duration: 1000
					})
					return
				}
				addUserPaper(data.qeid, data.userPaper, data.user).then(res =>{
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
				}).catch(err =>{
					// 增加失败
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