import mongoose from "mongoose"

const CatSchema = new mongoose.Schema({
    catname:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("Category", CatSchema)