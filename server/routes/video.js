import express from 'express'
import {uploadVideo,getAllvideos} from '../controllers/vide.js'
import upload from '../Helpers/fileHelpers.js'

const routes=express.Router();

routes.post("/uploadVideo",upload.single("file"),uploadVideo)
routes.get("/getvideos",getAllvideos);

export default routes;