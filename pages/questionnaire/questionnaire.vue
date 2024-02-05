<template>
	<view class="W" v-for="(item, index) in data.questionList" :key="index">	
		<question :question="item">{{index + 1}}.</question>
	</view>
	<button class="btn" @click="submit">提交</button>
</template>

<script setup>
import question from '../../components/question.vue'
import {onBeforeMount, reactive} from 'vue'
import {delLocalData, getLocalData, setLocalData} from '../../utils/cache.js'

let data = reactive({})

let qid = ''

let uid = ''

const load = () =>{
	uid = getLocalData('user-token').id
	qid = getLocalData('questionnaire-id')
	getLocalData('questionnaire-list').filter((item, index, arr) =>{
		if(item.id === qid) {
			data = reactive(item)
		}
	})
	delLocalData('questionnaire-id')
}

onBeforeMount(() =>{
	load()
})

const submit = () =>{
	uni.showModal({
		title: '提示',
		content: '是否确认提交？',
		success: (res) => {
			if(res.confirm){
				try{
					let userDataIndex = getLocalData('user-data-index')?getLocalData('user-data-index'):{uid: uid, qlist: []}
					userDataIndex.qlist.push(qid)
					let userData = getLocalData('user-data')?getLocalData('user-data'):{uid: uid, qlist: []}
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
</style>