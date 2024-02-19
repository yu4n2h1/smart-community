<template>

	<u-form label-position="up" ref="form1" :model="feedback">
		<u-form-item label="问题和意见" label-width="100" prop="comment" border-bottom ref="item1">
			<u-textarea v-model="feedback.comment" placeholder="请输入内容" count></u-textarea>
		</u-form-item>

		<u-form-item label="联系方式(可选)" label-width="130" prop="phone" border-bottom ref="item1">
			<u-input v-model="feedback.phone" border="surround"></u-input>
		</u-form-item>
	</u-form>
	<optionalTag @update:modelValue="handlea"></optionalTag>
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
					comment: "",
					tag: ""
				},
				rules: {
					'comment': {
						type: 'string',
						required: true,
						message: '请填写反馈内容，不少于10字',
						min: 10,
						trigger: ['blur', 'change']
					},
					'tag':{
						type: 'string',
						required: true,
						trigger: ['blur', 'change']
					}
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
					const baseURL = "http://localhost:8080/feedback";
					uni.request({
						url: baseURL + "/save",
						data: {
							uid: 222,
							comment: this.feedback.comment,
							phone: this.feedback.phone,
							tag: this.feedback.tag
						},
						header: {
							'Content-Type': 'application/json;charset=UTF-8'
						},
						method: "POST",
						success: (res) => {
							if (res.data == true) {
								uni.$u.toast('发送成功，感谢您的反馈');

								setTimeout(() => {
									uni.navigateBack({
										delta: 1
									})
								}, 1000)
							} else {
								uni.$u.toast("发送失败")
							}
						},
						fail: (res) => {
							uni.$u.toast("发送失败");
						}
					})

				}).catch(errors => {
					uni.$u.toast('发送失败')
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
			handlea(value) {
				this.feedback.tag = value;
			}

		}
	}
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
</style>