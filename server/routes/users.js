const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const{sign} = require("jsonwebtoken");


router.post("/", async (req, res) => {
  const { username, email, password } = req.body;
  
  try {
    const existingUser = await Users.findOne({ where: { username: username } });
    
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }
    
    bcrypt.hash(password, 10).then((hash) => {
      Users.create({
        username: username,
        email : email,
        password: hash,
      });
      res.json("SUCCESS");
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Users.findOne({ where: { username: username } });

    if (!user) {

      return  res.status(400).json({ error: "User doesn't exist" });
    }

    bcrypt.compare(password, user.password).then((match) => {
      if (!match) {
        res.json({ error: "Wrong username and password combination" });
      } else {
        const acessToken = sign(
          {username: user.username, id: user.id},
          "secret"
        );
        res.json(acessToken);
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;




