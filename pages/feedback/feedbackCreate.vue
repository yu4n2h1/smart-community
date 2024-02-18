<template>
  <u-form label-position="up" ref="form1" :model="feedback">
    <u-form-item label="问题和意见" label-width="80" prop="content" border-bottom ref="item1">
      <u-textarea v-model="feedback.content" placeholder="请输入内容" count></u-textarea>
    </u-form-item>

    <u-form-item label="联系方式(可选)" label-width="130" prop="phone" border-bottom ref="item1">
      <u-input v-model="feedback.phone" border="surround"></u-input>
    </u-form-item>
  </u-form>
  <optionalTag></optionalTag>
  <u-button type="primary" text="提交" customStyle="margin-top: 20px" class="btn" @click="submit"></u-button>
  <u-button type="error" text="重置" customStyle="margin-top: 10px" class="btn" @click="reset"></u-button>
</template>




<script>
	import optionalTag from '../../components/optionalTag.vue'
	export default {
		data() {
			return {
				feedback: {
					phone: "",
					content: ""
				},
				rules: {
					'content': {
						type: 'string',
						required: true,
						message: '请填写反馈内容，不少于10字',
						min: 10,
						trigger: ['blur', 'change']
					},
				},
				radio: '',
				switchVal: false
			};
		},
		components: {
			optionalTag
		},
		onReady() {
			// 如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则
			this.$refs.form1.setRules(this.rules)
		},
		methods: {
			submit() {
				// 如果有错误，会在catch中返回报错信息数组，校验通过则在then中返回true
				this.$refs.form1.validate().then(res => {
					uni.$u.toast('校验通过')
				}).catch(errors => {
					uni.$u.toast('校验失败')
				})
			},
			reset() {
				const validateList = ['feedback.content', 'feedback.phone']
				this.$refs.form1.resetFields()
				this.$refs.form1.clearValidate()
				setTimeout(() => {
					this.$refs.form1.clearValidate(validateList)
					// 或者使用 this.$refs.form1.clearValidate()
				}, 10)
			},

		}
	};
</script>

<style scoped>
	.btn {
		background-color: #22CDEE;
		color: #fff;
		width: 300rpx;
		height: 70rpx;
		margin: auto;
		margin-bottom: 20rpx;
		border-radius: 10rpx;
		font-size: 0.9rem;
		line-height: 70rpx;
	}
.custom-form {
  margin: 20rpx; /* 设置整个表单的外边距，留出一定空隙 */
}

.form-item {
  margin-bottom: 20rpx; /* 设置每个表单项的下边距，留出一定空隙 */
}

.label {
  width: 130rpx; /* 设置标签的宽度 */
  font-size: 28rpx; /* 设置标签的字体大小 */
  color: #333; /* 设置标签的文字颜色 */
}

.custom-textarea,
.custom-input {
  width: 100%; /* 设置文本框的宽度，充满整个表单项 */
  padding: 10rpx; /* 设置文本框的内边距，增加一定的填充 */
  border: 1rpx solid #ccc; /* 设置文本框的边框样式 */
  border-radius: 5rpx; /* 设置文本框的边框圆角 */
  font-size: 28rpx; /* 设置文本框的字体大小 */
}
</style>