const express = require("express")
const router = express.Router();
const Pin = require("../models/Pin.js")

router.post("/" , async (req,res) =>{
    res.send(req.body)
    const newPin = new Pin(req.body)
    try{
        const savedPin = await newPin.save();
        res.status(200).json(savedPin);
        
    }
    catch(err){
        res.status(500).json();
    }
    
})

router.get("/" , async (req ,res ) =>{
    try{
        const showPin = await Pin.find();
        res.status(200).json(showPin);
    }
    catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;