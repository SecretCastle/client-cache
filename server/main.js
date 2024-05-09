const express = require("express")
const path = require("path")
// const dayjs = require("dayjs")
const app = express();
const cors = require("cors")

const allowed_headers = ['x-aaa-bbb', 'x-bbb-ccc', 'cache-control', 'x-ijt']

// 增加1000ms延迟，模拟服务器响应时间
app.use((req, res, next) => {
	setTimeout(next, 500)
})
app.use(cors({
	allowedHeaders: allowed_headers,
	maxAge: 120 // 2分钟preflight缓存时效
}))

// 处理自定义headers
app.use((req, res, next) => {
	const headers = req.headers;
	for (let key in headers) {
		if (allowed_headers.includes(key)) {
			res.setHeader(key, headers[key])
		}
	}
	next()
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
			// 向服务器验证缓存是否有效，如果有效则返回304，否则返回新数据。
			// max-age设置的缓存有效期无效
			res.set('Cache-Control', 'no-cache, max-age=60')
		} else if (path.includes("must-revalidate")) {
			// 缓存有效期60s。缓存过期后，必须向服务器验证缓存是否有效。
			res.set('Cache-Control', 'must-revalidate, max-age=60')
		} else if (path.includes("stale-while-revalidate")) {
			// 缓存有效期60s。缓存过期后，20秒内允许使用缓存，同时异步请求新数据，新数据返回后更新缓存。
			res.set('Cache-Control', 'max-age=60, stale-while-revalidate=20')
		} else if (path.includes("stale-if-error")) {
			res.set('Cache-Control', 'max-age=60, stale-if-error=120')
			// res.status(500).send("Server Error")
			// res.status(504);
		}
	}
}))

app.get('/error', (req, res) => {
	res.status(500).send("Server Error")
})


app.listen(3000, () => {
	console.log("Server running on port 3000");
})