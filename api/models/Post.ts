import mongoose from "mongoose"

const PostSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    info:{
        type:String,
        required:false
    },
    model:{
        type: String,
        required:false
    },
    colorMap:{
        type: String,
        required:false
    },
    normalMap:{
        type: String,
        required:false
    },
    metalnessMap:{
        type: String,
        required:false
    },
    metalness:{
        type:String,
        required:false
    },
    roughnessMap:{
        type: String,
        required:false
    },
    roughness:{
        type:String,
        required:false
    },
    aoMap:{
        type: String,
        required:false
    },
    username:{
        type:String,
        required:true
    },
    categories:{
        type:Array,
        required:false
        
    },
    screenshot:{
        type: String,
        required:true
    }
})

module.exports = mongoose.model("Post", PostSchema)