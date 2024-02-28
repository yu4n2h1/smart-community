<template>
	<u-search placeholder="要查询的关键字" v-model="keyword" @search="search"></u-search>
	<PostCard v-for="feedback in feedbackList2" :key=feedback.id :feedback="feedback" @searchTag="searchTag"></PostCard>
	<u-loadmore :status="status" />
</template>

<script>
	import PostCard from "../../components/postCard.vue"
	import config from "../../system.config.js"
	import {
		setLocalData
	} from "../../utils/cache"
	import {
		getFeedbackByKeyword,
		getFeedback
	} from "../../api/feedback.js"
	export default {
		data() {
			return {
				// 搜索关键字
				keyword: "",
				//反馈列表
				feedbackList2: [],
				//当前u-loadmore状态
				status: 'loadmore',
				//查询状态
				column: "",
				//分页

				page: {
					current: 1,
					size: 30
				},
				mored: false
			}
		},
		components: {
			PostCard
		},
		methods: {
			getList() {
				return new Promise((promise, reject) => {
					getFeedbackByKeyword({
						column: this.column,
						value: this.keyword,
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
				if (this.mored) {
					uni.navigateTo({
						url: '/pages/feedback/feedbackCreate'
					})
				}
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
					url: `/pages/feedback/feedbackSearch?column=keyword&value=${keyword}&current=1&size=${this.page.size}`
				})
			},
			searchTag(keyword) {
				if (this.column == "tag") {
					return;
				}
				uni.navigateTo({
					url: `/pages/feedback/feedbackSearch?column=tag&value=${keyword}&current=1&size=${this.page.size}`
				})
			},
			//加载逻辑，缓存机制待完成
			load() {
				this.getList().then(data => {
					this.feedbackList2.push(...data)
					console.log(this.feedbackList2)
				}).catch(err => {
					this.status = "nomore"
				})
			}

		},
		onLoad(option) {
			this.page.current = option.current
			this.page.size = option.size
			this.keyword = option.value
			this.column = option.column
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

<style>

</style>