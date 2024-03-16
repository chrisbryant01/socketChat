const env = require("dotenv");
env.config();

// To connect with your mongoDB database
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL, {
	dbName: 'test',
});

const MessageSchema = new mongoose.Schema({
	message: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});
const Message = mongoose.model('messages', MessageSchema);
Message.createIndexes();

const express = require('express');
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
app.get("/", (req, resp) => resp.send("App is Working"));

app.post("/message", async (req, resp) => {
	try {
		const message = new Message(req.body);
		let result = await message.save();
		result = result.toObject();
		if (result) {
			resp.send(req.body);
			console.log(result);
		} else {
			console.log("Message not sent");
		}

	} catch (e) {
		resp.send("Something Went Wrong");
	}
});

app.get("/messages", async (req, resp) => {
	try {
		let messages = await Message.find();
		resp.send(messages);
	} catch (e) {
		resp.send("Something Went Wrong");
	}
});

app.listen(process.env.PORT || 5000);
