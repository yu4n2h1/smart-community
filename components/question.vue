<!-- 

	用来展示 和 填写 问卷 的 问题组件

 -->
<template>
	<view class="item">
		<text><slot></slot>{{question.title}}</text>
		<text>{{question.descr}}</text>
		<!-- 单选题 -->
		<view class="data" v-if="question.flag === 0">
			<u-radio-group
				v-model="selRadio"
			    placement="column"
				@change="radioGroupChange"
			  >
			    <u-radio
			      :customStyle="{marginBottom: '8px'}"
			      v-for="(item, index) in question.data"
			      :key="index"
			      :label="item.name"
			      :name="item.name"
			    >
			    </u-radio>
			  </u-radio-group>
		</view>
		<!-- 多选题 -->
		<view class="data" v-else-if="question.flag === 1">
			<u-checkbox-group
				v-model="selCheckboxList"
			    placement="column"
				@change="checkboxGroupChange"
			  >
			    <u-checkbox
			      :customStyle="{marginBottom: '8px'}"
			      v-for="(item, index) in question.data"
			      :key="index"
			      :label="item.name"
			      :name="item.name"
			    >
			    </u-checkbox>
			  </u-checkbox-group>
		</view>
		<!-- 问答题 -->
		<view class="data" v-else-if="question.flag === 2">
			<up-input
			    border="surround"
			    v-model="question.data[0].name"
			  ></up-input>
		</view>
	</view>
</template>

<script>
	export default {
		name:"question",
		props: {
			question: {
				type: Object,
				default: {
					flag: 0,
					title: '题目名称',
					descr: '在此处输入说明',
					data: [
						{
							name: '选项1',
							selected: false
						},
						{
							name: '选项2',
							selected: false
						},
						{
							name: '选项3',
							selected: false
						}
					]
				}
			}
		},
		data() {
			return {
				// 单选
				selRadio: '',
				// 多选
				selCheckboxList: []
			};
		},
		mounted() {
			
		},
		methods: {
			load(){
				// 初始化函数
				// 如果 用户填写过问卷 显示填写后的内容
				for(let i in this.question.data){
					if(this.question.data[i].selected === true &&this.question.flag === 0) {
						this.selRadio = this.question.data[i].name
						return
					} else if(this.question.data[i].selected === true &&this.question.flag === 1){
						this.selCheckboxList.push(this.question.data[i].name)
					}
				}
			},
			
			/* 
				依据 选择
				更改 data 对应值
			 */
			radioGroupChange(n){
				this.question.data.filter((item, index, arr) =>{
					if(item.name === n){
						item.selected = true;
					} else{
						item.selected = false;
					}
				})
			},
			checkboxGroupChange(n){
				this.question.data.filter((qitem, qindex, qarr) =>{
					qitem.selected = false
					n.filter((nitem, nindex, narr) =>{
						if(qitem.name === nitem){
							qitem.selected = true
						}
					})
				})
			}
		}
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
	.data{
		padding: 20rpx 50rpx 0 40rpx;
	}
</style>