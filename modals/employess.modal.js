const mongoose = require("mongoose")

const employeeSchema = mongoose.Schema({
    First_Name:String,
    Last_Name:String,
    Email:String,
    userID:String,
    Department:String,
    Salary:Number
},{
    versionKey:false
})

const EmployeeModel = mongoose.model("employee",employeeSchema)

module.exports = {
    EmployeeModel
}
