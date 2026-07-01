import express, { type Request, type Response } from "express";
import catRoutes from "./routes/cat.routes.ts";
import aiRoutes from "./routes/ai.routes.ts";
import aiRecommendRoutes from "./routes/aiRecommend.routes.ts";
const app = express();

app.use(express.json());

app.get("/", (req:Request,res: Response)=>{
    res.send({
        success: true,
        message: "Tiny cats backend is running"
    })
})

app.use('/api/cats', catRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/aiRecommend', aiRecommendRoutes);

export default app;