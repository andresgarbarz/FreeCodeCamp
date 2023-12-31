const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema({
	original_url: String,
	short_url: Number,
});

module.exports = mongoose.model("Link", linkSchema);
