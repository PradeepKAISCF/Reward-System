import mongoose from 'mongoose'
import User from '../models/auth.js'

export const postToken = async(req,res) => {
    const {id:_id} = req.params
    const {fcmtoken} = req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send("User Unavailable...")
    }
    try{
        await User.findByIdAndUpdate(_id,{$set:{'token':fcmtoken}})
    }catch(error){
        res.status(404).json(error)
    }
}