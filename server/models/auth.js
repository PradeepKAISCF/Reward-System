import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  token: {type: String},
  about: { type: String },
  tags: { type: [String] },
  joinedOn: { type: Date, default: Date.now },
  point:{type: Number, default: '0'},
  notification:[{
    questionid: String,
    userPosted: String
  }]
});

export default mongoose.model("User", userSchema);
