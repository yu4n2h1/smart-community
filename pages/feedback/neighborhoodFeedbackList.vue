<!-- 
	小区反馈内容列表
	
	TODO: 缓存机制
 -->

<template>
	<u-search placeholder="要查询的关键字" v-model="keyword" @search="search" :show-action="false"></u-search>
	<PostCard v-for="feedback in feedbackList" :key=feedback.id :feedback="feedback" @searchTag="searchTag"></PostCard>
	<u-loadmore :status="status" />
	<view class="btn">
		<view class="btn-icon">
			<u-icon name="plus" color="#fff" size="70rpx" @click="addItem()"></u-icon>
		</view>
	</view>
</template>

<script>
	import PostCard from "../../components/postCard.vue"
	import config from "../../system.config.js"
	import {
		getUserToken
	} from "../../utils/token.js"
	import {
		getFeedbackByKeyword,
		getFeedback
	} from "./api/neighborhoodFeedback.js"
	import {
		getLocalData
	} from "../../utils/cache"
	export default {
		data() {
			return {
				// 搜索关键字
				keyword: "",
				//反馈列表
				feedbackList: [],
				//当前u-loadmore状态
				status: 'loadmore',
				//分页
				page: {
					current: 1,
					size: 30
				}
			}
		},
		components: {
			PostCard
		},
		methods: {
			getList() {
				return new Promise((promise, reject) => {
					getFeedback({
						current: this.page.current,
						size: this.page.size
					}).then(data => {
						if (data.size == 0) {
							reject("empty")
						} else {
							promise(this.handleFeedback(data.list))
						}
					}).catch(err => {
						reject(err)
					})
				})
			},
			addItem() {
				uni.navigateTo({
					url: '/pages/feedback/neighborhoodFeedbackCreate'
				})
			},
			//处理feedback
			handleFeedback(feedbackList) {
				feedbackList.forEach(feedback => {
					let date = new Date(feedback.createTime)
					feedback.createTime =
						`${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
					if (feedback.picture) {
						let pictureList = feedback.picture.split(",")
						feedback.picture = pictureList.map(url => config.fileUrl +
							"/feedback/img/" + url)
					}
				})
				return feedbackList

			},
			//搜索
			search(keyword) {
				uni.navigateTo({
					url: `/pages/feedback/neighborhoodFeedbackSearch?column=keyword&value=${keyword}&current=1&size=${this.page.size}`
				})
			},
			//按照Tag搜索
			searchTag(keyword) {
				uni.navigateTo({
					url: `/pages/feedback/neighborhoodFeedbackSearch?column=tag&value=${keyword}&current=1&size=${this.page.size}`
				})
			},
			//加载逻辑，缓存机制待完成
			load() {
				this.getList().then(data => {
					this.feedbackList.push(...data)
				}).catch(err => {
					this.status = "nomore"
				})
			}
		},

		onShow() {
			this.feedbackList = []
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 0
			})
			this.load()
		},
		onReachBottom() {
			this.status = 'loading';
			setTimeout(() => {
				this.page.current++
				this.load()
			}, 1000)
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