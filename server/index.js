import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import userRoutes from './routes/users.js'
import questionRoutes from './routes/Questions.js'
import answerRoutes from './routes/Answer.js'
import notifyRoutes from './routes/Notify.js'
import videoRoutes from './routes/video.js'
import tokenRoutes from './routes/token.js'
/* import {initializeApp, applicationDefault } from 'firebase-admin/app';
import { getMessaging } from "firebase-admin/messaging";
import * as admin from 'firebase-admin'
import serviceAccount from './react-app-435f5-firebase-adminsdk-vcfn0-943541a7d4.json' */

const app = express();
dotenv.config()
app.use(express.json({limit:'30mb',extended: true}))
app.use(express.urlencoded({limit:"30mb", extended: true}))
app.use('/uploads',express.static(path.join('uploads')))

app.use(cors())

app.get('/',(req,res) => {
    res.send("This is a stack overflow clone API")
})

app.use('/user',userRoutes)
app.use('/questions',questionRoutes)
app.use('/answer',answerRoutes)
app.use('/notify',notifyRoutes)
app.use('/video',videoRoutes)
app.use('/token',tokenRoutes)

//8888888888888888888888888888888888888888888888888888888888888888888888888888888888888

import {initializeApp } from 'firebase-admin/app';
import { getMessaging } from "firebase-admin/messaging";
import admin from 'firebase-admin'

const GOOGLE_APPLICATION_CREDENTIALS='./reward-system-ee063-firebase-adminsdk-r3g73-66e24ec403.json'

initializeApp({
  credential: admin.credential.cert(GOOGLE_APPLICATION_CREDENTIALS),
  projectId: 'reward-system-ee063',
});

  /* const userToken = ''; */ 
   /* const message = {
    notification: {
      title: "Notifdfghjklvvvvvvvvvvvvvvvvv",
      body: 'This is a Test Notification'
    },
    token: "e5T0gX5V3gJvLTwkbQ4lSm:APA91bE6TFsyOGIcVczJSVTUmRCi4PxjETphFJ9OfDqke6OvLHYr5yUaSSb93HCcI2ufVKLBa7-c_SLtwzdT0B7N1ZMnzh7J4g5l0V7xiOZri8n-3mh-Fb0QCaZG0DlWg6Tra8UFT1p3",
  };
  
  const send = (message) => {
  getMessaging()
    .send(message)
    .then((response) => {
      console.log("Successfully sent message:", response);
    })
    .catch((error) => {
      console.log("Error sending message:", error);
    });
  }
  send(message) */
//8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888

const PORT =process.env.PORT || 5000 

const CONNECTION_URL = "mongodb+srv://Pradeep:Aspd1234@cluster0.tjhvisp.mongodb.net/"

mongoose.connect(CONNECTION_URL,{useNewUrlParser: true, useUnifiedTopology :true})
.then(()=>app.listen(PORT, () => {console.log(`server running on port on ${PORT}`)}))
.catch((err)=> console.log(err.message));
