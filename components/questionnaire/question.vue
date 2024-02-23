<!-- 
	问题组件
 -->
<template>
	<view class="item">
		<text><slot><!-- 题目序号 --></slot>{{question.name}}</text>
		<text>{{question.descr}}</text>
		
		<!-- 单选题 -->
		<view class="item-option" v-if="question.type === 1">
			<u-radio-group
				v-model="data.sel[0]"
			    placement="column"
				@change="radioGroupChange"
			  >
			    <u-radio
			      :customStyle="{marginBottom: '8px'}"
			      v-for="(item, index) in question.content"
			      :key="index"
			      :label="item"
			      :name="index"
			    >
			    </u-radio>
			  </u-radio-group>
		</view>
		
		<!-- 多选题 -->
		<view class="item-option" v-else-if="question.type === 2">
			<u-checkbox-group
				v-model="data.sel"
			    placement="column"
				@change="checkboxGroupChange"
			  >
			    <u-checkbox
			      :customStyle="{marginBottom: '8px'}"
			      v-for="(item, index) in question.content"
			      :key="index"
			      :label="item"
			      :name="index"
			    >
			    </u-checkbox>
			  </u-checkbox-group>
		</view>
		
		<!-- 问答题 -->
		<view class="item-option" v-else-if="question.type === 3">
			<up-input
			    border="surround"
			    v-model="question.answer"
			  ></up-input>
		</view>
		
	</view>
</template>

<script setup>
	import { onBeforeMount, onBeforeUnmount, onMounted, onUpdated, reactive } from 'vue';
	import { getQuestionnaire } from "../../api/questionnaire.js"
	import { getLocalData, setLocalData } from '../../utils/cache.js';
	const props = defineProps({
		question: {
			typeo: Object,
			default: {
				id: 1,
				type: 0,
				name: "题目名称",
				descr: "题目说明",
				content: ["选项"],
				answer: 0,
				questionnaire: ""
			}
		}
	})
	
	const data = reactive({
		// 选择
		sel: []
	})
	
	// 初始化标识
	let loaded = 1
	
	// 初始化函数
	const load = () =>{
		let item = props.question
		if(item.type === 1) {
			data.sel.push(item.answer)
		} else if(item.type === 2){
			data.sel.push(...item.answer)
		} else if(item.type === 3) {
			// 填空题 双向绑定 answer 无需处理
		}
	}
	
	// 单选
	const radioGroupChange = (n) =>{
		props.question.answer = n
		
	}
	
	// 多选
	const checkboxGroupChange = (n) =>{
		props.question.answer = n
	}
	
	onUpdated(() =>{
		if(getLocalData("finished") === 1) {
			load()
		}
	})
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
	.item text:nth-child(1){
		color: #333333;
		font-size: 1.1rem;
		margin: 10rpx
	}
	.item text:nth-child(2){
		color: #98A1BB;
		font-size: 1rem;
		margin-left: 40rpx;
	}
	.item-option{
		padding: 20rpx 50rpx 0 40rpx;
	}
</style>