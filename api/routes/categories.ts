import express, {Request, Response} from 'express';
const router = require("express").Router()
const User = require("../models/User")
const Category = require("../models/Category")
const bcrypt = require("bcrypt")

//CREATE CATEGORY
router.post("/", async function (req:Request, res:Response) {
    const newCat = new Category(req.body)
    try{
        const savedCat = await newCat.save()
        res.status(200).json(savedCat)
    } catch(err){
        res.status(500).json(err)
    }
})

//GET CATEGORY
router.get("/", async function (req:Request, res:Response) {
    try{
        const cats = await Category.find()
        res.status(200).json(cats)
    } catch(err){
        res.status(500).json(err)
    }
})

module.exports = router