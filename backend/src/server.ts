import dotenv from 'dotenv';
dotenv.config();

import app from './app.ts';
import connectDB from './config/db.ts';


const port = process.env.PORT || 3000;

connectDB();

app.listen(3000, ()=>{
    console.log(`Server is running on port ${port}`);
})