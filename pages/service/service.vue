<template>
	<view style="display: flex; flex-direction: column; background-color: #e6e6e6; height: 100vh;">
		<!-- 用过 -->
		<app-grid title="推荐应用" :appList="appList"></app-grid>
		<!-- 推荐 -->
		<app-grid title=""></app-grid>
		<!-- 默认 -->
		<app-grid></app-grid>
	</view>
</template>

<script>
	import appGrid from '../../components/appGrid.vue'
	import {setLocalData, getLocalData} from '../../utils/cache.js'
	export default {
		components: {
			appGrid,
		},
		data() {
			return {
				appList: [
					{
						name: '问卷填写',
						icon: '/static/img/question.png',
						url: '/pages/questionnaire/questionnaireList'
					},
					{
						name: '问卷管理',
						icon: '/static/img/question.png',
						url: '/pages/questionnaire/questionnaireAdminList'
					},
					{
						name: '居民诉求',
						icon: '/static/img/like.png',
						url: '/pages/feedback/feedbackList'
					},
					{
						name: '点',
						icon: '/static/img/like.png',
						url: '/pages/index/index'
					},
					{
						name: '点赞',
						icon: '/static/img/like.png',
						url: '/pages/index/index'
					},
					{
						name: '点赞加',
						icon: '/static/img/like.png',
						url: '/pages/index/index'
					},
					{
						name: '点赞加关',
						icon: '/static/img/like.png',
						url: '/pages/index/index'
					},
					{
						name: '点赞加关注',
						icon: '/static/img/like.png',
						url: '/pages/index/index'
					},
					{
						name: '点赞加关注点',
						icon: '/static/img/like.png',
						url: '/pages/index/index'
					},
					{
						name: '点赞加关注点赞',
						icon: '/static/img/like.png',
						url: '/pages/index/index'
					},
					
				]
			}
		},
		methods: {
			
		},
		onLoad() {
			if(!getLocalData('user-token')){				
				setLocalData('user-token', {
					id: 0,
					username: 'admin',
					password: '123'
				})
			}
			console.log('设置测试用户');
			console.log(getLocalData('user-token'), 'admin');
		}
	}
</script>

<style>

</style>
