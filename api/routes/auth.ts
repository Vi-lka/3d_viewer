import express, {Request, Response} from 'express';
const router = require("express").Router()
const User = require("../models/User")
const bcrypt = require("bcrypt")

//REG
router.post("/reg", async function (req:Request, res:Response) {
    try{

        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(req.body.password, salt)
        const newUser = new User({
            username: req.body.username,
            password: hashedPass
        })

        const user = await newUser.save()
        res.status(200).json(user)
    } catch(err){
        res.status(500).json(err)
    }
})

//Login
router.post("/login", async function (req:Request, res:Response) {
    try{
        const user = await User.findOne({ username: req.body.username })
        if (!user) {
            res.status(400).json("User not found")
            // stop further execution in this callback
            return;
          }

        const validated = await bcrypt.compare(req.body.password, user.password)
        if (!validated) {
            res.status(400).json("Wrong password")
            // stop further execution in this callback
            return;
          }

        const { password, ...others } = user._doc
        res.status(200).json(others)
    } catch(err){
        res.status(500).json(err)
    }
})

module.exports = router

