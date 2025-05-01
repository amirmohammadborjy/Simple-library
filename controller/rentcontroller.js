const url=require("url")
const express=require("express");
const rentmodel=require("./../model/Rent")
const rentbook=(req,res)=>{
    let reqbody=""
    req.on("data",(data)=>{
        reqbody=JSON.parse(reqbody+data.toString())
    })
    req.on("end",async()=>{
       const result=await rentmodel.rent(reqbody)     
       res.send(result)
    })
}
const returnRent=async(req,res)=>{
    const urlpars=url.parse(req.url,true)
    const bookid=urlpars.query.id
    const result=await rentmodel.deletRent(bookid)
    res.send(result)                          
}
module.exports={
    rentbook,
    returnRent
}