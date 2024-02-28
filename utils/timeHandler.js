// 时间戳 转换为 自定义格式
export function stamp2format(stamp, format = 1) {
	var now = new Date(stamp)
	var year = now.getFullYear();
	var month = now.getMonth() + 1;
	var date = now.getDate();
	var hour = now.getHours();
	var minute = now.getMinutes();
	var second = now.getSeconds();
	switch(format) {
		// 日期+时间
		case 1: return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
		// 日期
		case 2: return year + "-" + month + "-" + date;
		// 时间
		case 3: return hour + ":" + minute + ":" + second;
	}
	return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
}