import express from 'express'
import cors from 'cors'
import cookieparser from 'cookie-parser'

const app = express();
app.use(cors({
    origin : process.env.origin,
    credentials : true
}))

app.use(express.json({limit : "16kb"}))//for data coming from express files
app.use(express.urlencoded({extended:true,limit:"16kb"}));//for data coming from Url
app.use(express.static("public")) //to store some assets publically
app.use(cookieparser());//used to access cookies of the browser

import userRouter from './routes/user.routes.js';
app.use("/api/v1/users",userRouter);

export {app};