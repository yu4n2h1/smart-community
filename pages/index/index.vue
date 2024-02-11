<template>
	<search></search>
	<swiperView></swiperView>
	<view style="margin-top: 2%;margin-bottom: 2%; display: flex;justify-content: center;">
		<homeTabBar></homeTabBar>
	</view>
	<bulletin></bulletin>
</template>

<script setup>
	import homeTabBar from "@/pages/index/homeTabBar.vue"
	import search from "@/pages/index/search.vue"
	import swiperView from "@/pages/index/swiperView.vue"
	import bulletin from '/pages/index/bulletin.vue'
</script>

<style>

</style>