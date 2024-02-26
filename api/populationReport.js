import { service, serviceWithParam } from "../utils/request.js"

// 增加报备
export function addPopulationReport(userinfo) {
	let data = {
		user: userinfo.user,
		type: userinfo.type,
		name: userinfo.name,
		number: userinfo.number,
		sex: userinfo.sex,
		location: userinfo.location,
		address: userinfo.address,
		reason: userinfo.reason,
		phone: userinfo.phone,
		// uuidName数组 JSON格式存储
		pictures: JSON.stringify(userinfo.pictures)
	}
	return service("/populationReport/add", "POST", data)
}

//查询报备
export function getPopulationReport(user) {
	let data = {
		user,
	}
	return serviceWithParam("/populationReport/selectByUser", "POST", data)
}