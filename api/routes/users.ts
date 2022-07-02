import express, {Request, Response} from 'express';
const router = require("express").Router()
const User = require("../models/User")
const bcrypt = require("bcrypt")

//Update
router.put("/:id", async function (req:Request, res:Response) {
    try{

    } catch(err){
        res.status(500).json(err)
    }
})

module.exports = router

