import mongoose from "mongoose";
import { jwt } from "jsonwebtoken";
import bcrypt from "bcrypt"
const { Schema } = mongoose;


const userSchema = new mongoose.Schema({
  username:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true,
    index:true,
  },
  email:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true,
  },
  fullName:{
    type:String,
    required:true,
    trim:true,
    index:true,
  },
  avatar:{
    type:String, //cloudinary url
    required:true,
  },
  coverImage:{
    type:String,
  },
  watchHistory:[
    {
    type:Schema.Types.ObjectID,
    ref:"Video",
    }
],
  password:{
    type:String,
    required:[true, "Password is required"], 
 },

 refreshToken:{
  type:String,
 },

},{timestamps:true})

userSchema.pre("save", async function(next) {
  //encrypting only when PASSWORD is modified and not when any field is modified
  if(!this.isModified("password")) return next();
  //otw
  this.password =await bcrypt.hash(this.password,10)
  next();
})

//custom method
userSchema.methods.isPasswordCorrect = async function(password){ //cryptography so it takes time therefore async await
  //returns bool
  return await bcrypt.compare(password,this.password) 
}


userSchema.methods.generateAccessToken = function(){
  return jwt.sign({
    _id:this._id,
    email:this.email,
    username:this.username,
    fullName:this.fullName
  },
  process.env.ACCESS_TOKEN_SECRET,
  {
    expiresIn:ACCESS_TOKEN_EXPIRY
  }
)
}
userSchema.methods.generateRefreshToken = function(){
  return jwt.sign({
    _id:this._id,
  },
  process.env.REFRESH_TOKEN_SECRET,
  {
    expiresIn:REFRESH_TOKEN_EXPIRY
  }
)
}
export const User = mongoose.model("User",userSchema);