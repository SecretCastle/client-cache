const express = require("express")
const path = require("path")
// const dayjs = require("dayjs")
const app = express();

// 增加3000ms延迟，模拟服务器响应时间
app.use((req, res, next) => {
	setTimeout(next, 3000)
})

app.use(express.static(path.join(__dirname, 'source'), {
	setHeaders: (res, path) => {
		if (path.includes("private")) {
			res.set("Cache-Control", "private, max-age=600");
		} else if (path.includes("public")) {
			res.set('Cache-Control', 'public, max-age=600');
		} else if (path.includes("immutable")) {
			res.set('Cache-Control', 'immutable, max-age=60');
		} else if (path.includes('no-store')) {
			res.set('Cache-Control', 'no-store')
		} else if (path.includes("no-cache")) {
			res.set('Cache-Control', 'no-cache, max-age=600')
		} else if (path.includes("must-revalidate")) {
			res.set('Cache-Control', 'must-revalidate, max-age=60')
		}
	}
}))


app.listen(3000, () => {
	console.log("Server running on port 3000");
})