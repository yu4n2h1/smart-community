<!-- 
	问卷内容编辑页
	
 -->

<template>
	<view class="W">
		<view class="header">
			<input class="header-tit" type="text" placeholder="在此输入题目" v-model="data.name"/>
			<view style="display: flex; flex-direction: row;">
				<u-icon name="clock" style="padding: 7rpx 10rpx 0 0;" color="#98A1BB"></u-icon>
				<!-- TODO时间选择器 -->
				<input type="text" placeholder="截止时间" v-model="data.endTime"/>
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
	<button class="btn" @click="save">保存</button>
	<button class="btn" @click="deliver">发布</button>
</template>

<script setup>
import editableQuestion from '../../components/questionnaire/editableQuestion.vue'
import {onBeforeMount, reactive} from 'vue'
import {delLocalData, getLocalData, setLocalData} from '../../utils/cache.js'

const data = reactive({
	id: 0,
	name: '',
	endTime: '',
	questionList: [
		
	]
})

// 返回 函数值 实现 深拷贝
// 返回一个 默认问卷
const getDefaultItem = () =>{
	let dm = {
		flag: 0,
		title: '',
		descr: '',
		data: [
			{
				name: '',
				selected: false
			},
			{
				name: '',
				selected: false
			},
			{
				name: '',
				selected: false
			}
		]
	}
	return dm
}


const load = () =>{
	data.id = Date.now()
	// 新建草稿
	data.questionList.push(getDefaultItem())
	// 读取草稿
	if(getLocalData('questionnaire-draft')){
		uni.showModal({
			title: '提示',
			content: '是否继续编辑上次内容?',
			success: res =>{				
				if(res.confirm){
					let ld = getLocalData('questionnaire-draft')
					data.questionList.pop()
					data.questionList.push(...ld.questionList)
					data.id = ld.id
					data.name = ld.name
					data.endTime = ld.endTime
				} else{
					delLocalData('questionnaire-draft')
				}
			}
		})
	}
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

const save = () =>{
	try {			
		setLocalData('questionnaire-draft', data)
		uni.showToast({
			title: '保存成功!',
			icon: 'success',
			duration: 2000
		})
	} catch(e){
		uni.showToast({
			title: '请稍后重试',
			icon: 'fail',
			duration: 2000
		})
	}
}

const deliver = () =>{
	uni.showModal({
		title: '提示',
		content: '是否确认发布?',
		success: res =>{
			if(res.confirm){
				try{
					let quesitonnaireList = getLocalData('questionnaire-list')?getLocalData('questionnaire-list'):[]
					quesitonnaireList.push(data)
					setLocalData('questionnaire-list', quesitonnaireList)
					delLocalData('questionnaire-draft')
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
		margin-bottom: 50rpx;
		font-size: 1.1rem;
		color: #768BFF;
		text-align: center;
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