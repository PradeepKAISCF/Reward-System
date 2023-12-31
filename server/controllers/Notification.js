import users from '../models/auth.js'

export const sendNotification = async(req,res) => {
    try {
        const {id:_id} = req.params
        const notification = await users.findByIdAndUpdate(_id, { $set: { 'notification': [] } });
        res.status(200).json(notification.notification)
    } catch (error) {
        res.status(404).json(error)
    }
}