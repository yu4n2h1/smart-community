<template>
	<view style="background-color: #e6e6e6; height: 100vh;">
		<view style="display: flex; flex-direction: row; align-items: center; margin-bottom: 10px;" class="top-block">
			<view>
				<up-image :show-loading="true" style="margin-left: 15px; margin-right: 15px;"
					src="../../static/img/logo.png" width="130rpx" height="130rpx" @click="click"
					shape="circle"></up-image>
			</view>
			<view>
				<text style="color: white; font-size: 25px;">嘎嘎</text>
			</view>
			<view style="margin-left: auto;">
				<u-icon name="arrow-right"></u-icon>
			</view>
		</view>
		<view style="">
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

			<view style="display: flex; justify-content: center; margin-top: 15px;">
				<view class="line-block">

					<view style="border-bottom: 1px solid #ccc; padding: 20px;">
						<text style="display: inline-block; float: left;">设置</text>
						<u-icon name="arrow-right" style="display: inline-block; float: right;"></u-icon>
					</view>
				</view>
			</view>
		</view>
	</view>

</template>

<style lang="scss">
	.line-block {
		display: flex;
		flex-direction: column;
		justify-content: center;
		// align-items: center;
		border-radius: 15px;
		/* 调整圆角的大小 */
		overflow: hidden;
		/* 防止子元素溢出圆角区域 */
		// background-color: #FFFFFF; /* 设置背景色 */
		width: 96%;
		/* 设置宽度 */
		background-color: rgba(255, 255, 255, 0.8);
		/* 设置透明度为0.8的白色背景 */

	}

	.top-block {
		width: 100%;
		height: 205px;
		background: linear-gradient(to bottom, #87CEEB, #ADD8E6, #B0E0E6, #B0E0E6, #CAE1FF);
		border-bottom-left-radius: 20px;
		border-bottom-right-radius: 20px;
	}
</style>

<script setup>
	<< << << < HEAD
</script>
=======
</script>
>>>>>>> 4dab9d0796022fc98c729c5bf9c33733be1c5a05