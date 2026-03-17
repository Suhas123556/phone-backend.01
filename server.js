const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const path = require("path")

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Serve frontend
app.use(express.static(path.join(__dirname, "../frontend/public")))

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/phonestore")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err))

// User Schema
const UserSchema = new mongoose.Schema({
  username: String,
  password: String
})

const User = mongoose.model("User", UserSchema)

// REGISTER
app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body

    const newUser = new User({ username, password })
    await newUser.save()

    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// LOGIN
app.post("/login", async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ username, password })

  if (user) {
    res.json({ success: true })
  } else {
    res.json({ success: false })
  }
})

// Start server
app.listen(3000, () => {
  console.log("Server running on port 3000")
})