const express = require("express");
const User = require("../models/User.js");
const bcrypt = require("bcrypt")

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash
        })

        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    }
    catch (err) {
        res.status(500).json(err);
    }
})

router.post("/login", async (req, res) => {

    try{
        const findUser = await User.findOne({
            username: req.body.username
        });
        !findUser && res.status(400).json("there is no user with that username")

        const ValidPassword = await bcrypt.compare(
            req.body.password,
            findUser.password
        )
        !ValidPassword && res.status(400).json("incorrect password")
        res.status(200).json({ _id: findUser._id, username: findUser.username })
    }
    catch(err){
        res.status(400).json(err)
    }
})

module.exports = router;