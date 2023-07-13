const express = require("express")
const {EmployeeModel} = require("../modals/employess.modal")
const {authentication} = require("../middlewares/auth.middleware")

const employeeRouter = express.Router()

employeeRouter.use(authentication)


employeeRouter.post("/employees",async(req,res)=>{
    try {
        const employee = new EmployeeModel(req.body)
        await employee.save()
        res.json({msg:"Added SucessFully",employee:req.body})
    } catch (err) {
        res.json({error:err.message})
    }
})

employeeRouter.get("/",async(req,res)=>{
    try {
        const employee = await EmployeeModel.find({userID:req.body.userID})
        res.send(employee)
    } catch (err) {
        res.json({error:err.message})
    }
})

employeeRouter.patch("/update/:employeeID",async(req,res)=>{
    const useridinuserdoc = req.body.userID
    const {employeeID} = req.params
    try {
        const employee = await EmployeeModel.findOne({_id:employeeID})
        const useridinemployeedoc = employee.userID
        if(useridinuserdoc===useridinemployeedoc){
            await EmployeeModel.findByIdAndUpdate({_id:employeeID},req.body)
            res.json({msg:`${employee.Email} is updated`})
        }
        else{
            res.json({msg:"Not Authenticated"})
        }
    } catch (err) {
        res.json({error:err.message})
    }
})



employeeRouter.delete("/delete/:employeeID",async(req,res)=>{
    const useridinuserdoc = req.body.userID
    const {employeeID} = req.params
    try {
        const employee = await EmployeeModel.findOne({_id:employeeID})
        const useridinemployeedoc = employee.userID
        if(useridinuserdoc===useridinemployeedoc){
            await EmployeeModel.findByIdAndDelete({_id:employeeID})
            res.json({msg:`${employee.Email} is updated`})
        }
        else{
            res.json({msg:"Not Authenticated"})
        }
    } catch (err) {
        res.json({error:err.message})
    }
})

module.exports = {
    employeeRouter
}