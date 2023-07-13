const express = require("express")
const {UserModel} = require("../modals/users.modal")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const personRouter = express.Router()
personRouter.post("/signup",async(req,res)=>{
    const {Email,Password} = req.body
    try {
        bcrypt.hash(Password,5,async(err,hash)=>{
            if(err){
                res.json({error:err.message})
            }
            else{
                const user = new UserModel({Email,Password:hash})
                await user.save()
            }
        })
        res.json({msg:"User Registered",user:req.body})
    } catch (err) {
        res.json({error:err.message})
    }
})

personRouter.post("/login",async(req,res)=>{
    const {Email,Password} = req.body
    try {
        const user = await UserModel.findOne({Email})
        if(user){
            bcrypt.compare(Password,user.Password,(err,result)=>{
                if(result){
                    let token = jwt.sign({userID:user._id,Email:user.Email},"masai")
                    res.json({msg:"Login SucessFull",token})
                }
                else{
                    res.json({msg:"Wrong Creadentials"})
                }
            })
        }
        else{
            res.json({msg:"User Not Exist"})
        }
    } catch (error) {
        res.json({error:err.message})
    }
})

module.exports = {
    personRouter
}