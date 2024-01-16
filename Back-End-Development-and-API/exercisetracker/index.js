const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const { User, Exercise } = require("./src/exercise.js");

app.use(cors());
app.use(express.static("public"));
app.get("/", (req, res) => {
	res.sendFile(__dirname + "/views/index.html");
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => console.log("Connected to MongoDB"))
	.catch((error) => console.error(error));

app.post("/api/users", async function (req, res) {
	const username = req.body.username;
	var user = await User.findOne({ username: username });
	if (user) return res.status(409).send("Username already taken");
	user = new User({ username: username });
	try {
		await user.save();
		res.status(201).json(user);
	} catch (error) {
		console.error(error);
		res.status(500).send("Error saving new user");
	}
});

app.get("/api/users", async function (req, res) {
	const users = await User.find({});
	res.json(users);
});

app.get("/api/users/reset", async function (req, res) {
	await User.deleteMany({});
	res.sendStatus(200);
});

app.get("/api/all/reset", async function (req, res) {
	await User.deleteMany({});
	await Exercise.deleteMany({});
	res.sendStatus(200);
});

app.post("/api/users/:id/exercises", async function (req, res) {
	var { description, duration, date } = req.body;
	duration = parseInt(duration);

	date ? (date = new Date(date)) : (date = new Date());
	date = date.toDateString();

	const user = await User.findById(req.params.id);
	if (!user) return res.status(404).send("User not found");

	const exercise = new Exercise({
		username: user.username,
		duration: duration,
		description: description,
		date: date,
	});
	await exercise.save();

	return res.json({
		_id: user._id,
		username: user.username,
		date: exercise.date.toDateString(),
		duration: exercise.duration,
		description: exercise.description,
	});
});

function isValidDate(dateStr) {
	return !isNaN(dateStr);
}

app.get("/api/users/:id/logs", async function (req, res) {
	var { from, to, limit } = req.query;
	const user = await User.findById(req.params.id);
	!user && res.status(404).send("User not found");
	from = new Date(from);
	to = new Date(to);
	if (isValidDate(to)) {
		if (isValidDate(from)) {
			console.log(1);
			var log = await Exercise.find({
				username: user.username,
				date: { $gte: from, $lte: to },
			}).select("-_id description duration date");
		} else {
			console.log(2);
			var log = await Exercise.find({
				username: user.username,
				date: { $lte: to },
			}).select("-_id description duration date");
		}
	} else {
		if (isValidDate(from)) {
			console.log(3);
			var log = await Exercise.find({
				username: user.username,
				date: { $gte: from },
			}).select("-_id description duration date");
		} else {
			console.log(4);
			var log = await Exercise.find({
				username: user.username,
			}).select("-_id description duration date");
		}
	}
	log = log.map((ex) => {
		return {
			description: ex.description,
			duration: ex.duration,
			date: ex.date.toDateString(),
		};
	});
	console.log(log);
	const count = log.length;
	limit = parseInt(limit);
	limit && (log = log.slice(0, limit));
	res.json({
		_id: user._id,
		username: user.username,
		count: count,
		log: log,
	});
});

const listener = app.listen(process.env.PORT || 3000, () => {
	console.log("Your app is listening on port " + listener.address().port);
});
