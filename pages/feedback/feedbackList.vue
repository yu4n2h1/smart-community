<!-- 
	反馈内容列表
	
	TODO: 缓存机制
 -->

<template>
	<PostCard v-for="feedback in feedbackList" :key=feedback.id :feedback="feedback"></PostCard>
	<u-loadmore :status="status" />
	<view class="btn" @click="mored = !mored">
		<view class="btn-icon" :style="[{transform: mored?'scale(0.8)':'scale(1)'}]">
			<u-icon name="grid-fill" color="#fff" size="80rpx"></u-icon>
		</view>
		<view style="position: relative;">
			<view class="btn-icon-otr" :style="[{top: mored?'-180rpx':'-100rpx', 
					left: mored?'-80rpx':'0rpx', 
					transform: mored?'scale(0.8)':'scale(0)', 
					backgroundColor: mored?'#768BFF':'transparent'
					}]">
				<u-icon name="plus" color="#fff" size="60rpx" @click="addItem()"></u-icon>
			</view>
		</view>
	</view>
</template>

<script>
	import PostCard from "../../components/postCard.vue"
	import config from "../../system.config.js"
	import {
		setLocalData
	} from "../../utils/cache"
	export default {
		data() {
			return {
				//旧feedback列表
				oldFeedbackList: [],
				//新的
				feedbackList: [],
				//当前u-loadmore状态
				status: 'loadmore',
				//初始列表数量
				num: 30,
				mored: false
			}
		},
		components: {
			PostCard
		},
		methods: {
			getList() {
				const url = config.developUrl + "/feedback/findPreviousByFid"

				return new Promise((promise, reject) => {
					uni.request({
						url: url,
						data: {
							num: this.num
						},
						success: (res) => {
							this.oldFeedbackList = this.feedbackList
							res.data.forEach(feedback => {
								let date = new Date(feedback.createTime)
								feedback.createTime =
									`${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
								if (feedback.picture) {
									let pictureList = feedback.picture.split(",")
									feedback.picture = pictureList.map(url => config.fileUrl +
										"/feedback/img/" + url)
								}
							})
							this.feedbackList = res.data
							promise("success")
						},
						fail: (err) => {
							reject("err")
						}
					})
				})

			},
			addItem() {
				if (this.mored) {
					uni.navigateTo({
						url: '/pages/feedback/feedbackCreate'
					})
				}
			},

			//加载逻辑，缓存机制待完成
			load() {
				this.getList().then(res => {
					if (this.feedbackList.length == this.oldFeedbackList.length) {
						this.status = 'nomore';
					}
				}).catch((err) => {
					this.status = 'nomore';
				})
			}

		},
		// onLoad() {
		// 	this.load()
		// },
		onShow() {
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 0
			})
			this.load()
		},
		onReachBottom() {
			if (this.feedbackList.length == this.oldFeedbackList.length) {
				this.status = 'nomore';
			};
			this.status = 'loading';
			setTimeout(() => {
				this.num += 30
				this.getList().then(res => {
					if (this.feedbackList.length == this.oldFeedbackList.length) {
						this.status = 'nomore';
					} else this.status = 'loading';
				}, 2000).catch(() => {
					this.status = 'nomore'
				})
			})
		}
	}
</script>

<style scoped>
	.btn {
		position: fixed;
		top: 80%;
		left: 80%;
		width: 100rpx;
		height: 100rpx;
	}

	.btn-icon {
		width: 100rpx;
		height: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #22cdee;
		border-radius: 50%;
		transition: 0.5s ease all;
	}

	.btn-icon-otr {
		width: 100rpx;
		height: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #22cdee;
		border-radius: 50%;
		transition: 0.5s ease all;
		position: absolute;
		left: 0rpx;
	}
</style>