import { service, serviceWithParam } from "../utils/request.js"

// 查询问卷
export function getFeedbackByKeyword(wd) {
	return service("/feedback/findByKeywords", "GET", wd)
}

export function getFeedback(num) {
	return service("/feedback/findPreviousByFid", "GET", num)
}