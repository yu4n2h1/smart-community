<template>
	<view>
		<u-modal :show="show" :title="title" :closeOnClickOverlay="true" :showCancelButton="true" @confirm="confirm"
			@close="closeModal" @cancel="closeModal">
			<view class="slot-content">
				<u--form labelPosition="left" :model="model1" :rules="rules" ref="form1">
					<u-form-item label="姓名" prop="userInfo.name" borderBottom ref="item1">
						<u--input v-model="model1.userInfo.name" border="none"></u--input>
					</u-form-item>
					<u-form-item label="小区" prop="userInfo.neighborhoodName" borderBottom
						@click="showNeighborhoodName = true; " ref="item1">
						<u--input v-model="model1.userInfo.neighborhoodName" disabled disabledColor="#ffffff"
							placeholder="请选择所在小区" border="none"></u--input>
						<template #right>
							<u-icon name="arrow-right"></u-icon>
						</template>
					</u-form-item>
				</u--form>
				<u-action-sheet :show="showNeighborhoodName" :actions="actions" title="请选择所在小区"
					@close="showNeighborhoodName = false" @select="neighborhoodNameSelect">
				</u-action-sheet>
			</view>
		</u-modal>

	</view>
</template>

<script setup>
	import {
		ref,
		reactive
	} from 'vue'
	import {
		onReady
	} from "@dcloudio/uni-app"
	
	let showNeighborhoodName = ref(false)
	let model1 = reactive({
		userInfo: {
			name: '',
			neighborhoodName: '',
		},
	})
	let actions = reactive([{
		name: '山东科技大学'
	}])
	
	const props = defineProps({
		show: {
			type: Boolean,
			default: false
		}
	})
	let rules = reactive({
		'userInfo.name': {
			type: 'string',
			required: true,
			message: '请填写姓名',
			trigger: ['blur', 'change']
		},
		'userInfo.neighborhoodName': {
			type: 'string',
			required: true,
			message: '请选择所在小区',
			trigger: ['blur', 'change']
		},
	})
	let radio = ref('')
	let switchVal = ref(false)
	let title = ref("完善身份信息")
	let form1 = ref()
	let emit = defineEmits(['getUserInfo','closeModal'])

	//点击提交确认按钮
	function confirm() {
		form1.value.validate().then(()=>{
			emit('getUserInfo', model1.userInfo)
		}).catch(()=>{
			uni.showToast({
				title:"请检查输入内容",
				icon:"error"
			})
		})
	}

	function neighborhoodNameSelect(e) {
		model1.userInfo.neighborhoodName = e.name
		form1.value.validateField('userInfo.neighborhoodName')
	}
	function closeModal(){
		emit("closeModal",false)
	}
	onReady(() => {
		form1.value.setRules(rules)
	})
</script>

<style>

</style>