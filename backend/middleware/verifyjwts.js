const jwt= require("jsonwebtoken");
//require("dotenv").config();
//il extrait le token du header il verifie le token et le place dans le header
module.exports=(req,res,next)=>{
    try{
        let token =req.headers["authorization"].split(" ")[1]; //L'espace au niveau du split et du $ dans Chat.jsx permet de
       let verifiedToken= jwt.verify(token, "bRODJI04#");
       req.id_user=verifiedToken.user_id
       next();
    }catch(error){
        res.status(403).json(error)
    }//jsonwt et bcrypt
} 