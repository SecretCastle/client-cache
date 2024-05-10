const express = require("express")
const path = require("path")
const app = express();
const cors = require("cors")
const cookieParser = require("cookie-parser")
const {static_root, loadResource} = require('./case/resource/main');


const allowed_headers = ['x-aaa-bbb', 'x-bbb-ccc', 'cache-control', 'x-ijt']

// 增加1000ms延迟，模拟服务器响应时间
app.use((req, res, next) => {
	setTimeout(next, 500)
})
app.use(cors({
	credentials: true,
	allowedHeaders: allowed_headers,
	origin: ['http://localhost:8080', 'http://localhost:63342', 'http://localhost:3000'],
	maxAge: 120 // 2分钟preflight缓存时效
}))

app.use(cookieParser())
app.use(static_root, loadResource())

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


app.get('/login', (req, res) => {
	res.cookie('auth_cookie', '123456', {
		maxAge: 600 * 1000,
	});
	res.send("Login Success");
})

app.get('/protected', (req, res) => {
	const auth_cookie = req.cookies.auth_cookie;
	if (auth_cookie === '123456') {
		res.send("Protected Resource");
	} else {
		res.status(401).send("Unauthorized");
	}
});

app.listen(3000, () => {
	console.log("Server running on port 3000");
})