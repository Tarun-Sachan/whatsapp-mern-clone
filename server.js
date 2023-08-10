import express from "express";
import { config } from "process";
import mongoose, { mongo } from "mongoose";
import Messages from "./dbMessages.js";
import Pusher from "pusher";
import cors from "cors"
import dotenv from 'dotenv'
dotenv.config()
//schemas

//app config

const app = express();

const port = process.env.PORT || 9000;

const pusher = new Pusher({
  appId: "1639407",
  key: "671dac2ca88bf7778a09",
  secret: "3a4b129f79ff1bdc5340",
  cluster: "ap2",
  useTLS: true,
});

//middleware

app.use(express.json());
app.use(cors());

// app.use((req, res, next) => {
//   res.setHeader("Acess-Control-Allow-Origin", "*");
//   res.setHeader("Acess-Control-Allow-Headers", "*");
//   next();
// });

//DB config


mongoose.connect(process.env.MONGO_URI, {
  //useCreateIndex: true
});
//

const db = mongoose.connection;

db.once("open", () => {
  console.log("db is connected");
  const msgCollection = db.collection("messagecontents");
  const changeStream = msgCollection.watch();

  changeStream.on("change", (change) => {
    console.log(change);

    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
        received: messageDetails.received,
      });
    } else {
      //console.log("error triggering pusher");
    }
  });
});
//api routes
// app.get("/", (req, res) => res.status(200).send("hello world sending data"));

app.get("/api/v1/messages/sync", async (req, res) => {
  try {
    const tasks = await Messages.find({});
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});
app.post("/api/v1/messages/new", async (req, res) => {
  try {
    const task = await Messages.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});


if(process.env.NODE_ENV =='production'){
  const path = require('path')
  app.get('/',(req,res)=>{
    app.use(express.static(path.resolve(__dirname,'client','build')))
    res.sendFile(path.resolve(__dirname,'client','build','index.html'))
  })
}

app.listen(port, () => console.log(`Listening on localhost:${port}`));
