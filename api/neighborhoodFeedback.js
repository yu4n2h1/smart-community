import {
	service,
	serviceWithParam
} from "../utils/request.js"

// 查询问卷
export function getFeedbackByKeyword(wd) {
	return service("/feedback/neighborhood/findByColumn", "GET", wd)
}

export function getFeedback(num) {
	return service("/feedback/neighborhood/findByNid", "GET", num)
}

export function saveFeedback(feedback) {
	return service("/feedback/neighborhood/save", "POST", feedback)
}