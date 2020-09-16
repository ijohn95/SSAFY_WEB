const express = require("express");
const app = express();
const morgan = require("morgan");
const {sequelize} = require("./models");
const cors = require("cors");
const PORT = 8000;
const indexRouter  = require("./routes");
const userRouter  = require("./routes/user");
const sellerRouter  = require("./routes/seller");
const postRouter  = require("./routes/post");

app.use(
    cors({
        origin:true,
        credentials:true
    })
);
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(morgan("dev"));

sequelize.sync({force:false})
.then(()=>console.log("db 접속 성공"))
.catch(err=>console.log(err));

app.use("/",indexRouter);
app.use("/user",userRouter);
app.use("/seller",sellerRouter);
app.use("/post",postRouter);
app.listen(PORT,()=>console.log(`this server listening on ${PORT}`));