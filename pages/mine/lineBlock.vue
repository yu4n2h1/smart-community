<template>
	<view style="display: flex; justify-content: center;">
		<view class="line-block">
			<view style="border-bottom: 1px solid #ccc; padding: 20px;">
				<text style="display: inline-block; float: left;">我的信息</text>
				<u-icon name="arrow-right" style="display: inline-block; float: right;"></u-icon>
			</view>
			
			<view style="border-bottom: 1px solid #ccc; padding: 20px;">
				<text style="display: inline-block; float: left;">维修记录</text>
				<u-icon name="arrow-right" style="display: inline-block; float: right;"></u-icon>
			</view>
			
			<view style="border-bottom: 1px solid #ccc; padding: 20px;">
				<text style="display: inline-block; float: left;">投诉建议</text>
				<u-icon name="arrow-right" style="display: inline-block; float: right;"></u-icon>
			</view>
			
			<view style="border-bottom: 1px solid #ccc; padding: 20px;">
				<text style="display: inline-block; float: left;">我的房产</text>
				<u-icon name="arrow-right" style="display: inline-block; float: right;"></u-icon>
			</view>				
		</view>
	</view>
	<!-- 信息列表2 -->
	<view style="display: flex; justify-content: center; margin-top: 15px;">
		<view class="line-block">
			<view style="border-bottom: 1px solid #ccc; padding: 20px;">
				<text style="display: inline-block; float: left;">设置</text>
				<u-icon name="arrow-right" style="display: inline-block; float: right;"></u-icon>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss">
	.line-block {
	    display: flex;
	    flex-direction: column;
	    justify-content: center;
	    // align-items: center;
	    border-radius: 15px; /* 调整圆角的大小 */
	    overflow: hidden; /* 防止子元素溢出圆角区域 */
	    // background-color: #FFFFFF; /* 设置背景色 */
	    width: 96%; /* 设置宽度 */
		background-color: rgba(255, 255, 255, 0.8); /* 设置透明度为0.8的白色背景 */
		
	}
</style>