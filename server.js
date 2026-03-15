const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/phonestore")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err))


// USER MODEL
const UserSchema = new mongoose.Schema({
username:String,
password:String
})

const User = mongoose.model("User",UserSchema)


// PHONE MODEL
const PhoneSchema = new mongoose.Schema({
name:String,
price:Number,
image:String
})

const Phone = mongoose.model("Phone",PhoneSchema)



// REGISTER
app.post("/register", async (req,res)=>{

const {username,password} = req.body

const newUser = new User({username,password})

await newUser.save()

res.json({message:"User registered"})

})



// LOGIN
app.post("/login", async (req,res)=>{

const {username,password} = req.body

const user = await User.findOne({username,password})

if(user){
res.json({success:true})
}else{
res.json({success:false})
}

})



// GET PHONES
app.get("/phones", async (req,res)=>{

const phones = await Phone.find()

res.json(phones)

})



// ADD PHONES (RUN ONCE)
app.get("/addphones", async (req,res)=>{

await Phone.insertMany([

{name:"iPhone 15",price:999,image:"https://m.media-amazon.com/images/I/61bK6PMOC3L.jpg"},
{name:"iPhone 14",price:899,image:"https://m.media-amazon.com/images/I/61cwywLZR-L.jpg"},
{name:"Samsung Galaxy S23",price:899,image:"https://m.media-amazon.com/images/I/71goZuIha-L.jpg"},
{name:"Samsung Galaxy S22",price:799,image:"https://m.media-amazon.com/images/I/71z2K0QfPBL.jpg"},
{name:"OnePlus 12",price:799,image:"https://m.media-amazon.com/images/I/61BAuSC0UnL.jpg"},
{name:"OnePlus 11",price:699,image:"https://m.media-amazon.com/images/I/61amb0CfMGL.jpg"},
{name:"Google Pixel 8",price:699,image:"https://m.media-amazon.com/images/I/61bK6PMOC3L.jpg"},
{name:"Xiaomi 14",price:650,image:"https://m.media-amazon.com/images/I/51XU5oG3LxL.jpg"},
{name:"Realme GT 6",price:550,image:"https://m.media-amazon.com/images/I/61amb0CfMGL.jpg"},
{name:"Vivo X100",price:720,image:"https://m.media-amazon.com/images/I/71w3oJ7aWyL.jpg"}

])

res.send("Phones Added")

})


app.listen(3000,()=>{
console.log("Server running on http://localhost:3000")
})