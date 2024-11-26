const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
require('dotenv').config()

// middleware
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173',"https://book-store-62ph.vercel.app"],
    credentials: true
}))

// routes
const bookRoutes = require("./src/books/book.rout.js")
const userRoutes =  require("./src/user/user.routes")
const authRoutes =  require("./src/user/user.routes.js")
const adminRoutes = require("./src/status/admin.routes.js");
const dbconnect = require("./src/dbconect");

app.use("/api/books", bookRoutes)
app.use("/api/auth", userRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/admin", adminRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  dbconnect()
  
});