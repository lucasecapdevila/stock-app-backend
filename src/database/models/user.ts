import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 25,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    trim: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "admin",
  },
})

const User = mongoose.model('user', userSchema)
export default User