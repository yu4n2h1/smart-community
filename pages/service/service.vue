<template>
	<view style="display: flex; flex-direction: column; background-color: #e6e6e6; height: 100vh;">
		<app-grid title="社区板块" :appList="appList"></app-grid>
		<app-grid title="小区板块" :app-list="list2"></app-grid>
		<app-grid title="生活服务" :app-list="list3"></app-grid>
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
						icon: '/static/img/homeBar/Residents_demands.png',
						url: '/pages/feedback/feedbackList'
					},
					{
						name: '基础信息',
						icon: '/static/img/homeBar/Community_Information.png',
						url: '/pages/index/index'
					},
					{
						name: '人口报备',
						icon: '/static/img/homeBar/Population_reporting.png',
						url: '/pages/index/index'
					},
					{
						name: '公告通知',
						icon: '/static/img/homeBar/Announcement_Notice.png',
						url: '/pages/notice/notice?categoryType=公告通知'
					},
					{
						name: '政务发布',
						icon: '/static/img/homeBar/Chief.png',
						url: '/pages/notice/notice?categoryType=政务发布'
					}
				],
				list2 : [
					{
						name: '小区信息',
						icon: '/static/img/like.png',
						url: '/pages/index/index'
					},
					{
						name: '物业公司',
						icon: '/static/img/like.png',
						url: '/pages/index/index'
					},
					{
						name: '业委员会信息',
						icon: '/static/img/like.png',
						url: '/pages/index/index'
					},
					{
						name: '业主委员会公告',
						icon: '/static/img/like.png',
						url: '/pages/index/index'
					},
					{
						name: '业主诉求',
						icon: '/static/img/homeBar/Owner_Appeal.png',
						url: '/pages/index/index'
					},
				],
				list3 : [
					{
						name: '团购',
						icon: '/static/img/homeBar/Buy.png',
						url: '/pages/index/index'
					},
					{
						name: '便民组织',
						icon: '/static/img/homeBar/Convenient_service.png',
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
					id: "0",
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
