const express=require("express");
const router=express.Router();
const {Seller}=require("../models");
const {hashPassword,comparePassword} = require("../utils/bcrypt")
router.post("/",async(req,res)=>{
    try{
        const {email,password,name} = req.body;
        if(email && password && name){
            const hashedPassword = await hashPassword(password);
            const data = await Seller.create({
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
        console.log(err)
        return res.json({signup:false});
    }
})

router.post("/login",async(req,res)=>{
    try{
        const {email,password} = req.body;
        const sellerData = await Seller.findOne({
            where:{
                email:email
            }
        });
        const hashedPassword=sellerData.dataValues.password;
        const compareResult = await comparePassword(password,hashedPassword);
        if(compareResult){
            //auth 3: user, auth 2: seller
            return res.json({
                login:true,
                id:sellerData.dataValues.id,
                name:sellerData.dataValues.name,
                auth:2
            });
        }
        
        console.log(sellerData);
    }catch(err){
        console.log(err);
        return res.json({login:false})
    }
})

module.exports=router;