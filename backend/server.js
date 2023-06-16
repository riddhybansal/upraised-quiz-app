import express from "express";

const app =express()

// routes
app.get('/',(req,res)=>{
    try{
        res.json("get")
    }catch(err){
        res.json(err)
    }
})

app.listen(8080,()=>{
    console.log("Connected to server")
})