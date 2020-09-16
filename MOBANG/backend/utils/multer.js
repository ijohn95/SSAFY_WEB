const multer = require("multer");
const path = require("path");

const upload = multer({
    storage:multer.diskStorage({
        destination:(req,file,done)=>{
            done(null,"uploads/");
        },
        filename:(req,file,done)=>{
            const ext = path.extname(file.originalname);

            const fileName = path.basename(file.originalname,ext)+"&&"+Date.now()+ext;

            done(null,fileName);
            req.fileDir = fileName;
        }
    })
});

module.exports = {upload};