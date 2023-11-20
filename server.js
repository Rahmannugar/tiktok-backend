const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const Data = require("./data");
const Videos = require("./dbModel");

//app config
const app = express();
const port = process.env.PORT || 5000;
const mongoUrl =
  "mongodb+srv://Rahmannugar:Nugarcladex@tiktok-clone.yosjejt.mongodb.net/?retryWrites=true&w=majority";

//Middlewares
app.use(express.json());
app.use(cors());

//mongoDB connection
mongoose.connect(mongoUrl);

//end points
app.get("/", (req, res) => {
  res.status(200).send("Hello 33.");
});

//get array of tiktok videos from database
app.get("/files", (req, res) => res.status(200).send(Data));

//post a single tiktok video and properties to database.
app.post("/posts", async (req, res) => {
  try {
    const dbVideos = req.body;
    const data = await Videos.create(dbVideos);
    res.status(201).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

//get tiktok videos from database
app.get("/posts", async (req, res) => {
  try {
    const data = await Videos.find();
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

//listener
app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
