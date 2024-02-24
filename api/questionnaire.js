import { service, serviceWithParam } from "../utils/request.js"

// 查询问卷
export function getQuestionnaire() {
	return service("/questionnaire/selectAll", "GET", {})
}

// 查询问题
export function getQuestion(idList) {
	return service("/question/selectById", "POST", idList)
}

// 增加答卷
export function addUserPaper(questionnaire, answer, user) {
	let data = {
		questionnaire,
		answer: JSON.stringify(answer),
		user
	}
	return service("/userPaper/add", "POST", data)
}

// 查询答卷
export function getUserPaper(questionnaire, user) {
	let data = {
		questionnaire,
		user
	}
	return serviceWithParam("/userPaper/selectByQuestionnaire", "POST", data)
}
