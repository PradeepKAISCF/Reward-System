import mongoose from 'mongoose'
import Questions from '../models/Questions.js'
import User from '../models/auth.js'

export const postAnswer = async(req,res) => {
    const{id:_id } = req.params;
    const {userId,noOfAnswers, answerBody, userAnswered} = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send("Question Unavailable...")
    }
    updateNoOfAnswers(_id,noOfAnswers)
    try{
        const updatedQuestion = await Questions.findByIdAndUpdate(_id,{$addToSet:{'answer':[{answerBody,userAnswered,userId: userId}]}})
        await User.findByIdAndUpdate(userId,{$inc:{point:30}})
        const questionOwner = await Questions.findById(_id)
        await User.findByIdAndUpdate(questionOwner.userId,{$addToSet:{'notification':[{questionid:_id,userPosted: userAnswered}]}})
        res.status(200).json(updatedQuestion)
    }catch(error){
        res.status(404).json(error)
    }
} 

const updateNoOfAnswers = async (_id,noOfAnswers) => {
    try {
        await Questions.findByIdAndUpdate(_id,{$set:{'noOfAnswers': noOfAnswers}})
    } catch (error) {
        console.log(error)
    }
}

export const deleteAnswer = async(req,res) => {
    const {id:_id} = req.params;
    const {answerId, noOfAnswers, userId} = req.body;
    
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send("Question Unavailable...")
    }
    if(!mongoose.Types.ObjectId.isValid(answerId)){
        return res.status(404).send("Question Unavailable...")
    }
    updateNoOfAnswers(_id,noOfAnswers)
    try {
        await Questions.updateOne(
            {_id},
            {$pull:{'answer':{_id:answerId}}}
        )
        await User.findByIdAndUpdate(userId,{$inc:{point:-30}})
        res.status(200).json("Deleted Sucessfully")
    } catch (error) {
        res.status(404).json(error)
    }
}