const express=require("express");
const router=express.Router();
const {User}=require("../models");
const {hashPassword,comparePassword} = require("../utils/bcrypt")
router.post("/",async(req,res)=>{
    try{
        const {email,password,name} = req.body;
        if(email && password && name){
            const hashedPassword = await hashPassword(password);
            const data = await User.create({
                email:email,
                password:hashedPassword,
                name:name
            })
            return res.json({signup:true});
        }
        else
        {
            throw new Error();
        }
    }
    catch(err){
        return res.json({signup:false});
    }
})

router.post("/login",async(req,res)=>{
    try{
        const {email,password} = req.body;
        const userData = await User.findOne({
            where:{
                email:email
            }
        });
        const hashedPassword=userData.dataValues.password;
        const compareResult = await comparePassword(password,hashedPassword);
        if(compareResult){
            //auth 3: user, auth 2: seller
            return res.json({
                login:true,
                id:userData.dataValues.id,
                name:userData.dataValues.name,
                auth:3
            });
        }
        
        console.log(userData);
    }catch(err){
        console.log(err);
        return res.json({login:false})
    }
})

module.exports=router;