import { service, serviceWithParam } from "../utils/request.js"

export function login(user) {
	return service("/user/login", "POST", user)
}