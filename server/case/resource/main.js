const express = require('express')
const static_root = '/source'


function loadResource() {
	return express.static('source', {
		setHeaders: (res, path) => {
			if (path.includes("private")) {
				res.set("Cache-Control", "private, max-age=600");
			} else if (path.includes("public")) {
				res.set('Cache-Control', 'public, max-age=600');
			} else if (path.includes("immutable")) {
				res.set('Cache-Control', 'immutable');
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
			} else if (path.includes("max-age")) {
				res.set('Cache-Control', 'max-age=60')
			} else if (path.includes('s-maxage')) {
				res.set('Cache-Control', 'public, s-maxage=30')
			}
		}
	})
}

module.exports = {
	static_root,
	loadResource
}