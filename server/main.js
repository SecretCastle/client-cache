const express = require("express")
const path = require("path")
const app = express();


// app.get('/private', (req, res) => {
// 	if (req.query.user) {
// 		res.set('Cache-Control', 'private, max-age=600');
// 		res.send(`Hello ${req.query.user} 1`);
// 	} else {
// 		res.status(401).send("Please log in")
// 	}
// })

app.use(express.static(path.join(__dirname, 'source'), {
	setHeaders: (res, path) => {
		if (path.includes("private")) {
			res.set("Cache-Control", "private, max-age=0");
		} else {
			res.set('Cache-Control', 'public, max-age=600');
		}
	}
}))


app.listen(3000, () => {
	console.log("Server running on port 3000");
})