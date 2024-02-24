<!-- 
 
	可选标签组件
	
	简介：
		选择框 + 标签名字
		选中时 标签名字 下方 弹出 标签详细介绍
	
	使用：
		title 绑定 左上角 小标题
		tags 绑定 标签数组 存储 标签名字 和 标签介绍
		v-model 绑定 当前选中的 标签名字
	
	TODO:
		允许多选
		
 -->
<template>
	<view class="content">
		<view class="title">
			{{title}}
		</view>
		<view class="item-flex">
			<view class="item" v-for="(item,index) in tags" :key="index">
				<view class="item-name">
					<view class="item-name-sel" @click="showDescr(index)">
						<view class="item-name-sel-on" :style="[{backgroundColor: show[index]?'#9d9d9d':'#fff'}]"></view>
					</view>
					<view class="item-name-text">
						{{item.name}}
					</view>
				</view>
			</view>
		</view>
		<view class="item-descr" v-if="curDescr != ''">
			<view>					
				{{curDescr}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"optionalTag",
		props: {
			// 标签 数组
			tags: {
				type: Array,
				default: () =>[
					{
						name: '默认标签111111',
						// descr 可以为空
						descr: '标签111111111111111111111111111111是一种用来描述业务实体特征的数据形式'
					},
					{
						name: '默认标签2',
						descr: '标签2是一种用来描述业务实体特征的数据形式'
					},
					{
						name: '默认标签3',
						descr: '标签3是一种用来描述业务实体特征的数据形式'
					},
					{
						name: '默认标签4',
						descr: '标签4是一种用来描述业务实体特征的数据形式'
					},
					{
						name: '默认标签5',
						descr: '标签5是一种用来描述业务实体特征的数据形式'
					},
					{
						name: '默认标签6',
						descr: '标签6是一种用来描述业务实体特征的数据形式'
					}
				]
			},
			// 标题
			title: String,
			// 返回值
			modelValue: String
		},
		emits: [
			'update:modelValue'
		],
		data() {
			return {
				// 控制介绍 显示 的 数组 
				show: [],
				// 记录 上次选中 的 标签
				last: 0,
				// 当前显示 的 介绍
				curDescr: ''
			};
		},
		onLoad() {
			this.load()
		},
		methods: {
			load(){
				// 初始化
				for(let i in this.tags)
					this.show.push(0)
			},
			showDescr(index){
				this.show[this.last] = 0
				this.show[index] = 1
				this.last = index
				this.$emit("update:modelValue", this.tags[index].name)
				this.curDescr = this.tags[index].descr
			}
		}
	}
</script>

<style scoped>
	.content{
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 10rpx 0;
	}
	.title{
		font-size: 1rem;
		color: #98A1BB;
		padding: 10rpx  20rpx;
	}
	.item-flex{
		display: flex;
		flex-wrap: wrap;
		justify-content: start;
	}
	.item{
		display: flex;
		flex-direction: column;
		margin: 20rpx;
	}
	.item-name{
		display: flex;
		align-items: center;
	}
	.item-name-sel{
		width: 40rpx;
		height: 40rpx;
		border-radius: 50%;
		border: 1px solid #98A1BB;
		margin-right: 20rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.item-name-sel-on{
		width: 30rpx;
		height: 30rpx;
		border-radius: 50%;
		transform: scale(0.8);
	}
	.item-name-text{
		font-size: 1rem;
		display: flex;
		align-items: center;
	}
	.item-descr{
		font-size: 0.9rem;
		color: #4d525f;
		margin: 10rpx 20rpx;
		padding: 15rpx;
		border-radius: 10rpx;
		background-color: rgba(206, 206, 206, 0.5);
	}
</style>