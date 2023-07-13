const mongoose = require("mongoose")

const userSchema= mongoose.Schema({
    Email:String,
    Password:String,
    Confirm_Password:String
},{
    versionKey:false
})

const UserModel = mongoose.model("user",userSchema)

module.exports = {
    UserModel
}