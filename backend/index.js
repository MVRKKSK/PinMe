const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv")
const RouterPost = require("./routes/pins")
const RouterUser = require("./routes/users")

const app = express();

dotenv.config();

app.use(express.json())
mongoose.connect(process.env.MONGODB_URL , {useNewUrlParser: true , useUnifiedTopology: true}).then(()=>{
    console.log("mongoose is connected")
}).catch((error) =>{
    console.log(error)
});

app.use("/api/pins/" , RouterPost);
app.use("/api/users/" , RouterUser);

app.get("/" , (req ,res) =>{
    res.send("hello iam from backend");
});

app.listen(5000 , ()=>{
    console.log("server is connected to the port 5000")
});