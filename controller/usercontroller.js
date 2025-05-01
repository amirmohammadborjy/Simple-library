const url=require("url")
const usermodel=require("./../model/User")
const addone=(req,res)=>{
    let userdata=""
        req.on("data",(data)=>{
            userdata=JSON.parse(userdata+data.toString());
        })
        

        req.on("end",async()=>{
           const addeduser=await usermodel.adduser(userdata)
           res.writeHead(200,{"Content-Type":"text/html"})
           res.write(addeduser)
           res.end()
        })
}
const setcrime=(req,res)=>{
    const urlpars=url.parse(req.url,true)
        const userid=urlpars.query.id
        let usercrime=""
        req.on("data",(data)=>{
            usercrime=JSON.parse(usercrime+data.toString())
        })
        req.on("end",async()=>{
            const result=await usermodel.addcrime(usercrime,userid);
             res.send(result)
        })
}
const upgraderole=async(req,res)=>{
    const parsurl=url.parse(req.url,true)
    const userid=parsurl.query.id
    const result=await usermodel.changerole(userid)
    res.send(result)       
}
const login=(req,res)=>{
    let login=""
        req.on("data",(data)=>{
            login=JSON.parse(login+data.toString());
        })
        req.on("end",async()=>{
            const result=await usermodel.checklogin(login);
            res.send(result)
        })
}

module.exports={
    addone,
    setcrime,
    upgraderole,
    login
}