const express = require("express")
require("dotenv").config()
const {connection} = require("./db")
const {employeeRouter} = require("./routes/employess.routes")
const {personRouter} = require("./routes/user.routes")
const cors = require("cors")


const app = express()

app.use(express.json())
app.use(cors())
app.get("/",(req,res)=>{
    res.send("this is homepage")
})
app.use("/users",personRouter)
app.use("/all",employeeRouter)
app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("connected to Db")
        console.log(`server is running at port ${process.env.port}`)
    } catch (err) {
        console.log(err)
        console.log("wrong here")
    }
})
