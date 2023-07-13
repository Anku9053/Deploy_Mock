const jwt = require("jsonwebtoken")

const authentication = (req,res,next)=>{
    const token = req.headers.authorization?.split(" ")[1];
    if(token){
        try {
            const decoded = jwt.verify(token,"masai")
        if(decoded){
            req.body.userID = decoded.userID
            req.body.Email = decoded.Email
            next()
        }
        else{
            res.json({msg:"Login Failed"})
        }
        } catch (err) {
            res.json({error:err.message})
        }
    }
    else{
        res.json({msg:"Login First"})
    }
    
}

module.exports = {
    authentication
}