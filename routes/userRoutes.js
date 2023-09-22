const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authmiddleware = require("../middleware/authmiddleware");

router.post("/register", async (req, resp) => {
  try {
    const userexist = await User.findOne({ email: req.body.email });
    if (userexist) {
      return resp.status(200).send({ message: "user exist", success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt();
    const hashedpass = await bcrypt.hash(password, salt);
   
    req.body.password = hashedpass;
   


    

    const newuser = new User(req.body);
    await newuser.save();
    resp
      .status(200)
      .send({ message: "User created successfully", success: true });
  } catch (error) {
    console.log(error);
    resp.status(500).send({ message: "error creating user", success: false });
  }
});

router.post("/login", async (req, resp) => {
  try {
    const userp = await User.findOne({ email: req.body.email });

    if (!userp) {
      return resp
        .status(200)
        .send({ message: "user doesn't exist", success: false });
    }

    const isMatch = await bcrypt.compare(req.body.password, userp.password);
    if (!isMatch) {
      return resp
        .status(400)
        .send({ message: "incorrect password", success: false });
    } else {
      const token = jwt.sign({ id: userp._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      resp
        .status(200)
        .send({ message: "login successfully", success: true, data: token });
    }
  } catch (error) {
    console.log(error);
    resp.status(500).send({ message: "error in login", success: false, error });
  }
});

router.post("/get-user-info-by-id", authmiddleware, async (req,resp) => {
  try {
    const user = await User.findOne({_id: req.body.userId });
    user.password=undefined;
    if (!user) {
      return resp
        .status(200)
        .send({ message: "user does not exist", success: false });
    } else {
      return resp.status(200).send({
        success: true,
        data: {
          name:user.name,
          email:user.email,
        },
      });
    }
  } catch (error) {
    resp
      .status(500)
      .send({ message: "error getting user info", success: false, error });
  }
});

module.exports = router;
