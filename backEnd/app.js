let express = require("express");
var cors = require("cors");
const { MongoClient } = require("mongodb");

const nodemailer = require('nodemailer');

const app = express();






let addMenu = require("./modules/admin_addMenu");
let userYesCount = require("./modules/userResponse_Yes");
let userNoCount = require("./modules/userResponse_No");


app.get("/addMenu",cors(),(req,res)=>{
    addMenu.addMenuItems(req,res,MongoClient,nodemailer);
})


app.get("/yes/:user",cors(),(req,res) => {
   userYesCount.countForYes(req,res,MongoClient);
})

app.get("/no/:user",cors(),(req,res) => {
    userNoCount.countForNo(req,res,MongoClient);
})


const port = 1011;
app.listen( process.env.PORT ||port, () => console.log(`Listening on port ${port}..`));