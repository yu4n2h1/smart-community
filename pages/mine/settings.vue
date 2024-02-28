<template>
	<u-cell-group>
		<u-cell title="退出登录" :isLink="true" @click="logout"></u-cell>
	</u-cell-group>
</template>

<script setup>
	const logout = () => {
		uni.removeStorageSync("token")
		uni.navigateBack({delta:1})
		uni.showToast({
			title: "退出登录成功"
		})
	}
</script>

<style>

</style>