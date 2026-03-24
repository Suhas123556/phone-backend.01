const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ================= USERS =================
let users = [];

// ================= PRODUCTS =================
const products = [
  {
    id: 1,
    name: "iPhone 14",
    price: 70000,
    image: "https://m.media-amazon.com/images/I/61cwywLZR-L._SX679_.jpg"
  },
  {
    id: 2,
    name: "Samsung Galaxy S23",
    price: 65000,
    image: "https://m.media-amazon.com/images/I/61VfL-aiToL._SX679_.jpg"
  },
  {
    id: 3,
    name: "OnePlus 11",
    price: 60000,
    image: "https://m.media-amazon.com/images/I/61amb0CfMGL._SX679_.jpg"
  },
  {
    id: 4,
    name: "Redmi Note 12",
    price: 20000,
    image: "https://m.media-amazon.com/images/I/81gUO0M9XEL._SX679_.jpg"
  },
  {
    id: 5,
    name: "Realme GT",
    price: 25000,
    image: "https://m.media-amazon.com/images/I/71cT1N7R8hL._SX679_.jpg"
  }
];

// ================= ROUTES =================

// Test
app.get("/", (req, res) => {
  res.send("🔥 Backend working");
});

// Products
app.get("/products", (req, res) => {
  res.json(products);
});

// Register
app.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Enter all fields" });
  }

  const exists = users.find(u => u.username === username);
  if (exists) {
    return res.status(400).json({ message: "User already exists" });
  }

  users.push({ username, password });

  res.json({ message: "Registered successfully" });
});

// Login
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username);

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  if (user.password !== password) {
    return res.status(400).json({ message: "Wrong password" });
  }

  res.json({ message: "Login successful" });
});

// Start
app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});