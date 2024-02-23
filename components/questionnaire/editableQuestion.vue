
<!-- 
	可编辑 问题组件
 -->

<template>
	<view class="item">
		<view class="item-tit">
			<view class="item-tit-lft">	
			
				<!-- 
					slot 插槽
					组件传值 传入 题目序号
				 -->
				<slot></slot>
				
				<input type="text" v-model="question.title" placeholder="题目名称">
			</view>
			<!-- 
				右上角角标
				更换 题目类型
			 -->
			<view class="item-tit-rit">
				<u-icon name="list" @click="showFlag" color="#22CDEE"></u-icon>
				<view class="item-lst" :style="[{height : show?'220rpx':'0'}]">
					<u-button type="primary" :plain="true" size="small" v-for="(name, index) in flagList" @click="setFlag(index)" :key="index">{{name}}</u-button>
				</view>
			</view>
		</view>
		<view class="item-descr">
			<input type="text" v-model="question.descr" placeholder="在此输入说明"/>
		</view>
		<!-- 单选题 -->
		<view class="data" v-if="question.flag === 0">
			<view>
				<view class="data-label" v-for="(item,index) in question.data">
					<view style="padding-top: 4rpx; display: flex;">
						<view class="data-radio"></view>
						<input type="text" v-model="item.name" style="color: #606266;  font-size: 28rpx;" placeholder="选项"/>
					</view>
					<view style="display: flex;">
						<u-icon name="minus" color="#22CDEE" style="padding-right: 10rpx;" @click="delItem(index)"></u-icon>
						<u-icon name="plus" color="#22CDEE" @click="addItem(index)"></u-icon>
					</view>
				</view>
			</view>
		</view>
		<!-- 多选题 -->
		<view class="data" v-else-if="question.flag === 1">
			<view>
				<view class="data-label" v-for="(item,index) in question.data">
					<view style="padding-top: 4rpx; display: flex;">
						<view class="data-checkbox"></view>
						<input type="text" v-model="item.name" style="color: #606266;  font-size: 28rpx;" placeholder="选项"/>
					</view>
					<view style="display: flex;">
						<u-icon name="minus" color="#22CDEE" style="padding-right: 10rpx;" @click="delItem(index)"></u-icon>
						<u-icon name="plus" color="#22CDEE" @click="addItem(index)"></u-icon>
					</view>
				</view>
			</view>
		</view>
		<!-- 简答题 -->
		<view class="data" v-else-if="question.flag === 2">
			<u-input
				border="surround"
			    v-model="question.data[0].name"
			  ></u-input>
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
			}
		},
		data() {
			return {
				// 右上角角标 是否显示
				show: false,
				
				// 题目类型 数组
				flagList: [
					'单选题',
					'多选题',
					'问答题'
				]
			};
		},
		methods: {
			getDefaultItem(){
				// 函数 返回值 实现 深拷贝
				// 返回一个 默认选项
				let dm = {
					name: '',
					selected: false
				}
				return dm
			},
			showFlag(){
				this.show = !this.show
			},
			setFlag(index){
				// 更改 题目类型
				this.showFlag()
				if(this.question.flag === index) return
				this.question.data.splice(0, this.question.data.length)
				this.question.data.push(this.getDefaultItem())
				this.question.flag = index
			},
			delItem(index){
				// 删除选项
				// 至少存在一个选项
				if(this.question.data.length === 1){
					uni.showToast({
						title: '至少一个选项',
						icon: 'error',
						position: 'top',
						duration: 2000
					})
					return
				}
				this.question.data.splice(index, 1)
			},
			addItem(index){
				// 增加选项
				this.question.data.splice(index + 1, 0, this.getDefaultItem())
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
	.item-descr{
		color: #98A1BB;
		font-size: 1rem;
		margin-left: 40rpx;
	}
	.data{
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
	.data-label{
		display: flex;
		margin-bottom: 20rpx;
		justify-content: space-between;
	}
	.data-radio{
		border: 1px solid #d1d1d1;
		width: 28rpx;
		height: 28rpx;
		border-radius: 50%;
		margin-right: 10rpx;
	}
	.data-checkbox{
		border: 1px solid #d1d1d1;
		width: 28rpx;
		height: 28rpx;
		border-radius: 5rpx;
		margin-right: 10rpx;
	}
</style>