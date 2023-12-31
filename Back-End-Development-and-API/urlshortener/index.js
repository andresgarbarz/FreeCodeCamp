require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const dns = require("dns");

const mongoose = require("mongoose");
const Link = require("./src/link");
var bodyParser = require("body-parser");

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use("/public", express.static(`${process.cwd()}/public`));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => console.log("Connected to MongoDB"))
	.catch((error) => console.error(error));

app.get("/", function (req, res) {
	res.sendFile(process.cwd() + "/views/index.html");
});

// Your first API endpoint
app.get("/api/hello", function (req, res) {
	res.json({ greeting: "hello API" });
});

app.get("/api/reset", async function (req, res) {
	await Link.deleteMany({});
	res.sendStatus(200);
});

app.post("/api/shorturl", async function (req, res) {
	const url = new URL(req.body.url);
	dns.lookup(url.hostname, async (err) => {
		if (err) {
			res.json({ error: "invalid url" });
		} else {
			var link = await Link.findOne({ original_url: req.body.url });
			if (!link) {
				const num = (await Link.estimatedDocumentCount()) + 1;
				link = new Link({
					original_url: req.body.url,
					short_url: num,
				});
				await link.save();
			}
			res.json({ original_url: link.original_url, short_url: link.short_url });
		}
	});
});

app.get("/api/shorturl/:num", async function (req, res) {
	const url = await Link.findOne({ short_url: req.params.num });
	console.log(url);
	if (!url) {
		res.json({ error: "No short URL found for the given input" });
	} else {
		res.redirect(url.original_url);
	}
});

app.listen(port, function () {
	console.log(`Listening on port ${port}`);
});
