<template>
	<view class="W">
		<view class="content">
			<view class="title">填写人信息</view>
			<view class="form">
				<!-- 注意，如果需要兼容微信小程序，最好通过setRules方法设置rules规则 -->
				<u--form
					labelPosition="left"
					:model="model1"
					ref="form1"
				>
				<u-form-item
					labelWidth="80"
					label="人员类别"
					prop="userInfo.type"
					borderBottom="true"
					@click="showType = true; hideKeyboard()"
					ref="item1"
				>
					<u--input
						placeholder="人员类别"
						v-model="model1.userInfo.type"
						disabled
						disabledColor="#ffffff"
						border="none"
					></u--input>
					<u-icon
						slot="right"
						name="arrow-right"
					></u-icon>
				</u-form-item>
					<u-form-item
						label="姓名"
						prop="userInfo.name"
						borderBottom="true"
						ref="item1"
					>
						<u--input
							v-model="model1.userInfo.name"
							border="none"
							placeholder="姓名"
						></u--input>
					</u-form-item>
					<u-form-item
						label="身份证号码"
						labelWidth="90"
						prop="userInfo.number"
						borderBottom="true"
						ref="item1"
					>
						<u--input
							v-model="model1.userInfo.number"
							border="none"
							placeholder="身份证号码"
						></u--input>
					</u-form-item>
					<u-form-item
						label="性别"
						prop="userInfo.sex"
						borderBottom="true"
						@click="showSex = true; hideKeyboard()"
						ref="item1"
					>
						<u--input
							v-model="model1.userInfo.sex"
							disabled
							disabledColor="#ffffff"
							placeholder="性别"
							border="none"
						></u--input>
						<u-icon
							slot="right"
							name="arrow-right"
						></u-icon>
					</u-form-item>
					<u-form-item
						labelWidth="90"
						label="居住地路名"
						prop="userInfo.location"
						borderBottom="true"
						ref="item1"
					>
						<u--input
							v-model="model1.userInfo.location"
							border="none"
							placeholder="居住地路名"
						></u--input>
					</u-form-item>
					<u-form-item
						labelWidth="90"
						label="居住地详址"
						prop="userInfo.address"
						borderBottom="true"
						ref="item1"
					>
						<u--input
							v-model="model1.userInfo.address"
							border="none"
							placeholder="居住地址号室"
						></u--input>
					</u-form-item>
					<u-form-item
						labelWidth="80"
						label="居住事由"
						prop="userInfo.reason"
						borderBottom="true"
						@click="showReason = true; hideKeyboard()"
						ref="item1"
					>
						<u--input
							v-model="model1.userInfo.reason"
							disabled
							disabledColor="#ffffff"
							placeholder="请选择"
							border="none"
						></u--input>
						<u-icon
							slot="right"
							name="arrow-right"
						></u-icon>
					</u-form-item>
					<u-form-item
						label="手机号码"
						labelWidth="80"
						prop="userInfo.phone"
						borderBottom="true"
						ref="item1"
					>
						<u--input
							v-model="model1.userInfo.phone"
							border="none"
							placeholder="手机号码"
						></u--input>
					</u-form-item>
				</u--form>
				<u-action-sheet
					:show="showType"
					:actions="typeActions"
					@close="showType = false"
					@select="typeSelect"
				>
				</u-action-sheet>
				<u-action-sheet
					:show="showSex"
					:actions="sexActions"
					@close="showSex = false"
					@select="sexSelect"
				>
				</u-action-sheet>
				<u-action-sheet
					:show="showReason"
					:actions="reasonActions"
					@close="showReason = false"
					@select="reasonSelect"
				>
				</u-action-sheet>
			</view>
			<view class="title">材料信息</view>
			<u-upload 
				class="upload"
				label="图片上传" 
				:fileList="fileList1" 
				@afterRead="afterRead" 
				@delete="deletePic" 
				name="1" 
				multiple
				:maxCount="6">
			</u-upload>
		</view>
		<button class="btn" @click="submit">提交</button>
	</view>
</template>

<script>
	import config from '../../system.config.js'
	import { addPopulationReport } from "../../api/populationReport.js"
import { getLocalData } from '../../utils/cache.js';
	export default {
		data() {
			return {
				fileList1: [],
				disabled1: false,
				tips: '',
				value: '',
				model1: {
					// 用于提交的表单信息
					userInfo: {
						type: '1',
						name: '小黑黑',
						number: "370882202402265362",
						sex: '男',
						location: "山东科技大学",
						address: "小树林",
						reason: "求学暂住",
						phone: "18573248848",
						// uuidName数组
						pictures: []
					}
				},
				showSex: false,
				showType: false,
				showReason: false,
				typeActions: [{
						name: '户籍人员',
					},
					{
						name: '非户籍人员',
					}
				],
				sexActions: [{
						name: '男',
					},
					{
						name: '女',
					}
				],
				reasonActions: [{
						name: '工作暂住',
					},
					{
						name: '求学暂住',
					},
					{
						name: '购房常住',
					}
				],
				rules: {
					'userInfo.name': [{
						type: 'string',
						max: 127,
						required: true,
						message: '请填写姓名',
						trigger: ['blur', 'change']
					}, {
						// 此为同步验证，可以直接返回true或者false，如果是异步验证，稍微不同，见下方说明
						validator: (rule, value, callback) => {
							// 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
							return uni.$u.test.chinese(value);
						},
						message: "姓名必须为中文字符",
						// 触发器可以同时用blur和change，二者之间用英文逗号隔开
						trigger: ["change", "blur"],
					}],
					'userInfo.number': [{
						type: 'string',
						required: true,
						message: '请填写身份证号',
						trigger: ['blur', 'change']
					}, {
						// 此为同步验证，可以直接返回true或者false，如果是异步验证，稍微不同，见下方说明
						validator: (rule, value, callback) => {
							// 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
							return uni.$u.test.idCard(value);
						},
						message: "请输入正确的身份证号",
						// 触发器可以同时用blur和change，二者之间用英文逗号隔开
						trigger: ["change", "blur"],
					}],
					'userInfo.sex': {
						type: 'string',
						required: true,
						message: '请选择男或女',
						trigger: ['blur', 'change']
					},
					'userInfo.type': {
						type: 'string',
						required: true,
						message: '请选择人员类别',
						trigger: ['blur', 'change']
					},
					'userInfo.location': {
						type: 'string',
						required: true,
						message: '请填写居住地路名',
						trigger: ['blur', 'change']
					},
					'userInfo.address': {
						type: 'string',
						required: true,
						message: '请选择详细地址',
						trigger: ['blur', 'change']
					},
					'userInfo.reason': {
						type: 'string',
						required: true,
						message: '请选择居住事由',
						trigger: ['blur', 'change']
					},
					'userInfo.phone': [{
						type: 'string',
						required: true,
						message: '请填写手机号码',
						trigger: ['blur', 'change']
					}, {
						// 此为同步验证，可以直接返回true或者false，如果是异步验证，稍微不同，见下方说明
						validator: (rule, value, callback) => {
							// 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
							return uni.$u.test.mobile(value);
						},
						message: "请输入正确的手机号码",
						// 触发器可以同时用blur和change，二者之间用英文逗号隔开
						trigger: ["change", "blur"],
					}],
				}
			}
		},
		onReady() {
			// 如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则
			this.$refs.form1.setRules(this.rules)
		},
		methods: {
			sexSelect(e) {
				this.model1.userInfo.sex = e.name
				this.$refs.form1.validateField('userInfo.sex')
			},
			typeSelect(e) {
				this.model1.userInfo.type = e.name
				this.$refs.form1.validateField('userInfo.type')
			},
			reasonSelect(e) {
				this.model1.userInfo.reason = e.name
				this.$refs.form1.validateField('userInfo.reason')
			},
			submit() {
				// 如果有错误，会在catch中返回报错信息数组，校验通过则在then中返回true
				this.$refs.form1.validate().then(res => {
					this.model1.userInfo.user = getLocalData("user-token").id
					addPopulationReport(this.model1.userInfo).then(res =>{
						if(res.code) {
							uni.showToast({
								title: '提交成功',
								icon: 'success',
								duration: 2000,
								success: () => {
									setTimeout(() =>{
										uni.navigateBack({
											delta: 1
										})
									}, 1000)
								}
							})
						} else {
							uni.$u.toast('请稍后重试')
						}
					}).catch(err =>{
						console.log(err);
						uni.$u.toast('请稍后重试')
					})
				}).catch(errors => {
					console.log(errors);
					uni.$u.toast('请检查输入内容！')
				})
			},
			hideKeyboard() {
				uni.hideKeyboard()
			},
			deletePic(event) {
				this.fileList1.splice(event.index, 1);
				this.model1.userInfo.pictures.splice(event.index, 1);
			},
			async afterRead(event) {
				// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file);
				let fileListLen = this.fileList1.length;
				lists.map((item) => {
					this.fileList1.push({
						...item,
						status: 'uploading',
						message: '上传中',
					});
				});
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].url);
					let item = this.fileList1[fileListLen];
					this.fileList1.splice(fileListLen, 1, {
						...item,
						status: 'success',
						message: '',
						url: result,
					});
					fileListLen++;
				}
			},
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: config.developUrl + "/populationReport/uploadPic", // 接口地址
						filePath: url,
						name: 'file',
						success: (res) => {
							const pictures = JSON.parse(res.data)
							const picUrl = config.fileUrl + "/populationReport/img/" + pictures.uuidName
							// 只加入uuidName
							this.model1.userInfo.pictures.push(pictures.uuidName)
							setTimeout(() => {
								resolve(picUrl);
							}, 1000);
						},
					});
				});
			}
		},
	}
</script>

<style>
	.btn{
		background-color: #768BFF;
		color: #fff;
		width: 300rpx;
		height: 70rpx;
		border-radius: 10rpx;
		font-size: 0.9rem;
		line-height: 70rpx;
		margin: 20rpx auto;
	}
	.content{
		padding: 30rpx 0;
	}
	.title{
		background-color: #768BFF;
		height: 80rpx;
		border-radius: 5rpx;
		line-height: 80rpx;
		padding-left: 30rpx;
		color: #fff;
		font-size: 1.1rem;
	}
	.form{
		padding: 0 20rpx;
	}
	.upload{
		margin: 20rpx 20rpx;
		border-bottom: 1px solid #e6e6e6;
	}
</style>
