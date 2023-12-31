// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
	res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
	res.json({ greeting: "hello API" });
});

function isValidDate(d) {
	return d instanceof Date && !isNaN(d);
}

app.get("/api/:date?", function (req, res) {
	var date = req.params.date;
	if (!date) {
		date = new Date();
	} else {
		console.log(date);
		if (!date.includes("-") && !date.includes(" ")) {
			date = parseInt(date);
		}
		date = new Date(date);
	}
	if (isValidDate(date)) {
		res.json({
			unix: date.getTime(),
			utc: date.toUTCString(),
		});
	} else {
		res.json({ error: "Invalid Date" });
	}
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
	console.log("Your app is listening on port " + listener.address().port);
});
