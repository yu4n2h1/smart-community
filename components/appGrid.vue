<template>
	<view class="content">
		<view class="tit">{{title}}</view>
		<view class="lst">
			<view class="itm" v-for="(item,index) in appList">
				<!-- 
					原样式
					<view class="itm-icon" :style="[{backgroundColor: bgcolors[index%8]}]">
				 -->
				<view class="img_sty" :style="cssItems[index%8]">
					<image :src="item.icon" mode="" @click="jump(item.url)"></image>
				</view>
				<text>{{item.name}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"appGrid",
		props: {
			title: {
				type: String,
				default: '功能列表'
			},
			appList: {
				type: Array,
				default: () =>[
					{
						name: '默认应用',
						icon: '',
						url: ''
					},
					{
						 name: '默认应用',
						 icon: '',
						 url: ''
					},
					{
						 name: '默认应用',
						 icon: '',
						 url: ''
					},
					{
						 name: '默认应用',
						 icon: '',
						 url: ''
					},
					{
						 name: '默认应用',
						 icon: '',
						 url: ''
					},
					{
						 name: '默认应用',
						 icon: '',
						 url: ''
					},
					{
						 name: '默认应用',
						 icon: '',
						 url: ''
					},
					{
						 name: '默认应用',
						 icon: '',
						 url: ''
					}
				]
			}
		},
		data() {
			return {
				bgcolors: [
					'#768BFF',
					'#FFC460',
					'#FC697B',
					'#15FDF4',
					'#0FD7FF',
					'#DF87FD',
					'#53FFC0',
					'#6CA0FC'
				],
				cssItems: [
					{"filter": "drop-shadow(0px 3px 6px rgba(166, 133, 241, 0.502))", "background": "linear-gradient(142.24deg, #768BFF 14.61%, #776AFF 43.6%, #7838FF 87.37%)"},
					{"filter": "drop-shadow(0px 3px 6px rgba(254, 184, 131, 0.502))", "background": "linear-gradient(140.69deg, #FFC460 14.81%, #FF8531 87.27%)"},
					{"filter": "drop-shadow(0px 3px 6px rgba(253, 134, 175, 0.502))", "background": "linear-gradient(140.69deg, #FC697B 14.81%, #FC3F83 87.27%)"},
					{"filter": "drop-shadow(0px 3px 6px rgba(39, 224, 223, 0.502))", "background": "linear-gradient(140.69deg, #15FDF4 14.81%, #00DBED 87.27%)"},
					{"filter": "drop-shadow(0px 3px 6px rgba(32, 190, 253, 0.502))", "background": "linear-gradient(140.69deg, #0FD7FF 14.81%, #00B1FD 87.27%)"},
					{"filter": "drop-shadow(0px 3px 6px rgba(193, 141, 240, 0.502))", "background": "linear-gradient(140.69deg, #DF87FD 14.81%, #A048F8 87.27%)"},
					{"filter": "drop-shadow(0px 3px 6px rgba(47, 207, 159, 0.502))", "background": "linear-gradient(140.69deg, #53FFC0 14.81%, #17E083 87.27%)"},
					{"filter": "drop-shadow(0px 3px 6px rgba(123, 152, 252, 0.502))", "background": "linear-gradient(140.69deg, #6CA0FC 14.81%, #335CFA 87.27%)"},
				]
			};
		},
		methods: {
			jump(url){
				uni.navigateTo({
					url,
				})
			}
		}
	}
</script>

<style>
	.content{
		background-color: #fff;
		border-radius: 15rpx;
		margin: 10rpx 20rpx;
		padding-bottom: 40rpx;
	}
	.tit{
		font-size: 1rem;
		padding: 30rpx 15rpx 15rpx 15rpx;
		color: #98A1BB;
	}
	.lst{
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr;
	}
	.itm{
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 20rpx 15rpx;
	}
	.itm-icon image{
		width: 50rpx;
		height: 50rpx;
	}
	.itm-icon{
		background-color: #768BFF;
		width: 90rpx;
		height: 90rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 15rpx;
	}
	.itm text{
		font-size: 0.8rem;
		padding-top: 10rpx;
	}
	.img_sty {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100rpx;
		height: 100rpx;
		border-radius: 50rpx 50rpx 50rpx 50rpx ;
	}
	.img_sty image{
		width: 50rpx;
		height: 50rpx;
	}
</style>