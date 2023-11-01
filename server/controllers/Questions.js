import Questions from '../models/Questions.js'
import User from '../models/auth.js'
import mongoose from 'mongoose'

export const AskQuestion = async (req,res) => {
    const postQuestionData = req.body;
    const postQuestion = new Questions(postQuestionData);
    try{
        await postQuestion.save();
        await User.findByIdAndUpdate(postQuestionData.userId,{$inc:{point:10}})
        res.status(200).json("Posted a question sucessfully")
    }catch(error){
        console.log(error)
        res.status(409).json("Couldn't post  new questionm");
    }
}

export const getAllQuestions = 
async (req,res) =>{
    try{
        const questionList = await Questions.find();
        res.status(200).json(questionList);
    }catch(error){
        res.status(404).json({message: error.message})
    }
}

export const deleteQuestion = async (req,res) => {
    const{id:_id} = req.params;
    const {userId} = req.body
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send("Question Unavailable...")
    }
    try {
        await Questions.findByIdAndRemove(_id);
        await User.findByIdAndUpdate(userId,{$inc:{point:-10}})
        res.status(200).json({message: "Sucessfully deleted"})
    } catch (error) {
        res.status(404).json({message : "Error Occurred"})
    }
}

export const voteQuestion = async(req,res) => {
    const {id: _id} = req.params
    const{value,userId} = req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send("Question Unavailable...")
    }
    try {
        const question = await Questions.findById(_id)
        const userIdposted = question.userId
        const upIndex = question.upVote.findIndex((id) =>id === String(userId))
        const downIndex = question.downVote.findIndex((id) =>id === String(userId))

        if (value === 'upVote'){
            if(downIndex !== -1){
                question.downVote = question.downVote.filter((id) => id !== String(userId))
                await User.findByIdAndUpdate(userIdposted,{$inc:{point:20}})
            }
            if(upIndex === -1){
                question.upVote.push(userId)
                await User.findByIdAndUpdate(userIdposted,{$inc:{point:20}})
            }else{
                question.upVote = question.upVote.filter((id) => id!==String(userId))
                await User.findByIdAndUpdate(userIdposted,{$inc:{point:-20}})
            }
        }
        else if (value === 'downVote'){
            if(upIndex !== -1){
                question.upVote = question.upVote.filter((id) => id !== String(userId))
                await User.findByIdAndUpdate(userIdposted,{$inc:{point:-20}})
            }
            if(downIndex === -1){
                question.downVote.push(userId)
                await User.findByIdAndUpdate(userIdposted,{$inc:{point:-20}})
            }else{
                question.downVote = question.downVote.filter((id) => id !== String(userId))
                await User.findByIdAndUpdate(userIdposted,{$inc:{point:20}})
            }
        }
        await Questions.findByIdAndUpdate(_id,question)
        res.status(200).json({message: "Voted Sucessfully"})

    } catch (error) {
        res.status(404).json({message:"Id not Found"})
    }
}