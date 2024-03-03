import {
	service,
	serviceWithParam
} from "../../../utils/request.js"

// 查询问卷
export function getFeedbackByKeyword(wd) {
	return service("/feedback/findByColumn", "GET", wd)
}

export function getFeedback(num) {
	return service("/feedback/findAll", "GET", num)
}

export function saveFeedback(feedback) {
	return service("/feedback/save", "POST", feedback)
}