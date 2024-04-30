const express = require("express")
const path = require("path")
const dayjs = require("dayjs")
const app = express();

app.use(express.static(path.join(__dirname, 'source'), {
	setHeaders: (res, path) => {
		if (path.includes("private")) {
			res.set("Cache-Control", "private,max-age=30, must-revalidate");
			// res.set("Expires", dayjs().add(10, 's'))
		} else {
			res.set('Cache-Control', 'public, max-age=600');
		}
	}
}))


app.listen(3000, () => {
	console.log("Server running on port 3000");
})