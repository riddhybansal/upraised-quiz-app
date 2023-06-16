import express from "express";
import morgan from 'morgan';
import cors from 'cors';
import {config} from 'dotenv';
import router from './router/route.js'
import connect from './database/connection.js'

const app =express()

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
config(); //initialise dotenv
//Server port
const port = process.env.port || 8080
//connect database
connect().then(()=>{
    try{
        app.listen(port,()=>{
            console.log("Connected to server")
        })
    }catch(err){
        console.log("cannot connect to the server")
    }
}).catch(error=>{
    console.log("Invalid database connection")
})
// routes
app.use('/api',router)
app.get('/',(req,res)=>{
    try{
        res.json("get")
    }catch(err){
        res.json(err)
    }
})

