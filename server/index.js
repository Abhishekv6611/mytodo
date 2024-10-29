import express from 'express'
import dotenv from 'dotenv'
import {ConnectDB} from './config/db.js'
import ProductTodo from './routes/Tododata.js';
import cors from 'cors'
dotenv.config();

const app=express()
app.use(express.json())
app.use(cors())  //enable cors


const PORT=process.env.PORT || 5001;

// connection to DB
ConnectDB()

app.use('/api/todo/',ProductTodo)

// port setup
app.listen(PORT,()=>{
 console.log(`SERVER RUNNING ON PORT : ${PORT}`);
})