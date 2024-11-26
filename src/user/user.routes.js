const express = require("express");
const User = require("./user.model");
const jwt = require("jsonwebtoken");

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET_KEY;

router.post("/admin", async (req, res) => {
  const { username, password } = req.body;
  try{
    const admin = await User.findOne({ username,password });
    if (!admin) {
      res.status(404).send({
        message: "Admin not found!"
      })
    }
    
    if (admin.password!== password) {
      res.status(401).send({ 
        message: "Invalid password!"
     });
    }
    
    const token = jwt.sign(
      { id: admin._id, username: admin.username, role: admin.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    )
    
    res.status(200).json({
      message: "Admin authenticated successfully",
      token: token
    });
  }
  catch(error){
    console.error("Error authenticating admin", error);
    res.status(500).json({ message: error.message });
  }
})


module.exports = router;
