const express = require("express");
const {upload} = require("../utils/multer");
const {Room, Option, Image, sequelize} = require("../models");
const Sequelize = require("sequelize");
const { RSA_PKCS1_PADDING } = require("constants");
const { compareSync } = require("bcrypt");
const fs = require("fs").promises;
const router = express.Router();
const Op = Sequelize.Op;


router.get("/",async(req,res)=>{
    try{
        const data = await Room.findAll({
            include:[{model:Option},{model:Image}],
            where:{
                address:{
                    [Op.like] :`%${req.query.searchKeyword}%`
                }
            },

        });
        //console.log(data);
        return res.json({room:data});
    }
    catch(err){
        console.log(err);
        return res.json({room:false})
    }
})

router.get("/images",async(req,res)=>{
    try{
        const file = await fs.readFile(req.query.src);
        console.log(file);
        return res.send(file);
    }
    catch(err){
        return res.json({upload:false})
    }
})

router.post("/",upload.array("files"),async (req,res)=>{
    const transaction = await sequelize.transaction();
    try{
        const {title,content,address,latitude, longitude,seller_id,options} = req.body;
        console.log(req.body);
        console.log(req.files);
        const room = await Room.create(
            {
                title,
                content,
                address,
                latitude,
                longitude,
                seller_id,
                options
            },{
                transaction:transaction
            }
        )
        //console.log(options);
        if(options){
            if(typeof options === "string"){
                await Option.create({
                    item:options,
                    room_id:room.dataValues.id
                },
                {
                    transaction:transaction
                })
            }else{
                await Promise.all(options.map(async(li)=>{
                    await Option.create({
                        item:li,
                        room_id:room.dataValues.id
                    },
                    {
                        transaction:transaction
                    })
                }))
            }
        }
        if(req.files){
            await Promise.all(
                req.files.map(async(li)=>{
                    await Image.create({
                        src:li.path,
                        room_id:room.dataValues.id,
                    },
                    {transaction:transaction})
                })
            )
        }
        await transaction.commit();

        return res.json({upload:true});
    }
    catch(err){
        console.log(err);
        await transaction.rollback();
        if(req.files){
            req.files.forEach(li=>{
                fs.unlink(li.path,err=>{
                    if(err){
                        console.log(err);
                    }
                })
            })
        }
        return res.json({upload:false});
    }
});

router.get("/:id",async(req,res)=>{
    try{
        const data = await Room.findOne({
            include:[{model:Option},{model:Image}],
            where:{
                id:req.params.id
            }
        });
        console.log(data);
        return res.json({room:data});
    }
    catch(err)
    {
        console.log(err);
    }
});

router.put("/:id/option",async(req,res)=>{
    const transaction = await sequelize.transaction();
    try{
        const del = await Option.destroy(
            {
                where:{
                    room_id:req.params.id
                }
            },{
                transaction:transaction
            }
        );
        const {options} =  req.query;
        if(options){
            if(typeof options === "string"){
                await Option.create({
                    item:options,
                    room_id:req.params.id
                },
                {
                    transaction:transaction
                })
            }else{
                await Promise.all(options.map(async(li)=>{
                    await Option.create({
                        item:li,
                        room_id:req.params.id
                    },
                    {
                        transaction:transaction
                    })
                }))
            }
        }
        console.log(req);
        await transaction.commit();
        return res.json({update:true});
    }
    catch(err){
        console.log(err);
        await transaction.rollback();
        return res.json({update:false})
    }
});

module.exports = router;