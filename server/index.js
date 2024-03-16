// Code for mongoose config in backend
// Filename - backend/index.js

const env = require("dotenv");
env.config();

// To connect with your mongoDB database
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL, {
	dbName: 'test',
});

// Schema for users of app
const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});
const User = mongoose.model('users', UserSchema);
User.createIndexes();

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

// For backend and express
const express = require('express');
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
app.get("/", (req, resp) => {

	resp.send("App is Working");
	// You can check backend is working or not by 
	// entering http://loacalhost:5000
	
	// If you see App is working means
	// backend working properly
});

app.post("/register", async (req, resp) => {
	try {
		const user = new User(req.body);
		let result = await user.save();
		result = result.toObject();
		if (result) {
			delete result.password;
			resp.send(req.body);
			console.log(result);
		} else {
			console.log("User already register");
		}

	} catch (e) {
		resp.send("Something Went Wrong");
	}
});

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