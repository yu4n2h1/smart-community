import { service, serviceWithParam } from "../utils/request.js"

// 查询问卷
export function getQuestionnaire() {
	return service("/questionnaire/selectAll", "GET", {})
}

// 增加问卷
export function addQuestionnaire(questionnaire) {
	// 重新组装 数据
	let data = {
		id: questionnaire.id,
		type: questionnaire.type,
		name: questionnaire.name,
		descr: questionnaire.descr,
		startTime: questionnaire.startTime,
		endTime: questionnaire.endTime,
		questionList: [],
		question: JSON.stringify(questionnaire.questionList)
	}
	for(let i in questionnaire.questionList) {
		data.questionList.push(questionnaire.questionList[i].id)
	}
	data.questionList = JSON.stringify(data.questionList)
	return service("/questionnaire/add", "POST", data)
}

// 查询问题
export function getQuestion(question) {
	let data = {
		idList: question
	}
	return serviceWithParam("/question/selectById", "POST", data)
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

// 查询问卷填写数量
export function getPaperCount(questionnaire) {
	let data = {
		idList: questionnaire
	}
	return serviceWithParam("/questionnaire/countByIdList", "POST", data)
}

// 获取 UID 11位
export const getQUID = (id = 0) => Date.now().toString().substring(4) + "" + id + "" + Math.floor(Math.random() * 10) + ""
