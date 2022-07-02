import express, {Request, Response} from 'express';
import { Callback } from 'mongoose';
import path from 'path';
const app = express()
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const multer = require("multer")
const authRoute = require("./routes/auth")
const postRoute = require("./routes/posts")
const categoryRoute = require("./routes/categories")
const cors = require('cors');
app.use(cors())

dotenv.config()
app.use(express.json())
app.use("/uploads", express.static(path.join(__dirname, "/uploads")))

mongoose.connect(process.env.DB_URL).then(console.log("Connected!"))

const storage = multer.diskStorage({
    destination:(req: Request, file: File, cb: Callback) => {
        cb(null, "uploads")
    }, 
    filename:(req: Request, file: File, cb: Callback) => {
        cb(null, req.body.name)
    }
})

const uploadFilter = function(req: Request, file: any, cb: Callback) {
    if (file.originalname.match(/\.(fbx|FBX|jpg|JPG|jpeg|JPEG|png|PNG|)$/)) {
        cb(null, true);
    } else {
        cb(null, false);
        const err = new Error('Only .png, .jpg, .jpeg and .fbx format allowed!')
        err.name = 'ExtensionError'
        return cb(err , false);
    }
}

const upload = multer({
    storage:storage,
    fileFilter: uploadFilter})

app.post("/api/uploadModel", upload.single("model"), (req: Request, res: Response) => {
    res.status(200).json("Files has been uploaded")
})

app.post("/api/uploadColorMap", upload.single("colorMap"), (req: Request, res: Response) => {
    res.status(200).json("Files has been uploaded")
})

app.post("/api/uploadNormalMap", upload.single("normalMap"), (req: Request, res: Response) => {
    res.status(200).json("Files has been uploaded")
})

app.post("/api/uploadMetalnessMap", upload.single("metalnessMap"), (req: Request, res: Response) => {
    res.status(200).json("Files has been uploaded")
})

app.post("/api/uploadRoughnessMap", upload.single("roughnessMap"), (req: Request, res: Response) => {
    res.status(200).json("Files has been uploaded")
})

app.post("/api/uploadAOMap", upload.single("aoMap"), (req: Request, res: Response) => {
    res.status(200).json("Files has been uploaded")
})

app.post("/api/uploadScreenshot", upload.single("screenshot"), (req: Request, res: Response) => {
    res.status(200).json("Files has been uploaded")
})


app.use("/api/auth", authRoute)
app.use("/api/posts", postRoute)
app.use("/api/categories", categoryRoute)


app.listen("5000", ()=>{
    console.log("Backend")
})