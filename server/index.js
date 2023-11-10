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

const PORT =process.env.PORT || 5000 

const CONNECTION_URL = "mongodb+srv://Pradeep:Aspd1234@cluster0.tjhvisp.mongodb.net/"

mongoose.connect(CONNECTION_URL,{useNewUrlParser: true, useUnifiedTopology :true})
.then(()=>app.listen(PORT, () => {console.log(`server running on port on ${PORT}`)}))
.catch((err)=> console.log(err.message));
