const jwt = require('jsonwebtoken');

const {JSONWEBTOKENSECRET} = process.env;

module.exports = async (req,res, next)=>{

    const token = req.headers['authorization'] ? (req.headers['authorization']).split(" ")[1] : null;
    if (token) {
    jwt.verify(token,JSONWEBTOKENSECRET,(err,user)=>{
        if(err){
            res.statusCode = 403
            res.data = {
                status:false,
                data:{message:err.message},
                statusCode:403
            }
           return res.send(res.data);
        }
        if(user && user !== undefined){
            req.userId = user.id;
            next();
        }
    })
    } else {
        res.statusCode = 403
        res.data = {
            status:false,
            data:{message:"This endpoint is unauthorized. You have to login."},
            message:"This endpoint is unauthorized. You have to login.",
            statusCode:403
        }
       return res.send(res.data);
    }
    
};