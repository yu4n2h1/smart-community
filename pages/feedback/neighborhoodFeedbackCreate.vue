<!-- 
	反馈内容创建
	
 -->

<template>

	<u--form label-position="up" ref="form1" :model="feedback">
		<u-form-item label="问题和意见" label-width="100" prop="comment" border-bottom ref="item1" :required="true">
			<u-textarea v-model="feedback.comment" placeholder="请输入内容" count></u-textarea>
		</u-form-item>
		<u-upload label="图片上传" :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1" multiple
			:maxCount="6"></u-upload>
		<u-form-item label="联系方式(可选)" label-width="130" prop="phone" border-bottom ref="item1">
			<u-input v-model="feedback.phone" border="surround"></u-input>
		</u-form-item>
	</u--form>

	<optionalTag v-model="feedback.tag"></optionalTag>
	<u-button type="primary" text="提交" customStyle="margin-top: 20px" class="btn" @click="submit"></u-button>
	<!-- <u-button type="error" text="重置" customStyle="margin-top: 10px" class="btn" @click="reset"></u-button> -->
</template>

<script setup>
	import {
		reactive,
		ref
	} from 'vue'
	import {
		onReady
	} from '@dcloudio/uni-app'
	import optionalTag from '../../components/optionalTag.vue'
	import config from '../../system.config.js'
	import {
		saveFeedback
	} from "./api/neighborhoodFeedback.js"
	let feedback = reactive({
		phone: "",
		comment: "",
		tag: "",
		pictures: [],
		nid: -1
	})
	let rules = reactive({
		'comment': {
			type: 'string',
			required: true,
			message: '请填写反馈内容，不少于10字',
			min: 10,
			trigger: ['blur', 'change']
		},
		'tag': {
			type: 'string',
			required: true,
			trigger: ['blur', 'change']
		}
	})
	let radio = ""
	let switchVal = false
	let form1 = ref()
	onReady(() => {
		form1.value.setRules(rules)
	})

	function submit() {
		form1.value.validate().then(() => {
			saveFeedback({
				uid: 222,
				comment: feedback.comment,
				phone: feedback.phone,
				tag: feedback.tag,
				pictures: feedback.pictures
			}).then(res => {
				if (res == true) {
					uni.$u.toast('发送成功，感谢您的反馈');
					setTimeout(() => {
						uni.navigateBack({
							delta: 1
						})
					}, 1000)
				} else {
					uni.$u.toast("发送失败")
				}
			}).catch(() => {
				uni.$u.toast("发送失败")
			})
		})
	}
	

	// function reset() {
	// 	const validateList = ['feedback.content', 'feedback.phone','feedback.tag']
	// 	form1.value.resetFields()
	// 	form1.value.clearValidate()
	// 	setTimeout(() => {
	// 		form1.value.clearValidate(validateList)
	// 		fileList1.value.splice(0,fileList1.value.length)
	// 		// 或者使用 this.$refs.form1.clearValidate()
	// 	}, 100)
	// }

	const fileList1 = ref([]);

	// 删除图片
	const deletePic = (event) => {
		fileList1.value.splice(event.index, 1);
		feedback.pictures.splice(event.index, 1);
	};

	// 新增图片
	const afterRead = async (event) => {
		// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
		let lists = [].concat(event.file);
		let fileListLen = fileList1.value.length;
		lists.map((item) => {
			fileList1.value.push({
				...item,
				status: 'uploading',
				message: '上传中',
			});
		});
		for (let i = 0; i < lists.length; i++) {
			const result = await uploadFilePromise(lists[i].url);
			let item = fileList1.value[fileListLen];
			fileList1.value.splice(fileListLen, 1, {
				...item,
				status: 'success',
				message: '',
				url: result,
			});
			fileListLen++;
		}
	};

	const uploadFilePromise = (url) => {
		return new Promise((resolve, reject) => {
			let a = uni.uploadFile({
				url: config.developUrl + "/feedback/uploadPic", // 接口地址
				filePath: url,
				header:{},
				name: 'file',
				success: (res) => {
					const pictures = JSON.parse(res.data)
					const picUrl = config.fileUrl + "/feedback/img/" + pictures.uuidName
					feedback.pictures.push(res.data)
					setTimeout(() => {
						resolve(picUrl);
					}, 1000);
				},
			});
		});
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
</style>