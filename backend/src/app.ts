import express, { type Request, type Response } from "express";

const app = express();

app.get("/", (req:Request,res: Response)=>{
    res.send({
        success: true,
        message: "Tiny cats backend is running"
    })
})

export default app;