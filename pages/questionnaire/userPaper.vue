<!-- 
	用户问卷内容
 -->
<template>
	<view v-if="data.finished === 1" style="text-align: center; color: #98A1BB; padding-top: 30rpx;">{{data.status}}</view>
	<view class="W" v-for="(item, index) in data.question" :key="index">	
		<question :question="item">{{index + 1}}.</question>
	</view>
	<!-- 遮罩层 -->
	<view class="overlay"></view>
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
	// 状态信息
	status: "加载中...请稍后",
	// 答卷
	userPaper: []
})

// 初始化
const load = () =>{
	// 获取 用户ID 当前问卷
	data.user = getLocalData("quser")
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
				// 查询后 更改 空 状态信息
				data.finished = 0
				if(res.length == 0) {
					data.finished = 1 - data.finished
					setLocalData("finished", 0)
					return
				}
				setLocalData("finished", 1)
				// 反序列化 
				res[0].answer = JSON.parse(res[0].answer)
				// 填充答案
				for(let i in data.question) {
					data.question[i].answer = res[0].answer[i]
				}
				console.log(data);
			}).catch(err =>{
				// 加载失败
				data.status = "加载失败，请稍后重试"
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